<template>
  <div class="container">
    <h1 class="mb-5">{{ subcategory }}</h1>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="recipe in filteredSubcategoryRecipes" :key="recipe.id">
        <router-link :to="`/recipe/${recipe.id}`" class="card-link">
          <div class="card h-100">
            <img :src="getImagePath(recipe.image)" class="card-img-top" alt="Recipe Image">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
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
  props: ['category', 'subcategory'],
  data() {
    return {
      recipes: []
    };
  },
  computed: {
    filteredSubcategoryRecipes() {
      // Special handling for "My Favourites"
      if (this.category.toLowerCase() === 'favourites') {
        return this.recipes.filter(recipe => recipe.isFavourite);
      }
      // Regular subcategory filtering
      return this.recipes.filter(recipe => 
        recipe.category.toLowerCase() === this.category.toLowerCase() &&
        recipe.subcategory.toLowerCase() === this.subcategory.toLowerCase()
      );
    },
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then(data => {
          this.recipes = data;
        })
        .catch(error => console.error('Error fetching recipes:', error));
    },
    getImagePath(imagePath) {
      return require(`@/${imagePath}`);
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 130px; /* Adjust as necessary */
}

.card-img-top {
  height: 180px; /* Adjust the height as necessary */
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-text {
  flex-grow: 1;
  overflow: hidden;
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