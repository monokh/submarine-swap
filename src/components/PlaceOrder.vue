<template>
  <div>
    <div class='form'>
      <div class="form-group">
        <label for="recipientAddress">Recipient Address</label>
        <input v-model="recipientAddress" type="text" class="form-control" id="recipientAddress" placeholder="Enter recipient BTC address">
        <small class="form-text text-muted">Legacy addresses only sorry.</small>
      </div>
      <div class="form-group">
        <label for="bitcoinAmount">Amount</label>
        <div class="row">
          <div class="col">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><img src="data:image/svg+xml;base64,PCEtLSBDcmVhdGVkIHdpdGggSW5rc2NhcGUgKGh0dHA6Ly93d3cuaW5rc2NhcGUub3JnLykgLS0+CjxzdmcgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNjQiIHdpZHRoPSI2NCIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwNjMwODc2LC0wLjAwMzAxOTg0KSI+CjxwYXRoIGZpbGw9IiNmNzkzMWEiIGQ9Im02My4wMzMsMzkuNzQ0Yy00LjI3NCwxNy4xNDMtMjEuNjM3LDI3LjU3Ni0zOC43ODIsMjMuMzAxLTE3LjEzOC00LjI3NC0yNy41NzEtMjEuNjM4LTIzLjI5NS0zOC43OCw0LjI3Mi0xNy4xNDUsMjEuNjM1LTI3LjU3OSwzOC43NzUtMjMuMzA1LDE3LjE0NCw0LjI3NCwyNy41NzYsMjEuNjQsMjMuMzAyLDM4Ljc4NHoiLz4KPHBhdGggZmlsbD0iI0ZGRiIgZD0ibTQ2LjEwMywyNy40NDRjMC42MzctNC4yNTgtMi42MDUtNi41NDctNy4wMzgtOC4wNzRsMS40MzgtNS43NjgtMy41MTEtMC44NzUtMS40LDUuNjE2Yy0wLjkyMy0wLjIzLTEuODcxLTAuNDQ3LTIuODEzLTAuNjYybDEuNDEtNS42NTMtMy41MDktMC44NzUtMS40MzksNS43NjZjLTAuNzY0LTAuMTc0LTEuNTE0LTAuMzQ2LTIuMjQyLTAuNTI3bDAuMDA0LTAuMDE4LTQuODQyLTEuMjA5LTAuOTM0LDMuNzVzMi42MDUsMC41OTcsMi41NSwwLjYzNGMxLjQyMiwwLjM1NSwxLjY3OSwxLjI5NiwxLjYzNiwyLjA0MmwtMS42MzgsNi41NzFjMC4wOTgsMC4wMjUsMC4yMjUsMC4wNjEsMC4zNjUsMC4xMTctMC4xMTctMC4wMjktMC4yNDItMC4wNjEtMC4zNzEtMC4wOTJsLTIuMjk2LDkuMjA1Yy0wLjE3NCwwLjQzMi0wLjYxNSwxLjA4LTEuNjA5LDAuODM0LDAuMDM1LDAuMDUxLTIuNTUyLTAuNjM3LTIuNTUyLTAuNjM3bC0xLjc0Myw0LjAxOSw0LjU2OSwxLjEzOWMwLjg1LDAuMjEzLDEuNjgzLDAuNDM2LDIuNTAzLDAuNjQ2bC0xLjQ1Myw1LjgzNCwzLjUwNywwLjg3NSwxLjQzOS01Ljc3MmMwLjk1OCwwLjI2LDEuODg4LDAuNSwyLjc5OCwwLjcyNmwtMS40MzQsNS43NDUsMy41MTEsMC44NzUsMS40NTMtNS44MjNjNS45ODcsMS4xMzMsMTAuNDg5LDAuNjc2LDEyLjM4NC00LjczOSwxLjUyNy00LjM2LTAuMDc2LTYuODc1LTMuMjI2LTguNTE1LDIuMjk0LTAuNTI5LDQuMDIyLTIuMDM4LDQuNDgzLTUuMTU1em0tOC4wMjIsMTEuMjQ5Yy0xLjA4NSw0LjM2LTguNDI2LDIuMDAzLTEwLjgwNiwxLjQxMmwxLjkyOC03LjcyOWMyLjM4LDAuNTk0LDEwLjAxMiwxLjc3LDguODc4LDYuMzE3em0xLjA4Ni0xMS4zMTJjLTAuOTksMy45NjYtNy4xLDEuOTUxLTkuMDgyLDEuNDU3bDEuNzQ4LTcuMDFjMS45ODIsMC40OTQsOC4zNjUsMS40MTYsNy4zMzQsNS41NTN6Ii8+CjwvZz4KPC9zdmc+Cg==" width="22" /></span>
              </div>
              <input v-model="bitcoinAmount" v-on:keypress="onBitcoinAmountChange" type="number" class="form-control" id="bitcoinAmount" placeholder="Enter amount" min="0" step="1">
              <div class="input-group-append">
                <span class="input-group-text">SATS</span>
              </div>
            </div>
            <small class="form-text text-muted">On the Bitcoin network.</small>
          </div>
          <div class="col col-md-auto">
            <button class="btn btn-secondary lock" v-on:click="onRateLockClick"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxnIGRhdGEtbmFtZT0iJmx0O0dyb3VwJmd0OyIgaWQ9Il9Hcm91cF8iPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEzLjM4LDEwLjc5aDBhMy41LDMuNSwwLDAsMSwwLDVMMTAuNTIsMTguNmEzLjUsMy41LDAsMCwxLTUsMGgwYTMuNSwzLjUsMCwwLDEsMC01bC44Ni0uODYiIGRhdGEtbmFtZT0iJmx0O1BhdGgmZ3Q7IiBpZD0iX1BhdGhfIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTEsMTMuMjFoMGEzLjUsMy41LDAsMCwxLDAtNUwxMy44MSw1LjRhMy41LDMuNSwwLDAsMSw1LDBoMGEzLjUsMy41LDAsMCwxLDAsNWwtLjg2Ljg2IiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgaWQ9Il9QYXRoXzIiLz48L2c+PC9zdmc+" /></button>
          </div>
          <div class="col">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">⚡</span>
              </div>
              <input v-model="lightningAmount" v-bind:disabled="rateLock" type="number" class="form-control" id="lightningAmount" placeholder="Enter amount" min="0" step="1">
              <div class="input-group-append">
                <span class="input-group-text">SATS</span>
              </div>
            </div>
            <small class="form-text text-muted">On the Lightning network.</small>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" v-on:click="create">Create</button>
    </div>
    <div v-if="order" class="order card">
      <h2>Order</h2>
      <p>Share this with the counter party to complete the swap</p>
      <div class="order-qr">
        <img :src="`data:${orderQr}`" />
      </div>
      <div class="order-text">
        {{ order }}
      </div>
    </div>
  </div>
</template>

<script>
import { createOrder } from '../utils/order'
import QRCode from 'qrcode'

export default {
  name: 'PlaceOrder',
  data: () => ({
    recipientAddress: '',
    bitcoinAmount: 5000,
    lightningAmount: 5000,
    rateLock: true,
    order: '',
    orderQr: ''
  }),
  methods: {
    create: async function () {
      this.order = await createOrder(this.bitcoinAmount, this.lightningAmount, this.recipientAddress)
      this.orderQr = await QRCode.toDataURL(this.order)
    },
    onBitcoinAmountChange: function (e) {
      if (this.rateLock) {
        this.lightningAmount = e.target.value
      }
    },
    onRateLockClick: function () {
      this.rateLock = !this.rateLock
      if (this.rateLock) {
        this.lightningAmount = this.bitcoinAmount
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .lock {
    img {
      width: 22px;
    }
  }

  .order {
    margin: 20px 0;
    padding: 20px;
    width: 500px;

    h2, p {
      text-align: center;
    }

    &-qr {
      text-align: center;
      img {
        width: 400px;
      }
    }
  }
</style>
