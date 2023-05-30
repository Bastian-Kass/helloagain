import { defineStore } from 'pinia'


export const useRewardsStore = defineStore('rewards', {
    state: () => ({ 
      rewards: [],
      offset: 0,
      limit: 10,
      next: null,
      previous: null,
    }),
    getters: {
      getRewards: (state) => state.rewards,
      getNextExists: (state) => (state.next !== null )? true : false,
      getPreviousExists: (state) => (state.previous !== null)? true : false,
    },
    actions: {
      async fetchRewards() {
        let query = 'https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=' + this.limit+ '&offset=' + this.offset



        const response = await fetch(this.next || query)
        let json = await response.json()
        console.log(json);
        this.next = (json.next !== null)? json.next : null
        this.previous = json.previous
        this.rewards = this.rewards.concat(json.results);
      },
      async fetchNext() { 
        if(this.next!==null){
          this.offset += this.limit
          await this.fetchRewards()
        }
      },
      async fetchPrevious() {   
        // if(this.previous){
        //   this.offset -= this.limit
        //   await this.fetchRewards()
        // }
      }
    },
  })