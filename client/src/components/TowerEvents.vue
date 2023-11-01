<template>
    <div class="m-3">
    <router-link :to="{name:'EventDetails', params: {eventId: towerEvent.id}}">
    <div  class="div-height border border-dark  d-flex align-items-end card-bg">
        
        <div class="p-2 blur-bg rounded-top w-100">
            <!-- <img class="img-fluid" :src="towerEvent.coverImg" alt=""> -->
            <p class="mb-0 text-white fs-4">{{ towerEvent.name }}</p>
<p class="mb-0 text-light ">{{ towerEvent.location }}</p>
<p class="mb-0 text-light ">{{ towerEvent.startDate.toLocaleDateString() }}</p>
<div v-if="towerEvent.isCanceled " class="bg-danger rounded-bottom text-center">
<p>Canceled</p>
</div>
<div v-else>
    <div v-if="towerEvent.capacity - towerEvent.ticketCount == 0" class="bg-danger rounded-bottom text-center">
<p>At Capacity</p>
    </div>
    <div v-else>
        <p  class="text-end text-light ">
            <span class="blue-text">{{ towerEvent.capacity - towerEvent.ticketCount }}</span> 
            
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