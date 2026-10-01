<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      id?: string
      label?: string
      error?: string | null
    }>(),
    {
      id: 'terms',
      label: "i agree to the website's terms and conditions",
      error: null,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  const onChange = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).checked)
  }
</script>

<template>
  <div class="base-checkbox">
    <div class="base-checkbox__wrapper">
      <input
        :id="props.id"
        type="checkbox"
        class="base-checkbox__input"
        :checked="props.modelValue"
        @change="onChange"
      />
      <label :for="props.id" class="base-checkbox__label">
        {{ props.label }}
      </label>
    </div>
    <div v-if="props.error" class="base-checkbox__error">
      {{ props.error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .base-checkbox {
    width: 100%;

    &__wrapper {
      display: flex;
      gap: 4px;
      align-items: flex-start;
      margin-top: 12px;
      font-size: var(--body-medium-size);
      line-height: var(--body-small-lh);
      color: var(--color-black);
    }

    &__label {
      padding-top: 2px;
      cursor: pointer;
      user-select: none;
    }

    &__error {
      display: block;
      width: 100%;
      padding-left: 4px;
      margin-top: 8px;
      font-size: var(--body-small-size);
      color: #ef4444;
      text-align: left;
    }
  }

  .base-checkbox__input {
    position: relative;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    appearance: none;
    cursor: pointer;
    background-color: white;
    border: 2px solid var(--color-neutral-dark-gray);
    border-radius: 4px;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 11px;
      height: 9px;
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='10' viewBox='0 0 13 10' fill='none'%3E%3Cpath d='M1 5L4.5 9L12 1' stroke='%231f2937' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.25s ease;
    }

    &:checked {
      border-color: var(--color-primary);

      &::after {
        opacity: 1;
      }
    }

    &:hover {
      border-color: var(--color-primary);
    }
  }
</style>
