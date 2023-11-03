<template>
    <!-- TODO ADD THE HALF CIRCLE -->
    <div class="d-flex mb-5 mx-3 ">

  
<div class="">
    <router-link :to="{name:'EventDetails', params: {eventId: ticket.eventId}}">
        <img class="img-fluid rounded-start" :src="ticket.event.coverImg" alt="">
    </router-link>
</div>
<div class="card-bg w-75 rounded-end d-flex flex-column justify-content-between p-3  ">
  <div class="d-flex">
    <div class="d-flex text-break w-50 ">
      <router-link  :to="{name:'EventDetails', params: {eventId: ticket.eventId}}">
          <p class="text-white fw-bold">{{ ticket.event.name }}</p>
          <p class="mb-0 blue-text">{{ ticket.event.location }}</p>
          <!-- TODO FIX DATE -->
          <p v-if="ticket.event.startDate" class="blue-text">{{ new Date(ticket.event.startDate).toLocaleDateString('en-US') }}</p>
      </router-link> 
    </div>
      <div class=" cool-circle d-none d-md-block">
  
  </div>
  </div>
  
  <div class="d-flex justify-content-center">
    <button @click="unAttendEvent(ticket.id)" class="btn btn-danger px-5 text-dark">Unattend</button>
  </div>
</div>
</div>
</template>


<script>
// import { AppState } from '../AppState';
import { reactive, onMounted } from 'vue';
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
        try {
          const yes = await Pop.confirm('are you sure you would like to delete your ticket for this event?')
          if(!yes){
              return
          }
          await ticketsService.unAttendEvent(ticketId)
          Pop.success('ticket deleted!')
        } catch (error) {
          Pop.error(error)
        }
       }
     }
    }
};
</script>


<style lang="scss" scoped>


.card-width{
  width: 100%;
}
.cool-circle{
  height: 11rem;
  width: 11rem;
  border-radius: 50%;
  position: relative;
  top: 14%;
  left:35%;
  background-color: #2a2d3a;
}
.card-bg{
    background-color: #474C61;
}

img {
  height: 16rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}

.blue-text{
color: #ccf3fd;
}

</style>