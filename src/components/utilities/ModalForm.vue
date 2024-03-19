<template>
    <div class="text-center">
      <!-- <v-btn
        color="primary"
        @click="dialog = true"
      >
        Open Dialog
      </v-btn> -->
  
      <v-dialog
        v-model="dialog"
        width="600"
        rounded
      >
        <v-card>
            <v-card-title class="text-right">
                <h2 class="text-center">Título</h2>
                <font-awesome-icon :icon="['fas', 'xmark']" size="lg" class="dicard-button" @click="dialog = false" />
            </v-card-title>
          <v-card-text>
            <!-- {{ fields }} -->
            <Form :fields="fields" :value="value" key="form" @submit-form="handleSubmitForm"/>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn class="border" color="primary" rounded @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import Form from '../utilities/Form.vue';
export default {
    components: {
        Form
    },
    props: {
        fields: { type: Array, default: [] },
        value: { type: Object, default: {} }
    },
    // methods: {
    //     closeDialog() {
    //         this.$emit('close')
    //     },
    // }
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
        showDialog(){
            this.dialog = true;
        },
        handleSubmitForm(item){
            this.$emit('addItem',item);
            this.dialog = false;
        }
    }
}
</script>

<style>
  .v-card{
    border-radius: 15px!important;
  }

  .v-card-title .fa-xmark{
    cursor: pointer;
    position: absolute!important;
    top: 30%;
    left: 94%;
  }
  /* .discard-button{
    position: absolute!important;
    top: 30%;
    left: 95%;
  } */
</style>