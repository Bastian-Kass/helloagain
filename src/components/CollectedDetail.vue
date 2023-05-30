<template>
    
    <div class="d-flex">
        <div class="collected-gallery">
            <v-carousel 
                    width="150" 
                    height="150"
                    hide-delimiter-background
                    :show-arrows="false"
                    :hide-delimiters="gallery.length<2"
                    delimiter-icon="mdi-square"
                    contain
                    
                    >
                
                <v-carousel-item
                    v-for="(image, i) in gallery"
                    :key="i"
                    >
                    <v-img
                        class="align-end bg-white"
                        :src="image"
                        contain
                        />
                </v-carousel-item>

            </v-carousel>

        </div>
        <v-container fluid>



            <v-row>
                <v-spacer/>
                <span>{{ item.collection_date }}</span>
            </v-row>
            <v-row><v-divider></v-divider></v-row>

            <v-row>
                <v-table density="compact" class="w-100">
                    <tbody>
                        <tr>
                            <td>Points</td>
                            <td>{{ item.needed_points }}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{{ item.activation_description }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-row>
        </v-container>
    </div>

</template>

<script>

import default_icon from '../assets/reward_default_icon.png'

export default {
    name: 'CollectedDetail',
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    data () {
        return {
            default_icon: default_icon
        }
    },
    computed:{
        gallery(){
            let gallery = this.item.pictures.map( picture => picture.image)
            if(this.item.image !== '') gallery.unshift(this.item.image)
            if(gallery.length === 0) gallery.unshift(this.default_icon)
            return gallery
        }
    }
}


</script>

<style lang="scss">
.collected-gallery{
    width: 150px;
    height: 150px;
    max-width:150px;
    max-height:150px;
}

</style>