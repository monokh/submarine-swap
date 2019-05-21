const request = require('request-promise-native')

class LN {
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

  async addInvoice (value, memo) {
    return request.post({
      ...this._baseOptions,
      body: { value, memo },
      url: `${this._baseUrl}/v1/invoices`
    })
  }

  async payInvoice (paymentRequest) {
    return request.post({
      ...this._baseOptions,
      body: { paymentRequest },
      url: `${this._baseUrl}/v1/channels/transactions`
    })
  }
}

export default LN
