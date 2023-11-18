<script setup lang="ts">
import ConnectionPanel from '@/components/ConnectionPanel.vue';
import { storeToRefs } from 'pinia';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const { connect, triggerConnections } = useGuiPreferencesStore();


const router = useRouter();
const { connected } = storeToRefs(useGuiPreferencesStore());

onMounted(() => {
  connect();
})

watchEffect(() => {
  if (connected.value >= 2) {
    router.push({ name: 'Party' })
  }
})
</script>

<template>
  <div>
    <h1>Ждем остальнх</h1>
  </div>
  <ConnectionPanel />
</template>

<style scoped>

</style>
