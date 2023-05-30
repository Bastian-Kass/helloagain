import { defineStore } from 'pinia'

export const useUserRewards = defineStore('user_rewards', {
    state: () => ({ 
        collected_rewards: new Set(), //Using a set to avoid duplicates, but this should be in the backend as a specific value for each reward-user
        userPoints: 200,
    }),
    getters: {
      getCollectedRewards: (state) => state.collected_rewards,
      getUserPoints: (state) => state.userPoints,
    },
    actions: {
      async sendCollect(item) {

        // checking for enough points to make transaction
        if(item.needed_points > this.userPoints)
          return { state: false, error: 'Not enough points' }

        try{

          // Async method to send collected rewards -pending- to backend wait for response

          // Timeout to simulate a request <Mock payload>
          await new Promise(resolve => setTimeout(resolve, 1000));

          // if response is ok, add to collected rewards


          // [Proof of concept] if response is ok, add spend the points [front end for now]
          if(item.needed_points > 0)
            this.userPoints -= item.needed_points

          //Save reward in history
          this.collected_rewards.add( { ...item,collection_date: new Date() } )

        
          return true
        } catch (error) {
          return error
        }
      },
    },
  })