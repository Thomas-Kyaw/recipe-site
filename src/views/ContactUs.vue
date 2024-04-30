<template>
  <v-container class="form-container">
    <h2>Contact Us</h2>
    <v-alert
      class="mb-4"
      v-if="submitted"
      :type="submitStatus === 'Your message has been sent successfully!' ? 'success' : 'error'"
      dismissible
      @input="submitted = false"
    >
      {{ submitStatus }}
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
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

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
          await addDoc(collection(db, "contacts"), formData);
          this.submitted = true;
          this.submitStatus = 'Your message has been sent successfully!';
          this.resetForm();
        } catch (error) {
          console.error("Error adding document: ", error);
          this.submitted = true;
          this.submitStatus = 'Failed to send your message. Please try again later.';
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
</style>
