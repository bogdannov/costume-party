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
const { fetchCostumes, fetchUserCostumes } = costumeStore;
const { costumes, userCostumes } = storeToRefs(costumeStore);
const playersToStart = 2;
const costumesNeeded = 2;

onMounted(() => {
  if (user && user.id) {
    connect(user.id, user.name);
    fetchUserCostumes(user.id);
  } else {
    router.push({ name: 'Auth' })
  }
})

watchEffect( () => {
  if (userCostumes.value === undefined) {
    return;
  }
  if (userCostumes.value.length < costumesNeeded) {

    router.push({ name: 'CreateCostume' });
    return;
  }
  if (connected.value >= playersToStart  && costumes.value.length === 0) {
    fetchCostumes();
    return;
  }
  if (connected.value >= playersToStart && costumes.value.length > 0) {
    router.push({ name: 'Party' });
    return;
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
