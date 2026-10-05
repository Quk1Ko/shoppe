<script setup lang="ts">
  import { useRoute } from '#imports'

  const route = useRoute()
  const productId = route.params.id
</script>

<template>
  <div class="container">Product page: {{ productId }}</div>
</template>
