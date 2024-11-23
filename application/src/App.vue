<template>
  <HeaderView />
  <RouterView />
</template>
<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'

defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()

    onMounted(() => {
      const redirectPath = localStorage.getItem('redirectPath') as string | undefined
      if (redirectPath) {
        router.push(redirectPath)
      }
    })

    return {}
  },
})
</script>
<style scoped></style>
