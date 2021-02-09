<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
  // ,
  // mounted() {
  //   $gn.ready(function(checkout) {
  //     var callback = function(error, response) {
  //       if (error) {
  //         // Trata o erro ocorrido
  //         console.error(error)
  //       } else {
  //         // Trata a resposta
  //         console.log(response)
  //       }
  //     }

  //     checkout.getPaymentToken({
  //       brand: 'visa', // bandeira do cartão
  //       number: '4012001038443335', // número do cartão
  //       cvv: '123', // código de segurança
  //       expiration_month: '05', // mês de vencimento
  //       expiration_year: '2021' // ano de vencimento
  //     }, callback)
  //   })
  // }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  .v-application {
   font-family: 'Noto Sans', sans-serif !important;
  }

  .app-main, .main-container, .background {
    background-color: #fdfdfd;
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 20px !important;
    font-weight: 500;
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
  .v-data-table > .v-data-table__wrapper > table > thead > tr > td,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
    font-size: 16px !important;
  }

  .v-data-table>.v-data-table__wrapper tbody tr.v-data-table__expanded__content {
    -webkit-box-shadow: inset 0 -1px 0px -1px rgba(50,50,50,.75), inset 0 -2px 6px -5px rgba(50,50,50,.75) !important;
    box-shadow: inset 0 -1px 0px -1px rgba(50,50,50,.75), inset 0 -2px 6px -5px rgba(50,50,50,.75) !important;
  }

  .v-text-field__slot label, .v-select__slot label {
    font-weight: 400;
  }

  .v-timeline-item__divider {
    margin-top: 10px;
  }

  .v-navigation-drawer {
    z-index: 99;
  }

  .masked-input {
    margin-top: 9px;
    border-bottom: 1px solid rgba(130,130,130,.9);
    width: 100%;
    border-radius: 3px;
    padding: 9px;
  }

  .masked-input:focus {
    outline: none !important;
    border: none;
    border-bottom: 1px solid rgba(130,130,130,.9);
  }

  .v-application ul {
    padding-left: 0 !important;
  }

  .form-control {
    background-color:#f5f5f5;
    border: medium none;
    border-radius: 4px;
    color: #66615b;
    font-size: 14px;
    transition: background-color .3s ease 0s;
    padding: 7px 18px;
    height: 40px;
    width: 90%;
    outline: none !important;
  }

  .v-speed-dial {
    position: absolute;
  }

  .v-btn--floating {
    position: relative;
  }

  .wscnph {
    object-fit: contain;
    max-width: 100%;
    height: auto;
  }
</style>
