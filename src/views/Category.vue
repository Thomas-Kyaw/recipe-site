<template>
  <div>
    <h1>{{ category }}</h1>
    <div v-for="recipe in filteredRecipes" :key="recipe.title">
      <router-link :to="`/recipe/${recipe.title}`">{{ recipe.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['category'],
  data() {
    return {
      recipes: [] // You will fetch the recipes from your data source
    };
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(
        (recipe) => recipe.category.toLowerCase() === this.category.toLowerCase()
      );
    },
  },
  // Fetch your data here in a real app
};
</script>
