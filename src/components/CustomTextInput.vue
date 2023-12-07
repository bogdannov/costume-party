<script setup lang="ts">
import { required } from '@/helpers/validation';
import { ref } from 'vue';
import { Ref } from 'vue';
type Props = {
  label: string,
  send: (value: string) => Promise<any>,
  defaultMessage?: string,
  validationOnSend?: (value: string) => string | boolean,
  icon?: string,
}
const emit = defineEmits(['onSend', 'onBlur']);
const props = defineProps<Props>();

const defaultErrorMessage = 'Свое напиши))';
const message = ref(props.defaultMessage ?? '');
const isErrorValidation = ref(false);
const errorMessage = ref('');
const isSuccess = ref(false);
const isSending = ref(false);

const validationSameValue = (value: string) => {
  if (value === props.defaultMessage) {
    return defaultErrorMessage;
  }
  return true;
}


const send =  async () => {
  if (isSuccess.value) {
    return;
  }
  const isValid = validationSameValue(message.value);
  if (typeof isValid === 'string' || !isValid) {
    errorMessage.value = typeof isValid === 'string' ? isValid : '';
    isErrorValidation.value = true;

    setTimeout(() => {
      isErrorValidation.value = false;
      errorMessage.value = '';
    }, 3000);
  } else {
    isErrorValidation.value = false;
  }
  if (!isErrorValidation.value) {
    // send request
    isSending.value = true;
    const response = await props.send(message.value);
    if (response) {
      isSuccess.value = true;
      emit('onSend', message.value);
    }
    isSending.value = false;
  }
}
</script>

<template>
  <v-text-field
    v-model="message"
    :append-inner-icon="props.icon ?? 'mdi-emoticon-cool'"
    variant="filled"
    clear-icon="mdi-close-circle"
    clearable
    :label="props.label"
    type="text"
    :rules="[required]"
    @click:control="emit('onBlur')"
    @click:append="send"
    @click:clear="() => message = ''"
    :error="isErrorValidation"
    :error-messages="errorMessage"
  >
    <template #append>
      <v-progress-circular
          v-if="isSending"
          indeterminate
          color="purple"
      ></v-progress-circular>
      <v-btn v-else
             @click="send"
             variant="text"
             size="auto"
             :icon="!isSuccess ? 'mdi-send' : 'mdi-thumb-up'"
      ></v-btn>
    </template>
  </v-text-field>
</template>

<style scoped>

</style>
