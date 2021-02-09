import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import pt from 'vuetify/lib/locale/pt'

Vue.use(Vuetify)

const theme = {
  primary: '#284761'
}

const opts = {
  lang: {
    locales: { pt },
    current: 'pt'
  },
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
}

export default new Vuetify(opts)
