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
          <v-card-text>
            <component :is="component" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
  
<script>
export default {
    props: {
      component: Object
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
        }
    }
}
</script>

<style>
  .v-card{
    border-radius: 15px!important;
  }
</style>