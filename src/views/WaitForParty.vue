<script setup lang="ts">
import ConnectionPanel from '@/components/ConnectionPanel.vue';
import { storeToRefs } from 'pinia';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth-store';
import { useCostumeStore } from '@/store/costume-store';
const { connect } = useGuiPreferencesStore();
const { user } = useAuthStore();

const router = useRouter();
const { connected } = storeToRefs(useGuiPreferencesStore());
const costumeStore = useCostumeStore();
const { fetchCostumes } = costumeStore;
const { costumes } = storeToRefs(costumeStore);

onMounted(() => {
  if (user && user.id) {
    connect(user.id);
  } else {
    router.push({ name: 'Auth' })
  }
})

watchEffect( () => {
  if (connected.value >= 2  && costumes.value.length === 0) {
    // get costumes
    fetchCostumes();
  }
  if (connected.value >= 2 && costumes.value.length > 0) {
    router.push({ name: 'Party' });
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
