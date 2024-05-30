<template>
  <v-dialog :model-value="visible" @update:model-value="updateVisible" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Contact</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="isFormValid" @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="localContact.name" label="Name" :rules="nameRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="localContact.email" label="Email" type="email" :rules="emailRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="localContact.phone" label="Phone" type="tel" :rules="phoneRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="localContact.address" label="Address" :rules="addressRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="localContact.inquiryType" :items="inquiryOptions" label="Inquiry Type" :rules="inquiryTypeRules" required></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-textarea v-model="localContact.question" label="Question" :rules="questionRules" required></v-textarea>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text type="submit" :disabled="!isFormValid">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card-text>
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
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localContact: { ...this.contact },
      isFormValid: false,
      inquiryOptions: ['General', 'Suggestion', 'Recipe-Info', 'Others'],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 2 || 'Name must be at least 2 characters',
        v => v.length <= 50 || 'Name must be less than 50 characters',
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
  watch: {
    contact: {
      handler(newContact) {
        this.localContact = { ...newContact };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateVisible(val) {
      this.$emit('update:visible', val);
    },
    close() {
      this.$emit('update:visible', false);
    },
    async submitForm() {
      if (this.isFormValid) {
        try {
          const response = await fetch(`http://localhost:3000/contacts/${this.localContact._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.localContact),
          });

          if (response.ok) {
            this.$emit('refresh');
            this.close();
          } else {
            throw new Error('Failed to update contact');
          }
        } catch (error) {
          console.error('Error updating contact:', error);
        }
      }
    },
  },
};
</script>
