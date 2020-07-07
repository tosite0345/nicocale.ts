import {Configuration} from '@nuxt/types'
const config:Configuration = {
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
  },
}
export default config
