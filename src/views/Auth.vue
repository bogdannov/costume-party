<script setup lang="ts">
import CustomTextInput from '@/components/CustomTextInput.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { useAuthStore } from '@/store/auth-store';
const { connect } = useGuiPreferencesStore();

const { setUser } = useAuthStore();
const router = useRouter();
const defaultMessage = 'Рижа мавпа';
const isWaiting = ref(false);

const send = () => {
  return new Promise((resolve) => resolve(true));
}

const onSent = (name: string) => {
  isWaiting.value = true;
  setUser(name);
  setTimeout(() => {
    isWaiting.value = false;
    router.push({ name: 'CreateCostume' })
  }, 2000);
}
</script>

<template>
  <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="400"
  >
    <v-card-title>Тут напиши имя свое</v-card-title>
    <v-card-text>
      <custom-text-input
        @on-send="onSent"
        :send="send"
        label="Хто я?"
        :default-message="defaultMessage"
      />
    </v-card-text>
    <v-card-subtitle v-if="isWaiting">Ща дальше идем, сек</v-card-subtitle>
  </v-card>
</template>

<style scoped>

</style>
