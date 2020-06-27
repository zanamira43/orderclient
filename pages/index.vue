<template>
  <div>
     <!-- items updae form list -->
      <v-row v-if="$store.state.orders.items.length">
        <v-col cols="12" md="4"  v-for="item in items" :key="item.slug" class="px-1">
            <v-card flat class="border">
              <!-- loading item image here -->
              <a :href="item.image" download v-if="item.image">
                <v-img  :src="item.image" :lazy-src="item.image" 
                  height="300" width="100%"  aspect-ratio="1">
                      <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        >
                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
              </a>
              <v-img v-else src="img/harem-pvc-new-logo.jpg"  height="300"/>
              <!-- update form view -->
              <v-card-text>  
                  <v-text-field type="text" label="Name" outlined  dense color="red" v-model="item.name"></v-text-field>
                  <v-row>
                    <v-col cols="6" md="6">
                      <v-text-field type="number" label="Quantity" outlined dense color="red"
                          v-model="item.quantity"></v-text-field>
                    </v-col>
                    <v-col cols="6" md="6">
                      <v-text-field type="number" label="Price" outlined dense color="red" prefix="$"
                        v-model="item.price"></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-textarea label="Description" outlined  dense color="red" cols="2" rows="2" 
                      v-model="item.description">
                  </v-textarea>
                   <span class="font-weight-bold" ><v-icon class="red--text">mdi-update </v-icon> : {{$moment(item.created).format("dd DD - MM - Y  hh:mm")}}</span>
              </v-card-text> 
                <!-- card action panel -->
               <v-card-actions >
                <v-btn icon><v-icon class="red--text" @click="addToCart(item)">fas fa-shopping-cart</v-icon></v-btn>
                <v-spacer></v-spacer>
                <v-btn icon><v-icon class="red--text" @click="updateOrder(item)">mdi-pencil</v-icon></v-btn>
                <v-btn icon><v-icon class="red--text" @click="openDeleteOrderDialog(item)">mdi-trash-can-outline</v-icon></v-btn>
              </v-card-actions>
              
            </v-card> 
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="4" offset-md="4">
          <v-card>
            <p class="red--text text-center title">There No Items Record</p>
          </v-card>
        </v-col>
      </v-row>
      <!-- create  new itme form -->

      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn class="red" dark app small fixed bottom right fab v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-1 grey lighten-4">
            <v-card-title  class="headline grey lighten-3 mb-3">
              <span class="red--text headline">Insert New Item</span>
            </v-card-title>
              <v-card-text>  
                <!-- <v-text-field label="Name" outlined color="red" dense></v-text-field>
                <v-row>
                  <v-col cols="6" md="6">
                    <v-text-field label="Quantity"  outlined color="red" dense></v-text-field>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-text-field label="Price"  outlined  color="red" dense></v-text-field>
                  </v-col>
                </v-row> -->
                
                <!-- <v-textarea label="Description"  outlined color="red" cols="2" rows="2" dense></v-textarea> -->

                <v-row>
                  <v-col cols="12" md="12">
                    <v-file-input
                      v-model="files"
                      label="Order Iamge" 
                      accept="image/*" 
                      outlined  
                      color="red" 
                      dense
                      flat
                      show-size
                      counter
                      prepend-icon="mdi-camera"
                      @change="onFileChange"
                      ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-img v-if="ImageUrl" :src="ImageUrl" height="220" width="100%" contain/>
                  </v-col>
                </v-row> 
              </v-card-text>

            <v-card-actions>
              <v-btn icon >
                <v-icon class="red--text" large @click="uploadImage">fas fa-plus-circle</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false" large>
                <v-icon class="red--text">fas fa-window-close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <div><!-- delete order dialog confirmation -->
        <v-dialog v-model="delOrderdialog" width="500">
          <v-card>
            <v-card-title>
              <span class="subtitle">Are you Sure you want to delete ?</span>
              <span class="red--text" v-if="this.deleteInfo">{{this.deleteInfo.name}}</span> 
              
            </v-card-title>
            <v-card-actions>
              <v-btn icon><v-icon class="red--text" @click="deleteOrder(deleteInfo.slug)">mdi-trash-can-outline</v-icon></v-btn>
              <v-btn icon><v-icon class="red--text" @click="delOrderdialog = false">mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>   
      </div>


  </div>
</template>

<script>


export default {
  components: {},

  beforeMount() {
     this.$store.dispatch('orders/getAllOrdres')
  },
  
  data(){
    return {
      // items: [],
      dialog: false,
      delOrderdialog: false,
      deleteInfo: {},
      files: null,
      ImageUrl: null,
    }
  },
  computed:{
    items(){
      return this.$store.state.orders.items
    }
  },
  async fetch({store}){
    try {
      await store.dispatch('orders/getAllOrdres')
      await store.dispatch('carts/getAllCarts')
      await store.dispatch('transfer/fetchAllTransfer')
    }catch(e){
      console.log(e)
    }
  },
  methods: {
    onFileChange(e){
      const image = this.files
      const reader = new FileReader()
      if(image && image.type.match('image.*')){
        reader.readAsDataURL(image)
      }
      reader.onload = (e) => {
        this.ImageUrl = e.target.result
      }
      
    },
    async uploadImage(){
      let formdata = new FormData()
      if(this.files){
        
        formdata.append('image', this.files )
        const config = {
          headers: { "content-type": "multipart/form-data" }
        }
        try {
          //  await this.$axios.$post('/orders/image-upload/', formdata, config)
          await this.$store.dispatch('orders/uploadOrderImage', formdata, config)
          this.dialog = false
          await this.$store.dispatch('orders/getAllOrdres')
          await this.$store.commit('snackbar/setSnack', 'Order Created Successfully')
        }catch(e){
          console.log(e)
        }  
      }
    },
    openDeleteOrderDialog(item){
      this.delOrderdialog = true
      this.deleteInfo = item
    },
    async deleteOrder(slug){
      try{
          // await this.$axios.delete(`/orders/detail/${id}`)
          await this.$store.dispatch('orders/deleteOrder', slug)
          this.delOrderdialog = false
          await this.$store.dispatch('orders/getAllOrdres')
          await this.$store.commit('snackbar/setSnack', 'Order Deleted Successfully')
      }
      catch(e){
        console.log(e)
      }
    },

    async updateOrder(item){
      try {
        await this.$store.dispatch('orders/updateOrderAction', item)
        await this.$store.dispatch('orders/getAllOrdres')
        await this.$store.commit('snackbar/setSnack', 'Order Updated Successfully')

      }catch(e){
        console.log(e)
      }
        
    },

    // cart methods
    async addToCart(item){
      await this.$store.dispatch("carts/addItemtoCart", item)
      await this.$store.dispatch("orders/getAllOrdres")
      await this.$store.dispatch('carts/getAllCarts')
      await this.$store.commit('snackbar/setSnack', 'Order Accepted To Buy')
    }
  },



}
</script>
<style scoped>
  .border{
    border: 1px dotted red;
  }

  .v-card__actions {
    margin-top: -20px;
  }
</style>