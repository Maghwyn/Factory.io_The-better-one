<template>
  <router-view></router-view>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store'
import { defineComponent, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const isAuth = computed(() => authStore.isAuth);

    watch(isAuth, (currentValue) => {
      console.log(currentValue);
      if (currentValue) {
        router.push('/app/game');
      } else {
        router.push('/login');
      }
    });


    if (localStorage.token !== undefined) {
      console.log(isAuth.value)
      authStore.setAuth(true)
      console.log(isAuth.value)
      console.log("Automatically connected")
    }
    else {
      authStore.setAuth(false)
      console.log("Not connected")
      router.push('/login');
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
