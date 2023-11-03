<template>
    
    <!-- TODO PUT FILTER -->
    <div class="m-3 card-bg shadow rounded bg-img p-3 p-md-5" :style="{backgroundImage: `url(${activeEvent.coverImg})`,}">
                <div>
                    <div v-if="account.id == activeEvent.creatorId && !activeEvent.isCanceled " class="text-end p-0 dropstart">
                        <!-- TODO FIX PADDING ON THIS -->
                        <i class="mdi mdi-dots-horizontal text-end" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">

                </i>
                <div class="dropdown-menu" role="button" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#editEventModal">Edit event</a>
                    <a @click="cancelEvent(activeEvent.id)" role="button" class="text-danger mb-0 dropdown-item">Cancel Event</a>
                </div>
                    </div>
                </div>
                    <section class="row">
                        <div class="col-12 col-md-4">
                            <div class="d-block d-md-none text-break">
                                    <h3 class="text-white">{{activeEvent.name}}</h3>
                                    <p>{{ activeEvent.location }}</p>
                                </div>
                            <img class="img-fluid shadow border" :src="activeEvent.coverImg" alt="">
                        </div>
                        <div class="col-12 col-md-8 d-flex flex-column justify-content-between">
                            <div>

                            
                            <div class="d-none d-md-flex justify-content-between">
                                <div class="">
                                    <h3 class="text-white text-break">{{activeEvent.name}}</h3>
                                    <p>{{ activeEvent.location }}</p>
                                </div>
                               
                                <div class="" v-if="activeEvent.startDate">
                                    <p class="text-end">
                                        {{ activeEvent.startDate.toLocaleDateString('en-US') }}
                                    </p>
                                <p class="text-end">
                                    starting at {{ activeEvent.startDate.toLocaleTimeString('en-US').substring(0,2)  }}
                                </p>
                                </div>
                        </div>

                        <div class="d-flex d-md-none justify-content-between" v-if="activeEvent.startDate">
                                    <div>
                                        <p class="">
                                            {{ activeEvent.startDate.toLocaleDateString('en-US') }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="">
                                            starting at {{ activeEvent.startDate.toLocaleTimeString('en-US').substring(0,2)  }}
                                        </p>
                                    </div>
                                </div>

                        <div>
                            <p class="text-light text-break">{{ activeEvent.description }}</p>
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
<div>
    <button @click="grabTicket(activeEvent.id)" :disabled="!account.id||activeEvent.isCanceled || activeEvent.capacity - activeEvent.ticketCount == 0" class="btn btn-warning ms-2 fs-5 px-3">Grab a Ticket <i class="mdi mdi-account-plus"></i></button>
</div>
                        </div>
                    </div>
                        </div>
                    </section>
                    <!-- WORK ON THIS LAST  AND ALSO MAKE IT NOT MAKE THE CARD BIGGER  -->
                        <p v-if="activeEvent.isAttending" class="text-end text-success mb-0">You are attending this event!</p>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/towerEventsService';
import { useRoute } from 'vue-router';
// import { logger } from '../utils/Logger';
import { ticketsService } from '../services/TicketsService';
export default {
    setup(){
        const route = useRoute()
        watchEffect(()=> {
            route.params.eventId
getActiveEvent();
        });
        watchEffect(()=>{
        AppState.account
        checkAttendingStatus()
    })
    function checkAttendingStatus(){
        towerEventsService.checkAttendingStatus()
    }

        async function getActiveEvent(){
            try {
await towerEventsService.getActiveEvent(route.params.eventId)                
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        activeEvent: computed(() => AppState.activeEvent),
        account: computed(()=> AppState.account),
        async cancelEvent(eventId){
            try {
                const yes = await Pop.confirm('Are you sure you would like to cancel this event?')
                if(!yes){
                    return
                }
    await towerEventsService.cancelEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        },
        async grabTicket(eventId){
await ticketsService.grabTicket(eventId)
Pop.success('Ticket Made!')
        }
    }
    }
};
</script>


<style lang="scss" scoped>
.bg-img{
    object-fit: cover;
    object-position: center;
    background-size: cover;
}
.card-bg{
    
    background-color: #474C61;
}

h3
{
    text-shadow: 1px 1px 3px black;
}

p{
    text-shadow: 1px 1px 3px black;
}


</style>