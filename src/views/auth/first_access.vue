<template>
  <v-row
    justify="center"
    align="center"
    class="degrade-background"
    no-gutters
  >
    <v-col
      data-aos="fade-right"
      data-aos-duration="1500"
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
      data-aos-duration="1500"
      xl="5"
      lg="5"
      md="6"
      sm="10"
      cols="10"
    >
      <v-card class="mb-10">
        <h1 class="text-center mx-4 pt-5 changePwd-title">
          Primeiro acesso?
        </h1>

        <h4
          class="text-center mt-n1"
          style="font-weight: normal;"
        >
          Mude a sua senha
        </h4>

        <v-form
          ref="form"
          v-model="valid"
          class="changePwd-form mx-5"
          lazy-validation
          @submit="changePwd()"
        >
          <v-text-field
            v-model="userData.password"
            class="changePwd-input mt-2"
            :rules="[rules.required]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Nova senha"
            prepend-icon="mdi-lock-outline"
            required
            autofocus
            :name="Math.random()"
            @click:append="showPassword = !showPassword"
          />

          <v-text-field
            v-model="userData.password_confirmation"
            class="changePwd-input mt-2"
            :rules="[rules.required, rules.equals]"
            :type="showPassword ? 'text' : 'password'"
            label="Confirme a senha"
            prepend-icon="mdi-lock-outline"
            required
            :name="Math.random()"
          />

          <v-row justify="center" no-gutters>
            <v-col class="center-column" lg="4" md="4" sm="5" cols="5">
              <v-btn
                block
                :disabled="!valid || loading"
                color="primary"
                class="changePwdBtn mt-4"
                type="submit"
                @click="changePwd()"
              >
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="25"
                  width="3"
                  color="white"
                />
                <span
                  v-else
                  class="white--text"
                >
                  Salvar
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      loading: false,
      valid: true,
      errorMessage: '',
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        equals: value => value.localeCompare(this.userData.password) === 0 || 'As senhas não coincidem.'
      },
      userData: {
        password: '',
        password_confirmation: ''
      },
      showPassword: false
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
    changePwd() {
      if (this.$refs.form.validate()) {
        this.loading = true

        const data = {
          password: this.userData.password
        }
        const user = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE))
        const url = `/users/${user._id}/updatePassword`
        request({
          url: url,
          method: 'put',
          data
        })
          .then((res) => {
            this.$notify.success({
              title: 'Tudo certo!',
              message: 'Sua senha foi alterada com sucesso.',
              position: 'bottom-right'
            })
            user.firstAccess = false
            localStorage.setItem(process.env.LOCALSTORAGE, JSON.stringify(user))
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 2000)
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
  /* .degrade-background {
    background: rgb(217,217,217);
    background: linear-gradient(-125deg, rgba(217,217,217,1) 0%, rgba(170,170,170,1) 50%, rgba(189,189,189,1) 50%);
  } */
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

  .changePwd-title {
    letter-spacing: 2px;
    font-size: 25pt;
    font-weight: 400;
  }

  .changePwdBtn {
    min-width: 50% !important;
  }

  .changePwd-form {
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
