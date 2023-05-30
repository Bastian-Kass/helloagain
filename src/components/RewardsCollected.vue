<template>
    <v-expansion-panels color="primary">
        <v-expansion-panel
            v-for="item in collected_rewards" :key="item.id"
            title="Title"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
        >

            <template v-slot:title>
                <div> <span>{{ item.name }}</span> <span class="reward-id-style ml-4">{{ item.id }}</span></div>
            </template>

            <template v-slot:text>
                <CollectedDetail :item="item"/>
            </template>

        </v-expansion-panel>
    </v-expansion-panels>

    <v-sheet v-show="!collected_rewards">
        {{ 'No rewards collected yet' }}
    </v-sheet>
</template>

<script>
import { useUserRewards } from '../store/userRewardsStore'
import CollectedDetail from '../components/CollectedDetail'

export default {
    name: 'RewardsCollected',
    components: {
        CollectedDetail
    },
    data () {
        return {
            
        }
    },
    setup() {
        const userRewards = useUserRewards()


        return { userRewards }
    },
    computed:{
        collected_rewards (){
            return this.userRewards.collected_rewards
        },

    }

}
</script>

<style lang="scss"> 
.reward-id-style{
    font-size: 10px !important;
}
</style>

