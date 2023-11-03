<template>
    <div class="m-3">
    <router-link :to="{name:'EventDetails', params: {eventId: towerEvent.id}}">
        <!-- TODO FIX STYLING ON THIS  -->
    <div  class="div-height card-border rounded d-flex align-items-end card-bg" 
    :style="{backgroundImage: `url(${towerEvent.coverImg})`}">
        <div class=" blur-bg text-break rounded-top w-100">
            <!-- <img class="img-fluid" :src="towerEvent.coverImg" alt=""> -->
            <p class="mb-0 text-white ps-3 fs-4">{{ towerEvent.name }}</p>
            <p class="mb-0 text-light ps-3 ">{{ towerEvent.location }}</p>
            <p class="mb-0 text-light ps-3 ">{{ towerEvent.startDate.toLocaleDateString() }}</p>
            <div v-if="towerEvent.isCanceled " class="bg-danger rounded-bottom text-center">
            <p class="mb-0">Canceled</p>
            </div>
            <div v-else>
                <div v-if="towerEvent.capacity - towerEvent.ticketCount == 0" class="bg-danger rounded-bottom text-center">
            <p class="mb-0">At Capacity</p>
                </div>
                <div v-else>
                <p  class="text-end text-light pe-3 mb-0">
            <span class="blue-text fs-5">{{ towerEvent.capacity - towerEvent.ticketCount }}</span> 
            
            spots left</p>
                </div>

            </div>
        </div>

    </div>
</router-link>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
export default {
    props:{
        towerEvent: {type:TowerEvent, required: true}
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

.blur-bg{
    filter: blur();
    background: rgba(0, 0, 0, 0.344);
}

.card-border{
    border: 1dvh solid #474C61;
}

img{
    object-fit: cover;
   object-position: center;
}

.div-height{
    height: 20rem;
}

.blue-text{
   color:  #b6d9e5;
  
}
.card-bg{
    background-color: #474C61;
}
</style>