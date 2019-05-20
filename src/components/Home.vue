<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">U Boat</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-bind:class="{ active: selectedTab === 'place' }">
            <a class="nav-link" href="#" v-on:click="tab('place')">Place Order</a>
          </li>
          <li class="nav-item" v-bind:class="{ active: selectedTab === 'fill' }">
            <a class="nav-link" href="#" v-on:click="tab('fill')">Fill Order</a>
          </li>
        </ul>
        <div class="my-2 my-lg-0">
          <button class="btn" v-on:click="tab('settings')"><img style="fill: white;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iI2ZmZmZmZiIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NjQuMDAwMDAwLCAtMzgwLjAwMDAwMCkiPjxnIGlkPSJzZXR0aW5ncyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDY0LjAwMDAwMCwgMzgwLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy40LDExIEMxNy40LDEwLjcgMTcuNSwxMC40IDE3LjUsMTAgQzE3LjUsOS42IDE3LjUsOS4zIDE3LjQsOSBMMTkuNSw3LjMgQzE5LjcsNy4xIDE5LjcsNi45IDE5LjYsNi43IEwxNy42LDMuMiBDMTcuNSwzLjEgMTcuMywzIDE3LDMuMSBMMTQuNSw0LjEgQzE0LDMuNyAxMy40LDMuNCAxMi44LDMuMSBMMTIuNCwwLjUgQzEyLjUsMC4yIDEyLjIsMCAxMiwwIEw4LDAgQzcuOCwwIDcuNSwwLjIgNy41LDAuNCBMNy4xLDMuMSBDNi41LDMuMyA2LDMuNyA1LjQsNC4xIEwzLDMuMSBDMi43LDMgMi41LDMuMSAyLjMsMy4zIEwwLjMsNi44IEMwLjIsNi45IDAuMyw3LjIgMC41LDcuNCBMMi42LDkgQzIuNiw5LjMgMi41LDkuNiAyLjUsMTAgQzIuNSwxMC40IDIuNSwxMC43IDIuNiwxMSBMMC41LDEyLjcgQzAuMywxMi45IDAuMywxMy4xIDAuNCwxMy4zIEwyLjQsMTYuOCBDMi41LDE2LjkgMi43LDE3IDMsMTYuOSBMNS41LDE1LjkgQzYsMTYuMyA2LjYsMTYuNiA3LjIsMTYuOSBMNy42LDE5LjUgQzcuNiwxOS43IDcuOCwxOS45IDguMSwxOS45IEwxMi4xLDE5LjkgQzEyLjMsMTkuOSAxMi42LDE5LjcgMTIuNiwxOS41IEwxMywxNi45IEMxMy42LDE2LjYgMTQuMiwxNi4zIDE0LjcsMTUuOSBMMTcuMiwxNi45IEMxNy40LDE3IDE3LjcsMTYuOSAxNy44LDE2LjcgTDE5LjgsMTMuMiBDMTkuOSwxMyAxOS45LDEyLjcgMTkuNywxMi42IEwxNy40LDExIEwxNy40LDExIFogTTEwLDEzLjUgQzguMSwxMy41IDYuNSwxMS45IDYuNSwxMCBDNi41LDguMSA4LjEsNi41IDEwLDYuNSBDMTEuOSw2LjUgMTMuNSw4LjEgMTMuNSwxMCBDMTMuNSwxMS45IDExLjksMTMuNSAxMCwxMy41IEwxMCwxMy41IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==" /></button>
        </div>
      </div>
    </nav>
    <div class="tab-content">
      <PlaceOrder v-if="selectedTab === 'place'"></PlaceOrder>
      <FillOrder v-if="selectedTab === 'fill'"></FillOrder>
      <Settings v-if="selectedTab === 'settings'"></Settings>
    </div>
  </div>
</template>

<script>
import PlaceOrder from './PlaceOrder.vue'
import FillOrder from './FillOrder.vue'
import Settings from './Settings.vue'

export default {
  name: 'Home',
  data: () => ({
    selectedTab: 'place'
  }),
  methods: {
    tab: function (name) {
      this.selectedTab = name
    }
  },
  components: {
    PlaceOrder,
    FillOrder,
    Settings
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    width: 60%;
    margin: 0 auto;
  }

  h3{
  }

  .tab-content {
    padding: 20px 0;
  }
</style>
