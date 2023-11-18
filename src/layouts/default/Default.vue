<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>

<template>
  <v-app>
    <default-view />
  </v-app>
</template>


<style>
  .v-application {
    background-color: #d8b2e3 !important;
  }
  .v-main {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }
</style>
