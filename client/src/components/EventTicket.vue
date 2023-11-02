<template>
    <!-- TODO ADD THE HALF CIRCLE -->
    <div class="d-flex mb-5 mx-3 ">

  
<div class="">
    <router-link :to="{name:'EventDetails', params: {eventId: ticket.eventId}}">
        <img class="img-fluid rounded-start" :src="ticket.event.coverImg" alt="">
    </router-link>
</div>
<div class="card-bg rounded-end d-flex flex-column justify-content-between p-3 w-75 ">
  <div class="">
    <router-link :to="{name:'EventDetails', params: {eventId: ticket.eventId}}">
        <p class="text-white fw-bold">{{ ticket.event.name }}</p>
        <p class="mb-0 blue-text">{{ ticket.event.location }}</p>
        <!-- TODO FIX DATE -->
        <p class="blue-text">{{ ticket.event.startDate }}</p>
    </router-link>
  </div>
  <div class="d-flex justify-content-center">
    <button @click="unAttendEvent(ticket.id)" class="btn btn-danger px-5 text-dark">Unattend</button>
  </div>
</div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ticket } from '../models/Ticket';
import Pop from '../utils/Pop';
import { ticketsService } from '../services/TicketsService';
export default {
    props: {
        ticket: {type: Ticket, required: true}
    },
    setup(){
    return { 

       async unAttendEvent(ticketId){
        const yes = await Pop.confirm('are you sure you would like to delete your ticket for this event?')
        if(!yes){
            return
        }
        await ticketsService.unAttendEvent(ticketId)
        Pop.success('ticket deleted!')
       }
     }
    }
};
</script>


<style lang="scss" scoped>


.card-bg{
    background-color: #474C61;
}

img {
  height: 20rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.blue-text{
color: #ccf3fd;
}

</style>