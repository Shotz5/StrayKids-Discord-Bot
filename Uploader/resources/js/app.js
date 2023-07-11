import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import MainLayout from './Layouts/MainLayout.vue'
import { ZiggyVue } from 'ziggy'
import { InertiaProgress } from '@inertiajs/progress'
import '../css/app.css'

InertiaProgress.init({
  delay: 0,
  color: '#29d',
  includeCSS: true,
  showSpinner: true,
})

createInertiaApp({
  resolve: name => {
    // import meta glob - vite - allows you to load all the javascript modules at once
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })

    // Return specific page for given name
    const page = pages[`./Pages/${name}.vue`]
    page.default.layout = page.default.layout || MainLayout

    return page
  },
  // Normal JS function - function () {}
  // {el: xxx, App: xxx, props: xxx} - Deconstructing - Allows you to get these values from the  
    // object as variables right array
  // Async functions work in the background
    // await forces the function execution to finish before proceeding
  setup({ el, App, props, plugin }) {
    // h - Render function - advanced topic - at end of course
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .mount(el)
  },
})