<script setup lang="ts">
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { storeToRefs } from 'pinia';

const { connected, players } = storeToRefs(useGuiPreferencesStore());
</script>

<template>
  <v-list
      border
      class="mx-auto connections"
      max-width="256"
  >
    <v-list-item
        link
        prepend-icon="mdi-account-heart-outline"
        title="Нас тут"
    >
      <template v-slot:append>
        <v-badge
            color="error"
            :content="connected"
            inline
        ></v-badge>
      </template>
    </v-list-item>
    <v-list-item
            v-for="(item, i) in players"
            :key="i"
    >
        <template v-slot:prepend>
            <v-icon :icon="'mdi-emoticon-devil'"></v-icon>
        </template>

        <v-list-item-title> {{item.name}} </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.connections {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
