import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { User } from '@/types';
import { v4 as uuidv4 } from 'uuid';
export const useAuthStore = defineStore('auth-store', () => {
    const user: Ref<User> = ref({} as User);

    const setUser = (userName: string) => {
        user.value = {
            id: uuidv4(),
            name: userName,
        };
    }

  return {
    user,
    setUser
  };
}, {
    persist: true,
});
