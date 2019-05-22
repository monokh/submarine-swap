import request from 'request-promise-native'

class LNApiProvider {
  constructor (baseUrl, macaroon) {
    this._baseUrl = baseUrl
    this._macaroon = macaroon
    this._baseOptions = {
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': this._macaroon
      }
    }
  }

  async makeInvoice (requestInvoiceArgs) {
    const response = await request.post({
      ...this._baseOptions,
      body: { value: requestInvoiceArgs.amount.toString(), memo: requestInvoiceArgs.defaultMemo },
      url: `${this._baseUrl}/v1/invoices`
    })
    return { paymentRequest: response.payment_request }
  }

  async sendPayment (paymentRequest) {
    const response = await request.post({
      ...this._baseOptions,
      body: { payment_request: paymentRequest },
      url: `${this._baseUrl}/v1/channels/transactions`
    })
    return { preimage: Buffer.from(response.payment_preimage, 'base64').toString('hex') }
  }
}

export default LNApiProvider
