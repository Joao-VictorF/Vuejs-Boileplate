<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      if (this.to.localeCompare('/minhas-sessões') === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.to = 'http://localhost:9527/minhas-sessões'
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
