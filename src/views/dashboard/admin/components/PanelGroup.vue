<template>
  <el-row
    :gutter="40"
    class="panel-group"
    justify="center"
  >
    <el-col
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="openLink(1)"
      >
        <div
          class="card-panel-icon-wrapper icon-people active-icon"
        >
          <v-icon
            class="card-panel-icon white--text"
          >
            mdi-account-multiple-check
          </v-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            x
          </div>
          <count-to :start-val="0" :end-val="x" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="openLink(2)"
      >
        <div
          class="card-panel-icon-wrapper icon-testes active-icon"
        >
          <v-icon
            class="card-panel-icon white--text"
          >
            mdi-account-supervisor
          </v-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            y
          </div>
          <count-to :start-val="0" :end-val="y" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="openLink(3)"
      >
        <div
          class="card-panel-icon-wrapper icon-devices active-icon"
        >
          <v-icon
            class="card-panel-icon white--text"
          >
            mdi-account-clock
          </v-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            z
          </div>
          <count-to :start-val="0" :end-val="z" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="openLink(4)"
      >
        <div
          class="card-panel-icon-wrapper icon-testes active-icon"
        >
          <v-icon
            class="card-panel-icon white--text"
          >
            mdi-account-cancel
          </v-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            w
          </div>
          <count-to :start-val="0" :end-val="w" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    z: {
      type: Number,
      required: true
    },
    w: {
      type: Number,
      required: true
    }
  },
  methods: {
    openLink(index) {
      const routes = {
        1: '',
        2: '',
        3: '',
        4: ''
      }

      this.$router.push(routes[index])
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: -3px 5px 10px 4px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .active-icon {
        background: #225674;
        transform: scale(1.1);
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: end;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

  .active-icon {
    color: #fff;
    background: #296282;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }
}
</style>
