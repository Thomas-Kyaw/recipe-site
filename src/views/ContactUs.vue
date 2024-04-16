<template>
  <v-container class="form-container">
    <h2>Contact Us</h2>
    <!-- Alert for form submission status -->
    <v-alert
      class="mb-4" 
      v-if="submitted" 
      :type="submitStatus === 'Your message has been sent successfully!' ? 'success' : 'error'"
      dismissible
      @input="submitted = false"
    >
      {{ submitStatus }}
    </v-alert>
    <v-form @submit.prevent="submitForm">
      <v-text-field label="Name" v-model="name" required></v-text-field>
      <v-text-field label="Email" type="email" v-model="email" required></v-text-field>
      <v-text-field label="Phone Number" type="tel" v-model="phone" required></v-text-field>
      <v-textarea label="Address" v-model="address" required></v-textarea>
      <v-select :items="inquiryOptions" label="Inquiry Type" v-model="inquiryType" required></v-select>
      <v-textarea label="Question" v-model="question" required></v-textarea>
      <v-btn type="submit" color="primary">Submit</v-btn>
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
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        inquiryType: this.inquiryType,
        question: this.question,
      };
      try {
      // Add a new document in the 'contacts' collection
      await addDoc(collection(db, "contacts"), formData);
      this.submitted = true;
      this.submitStatus = 'Your message has been sent successfully!';
      this.resetForm();
      } catch (error) {
        console.error("Error adding document: ", error);
        this.submitted = false;
        this.submitStatus = 'Failed to send your message. Please try again later.';
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.inquiryType = '';
      this.question = '';
    }
  },
};
</script>

<style scoped>
.form-container {
  margin-top: 140px; 
  padding: 20px; 
}
</style>
