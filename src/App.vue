<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <v-container>
      <v-row>
        <v-col cols="12">
          <RouterLink to="/about">About</RouterLink>
        </v-col>
      </v-row>
    </v-container>

    
  </header>
  <v-container>
    <v-row>
      <v-col cols="12" class="py-5 mt-5">
        <RouterView />
      </v-col>
    </v-row>
  </v-container>
  
</template>
