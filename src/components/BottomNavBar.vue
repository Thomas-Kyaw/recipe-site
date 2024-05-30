<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light bottom-navbar" :class="{ 'hidden': !visible }">
    <div class="container-fluid">

      <!-- Toggler for mobile screens -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">

          <router-link class="nav-link" to="/search">SEARCH</router-link>

          <!-- Eastern Dropdown -->
          <li class="nav-item dropdown" 
          @mouseenter="mouseEnter('EASTERN')" 
          @mouseleave="mouseLeave('EASTERN')" 
          :class="{ show: showDropdown.EASTERN }">
          <router-link to="/category/eastern" class="nav-link dropdown-toggle">EASTERN</router-link>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><router-link :to="{ name: 'subcategory', params: { category: 'eastern', subcategory: 'chinese' }}" class="dropdown-item">Chinese</router-link></li>

            <li><router-link :to="{ name: 'subcategory', params: { category: 'eastern', subcategory: 'japanese' }}" class="dropdown-item">Japanese</router-link></li>
            
            <li><router-link :to="{ name: 'subcategory', params: { category: 'eastern', subcategory: 'korean' }}" class="dropdown-item">Korean</router-link></li>

            <li><router-link :to="{ name: 'subcategory', params: { category: 'eastern', subcategory: 'others' }}" class="dropdown-item">others</router-link></li>
          </ul>
          </li>

          <!-- Western Dropdown -->
          <li class="nav-item dropdown" 
          @mouseenter="mouseEnter('WESTERN')" 
          @mouseleave="mouseLeave('WESTERN')" 
          :class="{ show: showDropdown.WESTERN }">
          <router-link to="/category/western" class="nav-link dropdown-toggle">WESTERN</router-link>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><router-link :to="{ name: 'subcategory', params: { category: 'western', subcategory: 'american' }}" class="dropdown-item">American</router-link></li>

            <li><router-link :to="{ name: 'subcategory', params: { category: 'western', subcategory: 'european' }}" class="dropdown-item">European</router-link></li>
          </ul>
          </li>


          <!-- My Favourites Dropdown -->
          <li class="nav-item dropdown" 
            @mouseenter="mouseEnter('MY_FAVOURITES')" 
            @mouseleave="mouseLeave('MY_FAVOURITES')" 
            :class="{ show: showDropdown.MY_FAVOURITES }">
            <router-link to="/category/favourites" class="nav-link dropdown-toggle">My Favourites</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      showDropdown: {
        EASTERN: false,
        WESTERN: false,
        MY_FAVOURITES: false
      },
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.visible = window.scrollY <= 90; // Hide the navbar after 100px scroll
    },
    mouseEnter(dropdown) {
      this.showDropdown[dropdown] = true;
    },
    mouseLeave(dropdown) {
      this.showDropdown[dropdown] = false;
    },
  },
}
</script>

<style scoped>
.bottom-navbar {
  position: fixed;
  top: 56px; /* Adjust this value to be the height of top navbar */
  left: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out; /* can change depending on my mood */
  z-index: 1020; /* Make it sure it's above other content but below the top navbar */
}

.nav-link {
  text-decoration: none;
  color: black;
}

.nav-link:hover {
  text-decoration: underline;
  text-decoration-color: orange; /* Change color on hover */
}

/* This CSS will retract the navbar when `visible` is false */
.hidden {
  transform: translateY(-100%);
}

.nav-item.dropdown:hover .dropdown-menu {
  display: block;
}

/* Prevent the dropdown from disappearing when hover over the dropdown-toggle link */
.dropdown-toggle::after {
  display: none;
}

/* can also adjust the pointer-events to make sure the click goes through to the router-link */
.nav-item.dropdown .dropdown-toggle {
  pointer-events: auto; 
}

/* Keep the dropdown-menu visible while hovering over it */
.dropdown-menu {
  pointer-events: auto;
}

</style>
