<template>
  <div>
     <v-footer fixed  app>
      <p  class="hidden-sm-and-down mt-2 red--text lighten-4">
        &copy; {{ new Date().getFullYear() }}
        <!-- <span class="font-weight-light">Harem</span> -->
        <span class="font-weight-light ml-1">P.V.C</span>
       </p>

      <v-row align="center"
            justify="center" 
            class="hidden-md-and-up">
        <!-- home button -->
        <v-btn text app class="ml-3" to="/" active-class="red--text" ripple>
          <div>
            <v-badge right color="white">
              <span slot="badge" class="black--text">{{itemLength}}</span> <!--slot can be any component-->
               <v-icon>fas fa-desktop</v-icon>
            </v-badge>
           
            <br />
            <span style="font-size: 12px;" class="text-capitalize">Home</span>
          </div>
        </v-btn>
        <!-- cart button -->
        <v-btn text app class="ml-3" to="/carts" active-class="red--text" ripple>
          <div>
            <v-badge right color="white">
              <span slot="badge" class="black--text">{{cartLength}}</span> <!--slot can be any component-->
               <v-icon>fas fa-shopping-cart</v-icon>
            </v-badge>
           
            <br />
            <span style="font-size: 12px;" class="text-capitalize">Cart</span>
          </div>
        </v-btn>

         <!-- transer button -->
        <v-btn text app class="ml-3" to="/transfer" active-class="red--text" ripple>
          <div>
            <v-badge right color="white">
              <span slot="badge" class="black--text">{{$store.getters['transfer/transferLength']}}</span> <!--slot can be any component-->
               <v-icon>fas fa-money-check-alt</v-icon>
            </v-badge>
           
            <br />
            <span style="font-size: 12px;" class="text-capitalize">Transfer</span>
          </div>
        </v-btn>

        <!-- login button -->
        <!-- <template v-if="!$auth.$state.loggedIn">
          <v-btn text app class="ml-3" to="/login" active-class="red--text" ripple>
            <div>
            <v-icon>fas fa-money-check-alt</v-icon>
              <br />
              <span style="font-size: 12px;" class="text-capitalize">Login</span>
            </div>
          </v-btn>
        </template> -->
      </v-row>
    </v-footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      itemLength(){
        return this.$store.getters['orders/itemLength']
      },
      cartLength(){
        return this.$store.getters['carts/cartLength']
      }
    },
    data () {
    return {
      links: [
        {id: 1, title: 'Home', icon: 'fas fa-desktop', route: '/', state: this.$store.state.orders.items.length},
        {id: 2, title:'Order', icon: 'fas fa-shopping-cart', route: '/carts', state: this.$store.state.carts.cart.length}
      ],
    }
  }
  }
</script>

<style scoped>
.v-btn:before{
   background-color: #fff;
}
</style>