<template>
  <v-row
    justify="center"
    align="center"
    class="degrade-background"
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
        <h1 class="text-center mx-4 pt-5 recoveryPwd-title">
          Recuperar senha
        </h1>

        <v-form
          ref="form"
          v-model="valid"
          class="recoveryPwd-form mx-5"
          lazy-validation
          @submit="recoveryPwd()"
        >
          <v-text-field
            v-model="userData.email"
            class="recoveryPwd-input mt-2"
            :rules="[rules.required, rules.email]"
            prepend-icon="mdi-at"
            type="email"
            label="E-mail"
            required
            :name="Math.random()"
          />

          <v-row justify="center" no-gutters>
            <v-col class="center-column" lg="4" md="4" sm="5" cols="5">
              <v-btn
                block
                :disabled="!valid || loading"
                color="primary"
                class="recoveryPwdBtn"
                type="submit"
                @click="recoveryPwd()"
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
                  Enviar código
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
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        email: v => /.+@.+\..+/.test(v) || 'Informe um email válido!'
      },
      userData: {
        email: ''
      }
    }
  },
  methods: {
    recoveryPwd() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = this.userData
        request({
          url: '/recoverPassword',
          method: 'post',
          data
        })
          .then((res) => {
            this.$notify.success({
              title: 'Ok!',
              message: res.data.message,
              position: 'bottom-right'
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 5000)
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

  .recoveryPwd-title {
    letter-spacing: 2px;
    font-size: 25pt;
    font-weight: 400;
  }

  .recoveryPwdBtn {
    min-width: 50% !important;
  }

  .recoveryPwd-form {
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
