<template>
    
    <!-- TODO ADD BACKGROUND IMAGE WITH A LOT OF BLUR LIKE ON FIGMA AND MAKE THE BLUR BLUE -->
    <div class="m-3 card-bg rounded p-3 p-md-5">
                <div>
            <!-- TODO MAKE THIS ONLY SHOW ON YOUR ACCOUNT -->
                    <div v-if="account.id == activeEvent.creatorId && !activeEvent.isCanceled " class="text-end p-0 dropstart">
                        <!-- TODO FIX PADDING ON THIS -->
                        <i class="mdi mdi-dots-horizontal text-end" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">

                </i>
                <div class="dropdown-menu" role="button" aria-labelledby="dropdownMenuButton">
                    <!-- TODO MAKE EDIT WORK -->
                    <a class="dropdown-item">Edit event</a>
                    <!-- TODO FIX DELETE -->
                    <p @click="cancelEvent(activeEvent.id)" role="button" class="text-danger dropdown-item">Cancel Event</p>
                </div>
                    </div>
                </div>
                    <section class="row">
                        <div class="col-12 col-md-4">
                            <img class="img-fluid shadow" :src="activeEvent.coverImg" alt="">
                        </div>
                        <div class="col-12 col-md-8 d-flex flex-column justify-content-between">
                            <div>

                            
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h3 class="text-white">{{activeEvent.name}}</h3>
                                    <p>{{ activeEvent.location }}</p>
                                </div>
                                <div>
                                    <p class="text-end">
                                        <!-- TODO TIME BROKE??????????????? -->
                                        <!-- {{ activeEvent.startDate.toLocaleDateString() }} -->
                                    </p>
                                <p class="text-end">
                                    <!-- TODO FIX TIME  -->
                                    <!-- starting at {{ activeEvent.startDate.toLocaleTimeString() }} -->
                                </p>
                                </div>
                        </div>
                        <div>
                            <p class="text-light">{{ activeEvent.description }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between">
                            <div v-if="!activeEvent.isCanceled">
                                <p v-if="activeEvent.capacity - activeEvent.ticketCount > 0"><span class="fs-5 text-primary fw-bold">{{ activeEvent.capacity - activeEvent.ticketCount }}</span> spots left</p>
                                <p v-else><span class="fs-5 fw-bold text-danger">0</span> spots left</p>
                            </div>
                            <div class="d-flex align-items-end" v-else>
                        <p class="bg-danger mb-0 fs-5 rounded px-5 py-1 ">Canceled</p>
                            </div>

                                <button class="btn btn-warning fs-5 px-3">Grab a Ticket <i class="mdi mdi-account-plus"></i></button>
                        </div>
                    </div>
                        </div>
                    </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/towerEventsService';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
export default {
    setup(){
        const route = useRoute()
        onMounted(()=> {
getActiveEvent();
        });
        async function getActiveEvent(){
            try {
await towerEventsService.getActiveEvent(route.params.eventId)                
            } catch (error) {
                Pop.error
            }
        }
    return { 
        activeEvent: computed(() => AppState.activeEvent),
        account: computed(()=> AppState.account),
        async cancelEvent(eventId){
            const yes = await Pop.confirm('Are you sure you would like to cancel this event?')
            if(!yes){
                return
            }
await towerEventsService.cancelEvent(eventId)
        }
    }
    }
};
</script>


<style lang="scss" scoped>

.card-bg{
    background-color: #474C61;
}


</style>