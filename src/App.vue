<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth-store';
const { messages, connect } = storeToRefs(useGuiPreferencesStore())
const { user } = storeToRefs(useAuthStore())
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  if (user.value) {
    router.push({ name: 'WaitForParty'})
  } else {
    router.push({ name: 'Auth'})
  }
})
</script>


<template>
  <router-view />
  <pre>{{ messages.join('\n') }}</pre>
</template>

<style lang="scss" scoped>
</style>
