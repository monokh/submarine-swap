<template>
  <div>
    <div class="form">
      <div class="form-group">
        <label for="orderCode">Order</label>
        <div class="input-group">
          <input v-on:keyup="onOrderChange" type="text" class="form-control" placeholder="Enter the order data">
          <div class="input-group-append">
            <span class="input-group-text">⚡</span>
          </div>
        </div>
        <small class="form-text text-muted">Order data obtained from counterparty</small>
      </div>
      <div v-if="order">
        <div class="order">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Recipient</th>
                <td>{{ order.recipientAddress }}</td>
              </tr>
              <tr>
                <th scope="row">Bitcoin Amount</th>
                <td>{{ order.bitcoinAmount }} SATS</td>
              </tr>
              <tr>
                <th scope="row">Lightning Amount</th>
                <td>{{ order.lightningAmount }} SATS</td>
              </tr>
              <tr>
                <th scope="row">Bitcoin Expiry</th>
                <td>{{ order.bitcoinExpiration }}</td>
              </tr>
              <tr>
                <th scope="row">Lightning Expiry</th>
                <td>{{ order.lightningExpiration }}</td>
              </tr>
              <tr>
                <th scope="row">Verified</th>
                <td>{{ order.verified ? '✔' : '✘' }}</td>
              </tr>
              <tr v-if="lockTx">
                <th scope="row">Confirmations</th>
                <td>{{ lockTx.confirmations }}</td>
              </tr>
            </tbody>
          </table>
          <button v-if="order" class="btn btn-primary" v-on:click="fill()">Claim</button>
        </div>
      </div>
    </div>
    <div v-if="claimTx" class="result card">
      <h2>Swap Settled</h2>
      <p><strong>Claim Transaction: </strong>{{ claimTx }}</p>
    </div>
  </div>
</template>

<script>
import { decodeOrder, fillOrder, verifyOrder, getTransaction } from '../utils/order'

export default {
  name: 'FillOrder',
  data: () => ({
    orderCode: '',
    lockTx: null,
    claimTx: '',
    order: null
  }),
  methods: {
    fill: async function () {
      this.claimTx = await fillOrder(this.orderCode)
    },
    watchLockTx: async function (order) {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.lockTx = await getTransaction(order.tx)
      this.interval = setInterval(async () => {
        this.lockTx = await getTransaction(order.tx)
      }, 5000)
    },
    onOrderChange: async function (e) {
      this.orderCode = e.target.value
      const order = decodeOrder(this.orderCode)
      if (order) {
        order.verified = await verifyOrder(order)
        await this.watchLockTx(order)
      }
      this.order = order
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .result {
    margin: 20px 0;
    padding: 20px;
    width: 500px;
  }
</style>
