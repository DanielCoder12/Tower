<template>
     <div>
                    <img class="rounded-circle me-3" :src="comment.creator.picture" alt="Profile Picture">
                </div>
                <div class="bg-light w-100 rounded py-1 px-3">
                    <div class="d-flex justify-content-between">
                        <div>
                            <p class="mb-0 fw-bold">{{ comment.creator.name }}</p>
                            <span v-if="comment.isAttending" class="ps-2 text-primary"> Attending This Event</span>
                        </div>
                        <div v-if="account.id == comment.creatorId">
                            <i @click="destroyComment(comment.id)" role="button" class="mdi mdi-delete text-danger"></i>
                        </div>
                    </div>
                    <p>{{ comment.body }}</p>
                </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';
export default {
    props: {
        comment: {type: Comment, required: true}
    },
    setup(){
        
    return { 
      account: computed(()=> AppState.account),
      async destroyComment(commentId){
const yes = await Pop.confirm('Are you sure you would like to delete this comment?')
if(!yes){
    return
}
await commentsService.destroyComment(commentId)
      }
     }
    }
};
</script>


<style lang="scss" scoped>
img{
    height: 5rem;
    aspect-ratio: 1/1;
}
</style>