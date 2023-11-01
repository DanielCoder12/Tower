<template>
   <div class="container-fluid text-white">
        <section class="row">
            <div class="col-12 d-flex justify-content-center">
                <EventCard/>
            </div>

            <div class="col-12 ">
                <div class="m-3">
                <p>see who is attending</p>
                <div class="bg-secondary rounded p-2 d-flex flex-wrap">
                <div v-for="ticket in tickets" :key="ticket.id" class=" p-1">
                <img class="rounded-circle little-pic" :src="ticket.profile.picture" alt="">
                </div>
                </div>
            </div>
        </div>
        <div class="col-8">
            <section class="row">
                <div class="col-12">
                    <p>Join the conversation</p>
                </div>
                <div class="col-12">
                    <div>
                        textarea
                    </div>
                    <div>
                        <button class="btn btn-success">Post Comment</button>
                    </div>
                    <div class="col-12">
                        for each over this with comments
                    </div>
                </div>
            </section>
        </div>
            </section>
    </div>
    </template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/towerEventsService';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import EventCard from '../components/EventCard.vue';
import {ticketsService} from '../services/TicketsService'
export default {
    setup() {
const route = useRoute()
onMounted(()=>
getPeopleGoingToEvent()
)
async function getPeopleGoingToEvent(){
    logger.log('route', route.params)
await ticketsService.getPeopleGoingToEvent(route.params.eventId)
}

        return {
            tickets: computed(()=> AppState.tickets)
            
        };
    },
    components: { EventCard }
};
</script>


<style lang="scss" scoped>
.little-pic{
    height: 3rem;
    aspect-ratio: 1/1;
}
</style>