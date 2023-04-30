import { defineStore } from "pinia"
interface UserInfo {
  displayName: string,
  email: string,
  profilePicture: string
}


export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {} as UserInfo | {},
    token: '',
  }),
  getters: {
    isLogin:(state) => {
      return !!state.token
    }
  },
  actions: {
    async login() {
      console.log('login')
      const { data, error } = await useFetch('https://client-api-dev.up.railway.app/auth/social/google')
      if (data.value) {
        // const { accessToken } = data.value
        // this.token = data.value
        console.log(data.value)
      } else {
        return error.value?.data?.message ?? '未知錯誤'
      }
    }
  }
})

