<template>
    <div class="crud">
        <v-btn 
            @click = createItem()
            class="mb-3"
        >Crear</v-btn>

        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="pagination.itemsPerPage"
            @update:pagination="getData"
        >
            <template v-slot:top>
                <v-text-field
                    :model-value="pagination.itemsPerPage"
                    class="pa-2"
                    label="Items per page"
                    max="15"
                    min="-1"
                    type="number"
                    hide-details
                    @update:model-value="pagination.itemsPerPage = parseInt($event, 10)"
                ></v-text-field>
            </template>

            <template v-slot:bottom>
                <div class="text-center pt-2">
                    <v-pagination
                    v-model="pagination.page"
                    :length="pageCount"
                    @update:model-value="getData"
                    ></v-pagination>
                </div>
            </template>
        </v-data-table>
        <!-- <EasyDataTable
            :headers="headers"
            :items="items"
            buttons-pagination
            table-class-name="customize-table"
        >
            <template v-for="header in headers" #header="header" class="text-right">
                <div class="customize-header">
                    <font-awesome-icon v-if="hasIcon(header)" :icon="getIcon(header)" class="header-icon me-1" />
                    {{ header.text }}
                </div>
            </template>

            <template v-if="hasOptions()" #item-operation="item">
                <div class="operation-wrapper d-flex justify-content-end">
                    <v-btn
                        class="my-2 mx-1 rounded-circle"
                        @click="editItem(item)"
                    >
                        <font-awesome-icon v-if="u" :icon="['fas', 'pen']"/>
                    </v-btn>
                    <v-btn
                        class="my-2 mx-1 rounded-circle"
                        @click="deleteItem(item)" 
                    >
                        <font-awesome-icon v-if="d" :icon="['fas', 'trash-can']"/>
                    </v-btn>
                </div>
            </template>

        </EasyDataTable> -->

        <!-- <Modal ref="dialog" :component="form"/> -->
        <ModalForm :fields="fields" :value="itemToEdit" key="adf" ref="dialog" @addItem = "addItem" />
    </div>
</template>

<script lang="ts">
// import type { Header, Item } from "vue3-easy-data-table";
import Form from '../utilities/Form.vue';
import ModalForm from '../utilities/ModalForm.vue';
// import { shallowRef, ref } from "vue";

// const dialog = shallowRef(Form);
// let thisModal= ref(null);
export default {
    components: {
        Form,
        ModalForm
    },
    props: {
        api: { type: String, default: undefined },
        fields: { type: Array, default: [] },
        c: { type: Boolean, default: false }, // Show button to create new item with form
        r: { type: Boolean, default: false }, // Show search bar
        u: { type: Boolean, default: false }, // Show button to edit
        d: { type: Boolean, default: false }, // Show button to delete
    },
    data(){
        return {
            // headers: [] as Header[],
            // items: [] as Item[],
            headers: [],
            items: [],
            data: [],
            options: false,
            showModal: false,
            itemToEdit: {},
            pagination: {
                page: 1,
                itemsPerPage: 10,
                total: 0,
            }
            
            // form: Form,
        }
    },
    mounted(){
        this.transformData();
        this.getData();
    },
    computed: {
        pageCount() {
            if (this.pagination.itemsPerPage) {
                return Math.ceil(this.pagination.total / this.pagination.itemsPerPage)
            }
        },
    },
    methods:{
        getData(){
            this.$axios.get(this.api, { params: { page: this.pagination.page, per_page: this.pagination.itemsPerPage } }).then(a => {
                this.items = a.data.data;
                this.pagination.total = a.data.total;
            });
        },
        transformData(){
            this.headers = this.fields.map(field => {
                return typeof field.width !== 'undefined' ? { title: field.text,  key: field.name, width: field.width } : { title: field.text,  key: field.name };
            });
        },
        hasIcon(item){
            return this.fields.find(field => field.name === item.value && typeof field.icon !== 'undefined');
        },
        getIcon(item){
            const { icon } = this.fields.find(field => field.name === item.value && typeof field.icon !== 'undefined');
            return icon;
        },
        hasOptions(){
            return this.fields.find(field => field.name === 'operation');
        },
        createItem(){
            this.$refs.dialog.showDialog();
            this.itemToEdit = {};
        },
        editItem(item){
            this.$refs.dialog.showDialog();
            console.log('Edit: ',item);
            this.showModal = true;
            this.itemToEdit = item;
        },
        async deleteItem(item){
            this.$axios.delete(this.api + "/" + item.id).then(a => {
                this.getData();
            })
            // this.items = this.items.filter(i => i.player !== item.player);
        },
        addItem(item){
            console.log(item);
            this.items.push(item);
        }
    }
}
</script>

<style>
.customize-table{
    --easy-table-border: 1px solid #e0e0e0;;
    --easy-table-row-border: none;

    --easy-table-body-row-font-size: 16px;
}

thead{
    border-bottom: 1px solid black!important;
}

.v-btn{
    border-radius:28px!important;
 } 
</style>