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

async function createOrder (bitcoinAmount, lightningAmount, recipientAddress) {
  const { bitcoin, ln } = await getClients()
  const refundAddress = (await bitcoin.wallet.getUnusedAddress()).address
  const invoice = await ln.makeInvoice({ amount: lightningAmount, defaultMemo: 'Submarinesssss' }) // TODO: relay expiration
  const invoiceData = LNPayReq.decode(invoice.paymentRequest)
  const expiryTag = invoiceData.tags.find(tag => tag.tagName === 'expiry')
  const expiry = expiryTag ? expiryTag.data : 3600
  const bitcoinExpiration = parseInt(new Date().getTime() / 1000) + (expiry * 2) // Leave enough time for claim
  const preimageHash = invoiceData.tags.find(tag => tag.tagName === 'payment_hash').data
  const initiationTxHash = await bitcoin.swap.initiateSwap(bitcoinAmount, recipientAddress, refundAddress, preimageHash, bitcoinExpiration)

  const payload = {
    tx: initiationTxHash,
    bitcoinAmount: bitcoinAmount,
    recipientAddress,
    refundAddress,
    bitcoinExpiration: bitcoinExpiration,
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
    order.tx, order.recipientAddress, order.refundAddress, preimageFromPayment, order.bitcoinExpiration
  )
  return claimTxHash
}

async function verifyOrder (order) {
  const { bitcoin } = await getClients()
  const verified = await bitcoin.swap.verifyInitiateSwapTransaction(order.tx, order.bitcoinAmount, order.recipientAddress, order.refundAddress, order.preimageHash, order.bitcoinExpiration)
  return verified
}

async function getTransaction (txHash) {
  const { bitcoin } = await getClients()
  return bitcoin.chain.getTransactionByHash(txHash)
}

function encodeOrder (order) {
  return Buffer.from(JSON.stringify(order)).toString('base64')
}

function decodeOrder (rawOrder) {
  const rawJson = Buffer.from(rawOrder, 'base64').toString()
  const order = rawJson.startsWith('{') ? JSON.parse(rawJson) : null
  if (order) {
    const invoiceData = LNPayReq.decode(order.invoice)
    const expiryTag = invoiceData.tags.find(tag => tag.tagName === 'expiry')
    order.preimageHash = invoiceData.tags.find(tag => tag.tagName === 'payment_hash').data
    order.lightningAmount = invoiceData.satoshis
    order.lightningExpiration = invoiceData.timestamp + (expiryTag ? expiryTag.data : 3600)
    order.verified = false
  }
  return order
}

export { createOrder, fillOrder, verifyOrder, getTransaction, encodeOrder, decodeOrder }
