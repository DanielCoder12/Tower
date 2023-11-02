<template>
   <div class="modal fade" id="editEventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content card-bg text-white">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="editEvent()">
      <div class="modal-body container-fluid">
          <section class="row d-flex justify-content-center">
                  <div class="col-6">
                      <div class="mb-3">
                          <label for="name" class="form-label">Event Name</label>
                          <input v-model="editable.name" maxlength="50" required type="text" class="form-control" id="name">
                        </div>
                        <div class="mb-3">
                            <label for="coverImg" class="form-label">Event Cover Image</label>
                            <input v-model="editable.coverImg" maxlength="500" required type="url" class="form-control" id="coverImg">
                        </div>
                        <div class="mb-3">
                            <label for="location" class="form-label">Event Location</label>
                            <input v-model="editable.location"  maxlength="50" required type="text" class="form-control" id="location">
                        </div>
                    </div>
                    <div class="col-6">
                        
                        <div class="mb-3">
                            <label for="capacity" class="form-label">Event Capacity</label>
                            <input v-model="editable.capacity"  required min="1" max="1000000" type="number" class="form-control" id="capacity">
                        </div>
                        
                        <div class="mb-3">
                            <label for="startDate" class="form-label">Event Starting Date</label>
                            <input v-model="editable.startDate"  type="date" class="form-control" id="startDate">
                            </div>
                            <div class="mb-3 ">
                                <!-- <input type="select" class="form-check-input" id="type"> -->
                                <label for="type" class="form-label">Category</label>
                                <select v-model="editable.type" id="type" class="form-control">
                                    <option v-for="category in categories" :key="category"> {{ category }}</option>
                                    
                                </select>
                            </div>
                        </div>

            <!-- name, description, coverImg, location, capacity, startDate, type -->
            <div class="col-12">
                <div class="mb-3">
                    <label for="description" class="form-label">Event Description</label>
                    <textarea v-model="editable.description"  required maxlength="1000" class="form-control" id="description" rows="3"></textarea>
                </div>
            </div>
        </section>
        
    </div>
<div class="text-end mb-3 me-3">
    <button type="submit" class="btn btn-primary">Save changes</button>

</div>
    
</form>
    </div>
  </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { towerEventsService } from '../services/towerEventsService';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
export default {
    setup(){
        const categories = ['concert','convention', 'sport', 'digital', 'expo', 'exhibit']
        const editable = ref({})
const route = useRoute()
        watchEffect(()=> {
            if(AppState.activeEvent){
                editable.value = {...AppState.activeEvent}
            }
        })
    return {
        categories,
editable,
async editEvent(){
    try {
        const eventId = route.params.eventId
        const body = editable.value
        await towerEventsService.editEvent(body, eventId)
        Modal.getOrCreateInstance('#editEventModal').hide()  
        Pop.success('Event Edited!')      
    } catch (error) {
        Pop.error(error)
    }

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