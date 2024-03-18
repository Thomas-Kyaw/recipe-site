<template>
  <footer class="bg-light text-center text-lg-start">
    <div class="container p-4">
      <div class="row">
        <!-- Left column for your name and ID -->
        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 class="text-uppercase">Aung Khant Kyaw</h5>
          <p>ID: 102783989</p>
          <!-- Social icons -->
          <a href="https://www.instagram.com" target="_blank"><i class="bi bi-instagram h1"></i></a>
          <a href="https://www.facebook.com" target="_blank"><i class="bi bi-facebook h1"></i></a>
        </div>
        
        <!-- Right column for image and text -->
        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
          <router-link class="nav-link" to="/">
            <img src="@/assets/home-icon.png" alt="Home" height="60">
            <p class="text-uppercase mb-0">Easy at Home</p>
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style scoped>
.bi-instagram, .bi-facebook {
  margin-right: 20px;
  font-size: 30px; 
}

/* Responsive stuff */
@media (max-width: 768px) {
  .fa-2x {
    font-size: 36px; 
  }
}
.home-link {
  display: inline-block;
  cursor: pointer;
  padding: 10px; 
  color: #7c97a8; 
}

.home-link:hover {
  text-decoration: underline;
  text-decoration-color: #6c6a67;
}
</style>
