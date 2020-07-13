<template>
 <nav>
   <!-- navigation toolbar -->
    <v-app-bar color="white" light app class="line grey lighten-4" flat>
      <!-- side bar icon -->
      <v-app-bar-nav-icon 
      color="red" 
      @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text--uppercase red--text hidden-sm-and-down">
        <!-- <span class="font-weight-light">Harem</span> -->
        <span>P.V.C</span>
      </v-toolbar-title>

       
      <v-spacer></v-spacer>

      <template>
        <v-text-field
          class="mt-5"
          name="search"
          rounded
          background-color="grey lighten-2"
          placeholder="Search"
          append-outer-icon="mdi-magnify"
        ></v-text-field>
      </template>

      <v-app-bar-nav-icon 
      color="red lighten-4"
      @click="rightDrawer = !rightDrawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- side bar navigation -->
    <v-navigation-drawer
      v-model="drawer" 
      dark 
      app 
      mini-variant 
      class="red"
      enable-resize-watcher
      >
      <v-list flat>
        <v-list-item class="mb-12">
          <v-list-item-action>
            <v-icon size="30">fas fa-cog</v-icon>
            <!-- <v-img src="/img/harem-pvc-new-logo.jpg" contain/> -->
          </v-list-item-action>
        </v-list-item>

        <v-list-item router to="/">
          <v-list-item-action>
          <v-badge color="white">
            <template v-slot:badge>
              <span class="red--text">{{$store.getters['orders/itemLength'] }}</span>
            </template>
          </v-badge>
          <v-icon>fas fa-desktop</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item router to="/carts">
          <v-list-item-action>
            <v-badge color="white">
              <template v-slot:badge>
                <span class="red--text">{{$store.getters['carts/cartLength']}}</span>
              </template>
            </v-badge> 
            <v-icon>fas fa-shopping-cart</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item router to="/transfer">
          <v-list-item-action>
            <v-badge color="white">
              <template v-slot:badge>
                <span class="red--text">{{$store.getters['transfer/transferLength']}}</span>
              </template>
            </v-badge> 
            <!-- <v-icon size="32">mdi-file-chart</v-icon> -->
            <v-icon size="25">fas fa-money-check-alt</v-icon>
          </v-list-item-action>
        </v-list-item>
      
        <template v-if="!$auth.$state.loggedIn">
          <v-list-item router to="/login" class="whit--text">
          <v-list-item-action>
            <!-- <v-badge color="white">
              <template v-slot:badge>
                <span class="red--text">{{$store.getters['carts/cartLength']}}</span>
              </template>
            </v-badge>  -->
            <!-- <v-icon size="32">mdi-file-chart</v-icon> -->
            <v-icon size="28">fas fa-sign-in-alt</v-icon>
          </v-list-item-action>
        </v-list-item>
        </template>
        
      </v-list>
    </v-navigation-drawer>

    <!-- right side nav bar -->

    <v-navigation-drawer right v-model="rightDrawer" app light class="pa-3 grey lighten-4" temporary>
     <v-toolbar flat>
       <v-toolbar-title>Reporting</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-btn text icon @click="rightDrawer = false">
         <v-icon color="red">mdi-close</v-icon>
       </v-btn>
       
     </v-toolbar>

      <!-- roporting block -->
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">Counts</div>
                  <v-list-item-title class="headline mb-1">ITEMS</v-list-item-title>
                  <v-list-item-subtitle>Count Of Items That we Uploaded</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-icon color="red">fas fa-desktop</v-icon>
                </v-list-item-avatar>
              </v-list-item>

            <v-card-actions class="ml-5">
              <v-chip class="mr-2 cyan darken-1 font-weight-bold" outlined>
                {{$store.getters['orders/itemLength'] }}
                </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">accepted</div>
                  <v-list-item-title class="headline mb-1">Carts</v-list-item-title>
                  <v-list-item-subtitle>Count Of Carts  & Total Price</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-icon color="red">fas fa-shopping-cart</v-icon>
                </v-list-item-avatar>
              </v-list-item>

            <v-card-actions class="ml-5">
              <v-chip class="orange font-weight-bold" outlined>
                {{$store.getters['carts/cartLength'] }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip class="orange font-weight-bold" outlined>
                <v-icon>mdi-currency-usd </v-icon>{{$store.getters['carts/cartAllTotal'] }}
                </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">Recieved</div>
                  <v-list-item-title class="headline mb-1">Arrived</v-list-item-title>
                  <v-list-item-subtitle>Count of Recieved  & Total Price</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-icon color="red">fas fa-truck</v-icon>
                </v-list-item-avatar>
              </v-list-item>

            <v-card-actions class="ml-5">
              <v-chip class="orange darken-2 font-weight-bold" outlined>
                {{$store.getters['carts/cartRecievedLength'] }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip class="orange darken-2 font-weight-bold" outlined>
                <v-icon>mdi-currency-usd </v-icon>{{$store.getters['carts/cartTotalByReceived'] }}
                </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">Refunded</div>
                  <v-list-item-title class="headline mb-1">Transfer</v-list-item-title>
                  <v-list-item-subtitle>Amount of Money That We Transfered</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-icon color="red" medium>fas fa-money-check-alt</v-icon>
                </v-list-item-avatar>
              </v-list-item>

            <v-card-actions class="ml-5">
              <v-chip class="grey font-weight-bold" outlined>
                {{$store.getters['transfer/transferLength']}}
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip class="grey font-weight-bold" outlined>
                <v-icon>mdi-currency-usd </v-icon>
                {{$store.getters['transfer/totalTransfer']}}
                </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-navigation-drawer>

 </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data(){
      return {
        drawer: this.$vuetify.breakpoint.mdAndUp,
        rightDrawer: false
      }
    },
    
  }
</script>

<style scoped>

</style>