<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = withDefaults(
    defineProps<{
      modelValue?: number
      min?: number
      max?: number
    }>(),
    {
      modelValue: 1,
      min: 1,
      max: 99,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: number]
  }>()

  const quantity = ref(props.modelValue)

  watch(
    () => props.modelValue,
    (newVal) => {
      quantity.value = newVal
    },
  )

  const decrease = () => {
    if (quantity.value > props.min) {
      quantity.value--
      emit('update:modelValue', quantity.value)
    }
  }

  const increase = () => {
    if (quantity.value < props.max) {
      quantity.value++
      emit('update:modelValue', quantity.value)
    }
  }
</script>

<template>
  <div class="product-quantity">
    <BaseButton
      type="transparent"
      aria-label="Decrease quantity"
      :disabled="quantity === min"
      @click="decrease"
    >
      −
    </BaseButton>
    <span>{{ quantity }}</span>
    <BaseButton
      type="transparent"
      aria-label="Increase quantity"
      :disabled="quantity === max"
      @click="increase"
    >
      +
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
  .product-quantity {
    box-sizing: border-box;
    display: flex;
    flex: 0 0 102px;
    align-items: center;
    justify-content: space-between;
    width: 102px;
    height: 48px;
    padding: 0 12px;
    font-size: var(--body-medium-size);
    line-height: 1;
    color: var(--color-neutral-dark-gray);
    background: var(--color-neutral-light-gray);
    border-radius: 4px;

    @media (max-width: $breakpoints-m) {
      flex: auto;
      width: 100%;
      height: 44px;
    }

    :deep(.base-button) {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 24px;
      min-width: 24px;
      height: 100%;
      padding: 0;
      font-size: 18px;
      line-height: 1;
      color: var(--color-neutral-dark-gray);

      &:disabled {
        cursor: default;
        opacity: 0.5;
      }

      &:hover {
        background: transparent;
        border-radius: 0;
      }
    }

    span {
      min-width: 20px;
      font-weight: 500;
      text-align: center;
    }
  }
</style>
