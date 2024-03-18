<template>
  <div class="container">
    <h1>{{ recipe.title }}</h1>
    <!-- Add other recipe details here -->
  </div>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      recipe: null
    };
  },
  created() {
    // Fetch the recipe by name when the component is created
    this.fetchRecipe(this.name);
  },
  methods: {
    fetchRecipe(name) {
      // This function would fetch the recipe data based on the 'name' prop
      // Here's a pseudo-code to show the idea
      axios.get('/data/db.json').then(response => {
        const recipes = response.data.recipes;
        this.recipe = recipes.find(r => r.title.toLowerCase() === name.toLowerCase());
      });
    }
  }
};
</script>
