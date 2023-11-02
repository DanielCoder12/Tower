<template>
    
    <!-- TODO ADD BACKGROUND IMAGE WITH A LOT OF BLUR LIKE ON FIGMA AND MAKE THE BLUR BLUE -->
    <div class="m-3 card-bg rounded p-3 p-md-5">
                <div>
            <!-- TODO MAKE THIS ONLY SHOW ON YOUR ACCOUNT -->
                    <div class="text-end p-0">
                        <!-- TODO FIX PADDING ON THIS -->
                        <button class="btn btn-outline-dark">
                            <i class="mdi mdi-dots-horizontal"></i>
                        </button>
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
<p><span class="fs-5 fw-bold">{{ activeEvent.capacity - activeEvent.ticketCount }}</span> spots left</p>
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
    return { activeEvent: computed(() => AppState.activeEvent) }
    }
};
</script>


<style lang="scss" scoped>

.card-bg{
    background-color: #474C61;
}


</style>