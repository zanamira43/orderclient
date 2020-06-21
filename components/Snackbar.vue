<template>
  <v-snackbar v-model="show">
     <span color="white">{{message}}</span>
    <v-btn text color="white" @click.native="show = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data(){
      return {
        show: false,
        message: ''
      }
    },
    created(){
      this.$store.watch(state => state.snackbar.snack, () => {
        const msg = this.$store.state.snackbar.snack
        if(msg != ''){
          this.show = true
          this.message = this.$store.state.snackbar.snack,
          this.$store.commit('snackbar/setSnack', this.message)
        }
      })
    }
  }
</script>

<style scoped>

</style>