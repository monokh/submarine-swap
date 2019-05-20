let settings = {
  lndApiUrl: 'http://localhost:18886',
  macaroon: '',
  bitcoinUrl: 'http://localhost:18332',
  bitcoinNetwork: 'bitcoin_testnet',
  bitcoinUsername: 'bitcoin',
  bitcoinPassword: 'local321'
}

const updateSettings = (newSettings) => {
  settings = newSettings
}

export { settings, updateSettings }
