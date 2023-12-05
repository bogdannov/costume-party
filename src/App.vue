<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from 'vue';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth-store';
const { messages } = storeToRefs(useGuiPreferencesStore())
const { user } = storeToRefs(useAuthStore())
import { useRouter } from 'vue-router';

const router = useRouter();
const snackbar = ref(false);
const snackbarText = ref('');

watch(messages, () => {
  snackbar.value = true;
}, {deep: true})

onMounted(() => {
  if (user.value) {
    // TODO #costume get and check for costumes length and only then redirect to WaitForParty other case redirect to create costume
    router.push({ name: 'WaitForParty'})
  } else {
    router.push({ name: 'Auth'})
  }
})
</script>


<template>
  <router-view />
  <v-snackbar
    v-model="snackbar"
  >
    {{ messages[messages.length - 1] }}

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss" scoped>
</style>
