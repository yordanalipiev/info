<template>
  <div>
    <h1 class="text-red-500">This is posts page</h1>
    <MarkdownRenderer :content="postContent"></MarkdownRenderer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'

export default defineComponent({
  name: 'PostsView',
  props: {},
  components: { MarkdownRenderer },
  setup() {
    const postContent = ref('example')
    const loadPost = async (slug: string) => {
      try {
        const response = await fetch(`/posts/${slug}.md`)
        if (response.ok) {
          const markdownText = await response.text()
          postContent.value = markdownText
        } else {
          postContent.value = 'Post not found.'
        }
      } catch {
        postContent.value = 'Error loading post.'
      }
    }

    onMounted(() => {
      loadPost('example')
    })
    return { postContent }
  },
})
</script>
