const Vue = require('vue');
const app = require('./index.vue');
const { LoaderPlugin } = require('vue-google-login');

Vue.use(LoaderPlugin, {
    client_id: '931239577838-1j1f1jb25jkduhupr3njdqrho1ae85bs.apps.googleusercontent.com'
});

new Vue({
    el: '#app',
    render: (h) => h(app)
});