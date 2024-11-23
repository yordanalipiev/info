<template>
  <div v-html="htmlContent" class="prose mx-auto p-4"></div>
</template>

<script lang="ts">
import { marked } from 'marked'
import { computed, defineComponent, onUpdated } from 'vue'
import hljs from 'highlight.js' // Import highlight.js
import 'highlight.js/styles/github-dark.css' // Import a highlight.js theme (optional)
export default defineComponent({
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const htmlContent = computed(() => {
      const rawHtml = marked(props.content)
      const styledHtml = (rawHtml as string)
        .replace(/<h1>/g, '<h1 class="text-3xl font-bold my-4 text-red-200">') // Headings
        .replace(/<h2>/g, '<h2 class="text-2xl font-semibold my-3">')
        .replace(/<h3>/g, '<h3 class="text-xl font-semibold my-2">')
        .replace(/<h4>/g, '<h4 class="text-lg font-medium my-2">')
        .replace(/<h5>/g, '<h5 class="text-md font-medium my-2">')
        .replace(/<h6>/g, '<h6 class="text-sm font-medium my-1">')
        .replace(/<p>/g, '<p class="my-4 text-base leading-relaxed">') // Paragraphs
        .replace(/<a /g, '<a class="text-blue-500 hover:text-blue-700" ') // Links
        .replace(/<ul>/g, '<ul class="list-disc pl-5 my-4">') // Unordered Lists
        .replace(/<ol>/g, '<ol class="list-decimal pl-5 my-4">') // Ordered Lists
        .replace(/<li>/g, '<li class="my-2">') // List Items
        .replace(/<blockquote>/g, '<blockquote class="border-l-4 pl-4 text-gray-500 my-4 italic">') // Blockquotes
        .replace(/<code>/g, '<code class="bg-gray-200 p-1 rounded text-sm">') // Code
        .replace(/<pre>/g, '<pre class="bg-gray-800 text-white p-4 rounded overflow-auto my-4">') // Preformatted text
        .replace(/<img /g, '<img class="max-w-full h-auto my-4" ') // Images

      return styledHtml
    })
    // Function to apply syntax highlighting after the content is rendered
    const highlightCode = () => {
      // Find all pre code blocks in the rendered HTML and apply syntax highlighting
      const codeBlocks = document.querySelectorAll('pre code')
      console.log(codeBlocks)
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement) // Use highlight.js to highlight code block
      })
    }
    // Function to copy the code to the clipboard
    const copyCodeToClipboard = (event: Event) => {
      const button = event.target as HTMLButtonElement
      const codeElement = document.querySelector(
        button.getAttribute('data-clipboard-target')!,
      ) as HTMLElement
      const code = codeElement?.innerText || ''

      // Copy to clipboard
      navigator.clipboard
        .writeText(code)
        .then(() => {
          // Optionally show a message that the code was copied
          button.innerText = 'Copied!'
        })
        .catch(() => {
          button.innerText = 'Failed'
        })
        .finally(() => {
          setTimeout(() => {
            button.innerText = 'Copy'
          }, 1500)
        })
    }

    // Call highlightCode after the component is mounted
    onUpdated(() => {
      highlightCode()

      // Add the "Copy" button for each code block
      const codeBlocks = document.querySelectorAll('pre code')
      codeBlocks.forEach((codeBlock, index) => {
        const codeBlockWrapper = codeBlock.closest('pre') as HTMLElement

        // Generate a unique ID for each code block if not already present
        const codeId = `code-block-${index + 1}`
        codeBlock.setAttribute('id', codeId)

        // Create the button element
        const button = document.createElement('button')
        button.classList.add(
          'absolute',
          'top-2',
          'right-2',
          'bg-gray-800',
          'text-white',
          'p-1',
          'rounded-md',
          'text-xs',
          'hover:bg-gray-700',
        )
        button.innerText = 'Copy'

        // Set data-clipboard-target attribute to match the unique code block ID
        button.setAttribute('data-clipboard-target', `#${codeId}`)

        // Add button to the code block wrapper
        codeBlockWrapper?.classList.add('relative') // Make sure the parent has 'relative' for positioning
        codeBlockWrapper?.appendChild(button)

        // Add click event listener for the button
        button.addEventListener('click', copyCodeToClipboard)
      })
    })
    return { htmlContent, copyCodeToClipboard }
  },
})
</script>

<style scoped>
/* Optional: Add custom styles for the copy button */
.copy-button {
  transition: background-color 0.3s;
}

.copy-button:hover {
  background-color: #4c4c4c; /* Darker hover state */
}
</style>
