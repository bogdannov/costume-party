<script setup lang="ts">
import CustomTextInput from '@/components/CustomTextInput.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGuiPreferencesStore } from '@/store/gui-preferences-store';

const { send: sendBroadcast } = useGuiPreferencesStore();
const router = useRouter();
const succeed = ref([]);
const isSuccess = computed(() => succeed.value.length === 2)
const send = () => {
  return new Promise((resolve, reject) => resolve(true))
}

const onSend = () => {
  succeed.value.push(true);
}

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
    <v-card-subtitle>{{succeed.length}}/2</v-card-subtitle>
    <v-card-text>
      <custom-text-input
        :validation-on-send="() => true"
        default-message="Дикий пингвин"
        label="Тут напиши костюм номер раз"
        :send="send"
        :icon="'mdi-penguin'"
        @on-send="onSend"
      />
      <custom-text-input
        :validation-on-send="() => true"
        default-message="Шляпа расспределитель"
        label="А тут напиши костюм номер два"
        :send="send"
        :icon="'mdi-wizard-hat'"
        @on-send="onSend"
      />
      <v-card-subtitle v-if="isSuccess">Thank you. Костюмі приняті</v-card-subtitle>
      <v-btn prepend-icon="mdi-go-kart" variant="outlined" @click="party" v-if="isSuccess">Поехалииии!</v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
