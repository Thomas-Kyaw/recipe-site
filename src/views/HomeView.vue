<template>
  <div class="home">
    <div class="container">
      <h1 class="lead mb-5">Home Cook Recipes</h1>
      <p class="lead mb-5">Welcome to Home Cook Recipes, your premier destination for discovering and mastering diverse culinary creations from around the world. Here, we celebrate the art of cooking with a vast collection of recipes that cater to all skill levels—from novice cooks exploring the kitchen for the first time to seasoned chefs seeking to refine their palate and skills. Our recipes are carefully curated to ensure that you can find everything from quick weekday dinners to elaborate weekend feasts. Whether you're in the mood for the robust flavors of Indian Chicken Tikka Masala, the subtle nuances of a traditional Japanese Oyakodon, or the comforting simplicity of an American BLT, our site is designed to guide you through each step with detailed instructions and tips. Explore regional cuisines with ingredients that bring authentic flavors into your home kitchen, making each meal an adventure. Join our community of home cooks and food lovers alike, and transform everyday cooking into a delightful culinary journey. Start your exploration today and let your taste buds guide you through a world of flavorful experiences and new traditions!</p>
      <div class="row mb-5">
          <div class="col-md-8 mb-3">
            <router-link :to="`/recipe/11`" class="recipe-link">
              <div class="card" style="width: relative;">
                <img src="@/assets/Paella.jpg" class="card-img-top" alt="Delicious Paella">
                <div class="card-body">
                  <h6 class="card-subtitle text-muted">best recipe for today's dinner</h6>
                  <h5 class="card-title">Most delicious rice-based recipe</h5> <!-- should add styling for this link -->
                  <p class="card-text">You can impress your loved ones with this simple and easy recipe.</p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="col-md-4">
            <router-link :to="`/recipe/12`" class="recipe-link">
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="@/assets/karaage.jpg" class="img-fluid rounded-start cardimage" alt="Crispy Karaage">
                  </div>
                  <div class="col-md-8 d-flex align-items-center justify-content-center">
                    <div class="card-body text-center">
                      <h5 class="card-title">New recipe from our Japanese home cooks</h5>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            
            <router-link :to="`/recipe/9`" class="recipe-link">
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="@/assets/BLT-Sandwich.jpg" class="img-fluid rounded-start cardimage" alt="Tasty BLT Sandwich">
                  </div>
                  <div class="col-md-8 d-flex align-items-center justify-content-center">
                    <div class="card-body text-center">
                      <h5 class="card-title">Simple and easy BLT to fill your stomach after a late night out</h5>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          

      </div>

      <h3 class="my-5">Check these recipes out</h3>

      <div class="row row-cols-1 row-cols-md-2 g-5 mb-5">

        <div class="col">
          <router-link :to="`/recipe/15`" class="recipe-link">
            <div class="card h-100 d-flex flex-column">
              <img src="@/assets/Bulgogi.jpg" class="card-img-top equal-img" alt="Delicious Bulgogi">
              <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-subtitle text-muted">Korean Recipes</h6>
                <h5 class="card-title">Korean Bulgogi</h5>
                <p class="card-text">Simple and delicious Korean Bulgogi</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col">
          <router-link :to="`/recipe/4`" class="recipe-link">
            <div class="card h-100 d-flex flex-column">
              <img src="@/assets/oyakodon.jpg" class="card-img-top equal-img" alt="Delicious Oyakodon">
              <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-subtitle text-muted">Japanese Recipes</h6>
                <h5 class="card-title">Delicious Oyakodon</h5>
                <p class="card-text">Simple and delicious Japanese Oyakodon</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col">
          <router-link :to="`/recipe/3`" class="recipe-link">
            <div class="card h-100 d-flex flex-column">
              <img src="@/assets/chicken-tikka-masala.jpg" class="card-img-top equal-img" alt="Delicious Chicken Tikka Masala">
              <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-subtitle text-muted">Indian Recipes</h6>
                <h5 class="card-title">Delicious Chicken Tikka Masala</h5>
                <p class="card-text">Simple and delicious Chicken Tikka Masala</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col">
          <router-link :to="`/recipe/6`" class="recipe-link">
            <div class="card h-100 d-flex flex-column">
              <img src="@/assets/eggplant-stir-fry.jpg" class="card-img-top equal-img" alt="Delicious Eggplant Stir Fry">
              <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-subtitle text-muted">Chinese Recipes</h6>
                <h5 class="card-title">Delicious Eggplant Stir Fry</h5>
                <p class="card-text">Simple and delicious Eggplant Stir Fry</p>
              </div>
            </div>
          </router-link>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.card {
  min-width: 0; /* Prevent the card from shrinking too small */
}
.cardimage {
  height: auto; /* Make the height automatic to maintain aspect ratio */
  width: 100%; /* Make the width responsive to the container size */
  object-fit: cover; /* This will ensure the image covers the area */
}
@media (min-width: 768px) {
  .cardimage {
    height: 150px; /* Fix height for larger screens if necessary */
  }
}
.equal-img {
  width: 100%;
  height: 500px; 
  object-fit: cover;
}
.card-body {
  flex-grow: 1;
}
.card-title, .card {
  cursor: pointer;
}
.card-title:hover{
  text-decoration: underline;
  text-decoration-color: orange;
}
.recipe-link {
  text-decoration: none !important; /* Remove underline */
  color: inherit !important; /* Use the inherited text color */
}

.recipe-link:hover {
  text-decoration: underline !important; /* Underline on hover */
  text-decoration-color: orange !important; /* Change underline color to orange on hover */
}

/* Additional styles */
.card-title:hover {
  text-decoration: underline !important; /* Ensure underline on hover for title */
  text-decoration-color: orange !important; /* Change title underline color to orange */
}
</style>
