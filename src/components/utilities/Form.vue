<template>
    <v-container>
        <v-form @submit.prevent="submitForm">
            <v-row v-for="(field, index) in getCrudFields(fields)" :key="index">
                <v-col
                    cols="3"
                    class="d-flex align-center"
                >
                    <v-label><b>{{ field.text }}</b></v-label>
                </v-col>

                <v-col
                    cols="9"
                >
                    <v-text-field
                        v-if="typeof field.type === 'undefined' || field.type === 'text'" 
                        v-model="form[field.name]"
                        variant="solo" 
                        rounded
                        hide-details
                    ></v-text-field>

                    <v-text-field
                        v-if="field.type === 'integer'" 
                        v-model="form[field.name]"
                        variant="solo" 
                        rounded
                        hide-details
                        type="number"
                        min="0"
                        step="1"
                    ></v-text-field>

                    <v-select
                        v-if="field.type === 'select'"
                        v-model="form[field.name]"
                        label="Seleccione"
                        rounded
                        :items="field.items"
                        :item-title="field.options.attr"
                        :item-value="field.options.value"
                        variant="solo"
                        hide-details
                    ></v-select>
                </v-col>
            </v-row>
            <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
<!-- 
        <v-text-field 
            variant="solo" 
            rounded
            max-errors="2"
            :error-messages="['Fatal error', 'Another error']"
            error
        ></v-text-field>
        <v-text-field 
            variant="solo" 
            rounded
            prefix="+56"
        ></v-text-field>
        <v-select
            label="Seleccione"
            rounded
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="solo"
        ></v-select>

        <v-select
            label="Seleccione"
            rounded
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="solo"
        ></v-select>

        <v-switch
            label="Switch"
            color="info"
            hide-details
            inset
        ></v-switch>

        <v-textarea
            no-resize
            rows="3"
            variant="solo"
        ></v-textarea> -->

        <!-- <v-checkbox
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox> -->
    </v-container>
</template>
  
<script>
    const api = [
        { team: "Los Ángeles Lakers", val: 'LAL' },
        { team: "Brooklyn Nets", val: 'BKN' },
        { team: "Golden State Warriors", val: 'GSW' },
        { team: "Milwaukee Bucks", val: 'MIL' }
    ]
    export default {
        props: {
            fields: { type: Array, default: [] },
            value: { type: Object, default: {} }
        },
        data() {
            return {
                form: {},
            }
        },
        mounted(){
            const keys = Object.keys(this.value);
            this.fields.map(field => {
                if (field.name.includes('.')){
                    const attributes = field.name.split('.');
                    if (keys.includes(attributes[0])){
                        field.value = this.value[attributes[0]][attributes[1]];
                    }
                }else{
                    if (keys.includes(field.name)){
                        field.value = this.value[field.name];
                    }
                }

                if (typeof field.options !== 'undefined'){
                    // Obtener datos según la query
                    field.items = api;
                    const item = api.find(e => e[field.options.value] === field.value);
                    field.value = typeof item !== 'undefined' ? item[field.options.attr] : undefined;
                }

                if (keys.length === 0){
                    field.value = undefined;
                }

                this.form[field.name] = field.value;
            })
        },
        methods:{
            getCrudFields(fields){
                return fields.filter(field => field.name !== 'operation' && field.name !== 'title');
            },
            submitForm(){
                const keys = Object.keys(this.form);
                keys.map(key => {
                    if (key.includes('.')){
                        const attributes = key.split('.');
                        // console.log(attributes);
                        if (typeof this.form[attributes[0]] === 'undefined'){
                            this.form[attributes[0]] = {}
                        }
                        this.form[attributes[0]][attributes[1]] = this.form[key];
                        delete this.form[key];
                    }
                })
                this.$emit('submit-form', this.form);
                // console.log('Submitted form', this.form);
            }
            // getValue(field){
            //     const keys = Object.keys(this.value);

            //     if (field.name.includes('.')){
            //         const attributes = field.name.split('.');
            //         if (keys.includes(attributes[0])){
            //             field.value = this.value[attributes[0]][attributes[1]];

            //         }else if (Object.keys(this.value).length === 0){
            //             field.value = undefined;
            //         }
            //     }else{
            //         if (keys.includes(field.name)){
            //             field.value = this.value[field.name];
            //         }else if (Object.keys(this.value).length === 0){
            //             field.value = undefined;
            //         }
            //     }

            //     if (typeof field.options !== 'undefined'){
            //         // Obtener datos según la query
            //         field.items = api;
            //         const item = api.find(e => e[field.options.value] === field.value);
            //         field.value = typeof item !== 'undefined' ? item[field.options.attr] : '';
            //     }

            //     return field.value;
            // }
        }
        // data() {
        //     return {
        //         message: 'Hello from dynamic component!'
        //     }
        // }
    }
</script>

<style>
.v-text-field__prefix{
    opacity: 1;
}
</style>