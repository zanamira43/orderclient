<template>
  <div>
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" offset-md="3">
        <v-card flat class='card-border'>
          <v-card-title>Login Page</v-card-title>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-card-text>
            <v-text-field type="email" label="Email" outlined v-model="form.email"
             :rules="emailRules" required>
            </v-text-field>
            <v-text-field type="password" label="Password" outlined v-model="form.password" 
            :rules="PasswordRules" required>
            </v-text-field>
          </v-card-text>
          <v-card-actions>
              <!-- <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn> -->

              <v-btn
                color="error"
                class="mr-4"
                @click="reset"
              >
                <v-icon>mdi-format-clear</v-icon>
              </v-btn>

              <!-- <v-btn
                color="warning"
                @click="resetValidation"
              >
                Reset Validation
              </v-btn> -->
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">
                <v-icon size="30">mdi-fingerprint</v-icon>
              </v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    auth: 'guest',

    data: () => ({
      valid: true,
      form: {
        email: '',
        password: '',
      },
      
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      
      PasswordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 8) || 'Password must be less than 8 characters',
      ],
      
      lazy: false,
    }),


    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      async login(){
        try {
          await this.$auth.loginWith("local", {data: this.form})
          this.$router.push("/")
        }catch(e){
          console.log(e)
        }
      }
    },
  }
</script>

<style scoped>
.card-border {
  border: 1px dotted grey;
}
</style>