import Client from '@liquality/client'
import BitcoinJsLibSwapProvider from '@liquality/bitcoin-bitcoinjs-lib-swap-provider'
import BitcoreRpcProvider from '@liquality/bitcoin-bitcore-rpc-provider'
import BitcoinNetworks from '@liquality/bitcoin-networks'
import LNPayReq from 'bolt11'
import LN from './ln'
import * as WebLN from 'webln'
import LNApiProvider from './lnApiProvider'
import { settings } from './settings'

async function getClients () {
  const bitcoin = new Client()
  bitcoin.addProvider(new BitcoreRpcProvider(settings.bitcoinUrl, settings.bitcoinUsername, settings.bitcoinPassword))
  bitcoin.addProvider(new BitcoinJsLibSwapProvider({ network: BitcoinNetworks[settings.bitcoinNetwork] }))

  let lnProvider
  try {
    lnProvider = await WebLN.requestProvider()
  } catch (err) {
    lnProvider = new LNApiProvider(settings.lndApiUrl, settings.macaroon)
  }

  const ln = new LN(lnProvider)

  return { bitcoin, ln }
}

async function createOrder (value, recipientAddress) {
  const { bitcoin, ln } = await getClients()
  const refundAddress = (await bitcoin.wallet.getUnusedAddress()).address
  const expiration = parseInt(new Date().getTime() / 1000) + 43200 // 12 hours ahead
  const invoice = await ln.makeInvoice({ amount: value, defaultMemo: 'Submarinesssss' })
  const invoiceData = LNPayReq.decode(invoice.paymentRequest)
  const preimageHash = invoiceData.tags.find(tag => tag.tagName === 'payment_hash').data
  const initiationTxHash = await bitcoin.swap.initiateSwap(value, recipientAddress, refundAddress, preimageHash, expiration)

  const payload = {
    tx: initiationTxHash,
    value,
    recipientAddress,
    refundAddress,
    preimageHash,
    expiration,
    invoice: invoice.paymentRequest
  }
  const order = encodeOrder(payload)
  return order
}

async function fillOrder (rawOrder) {
  const { bitcoin, ln } = await getClients()
  const order = decodeOrder(rawOrder)
  const payment = await ln.sendPayment(order.invoice)
  const preimageFromPayment = payment.preimage
  const claimTxHash = await bitcoin.swap.claimSwap(
    order.tx, order.recipientAddress, order.refundAddress, preimageFromPayment, order.expiration
  )
  return claimTxHash
}

function encodeOrder (order) {
  return Buffer.from(JSON.stringify(order)).toString('base64')
}

function decodeOrder (rawOrder) {
  const rawJson = Buffer.from(rawOrder, 'base64').toString()
  return rawJson.startsWith('{') ? JSON.parse(rawJson) : null
}

export { createOrder, fillOrder, decodeOrder }
