<template>
     <div>
                    <img class="img-big d-none d-md-block rounded-circle me-3" :src="comment.creator.picture" alt="Profile Picture">
                </div>
                <div class="bg-light text-break w-100 rounded py-md-1 px-md-3 p-2">
                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="d-flex align-items-center">
                                <img class="d-block me-1 img-small d-md-none img-fluid rounded-circle" :src="comment.creator.picture" alt="">
                                <p class="mb-0 fw-bold">{{ comment.creator.name }}</p>
                            </div>
                            <span v-if="comment.isAttending" class="ps-2 text-primary"> Attending This Event</span>
                        </div>
                        <div v-if="account.id == comment.creatorId">
                            <i @click="destroyComment(comment.id)" role="button" class="mdi mdi-delete text-danger"></i>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap">
                        <p class=" ">{{ comment.body }}</p>
                    </div>
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
        try {
            const yes = await Pop.confirm('Are you sure you would like to delete this comment?')
            if(!yes){
                return
            }
            await commentsService.destroyComment(commentId)
        } catch (error) {
            Pop.error(error)
        }
      }
     }
    }
};
</script>


<style lang="scss" scoped>
.img-big{
    height: 5rem;
    aspect-ratio: 1/1;
}

.img-small{
    height: 1rem;
    aspect-ratio: 1/1;
}
</style>