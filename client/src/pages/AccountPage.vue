<template>
  <!-- MAKE IT SO CLIKCING ON A TICKET WILL RE ROUTE YOU TO THE EVENT PAGE -->
  <div class="container-fluid">
    <!-- MY EVENTS -->
    <section class="row">
      <div class="col-12">
<h2 class="text-success m-3">My Events</h2>
</div>
<div v-for="towerEvent in myEvents " :key="towerEvent.id" class="col-12 col-md-3">
    <TowerEvents :towerEvent="towerEvent" />
</div>
      <div class="col-12">
        <div>
          <!-- <TowerEvents /> -->
        </div>
      </div>

    </section>
    <!-- UPCOMING EVENTS -->
    <section class="row d-flex justify-content-center">
      <div class="col-12">
<h2 class="text-success m-3 py-5">Upcoming events</h2>
      </div>
<div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-7">
  <EventTicket :ticket="ticket"/>
</div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import TowerEvents from '../components/TowerEvents.vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import EventTicket from '../components/EventTicket.vue';
import {towerEventsService} from '../services/towerEventsService'

export default {
    setup() {
        onMounted(() => {
            // getMyEvents()
            
        });
        async function getMyEvents() {
            try {
               await towerEventsService.getMyEvents()
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.Mytickets),
            myEvents: computed(()=> AppState.mytowerEvents)
            
        };
    },
    components: { EventTicket, TowerEvents }
}
</script>

<style scoped>




</style>
