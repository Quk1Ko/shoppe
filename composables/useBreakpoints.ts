import { computed, onMounted, onUnmounted, ref } from 'vue'

export const useBreakpoints = (breakpoint = 768) => {
  const windowWidth = ref(0)

  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const isDesktop = computed(() => windowWidth.value >= breakpoint)
  const isMobile = computed(() => windowWidth.value < breakpoint)

  return {
    windowWidth,
    isDesktop,
    isMobile,
  }
}
