<template>
    <v-card
        class="reward_card mx-auto"
        width="400"
        height="400"
        min-height="200"
        :color="isReedemed? 'blue-grey-lighten-4' : 'white'"
        :flat="isReedemed"
        >

        <v-carousel 
                height="200" 
                hide-delimiter-background 
                :hide-delimiters="gallery.length<2"
                continuous 
                cycle 
                show-arrows="hover"
                interval="6000"
                delimiter-icon="mdi-square"

                >
            
            <v-carousel-item
                v-for="(item, i) in gallery"
                :key="i"
                >
                <v-img
                    class="align-end bg-white"
                    height="200"
                    :src="item"
                    contain
                    />
            </v-carousel-item>

            <template v-slot:prev="{ props }">
                <v-btn icon="mdi-chevron-left" class="bg-grey-darken-2" size="x-small" v-show="gallery.length>1" @click="props.onClick"/>
            </template>

            <template v-slot:next="{ props }">
                <v-btn icon="mdi-chevron-right" class="bg-grey-darken-2" size="x-small" v-show="gallery.length>1" @click="props.onClick"/>
            </template>

        </v-carousel>

        <v-card-title class="text-h6"  v-html="item.name"/>

        <v-card-text v-if="!!item.activation_description">{{item.activation_description}}</v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn :color="enoughPoints? 'primary': 'red-darken-2'" variant="tonal" class="pl-0 pr-4" height="40px" @click="collectReward" :disabled="isReedemed">
                <v-avatar  :color="enoughPoints? 'primary': 'deep-orange-darken-3'"  class="mr-2 ml-n4 "><span class="font-weight-bold">{{ item.needed_points }}</span></v-avatar>
                <span class="font-weight-medium">Reedem</span>
                
            </v-btn>
        </v-card-actions>
        <v-card-subtitle class="pt-4 reward_id">{{ item.id }}</v-card-subtitle>
    </v-card>

        
</template>

<script>

import default_icon from '../assets/reward_default_icon.png'
import { toast } from 'vue3-toastify';


export default {
    name: 'RewardsCard',
    props: {
        item: {
            type: Object,
            required: true
        },
        collected_rewards: {
            type: Set,
            required: true,
        },
        userPoints: {
            type: Number,
            required: true,
        }
    },
    data () {
        return {
            default_icon: default_icon
        }
    },
    methods: {
        collectReward () {
            if(this.enoughPoints)
                this.$emit('collect-reward', this.item)
            else 
                this.$emit('notify', 'Not enough points!', {type: toast.TYPE.ERROR})
        }


    },
    computed:{
        isReedemed(){
            return Array.from(this.collected_rewards).find( reward => reward.id === this.item.id)? true : false
        },
        gallery(){
            let gallery = this.item.pictures.map( picture => picture.image)
            if(this.item.image !== '') gallery.unshift(this.item.image)
            if(gallery.length === 0) gallery.unshift(this.default_icon)
            return gallery
        },
        enoughPoints(){
            return this.item.needed_points <= this.userPoints
        },
    }
}

</script>

<style lang="scss">

.reward_card{
    margin: 10px 5px;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;

}

.reward_id{
    position:absolute;
    bottom: 0;
    right: 0;
    font-size: 9px !important;
}


</style>