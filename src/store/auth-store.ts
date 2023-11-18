import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
export const useAuthStore = defineStore('auth-store', () => {
    const user = ref(null);

    const setUser = (userName: string) => {
        user.value = userName;
        console.log('here');
    }

  return {
    user,
    setUser
  };
}, {
    persist: true,
});
