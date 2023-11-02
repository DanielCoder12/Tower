<template>
  <header class="main-bg">
    <Navbar />
  </header>
  <main class="main-bg">
    <router-view />
  </main>
  <EditEventModal/>
  <CreateEventModal/>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import EditEventModal from './components/EditEventModal.vue'
import CreateEventModal from './components/CreateEventModal.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, EditEventModal, CreateEventModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

.main-bg{
  background-color: #2a2d3a;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
