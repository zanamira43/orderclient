<template>
  <v-app>
    <!-- Navbar -->
    <Navbar />

    <!-- <v-content> -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- </v-content> -->
   
   <!-- Footer -->
   <Footer />
   <Snackbar />
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import Snackbar from '~/components/Snackbar'

export default {
  components: {
    Navbar,
    Footer,
    Snackbar
  },
  data () {
    return {
      fixed: false,
    }
  }
}
</script>
