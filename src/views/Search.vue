<template>
  <div class="search-container">
    <input v-model="searchQuery" placeholder="Search for recipes..." @input="filterRecipes" class="search-input"/>
    
    <div class="filters">
      <div class="filter-group">
        <label for="category">Category:</label>
        <select v-model="selectedCategory" @change="filterRecipes" class="filter-select">
          <option value="">All</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="subcategory">Subcategory:</label>
        <select v-model="selectedSubcategory" @change="filterRecipes" class="filter-select">
          <option value="">All</option>
          <option v-for="subcategory in uniqueSubcategories" :key="subcategory" :value="subcategory">{{ subcategory }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="prepTime">Preparation Time:</label>
        <select v-model="selectedPrepTime" @change="filterRecipes" class="filter-select">
          <option value="">All</option>
          <option v-for="time in uniquePrepTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="cookTime">Cooking Time:</label>
        <select v-model="selectedCookTime" @change="filterRecipes" class="filter-select">
          <option value="">All</option>
          <option v-for="time in uniqueCookTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="servings">Servings:</label>
        <select v-model="selectedServings" @change="filterRecipes" class="filter-select">
          <option value="">All</option>
          <option v-for="serving in uniqueServings" :key="serving" :value="serving">{{ serving }}</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="favourite">Favourite:</label>
        <input type="checkbox" v-model="isFavourite" @change="filterRecipes" class="filter-checkbox" />
      </div>
    </div>
    
    <div class="recipe-list" v-if="filteredRecipes.length">
      <div v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-item">
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
    <p v-else>No recipes found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedSubcategory: '',
      selectedPrepTime: '',
      selectedCookTime: '',
      selectedServings: '',
      isFavourite: false,
      recipes: [],
      filteredRecipes: [],
    };
  },
  computed: {
    uniqueCategories() {
      return [...new Set(this.recipes.map(recipe => recipe.category))];
    },
    uniqueSubcategories() {
      return [...new Set(this.recipes.map(recipe => recipe.subcategory))];
    },
    uniquePrepTimes() {
      return [...new Set(this.recipes.map(recipe => recipe.times.prep))];
    },
    uniqueCookTimes() {
      return [...new Set(this.recipes.map(recipe => recipe.times.cookTime))];
    },
    uniqueServings() {
      return [...new Set(this.recipes.map(recipe => recipe.servings))];
    }
  },
  methods: {
    fetchRecipes() {
      fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then(data => {
          this.recipes = data;
          this.filteredRecipes = data;
        })
        .catch(error => console.error('Error fetching recipes:', error));
    },
    filterRecipes() {
      this.filteredRecipes = this.recipes.filter(recipe => {
        return (
          (!this.searchQuery || recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (!this.selectedCategory || recipe.category === this.selectedCategory) &&
          (!this.selectedSubcategory || recipe.subcategory === this.selectedSubcategory) &&
          (!this.selectedPrepTime || recipe.times.prep === this.selectedPrepTime) &&
          (!this.selectedCookTime || recipe.times.cookTime === this.selectedCookTime) &&
          (!this.selectedServings || recipe.servings === this.selectedServings) &&
          (!this.isFavourite || recipe.isFavourite === this.isFavourite)
        );
      });
    },
    getImagePath(imagePath) {
      try {
        return require(`@/${imagePath}`);
      } catch (e) {
        console.error(`Cannot find image: ${imagePath}`);
        return '';
      }
    }
  },
  mounted() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px 20px 80px 20px;
}

.search-input {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.filter-select, .filter-checkbox {
  margin-top: 5px;
  padding: 5px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.filter-checkbox {
  margin-top: 15px;
}

.filter-select {
  color: #333;
  background-color: white;
}

.filter-select:focus, .search-input:focus {
  border-color: orange;
  outline: none;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
}

.recipe-item {
  padding: 10px;
  text-align: center;
}

.card {
  border: none; /* Remove border from card */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better appearance */
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

.card-title:hover {
  text-decoration: underline;
  text-decoration-color: orange;
}
</style>
