<template>
  <v-toolbar title="User Rewards">
    <v-tabs v-model="screen">
      <v-tab value="rewards">
        <v-icon icon="mdi-gift" class="mr-2"/>
        Rewards
      </v-tab>
      <v-tab value="history">
        <v-icon icon="mdi-history" class="mr-2"/>
        History
      </v-tab>
    </v-tabs>
  </v-toolbar>
  <v-container id="rewards_page">
    <v-window v-model="screen">

        <v-window-item value="rewards">
          <RewardsGrid />
        </v-window-item>

        <v-window-item value="history">
          <RewardsCollected />
        </v-window-item>

      </v-window>
  </v-container>
</template>

<script>
import RewardsGrid from './components/RewardsGrid.vue'
import RewardsCollected from './components/RewardsCollected.vue'

export default {
  name: 'App',
  data () {
    return {
      screen: 'rewards'
    }
  },
  components: {
    RewardsGrid, RewardsCollected
  }
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #333;
  background-color: rgb(225, 225, 225);

  height: 100dvh;
  width: 100dvw;
  max-width: 100dvw;
  max-height: 100dvh;
  overflow: auto;
}

#rewards_page {

}
</style>
