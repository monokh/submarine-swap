<template>
  <div class="form">
    <div v-if="!webLNAvailable" class="form-group">
      <label for="lndApiUrl">LND Rest Api path</label>
      <input v-model="lndApiUrl" type="text" class="form-control" id="lndApiUrl" placeholder="Enter url">
      <small class="form-text text-muted">LND rest interface.</small>
      <label for="lndMacaroon">LND admin.macaroon</label>
      <input v-on:change="onMacaroonFileChange" type="file" class="form-control-file" id="lndMacaroon" placeholder="Upload admin.macaroon">
      <small class="form-text text-muted">LND admin.macaroon file</small>
    </div>
    <div class="form-group">
      <label for="bitcoinUrl">Bitcoin RPC Url</label>
      <input v-model="bitcoinUrl" type="input" class="form-control" id="bitcoinUrl" placeholder="Bitcoin RPC endpoint">
    </div>
    <div class="form-group">
      <label for="bitcoinNetwork">Bitcoin Network</label>
      <select v-model="bitcoinNetwork" class="custom-select">
        <option value="bitcoin_testnet">Bitcoin Testnet</option>
        <option value="bitcoin">Bitcoin</option>
      </select>
    </div>
    <div class="form-group">
      <label for="bitcoinUsername">Bitcoin RPC Username</label>
      <input v-model="bitcoinUsername" type="input" class="form-control" id="bitcoinUsername" placeholder="Bitcoin RPC username">
    </div>
    <div class="form-group">
      <label for="bitcoinPassword">Bitcoin RPC Password</label>
      <input v-model="bitcoinPassword" type="password" class="form-control" id="bitcoinPassword" placeholder="Bitcoin RPC password">
    </div>
    <button class="btn btn-primary" v-on:click="save">Save</button>
  </div>
</template>

<script>
import * as WebLN from 'webln'
import { settings, updateSettings } from '../utils/settings'

export default {
  name: 'Settings',
  data: () => ({
    ...settings,
    webLNAvailable: false
  }),
  created: async function () {
    try {
      await WebLN.requestProvider()
      this.webLNAvailable = true
    }
    catch(err) {
      this.webLNAvailable = false
    }
  },
  methods: {
    save: function () {
      updateSettings({
        lndApiUrl: this.lndApiUrl,
        macaroon: this.macaroon,
        bitcoinUrl: this.bitcoinUrl,
        bitcoinNetwork: this.bitcoinNetwork,
        bitcoinUsername: this.bitcoinUsername,
        bitcoinPassword: this.bitcoinPassword
      })
    },
    onMacaroonFileChange: function (e) {
      const reader = new FileReader()
      reader.onload = e => {
        const buffer = Buffer.from(e.target.result)
        this.macaroon = buffer.toString('hex')
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
