<script setup lang="ts">
import CustomTextInput from '@/components/CustomTextInput.vue';
import { useRouter } from 'vue-router';
import { onUnmounted, ref } from 'vue';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';
import { useAuthStore } from '@/store/auth-store';
const { connect } = useGuiPreferencesStore();

const { setUser } = useAuthStore();
const router = useRouter();
const defaultMessage = 'Рижа мавпа';
const isWaiting = ref(false);
const audio = ref();
const isPlayed = ref(false);
const isSoundOn = ref(false);


const send = () => {
  return new Promise((resolve) => resolve(true));
}
const playSound = () => {
  if (isPlayed.value) {
    return;
  }
  audio.value = new Audio('/whoami.mp3')
  audio.value.play()
  isPlayed.value = true;
}

onUnmounted(() => {
  audio.value.pause();
  audio.value = '';
})
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
  <v-card class="mx-auto pa-2" max-width="400" color="grey-lighten-3" v-if="!isSoundOn">
    <v-card-title>Включи звук! И погромче сделай)</v-card-title>
    <v-btn append-icon="mdi-hand-okay" -icon="mdi-go-kart" variant="outlined" @click="isSoundOn = true">Готово!</v-btn>
  </v-card>
  <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="400"
    v-else
  >
    <v-card-title>Тут напиши имя свое</v-card-title>
    <v-card-text>
      <custom-text-input
        @on-send="onSent"
        @on-blur="playSound"
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
