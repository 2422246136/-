var resources = [
    {name: 'Vue', path: '/inventoryManagement/static/vue.min.js'},
    {name: 'VueRouter', path: '/inventoryManagement/static/vue-router.min.js'},
    {name: 'Vuex', path: '/inventoryManagement/static/vuex.min.js'},
    {name: 'iview', path: '/inventoryManagement/static/iview.min.js', css: '/inventoryManagement/static/iview.css'},
    {name: 'axios', path: '/inventoryManagement/static/axios.min.js'},
    {name: 'moment', path: '/inventoryManagement/static/moment.min.js'},
];
resources.forEach(function (val) {
    if (typeof window[val.name] === 'undefined') {
        document.write(unescape("%3Cscript src='" + val.path + "' type='text/javascript'%3E%3C/script%3E"));
        if (val.css) {
            loadStyle(val.css);
        }
    }
});


function loadStyle(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}
