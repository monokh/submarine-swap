import Client from '@liquality/client'
import BitcoinJsLibSwapProvider from '@liquality/bitcoin-bitcoinjs-lib-swap-provider'
import BitcoreRpcProvider from '@liquality/bitcoin-bitcore-rpc-provider'
import BitcoinNetworks from '@liquality/bitcoin-networks'
import { sha256 } from '@liquality/crypto'
import LNPayReq from 'bolt11'
import LN from './ln'
import { settings } from './settings'

function getClients () {
  const bitcoin = new Client()
  bitcoin.addProvider(new BitcoreRpcProvider(settings.bitcoinUrl, settings.bitcoinUsername, settings.bitcoinPassword))
  bitcoin.addProvider(new BitcoinJsLibSwapProvider({ network: BitcoinNetworks[settings.bitcoinNetwork] }))

  // TODO: WebLN
  const ln = new LN(settings.lndApiUrl, settings.macaroon)

  return { bitcoin, ln }
}

async function createOrder (value, recipientAddress) {
  const { bitcoin, ln } = getClients()
  const secret = await bitcoin.swap.generateSecret('test')
  const secretHash = sha256(secret)
  const refundAddress = (await bitcoin.wallet.getUnusedAddress()).address
  const expiration = parseInt(new Date().getTime() / 1000) + 43200 // 12 hours ahead
  const initiationTxHash = await bitcoin.swap.initiateSwap(value, recipientAddress, refundAddress, secretHash, expiration)
  const payload = {
    tx: initiationTxHash,
    value,
    recipientAddress,
    refundAddress,
    secretHash,
    expiration
  }
  const invoice = await ln.addInvoice(value.toString(), JSON.stringify(payload), secret)
  return {
    transaction: initiationTxHash,
    invoice: invoice.payment_request
  }
}

async function fillOrder (invoice) {
  const { bitcoin, ln } = getClients()
  const orderData = parseOrder(invoice)
  const payment = await ln.payInvoice(invoice)
  const secretFromPayment = Buffer.from(payment.payment_preimage, 'base64').toString('hex')
  const claimTxHash = await bitcoin.swap.claimSwap(
    orderData.tx, orderData.recipientAddress, orderData.refundAddress, secretFromPayment, orderData.expiration
  )
  return claimTxHash
}

function parseOrder (invoice) {
  const invoiceData = LNPayReq.decode(invoice)
  const description = invoiceData.tags.find(tag => tag.tagName === 'description').data
  const orderData = JSON.parse(description) // TODO: Pull data from invoice instead of from empbeded data
  return orderData
}

export { createOrder, fillOrder, parseOrder }
