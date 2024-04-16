// Assuming you're within a Vuetify plugin setup file, like src/plugins/vuetify.js

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import Vuetify styles
import 'vuetify/dist/vuetify.min.css';

const opts = {}; // Specify any options you want here

// Create and export the Vuetify instance
export default createVuetify({
  components,
  directives,
  ...opts
})
