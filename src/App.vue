<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <TopNavBarVue/>
    <BottomNavBarVue/>
    <router-view class="flex-grow-1"/>
    <FooterVue/>
  </div>
</template>

<script>
import TopNavBarVue from '@/components/TopNavBar.vue'
import BottomNavBarVue from '@/components/BottomNavBar.vue'
import FooterVue from './components/Footer.vue'

export default {
  components: {
    TopNavBarVue,
    BottomNavBarVue,
    FooterVue
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* Removed fixed height, using min-height to fill the viewport height */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
  /* Adding margin for the content area, if necessary */
  margin-top: 56px; /* Height of navbar, adjust as needed */
}

</style>
