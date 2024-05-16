<template>
  <v-container class="form-container">
    <h2>Contact Us</h2>
    <v-alert
      class="mb-4"
      v-if="submitted"
      :class="alertClasses"
      dismissible
      @input="submitted = false"
    >
      {{ submitStatus.message }}
    </v-alert>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-text-field
        label="Name"
        v-model="name"
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field
        label="Email"
        type="email"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Phone Number"
        type="tel"
        v-model="phone"
        :rules="phoneRules"
        required
      ></v-text-field>
      <v-textarea
        label="Address"
        v-model="address"
        :rules="addressRules"
        required
      ></v-textarea>
      <v-select
        :items="inquiryOptions"
        label="Inquiry Type"
        v-model="inquiryType"
        :rules="inquiryTypeRules"
        required
      ></v-select>
      <v-textarea
        label="Question"
        v-model="question"
        :rules="questionRules"
        required
      ></v-textarea>
      <v-btn
        type="submit"
        color="primary"
        :disabled="!isFormValid"
      >Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      inquiryType: '',
      inquiryOptions: ['General', 'Suggestion', 'Recipe-Info', 'Others'],
      question: '',
      submitted: false,
      submitStatus: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 2 || 'Name must be at least 2 characters', // Minimum length
        v => v.length <= 50 || 'Name must be less than 50 characters', // Maximum length
        v => /^[a-zA-Z\s-]*$/.test(v) || 'Name must only contain alphabetic characters, spaces, or hyphens' // Character restrictions
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /^\d{10}$/.test(v) || 'Phone number must be 10 digits'
      ],
      addressRules: [v => !!v || 'Address is required'],
      inquiryTypeRules: [v => !!v || 'Inquiry type is required'],
      questionRules: [v => !!v || 'Question is required'],
    };
  },
  computed: {
    isFormValid() {
      const nameIsValid = this.name !== '' &&
                          this.name.length >= 2 &&
                          this.name.length <= 50 &&
                          /^[a-zA-Z\s-]*$/.test(this.name);
      const emailIsValid = this.email !== '' && /.+@.+\..+/.test(this.email);
      const phoneIsValid = this.phone !== '' && /^\d{10}$/.test(this.phone);
      const addressIsValid = this.address !== '';
      const inquiryTypeIsValid = this.inquiryType !== '';
      const questionIsValid = this.question !== '';

      return nameIsValid && emailIsValid && phoneIsValid && addressIsValid && inquiryTypeIsValid && questionIsValid;
    },
    alertClasses() {
    return {
      'success-alert': this.submitStatus.type === 'success',
      'error-alert': this.submitStatus.type === 'error'
    };
  }
  },
  methods: {
    async submitForm() {
      if (this.isFormValid) {
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          inquiryType: this.inquiryType,
          question: this.question,
        };
        try {
          const response = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });

          const result = await response.json();
          // Customize the success message here
          if (response.ok) {
            this.submitStatus = { type: 'success', message: "Your message has been recorded. We'll get back to you soon!" };
          } else {
            this.submitStatus = { type: 'error', message: result.message || 'Failed to send your message. Please try again later.' };
          }
          this.submitted = true;
          this.resetForm();

          // Set timeout to dismiss the alert after 5 seconds
          setTimeout(() => {
            this.submitted = false;
          }, 5000);
          
        } catch (error) {
          console.error("Error sending data: ", error);
          this.submitted = true;
          this.submitStatus = { type: 'error', message: 'Failed to send your message. Please try again later.' };
          // Set timeout to dismiss the alert after 5 seconds
          setTimeout(() => {
            this.submitted = false;
          }, 5000);
        }
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.inquiryType = '';
      this.question = '';

      // Reset the form validation state
      this.$nextTick(() => {
        this.$refs.form.resetValidation();
      });
    }
  }
};
</script>

<style scoped>
.form-container {
  margin-top: 140px; 
  padding: 20px; 
}

.success-alert {
  background-color: green; /* Customize the color as needed */
  color: white;
}

.error-alert {
  background-color: red; /* Customize the color as needed */
  color: white;
}
</style>
