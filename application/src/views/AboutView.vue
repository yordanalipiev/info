<template>
  <div>
    <h1>This is an about page</h1>
    <div>
      <h1>Count: {{ countStore.count }}</h1>
      <h2>Double Count: {{ countStore.doubleCount }}</h2>
      <button @click="countStore.increment">Increment</button>
      <button @click="countStore.decrement">Decrement</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const countStore = useCounterStore()

    return {
      countStore,
    }
  },
})
</script>
<style></style>
