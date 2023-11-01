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
  <section class="row">
    <div class="col-12">
      <!-- TODO MAKE BUTTON LIGHT UP WHEN ON A CERTAIN CATEGORY -->
      <div class="d-flex m-3 justify-content-evenly card-bg" >
          <button @click="changeCategory(category)" class="btn fs-3 text-white" v-for="category in categories" :key="category">{{ category }}</button>
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
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import {towerEventsService} from '../services/towerEventsService'
import {AppState} from '../AppState'
import TowerEvents from '../components/TowerEvents.vue';

export default {
    setup() {
      const filteredCategory = ref('')
      const categories = ['All','Concert','Convention', 'Sport', 'Digital', 'Expo', 'Exhibit']
        onMounted(() => {
            getAllEvents();
        });
        async function getAllEvents() {
            try {
                await towerEventsService.getAllEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
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
