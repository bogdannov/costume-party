<script setup lang="ts">
import CustomTextInput from '@/components/CustomTextInput.vue';
import { computed, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth-store';
import { createCostume } from '@/api/costume';

const { user } = useAuthStore();
const router = useRouter();
const costumesSent = ref(0);
const isAllCostumesSent = computed(() => costumesSent.value === 2)
const audio = ref();
audio.value = new Audio('/nice.mp3')
const send = (title: string) => {
  return createCostume(user, title);
}

const onSend = () => {
  costumesSent.value += 1;
  playSound()
}

const playSound = () => {
  audio.value.play()
}

onUnmounted(() => {
  audio.value = undefined;
})

const party = () => {
  router.push({ name: 'WaitForParty' })
}
</script>

<template>
  <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="400"
  >
    <v-card-title>Тут напиши costumes свои</v-card-title>
    <v-card-subtitle>{{costumesSent}}/2</v-card-subtitle>
    <v-card-text>
      <custom-text-input
        default-message="Дикий пингвин"
        label="Тут напиши костюм номер раз"
        :send="send"
        :icon="'mdi-penguin'"
        @on-send="onSend"
      />
      <custom-text-input
        default-message="Шляпа расспределитель"
        label="А тут напиши костюм номер два"
        :send="send"
        :icon="'mdi-wizard-hat'"
        @on-send="onSend"
      />
      <v-card-subtitle v-if="isAllCostumesSent">Thank you. Костюмі приняті</v-card-subtitle>
      <v-btn prepend-icon="mdi-go-kart" variant="outlined" @click="party" v-if="isAllCostumesSent">Поехалииии!</v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
