<template>
  <v-dialog :model-value="visible" @update:model-value="updateVisible" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">New Contact</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="contact.name" label="Name" :rules="nameRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="contact.email" label="Email" type="email" :rules="emailRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="contact.phone" label="Phone" type="tel" :rules="phoneRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="contact.address" label="Address" :rules="addressRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="contact.inquiryType" :items="inquiryOptions" label="Inquiry Type" :rules="inquiryTypeRules" required></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-textarea v-model="contact.question" label="Question" :rules="questionRules" required></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="submitForm" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      contact: {
        name: '',
        email: '',
        phone: '',
        address: '',
        inquiryType: '',
        question: '',
      },
      inquiryOptions: ['General', 'Suggestion', 'Recipe-Info', 'Others'],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Name must be at least 2 characters',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
        v => /^[a-zA-Z\s-]*$/.test(v) || 'Name must only contain alphabetic characters, spaces, or hyphens',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => /^\d{10}$/.test(v) || 'Phone number must be 10 digits',
      ],
      addressRules: [v => !!v || 'Address is required'],
      inquiryTypeRules: [v => !!v || 'Inquiry type is required'],
      questionRules: [v => !!v || 'Question is required'],
    };
  },
  methods: {
    updateVisible(val) {
      this.$emit('update:visible', val);
    },
    close() {
      this.$emit('update:visible', false);
      this.reset();
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          console.log('Form is valid. Submitting...');
          const response = await fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.contact),
          });

          if (response.ok) {
            console.log('Contact saved successfully.');
            this.$emit('refresh');
            this.close();
          } else {
            console.error('Failed to save contact');
            throw new Error('Failed to save contact');
          }
        } catch (error) {
          console.error('Error saving contact:', error);
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.contact = {
        name: '',
        email: '',
        phone: '',
        address: '',
        inquiryType: '',
        question: '',
      };
    },
  },
};
</script>
