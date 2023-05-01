import { defineStore } from 'pinia';
interface UserInfo {
  displayName: string;
  email: string;
  profilePicture: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {} as UserInfo | {},
    token: '',
  }),
  getters: {},
  actions: {},
});
