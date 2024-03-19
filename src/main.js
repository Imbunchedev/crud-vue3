import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import './assets/main.css'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

import Crud from './components/crud/Crud.vue';
import Modal from './components/utilities/Modal.vue';

import axiosPlugin from './plugins/axiosPlugin';
library.add(faUser);
library.add(faShield);
library.add(faTrashCan);
library.add(faPen, faXmark);

const vuetify = createVuetify({
    components: {
        ...components,
        VDataTable,
    },
    directives,
});

const app = createApp(App)
app.use(vuetify);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Crud', Crud);
app.component('Modal', Modal);

app.use(router)
app.use(axiosPlugin);

app.mount('#app')
