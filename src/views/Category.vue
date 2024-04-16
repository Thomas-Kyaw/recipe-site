<template>
  <div class="container">
    <h1 class="mb-5">{{ category }}</h1>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="recipe in filteredRecipes" :key="recipe.id">
        <router-link :to="`/recipe/${recipe.id}`" class="card-link">
          <div class="card h-100">
            <img :src="getImagePath(recipe.image)" class="card-img-top" alt="Recipe Image">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ recipe.subcategory }}</h6>
              <p class="card-text">{{ recipe.description }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['category'],
  data() {
    return {
      recipes: [] // Initially empty, will be filled with the fetched data
    };
  },
  computed: {
      filteredRecipes() {
      if (this.category.toLowerCase() === "favourites") {
        return this.recipes.filter(recipe => recipe.isFavourite);
      } else {
        // Otherwise, filters recipes based on the category passed as a prop
        return this.recipes.filter(
          recipe => recipe.category.toLowerCase() === this.category.toLowerCase()
        );
      }
    },
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      // Fetches recipes from the local JSON server
      fetch('http://localhost:3000/recipes')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.recipes = data;
          // Log each recipe to check the image source
          this.recipes.forEach(recipe => {
            console.log(`Recipe fetched: ${recipe.title}, Image source: ${recipe.image}`);
          });
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    },getImagePath(imagePath) {
      // Use the require function to make sure Webpack processes it correctly
      // For some reason, without this the images won't load
      return require(`@/${imagePath}`);
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 130px;
}
.card-img-top {
  height: 180px; /* Reduced height */
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This will distribute space top and bottom inside the card */
}

.card-text {
  flex-grow: 1;
  overflow: hidden; /* Prevents text from overflowing */
  text-overflow: ellipsis;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.col-md-4 {
  margin-bottom: 2rem;
}
.card-title:hover{
  text-decoration: underline;
  text-decoration-color: orange;
}
</style>
