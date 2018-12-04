const Vue = require('vue');
const app = require('./index.vue');

new Vue({
    el: '#app',
    render: (h) => h(app)
});