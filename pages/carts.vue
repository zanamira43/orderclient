<template>
  <div>
    <v-row v-if="carts.length" wrap>
      <v-col cols="12" md="4" v-for="cart in carts" :key="cart.id">
          <v-card class="px-1 mx-auto border" :class="`${cart.received ? 'border-green' : ''}`" flat>
            <div>
               <v-card-title class="headline">{{cart.name}}</v-card-title>
            </div>
            <v-divider class="mb-1"></v-divider>
            <div>
              
                <v-img v-if="cart.image" :src="cart.image" height="300px" width="100%" />
                <v-img v-else src="./img/harem-pvc-new-logo.jpg" height="300px" width="100%" />
              

              <div class="ma-2">
                <div class="d-flex justify-between">
                  <h5 class="my-1"> 
                      <v-chip class="cyan" dark> Quantity : {{cart.quantity}} </v-chip>
                  </h5>
                  

                  <div class="my-2 width">
                    <v-text-field label="RQty" flat dense outlined v-model="cart.rquantity">
                    </v-text-field>
                  </div>
                  <v-btn dark  class="red--text my-2" icon
                  @click="updateCartQuantity(cart)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  
                </div>
                
                
                <h5> 
                  <v-chip class="red price-panel" dark> Price <v-icon>mdi-currency-usd</v-icon> :  {{cart.price}}</v-chip>
                </h5>
             
                <v-divider class="my-1"></v-divider>
                
                <h5 class="d-flex justify-between">
                  <v-chip>
                  Sub<v-icon>mdi-currency-usd</v-icon> :  {{cart.total}}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-chip class="grey lighten-3" v-if="cart.rtotal">
                  R-Sub<v-icon>mdi-currency-usd</v-icon> :  {{cart.rtotal}}
                  </v-chip>
                </h5>
                
              </div>
            </div>
            <v-card-actions>
              <span class="font-weight-bold">
                <v-icon class="red--text">mdi-update</v-icon> : 
                {{ $moment(cart.updated).format("dd DD - MM - YYYY  hh:mm" )}}
              </span>
             
              <v-spacer></v-spacer> 
              <v-checkbox v-model="cart.received"  
                  @change="changeCartReceived(cart)" 
                  class="mr-5"></v-checkbox>
              
              <v-btn dark class="deep-orange" small icon @click="removeFromCard(cart)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
     </v-row>
    <v-row v-else>
      <v-col cols="12" md="4" offset-md="4">
        <v-card>
          <p class="red--text text-center title">There No Carts Record</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'carts',
  
  computed:{
    carts(){
      return this.$store.state.carts.cart
    }
  },
  async fetch({store}){
    try{
      await store.dispatch("carts/getAllCarts")
    }catch(e){
      console.log(e)
    }
  },
  

  methods: {
    async removeFromCard(cart){
      await this.$store.dispatch('carts/removeFromCard', cart)
      await this.$store.dispatch("orders/getAllOrdres")
      await this.$store.dispatch('carts/getAllCarts')
      await this.$store.commit('snackbar/setSnack', 'Order Caceled From Cart List')
    },

    async changeCartReceived(cart){
      await this.$store.dispatch('carts/changeCartReceived', cart)
      await this.$store.dispatch("orders/getAllOrdres")
      await this.$store.dispatch('carts/getAllCarts')
      
      await this.$store.commit('snackbar/setSnack', 'Cart received Changed')
    },

    async updateCartQuantity(cart){
      try {
          await this.$store.dispatch('carts/updateCartQuantity', cart)
          await this.$store.dispatch("orders/getAllOrdres")
          await this.$store.dispatch('carts/getAllCarts')
          await this.$store.commit('snackbar/setSnack', 'Cart Quantity Changed')

      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

.border {
  border: 1px dotted red;
}

.border-green {
  border: 2px dotted green;
}
.width {
  width: 120px;
  margin-left: 100px;
}

.price-panel {
  margin-left: 100px;
}
</style>