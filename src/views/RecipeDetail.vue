<template>
  <div class="container" v-if="recipe">
    <div class="row">
      <div class="col-md-6">
        <h1>{{ recipe.title }}</h1>
        <p class="text-muted">
          <span class="badge bg-secondary">{{ recipe.category }}</span>
          <span class="badge bg-info">{{ recipe.subcategory }}</span>
        </p>
        <p><strong>Prep Time:</strong> {{ recipe.times.prep }}</p>
        <p><strong>Cook Time:</strong> {{ recipe.times.cookTime }}</p>
        <p><strong>Total Time:</strong> {{ recipe.times.totalTime }}</p>
        <p><strong>Servings:</strong> {{ recipe.servings }}</p>
        <img :src="getImagePath(recipe.image)" class="img-fluid" alt="Recipe Image">
        <div class="rating">
          <!-- Star 1 -->
          <input type="radio" id="star1" value="1" v-model="rating" @change="setRating(1)" hidden />
          <label for="star1" @mouseover="hoverRating(1)" @mouseleave="hoverRating(0)">
            <i :class="{'bi bi-star-fill': 1 <= rating, 'bi bi-star': 1 > rating}"></i>
          </label>
          <!-- Star 2 -->
          <input type="radio" id="star2" value="2" v-model="rating" @change="setRating(2)" hidden />
          <label for="star2" @mouseover="hoverRating(2)" @mouseleave="hoverRating(0)">
            <i :class="{'bi bi-star-fill': 2 <= rating, 'bi bi-star': 2 > rating}"></i>
          </label>
          <!-- Star 3 -->
          <input type="radio" id="star3" value="3" v-model="rating" @change="setRating(3)" hidden />
          <label for="star3" @mouseover="hoverRating(3)" @mouseleave="hoverRating(0)">
            <i :class="{'bi bi-star-fill': 3 <= rating, 'bi bi-star': 3 > rating}"></i>
          </label>
          <!-- Star 4 -->
          <input type="radio" id="star4" value="4" v-model="rating" @change="setRating(4)" hidden />
          <label for="star4" @mouseover="hoverRating(4)" @mouseleave="hoverRating(0)">
            <i :class="{'bi bi-star-fill': 4 <= rating, 'bi bi-star': 4 > rating}"></i>
          </label>
          <!-- Star 5 -->
          <input type="radio" id="star5" value="5" v-model="rating" @change="setRating(5)" hidden />
          <label for="star5" @mouseover="hoverRating(5)" @mouseleave="hoverRating(0)">
            <i :class="{'bi bi-star-fill': 5 <= rating, 'bi bi-star': 5 > rating}"></i>
          </label>
          <span class="rating-text">{{ ratingText }}</span>
        </div>        
        <div v-if="rating > 0" class="card mt-3">
          <div class="card-body align-content-center">
            Your rating: 
            <span class="rated">{{ rating }}</span> stars
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h2>Ingredients</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
            {{ ingredient.quantity }} {{ ingredient.name }}
          </li>
        </ul>
        <h2 class="mt-4">Instructions</h2>
        <ol class="list-group list-group-numbered">
          <li class="list-group-item" v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading recipe details...</p>
  </div>
</template>


<script>
export default {
  props: ['id'], // Use the passed 'id' prop to fetch the correct recipe
  data() {
    return {
      recipe: null, // Initially null, will be set to the fetched recipe
      rating: 0, // The permanent rating after click
      hoveredRating: 0, // The temporary rating on hover
      ratingTexts: ['', 'Did not like it', 'It was okay', 'Liked it', 'Really good', 'Loved it!']
    };
  },
  computed: {
    ratingText() {
      // Display the text corresponding to the hovered or clicked rating
      return this.ratingTexts[this.hoveredRating || this.rating];
    }
  },
  created() {
    this.fetchRecipe();
  },
  methods: {
    fetchRecipe() {
      fetch(`http://localhost:3001/recipes/${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.recipe = data;
        })
        .catch(error => console.error('Error fetching recipe:', error));
    },
    getImagePath(imagePath) {
      // Use the require function to make sure Webpack processes it correctly
      // For some reason, without this the images won't load
      return require(`@/${imagePath}`);
    },
    setRating(star) {
      this.rating = star;
    },
    hoverRating(star) {
      this.hoveredRating = star;
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 140px;
}

h1, h2 {
  color: #333;
}

.badge {
  margin-right: 0.5rem;
}

.img-fluid {
  margin-top: 20px;
  border-radius: 10px;
}

.list-group-item {
  border: none;
  border-bottom: 1px solid #eeeeee !important;
}

.list-group-item:last-child {
  border-bottom: none;
}

.list-group-numbered {
  padding-left: 0;
}

.list-group-numbered li {
  counter-increment: step-counter;
}

.list-group-numbered li::before {
  content: counter(step-counter) ". ";
  font-weight: bold;
}

.rating {
  text-align: center; /* Centers the stars */
}

.rating-text {
  display: block; /* Changes display to block to ensure it appears on a new line */
  margin: 10px 0; /* Adds some space above and below the text */
  font-size: 0.9em;
  text-align: center; /* Centers the text */
}

.card {
  margin: 0 auto; /* Centers the card horizontally */
  max-width: 300px; /* Adjust as necessary */
  border: 1px solid #ddd; /* Add a border for better visual separation */
  box-shadow: 0 2px 4px rgba(0,0,0,.1); /* Optional: Add a shadow for depth */
}
</style>
