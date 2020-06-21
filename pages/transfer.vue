<template>
  <div>
    <v-row v-if="transfers.length">
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="red--text">Transferring</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" v-for="tf in transfers.slice().reverse()" :key="tf.id">
        <v-card class="mx-auto elevation-1 grey lighten-5" max-width="auto">
            <v-card-text>
              <div class="d-flex">
                <p>From : 
                  <span class="red--text font-weight-bold">{{tf.by_who | capitalize}}</span>
                  </p> 
                <v-spacer></v-spacer>
                <p class="title text--primary">
                  To : 
                 <span class="font-weight-bold red--text">{{tf.for_who | capitalize}}</span>
                </p>
              </div>
              
              <div class="d-flex">
                <p>
                  <v-icon class="red--text">mdi-currency-usd</v-icon> 
                  <v-chip outlined class="red font-weight-bold">{{tf.amount}}</v-chip>
                </p>
                <v-spacer></v-spacer>
                <div class="text--primary">
                  <v-icon class="red--text">fas fa-clock</v-icon>
                  <v-chip class="red lighten-3 font-weight-bold" outlined>{{tf.transfer_date}}</v-chip>
                </div>
              </div>
            </v-card-text>

            <v-card-actions class="px-1">
              <v-btn text icon color="orange" @click="openEditMode(tf)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>             
              <v-spacer></v-spacer>
              <v-btn text icon color="red" @click="deleteDialog = true">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <!-- delete trnsfer model -->
          <v-dialog v-model="deleteDialog" max-width="500px" transition="dialog-transition">
            <v-card>
              <v-card-title>
                <span class="subtitle"> Are you Sure you want to delete ? </span>
                <span class="red--text ml-2"> {{ tf.amount }} </span> 
              </v-card-title>
              <v-card-actions>
                <v-btn icon><v-icon class="red--text" @click="deleteTransfer(tf.id)">mdi-trash-can-outline</v-icon></v-btn>
                <v-spacer></v-spacer>
                <v-btn icon><v-icon class="red--text" @click="deleteDialog = false">mdi-close</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-col>
    </v-row>

    <v-row v-else>
       <v-col cols="12" md="4" offset-md="4">
        <v-card>
          <p class="red--text text-center title">There is No Transfer Record</p>
        </v-card>
      </v-col>
    </v-row>


      <!-- create  new transfer form -->
      <div class="text-center">
        <v-dialog v-model="createDialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn class="red" dark app small fixed bottom right fab v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-1 grey lighten-4">
            <v-card-title  class="headline grey lighten-3 mb-3">
              <span class="red--text headline">Insert New Transfer</span>
            </v-card-title>
              <v-card-text>  
                <v-text-field outlined v-model="newForm.by_who" label="From"></v-text-field>
                <v-text-field outlined v-model="newForm.for_who" label="To"></v-text-field>
                <v-text-field outlined v-model="newForm.amount" label="Amount"></v-text-field>
                <v-text-field outlined v-model="newForm.transfer_date" label="Date"></v-text-field>
                
              </v-card-text>
            <v-card-actions>
              <v-btn icon >
                <v-icon class="red--text" large @click="creteNewTransfer">fas fa-plus-circle</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="createDialog = false" large>
                <v-icon class="red--text">fas fa-window-close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- update mode -->
            <v-dialog
              v-model="editeMode"
              max-width="500px"
            >
              <v-card>
                <v-card-title primary-title>
                  Update Transfer
                </v-card-title>
                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <v-text-field label="From" v-model="form.by_who" outlined class="mr-1"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-text-field label="To" v-model="form.for_who" outlined></v-text-field>
                  </div>
                
                  <div class="d-flex justify-space-between">
                    <v-text-field label="amount" v-model="form.amount" outlined  prefix="$" class="mr-1"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-text-field label="Date" v-model="form.transfer_date" outlined></v-text-field>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn text icon color="red" @click="editeMode = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text icon color="red" @click="updateTransfer(form)">
                  <v-icon>fas fa-pen-alt</v-icon>
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            <!-- / update mode -->

  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'report',
    data: () => ({
      createDialog: false,
      deleteDialog: false,
      editeMode: false ,
      form: {
        by_who: '',
        for_who: '',
        amount: null,
        transfer_date: ''
      },

      newForm: {
        by_who: '',
        for_who: '',
        amount: null,
        transfer_date: ''
      }
    }),

    computed:{
      transfers(){
        return this.$store.state.transfer.transfers
      }
    },
    async fetch({store}){
      try {
        await store.dispatch('transfer/fetchAllTransfer')
      } catch(e){
        console.log(e)
      }
      
    },
    filters:{
      capitalize(value){
        if(!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    methods: {
      openEditMode(tf){
        this.editeMode = true
        this.form = tf
      },
      async deleteTransfer(id){
        await this.$store.dispatch('transfer/deleteTransfer', id)
        await this.$store.dispatch('transfer/fetchAllTransfer')
        this.deleteDialog = false
      },

      async updateTransfer(tf){
        this.form = tf
        await this.$store.dispatch('transfer/updateTransfer', this.form)
        await this.$store.dispatch('transfer/fetchAllTransfer')
        this.editeMode = false
      },
      async creteNewTransfer(){
        await this.$store.dispatch('transfer/creteNewTransfer', this.newForm)
        await this.$store.dispatch('transfer/fetchAllTransfer')
        this.createDialog = false
      }
    }
  }
</script>

<style scoped>
 .report-cards {
   border-bottom: 1px solid grey;
 }
</style>