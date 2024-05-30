<template>
  <v-container class="manage-container">
    <h2>Manage Contacts</h2>
    <v-alert v-if="error" type="error" dismissible @input="error = ''">{{ error }}</v-alert>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Contacts</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddContactDialog">New Contact</v-btn>
        <v-btn color="secondary" @click="logout">Logout</v-btn>
      </v-toolbar>
      <div class="table-responsive">
        <table class="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Inquiry Type</th>
              <th>Question</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact._id">
              <td>{{ contact.name }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.phone }}</td>
              <td>{{ contact.address }}</td>
              <td>{{ contact.inquiryType }}</td>
              <td>{{ contact.question }}</td>
              <td>
                <div class="actions-row">
                  <button class="btn btn-primary mr-2" @click="editItem(contact)">Edit</button>
                  <button class="btn btn-danger" @click="deleteItem(contact)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <v-pagination
        v-model="page"
        :length="Math.ceil(totalContacts / itemsPerPage)"
        @input="fetchContacts"
      ></v-pagination>
    </v-card>

    <add-contact-dialog :visible="addDialogVisible" @update:visible="addDialogVisible = $event" @refresh="fetchContacts" />
    <edit-contact-dialog :visible="editDialogVisible" :contact="editedItem" @update:visible="editDialogVisible = $event" @refresh="fetchContacts" />
  </v-container>
</template>

<script>
import AddContactDialog from '@/components/AddContact.vue';
import EditContactDialog from '@/components/EditContact.vue';

export default {
  components: {
    AddContactDialog,
    EditContactDialog,
  },
  data() {
    return {
      contacts: [],
      error: '',
      addDialogVisible: false,
      editDialogVisible: false,
      editedItem: null,
      page: 1,
      itemsPerPage: 5,
      totalContacts: 0,
      loading: false,
    };
  },
  watch: {
    page() {
      this.fetchContacts();
    },
  },
  mounted() {
    this.fetchContacts();
    if (!localStorage.getItem('isAuthenticated')) {
      this.$router.push('/login');
    }
  },
  methods: {
    fetchContacts() {
      this.loading = true;
      fetch(`http://localhost:3000/contacts?page=${this.page}&limit=${this.itemsPerPage}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          this.contacts = data.contacts;
          this.totalContacts = data.total;
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching contacts:', error);
          this.error = 'Error fetching contacts: ' + error.message;
          this.loading = false;
        });
    },
    openAddContactDialog() {
      this.addDialogVisible = true;
    },
    editItem(item) {
      this.editedItem = item;
      this.editDialogVisible = true;
    },
    deleteItem(item) {
      const index = this.contacts.indexOf(item);
      if (confirm('Are you sure you want to delete this item?')) {
        fetch(`http://localhost:3000/contacts/${item._id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(() => {
            this.contacts.splice(index, 1);
            this.totalContacts--;
          })
          .catch((error) => {
            console.error('Error deleting contact:', error);
            this.error = 'Error deleting contact: ' + error.message;
          });
      }
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.manage-container {
  margin-top: 140px;
  padding: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.contacts-table {
  width: 100%;
  border-collapse: collapse;
}

.contacts-table th,
.contacts-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.contacts-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f2f2f2;
  color: black;
}

.actions-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
