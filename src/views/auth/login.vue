<template>
  <v-container
    fluid
    class="degrade-background"
    style="height: 100%"
  >
    <v-row justify="center">
      <v-col
        cols="11"
        class="d-flex justify-start pl-0"
      >
        <v-btn
          text
          fab
          link
          @click="$router.push('/')"
        >
          <v-icon
            color="gray"
          >
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      no-gutters
    >
      <v-col
        data-aos="fade-right"
        data-aos-duration="1000"
        class="center-column"
        xl="5"
        lg="5"
        md="5"
        sm="10"
        cols="10"
      >
        <img src="/full-logo.png" width="70%">
      </v-col>

      <v-col
        data-aos="fade-left"
        data-aos-duration="1000"
        xl="5"
        lg="5"
        md="6"
        sm="10"
        cols="10"
      >
        <v-card class="mb-10">
          <h1 class="text-center mx-4 pt-5 login-title">
            Entrar
          </h1>

          <v-form
            ref="form"
            v-model="valid"
            class="login-form mx-5"
            lazy-validation
            @submit="login()"
          >
            <v-text-field
              v-model="loginData.email"
              :rules="[rules.required]"
              label="Email"
              class="login-input"
              prepend-icon="mdi-at"
              required
              autofocus
            />

            <v-text-field
              v-model="loginData.password"
              class="login-input mt-2"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              prepend-icon="mdi-lock-outline"
              required
              @click:append="showPassword = !showPassword"
            />

            <v-row
              justify="center"
              no-gutters
            >
              <v-col
                class="center-column"
                lg="4"
                md="4"
                sm="5"
                cols="5"
              >
                <v-btn
                  block
                  :disabled="!valid || loading"
                  color="primary"
                  class="loginBtn"
                  type="submit"
                  @click="login()"
                >
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="25"
                    width="3"
                    color="white"
                  />
                  <span v-else class="white--text">
                    Entrar
                  </span>
                </v-btn>
              </v-col>

              <v-col
                cols="10"
                class="d-flex justify-center mt-5"
              >
                <router-link to="/recuperar-senha">
                  <span style="color: grey">Esqueceu a sua senha?</span> Clique aqui!
                </router-link>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      valid: true,
      showPassword: false,
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        email: v => /.+@.+\..+/.test(v) || 'Informe um email válido!'
      },
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user
      },
      set(val) {
        this.$store.dispatch('user/saveUser', {
          value: val
        })
      }
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = this.loginData
        request({
          url: '/login',
          method: 'post',
          data
        })
          .then((res) => {
            var json = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE)) || {}

            json = {
              selected_therapist: json.selected_therapist,
              accessToken: res.data.user.accessToken,
              __t: res.data.user.__t,
              firstAccess: res.data.user.firstAccess,
              _id: res.data.user._id,
              billing_adress: res.data.user.billing_adress ?? null
            }
            localStorage.setItem(process.env.LOCALSTORAGE, JSON.stringify(json))

            res.data.user.firstAccess === true ? this.$router.push('/primeiro-acesso') : this.$router.push('/dashboard')
          })
          .catch((err) => {
            this.loading = false
            this.$notify.error({
              title: 'Algo de errado aconteceu!',
              message: err.response.data.message,
              position: 'bottom-right'
            })
          })
      }
    }
  }
}
</script>

<style scoped>
  .degrade-background {
    background: #f6f7fa;
    background: linear-gradient(125deg, #f6f7fa 0%, #dfdfdf 50%, rgb(214, 214, 214) 50%);
  }

  .start-column {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .center-column {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .end-column {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login-title {
    letter-spacing: 2px;
    font-size: 25pt;
    font-weight: 400;
  }

  .loginBtn {
    min-width: 50% !important;
  }

  .login-form {
    padding: 25px;
  }

  .p-0 {
    padding: 0px !important;
  }

  .errors {
    margin-top: 15px;
    color: firebrick;
    text-align: center;
  }
</style>
