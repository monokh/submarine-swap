<template>
  <div>
    <div class="form">
      <div class="form-group">
        <label for="orderCode">Order</label>
        <div class="input-group">
          <input v-model="orderCode" type="text" class="form-control" placeholder="Enter the order data">
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
                <th scope="row">Value</th>
                <td>{{ order.value }}</td>
              </tr>
            </tbody>
          </table>
          <button v-if="order" class="btn btn-primary" v-on:click="fill()">Claim</button>
        </div>
      </div>
    </div>
    <div v-if="tx" class="result card">
      <h2>Claim transaction</h2>
      <p>{{ tx }}</p>
    </div>
  </div>
</template>

<script>
import { decodeOrder, fillOrder } from '../utils/order'

export default {
  name: 'FillOrder',
  data: () => ({
    orderCode: '',
    tx: ''
  }),
  computed: {
    order: function () {
      return decodeOrder(this.orderCode)
    }
  },
  methods: {
    fill: async function () {
      this.tx = await fillOrder(this.orderCode)
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
