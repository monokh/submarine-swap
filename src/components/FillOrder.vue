<template>
  <div>
    <div class="form">
      <div class="form-group">
        <label for="invoice">Invoice</label>
        <div class="input-group">
          <input v-model="invoice" type="text" class="form-control" placeholder="Enter the order invoice">
          <div class="input-group-append">
            <span class="input-group-text">⚡</span>
          </div>
        </div>
        <small class="form-text text-muted">Lightning network invoice payment request</small>
      </div>
      <div v-if="order">
        <div class="invoice">
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
          <button v-if="invoice" class="btn btn-primary" v-on:click="fill()">Claim</button>
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
import { parseOrder, fillOrder } from '../utils/order'

export default {
  name: 'FillOrder',
  data: () => ({
    invoice: '',
    tx: ''
  }),
  computed: {
    order: function () {
      return this.invoice.startsWith('ln') ? parseOrder(this.invoice) : null
    }
  },
  methods: {
    fill: async function () {
      this.tx = await fillOrder(this.invoice)
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
