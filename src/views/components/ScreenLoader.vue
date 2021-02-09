<template>
  <v-row
    v-if="show"
    align="center"
    class="row-class"
  >
    <v-col
      cols="12"
      class="d-flex flex-column align-center justify-center my-5"
    >
      <div class="text-center">
        <v-progress-circular
          indeterminate
          size="50"
          width="2"
          color="primary"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .row-class {
    height: calc(100vh - 100px);
    overflow-y: hidden;
  }
</style>
