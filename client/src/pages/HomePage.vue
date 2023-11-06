<template>
 <div class="container-fluid">
  <section class="row">
    <div class="col-12">
      <!-- TODO MAKE THIS NOT BLURRY -->
      <div class="blue-border blue-text p-5 m-3" style="background-image: url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
        <p class="fs-3">
          Get ahead of the scalpers.
        </p>
        <p class="fs-3">
Reserve your seat now with
        </p>
        <p class="fs-3">
real events for real people.
        </p>
      </div>
    </div>
  </section>
  <!-- TODO PUT FILTER BAR IN NAVBAR ON MOBILE -->
  <section class="row d-md-block d-none">
    <div class="col-12 ">
      <!-- TODO MAKE BUTTON LIGHT UP WHEN ON A CERTAIN CATEGORY -->
      <div class="d-flex m-3 justify-content-evenly shadow card-bg" >
          <button @click="changeCategory(category)" v-bind:class="{'text-success': filteredCategory == category}" class="btn fs-3 text-white" v-for="category in categories" :key="category">{{ category }}</button>
      </div>
    </div>
  </section>

<section class="row px-3 d-block d-md-none">
  <div class="col-12 p-3">
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  {{ filteredCategory }}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a @click="changeCategory(category)" v-for="category in categories" :key="category" class="dropdown-item" href="#">{{category}}</a>
   
  </div>
</div>
    </div>
</section>

  <section class="row">
<div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-12 col-md-3">
<TowerEvents :towerEvent="towerEvent" />
</div>
  </section>
 </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import {towerEventsService} from '../services/towerEventsService'
import {AppState} from '../AppState'
import TowerEvents from '../components/TowerEvents.vue';

export default {
    setup() {
      const editable = ref('')
      const filteredCategory = ref('')
      const categories = ['All','Concert','Convention', 'Sport', 'Digital', 'Expo', 'Exhibit']
      watchEffect(()=>{
      editable.value
      changeMobileCategory(editable.value)
    })
        onMounted(() => {
          getAllEvents();
        
        });

        async function changeMobileCategory(category){
          filteredCategory.value = category
        }
        async function getAllEvents() {
            try {
                await towerEventsService.getAllEvents();
                filteredCategory.value = 'All'
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
          editable,
          filteredCategory,
          categories,
            towerEvents: computed(() => {
              if(filteredCategory.value && filteredCategory.value != 'All'){
                return AppState.towerEvents.filter(t => t.type == filteredCategory.value.toLocaleLowerCase())
              } else{
                return AppState.towerEvents
              }
              }),


            changeCategory(category){
filteredCategory.value = category
            }
        };
    },
    components: { TowerEvents }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.card-bg{
    background-color: #474C61;
}
.blue-border{
border: 1px solid #438bb0;
}
.blue-text{
  color: #b6d9e5;
}
</style>
