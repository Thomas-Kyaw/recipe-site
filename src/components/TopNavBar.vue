<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <!-- Navbar brand image -->
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/home-icon.png" alt="Home" height="30">
        <span class="navbar-text">Easy at Home</span>
      </router-link>

      <!-- Navbar links -->
      <div class="ms-auto">
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact-us" class="nav-link">Contact Us</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.navbar {
  z-index: 1030; /* Bootstrap's fixed navbar z-index */
}
.nav-link {
  display: inline-block;
  cursor: pointer;
  padding: 10px; 
  color: #7c97a8; 
}

.nav-link:hover {
  text-decoration: underline;
  text-decoration-color: orange;
}
</style>
