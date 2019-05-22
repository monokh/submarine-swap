class LN {
  constructor (provider) {
    this._provider = provider
  }

  async makeInvoice (requestInvoiceArgs) {
    return this._provider.makeInvoice(requestInvoiceArgs)
  }

  async sendPayment (paymentRequest) {
    return this._provider.sendPayment(paymentRequest)
  }
}

export default LN
