<template>
  <div class="container" v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.category }} - {{ recipe.subcategory }}</p>
    <p>Prep Time: {{ recipe.times.prep }}</p>
    <p>Cook Time: {{ recipe.times.cookTime }}</p>
    <p>Total Time: {{ recipe.times.totalTime }}</p>
    <h2>Ingredients</h2>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
        {{ ingredient.quantity }} {{ ingredient.name }}
      </li>
    </ul>
    <h2>Instructions</h2>
    <ol>
      <li v-for="(instruction, index) in recipe.instructions" :key="index">
        {{ instruction }}
      </li>
    </ol>
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
      recipe: null // Initially null, will be set to the fetched recipe
    };
  },
  created() {
    this.fetchRecipe();
  },
  methods: {
    fetchRecipe() {
      fetch(`http://localhost:3000/recipes/${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.recipe = data;
        })
        .catch(error => console.error('Error fetching recipe:', error));
    }
  }
};
</script>
