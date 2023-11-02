<template>
   <div class="container-fluid text-white">
        <section class="row d-flex justify-content-center">
            <div class="col-12 ">
                <EventCard/>
            </div>

            <div class="col-12 ">
                <div  v-if="tickets.length > 0" class="m-3">
                <p>see who is attending</p>
                <div class="card-bg rounded p-2 d-flex flex-wrap">
                <div v-for="ticket in tickets" :key="ticket.id" class=" p-1">
                <img class="rounded-circle little-pic" :src="ticket.profile.picture" :title="ticket.profile.name" alt="Profile Picture">
                </div>
                </div>
            </div>
        </div>
        <div class="col-8">
           <div>
            <p>What are people saying</p>
           </div>
           <div class="card-bg">
               <form @submit.prevent="postComment()" action="">
            <div class="px-5 py-3">
                <!-- TODO MAKE THIS FIGMA GREEN -->
                <p class="text-end text-success">Join the conversation</p>
                <textarea required v-model="editable.body" placeholder="Tell the people..." name="body" class="form-control" id="body" cols="15" rows="5"></textarea>
                <div class="text-end">
                    <button type="submit" class="btn btn-success mt-3 px-4 py-2 ">Post Comment</button>
                </div>
            </div>
        </form>
            <div v-if="comments.length > 0" class="pb-4 pt-0">
                <div  v-for="comment in comments" :key="comment.id" class="d-flex py-2 px-5">
                   <CommentCard :comment="comment" />
                </div>
            </div>
            <div v-else>
                <!-- TODO MAKE THIS LOOK BETTER -->
<p class="fs-1 text-white text-center">No Comments</p>
            </div>
           </div>
        </div>
            </section>
    </div>
    </template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/towerEventsService';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import EventCard from '../components/EventCard.vue';
import {ticketsService} from '../services/TicketsService'
import {commentsService} from '../services/CommentsService'
import CommentCard from '../components/CommentCard.vue';
export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
onMounted(()=>{
getPeopleGoingToEvent(),
getEventComments()
    })
    async function getEventComments(){
        await commentsService.getEventComments(route.params.eventId)
    }
async function getPeopleGoingToEvent(){
await ticketsService.getPeopleGoingToEvent(route.params.eventId)
}

        return {
            editable,
            tickets: computed(()=> AppState.tickets),
            comments: computed(()=> AppState.comments),
            async postComment(){
                const body = editable.value
                body.eventId = route.params.eventId
                await commentsService.postComment(body)
                editable.value = {}
            }
        };
    },
    components: { EventCard, CommentCard }
};
</script>


<style lang="scss" scoped>
textarea{
    resize: none;

}

.card-bg{
    background-color: #474C61;
}
.little-pic{
    height: 3rem;
    aspect-ratio: 1/1;
}
</style>