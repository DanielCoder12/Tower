<template>
     <div>
                    <img class="rounded-circle me-3" :src="comment.creator.picture" alt="Profile Picture">
                </div>
                <div class="bg-light w-100 rounded py-1 px-3">
                    <div class="d-flex">
                        <p class="mb-0 fw-bold">{{ comment.creator.name }}</p>
<span v-if="comment.isAttending" class="ps-2 text-primary"> Attending This Event</span>
                    </div>
                    <p>{{ comment.body }}</p>
                </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
export default {
    props: {
        comment: {type: Comment, required: true}
    },
    setup(){
        
    return { 
      
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