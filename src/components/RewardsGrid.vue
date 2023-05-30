<template>

    <div id="rewards_grid" class="d-flex flex-wrap">
        <RewardsCard    
            v-for="item in rewards" 
            :key="item.id"          
            :item="item"
            :collected_rewards="collected_rewards"
            :userPoints="userPoints"
            @notify="notify"
            @collect-reward="collectReward(item)"
            />

            <v-card v-if="nextExists" v-intersect="onIntersect" height="150" width="150">
                <v-card-title>
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </v-card-title>
            </v-card>
    </div>


    

    <v-card 
        class="user_points d-flex justify-center align-center vtext--white bg-black"
        elevation="6"
        >
            <div class="" height="20">
                <span style="text-align: center;">{{ userPoints }}</span>
            </div>
    </v-card>
</template>

<script>
import RewardsCard from './RewardCard.vue'
import { useRewardsStore } from '../store/rewardsStore'
import { useUserRewards } from '../store/userRewardsStore'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = (msg, options ) => { toast( msg, { position: toast.POSITION.TOP_RIGHT, type: toast.TYPE.INFO, ...options }); };

export default {
    name: 'RewardsGrid',
    components: {
        RewardsCard
    },
    setup() {
        const rewardsStore = useRewardsStore()
        const userRewards = useUserRewards()

        return { rewardsStore, userRewards }
    },
    data () {
        return {

        }
    },
    created () {
        this.rewardsStore.fetchRewards()
    },
    mounted () {
        
    },
    computed: {
        collected_rewards (){
            return this.userRewards.collected_rewards
        },
        userPoints () {
            return this.userRewards.getUserPoints
        },
        rewards () {
            return this.rewardsStore.getRewards
        },
        nextExists () {
            return this.rewardsStore.getNextExists
        },
    },
    methods: {
        async collectReward (reward) {
            let res = await this.userRewards.sendCollect(reward)
            if(res?.state === false)
                notify(res?.message, {type: toast.TYPE.ERROR})
            else
                notify('Redeemed successfully! \n <Mock Payload>', {type: toast.TYPE.SUCCESS}); 
        },
        async load ({ done }) {
            // Perform API call
            await this.rewardsStore.fetchRewards()
            done('ok')
        },

        onIntersect(){
            this.rewardsStore.fetchNext()
            },
        async loadNext () {
            // Perform API call
            await this.rewardsStore.fetchNext()
        },
        notify: notify
    }
}

</script>

<style scoped lang="scss">
.v-virtual-scroll__container {
    background-color: red !important;
    display: flex !important;
    flex-direction: row;
    flex-wrap: wrap;


    width: 100%;
    max-height: 100%;
}

.user_points{
    position: fixed;
    bottom: 40px;
    right: 2rem;

    border-radius: 50%;
    width: 80px;
    height: 80px;
}

</style>
