<template>
  <v-container class="login-container">
    <h2>Login</h2>
    <v-alert v-if="error" type="error" dismissible @input="error = ''">
      {{ error }}
    </v-alert>
    <v-form ref="form" @submit.prevent="login">
      <v-text-field label="Username" v-model="username" required></v-text-field>
      <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
      <v-btn type="submit" color="primary" :disabled="!isFormValid">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  computed: {
    isFormValid() {
      return this.username !== '' && this.password !== '';
    }
  },
  methods: {
    login() {
      // For demo purposes, we use a static check
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('isAuthenticated', true);
        this.$router.push('/manage');
      } else {
        this.error = 'Invalid username or password';
      }
    }
  },
  mounted() {
    if (localStorage.getItem('isAuthenticated')) {
      this.$router.push('/manage');
    }
  }
};
</script>

<style scoped>
.login-container {
  margin-top: 140px;
  padding: 20px;
}
</style>
