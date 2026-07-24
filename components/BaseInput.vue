<script setup lang="ts">
  import IconArrow from '~/assets/icons/IconArrow.vue'

  const props = withDefaults(
    defineProps<{
      modelValue: string
      placeholder?: string
      showCheckbox?: boolean
      error?: string | null
      checkboxChecked?: boolean
    }>(),
    {
      placeholder: 'Give an email, get the newsletter',
      showCheckbox: false,
      error: null,
      checkboxChecked: false,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    'update:checkboxChecked': [value: boolean]
    submit: []
  }>()

  const onInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }

  const onCheckboxChange = (e: Event) => {
    emit('update:checkboxChecked', (e.target as HTMLInputElement).checked)
  }

  const onSubmit = () => {
    emit('submit')
  }
</script>

<template>
  <div class="base-input">
    <div class="base-input__field">
      <input
        :value="modelValue"
        type="email"
        class="base-input__input"
        :placeholder="props.placeholder"
        @input="onInput"
        @keyup.enter="onSubmit"
      />
      <BaseButton type="transparent" class="base-input__button" @click="onSubmit">
        <IconArrow />
      </BaseButton>
    </div>

    <div v-if="error" class="base-input__error">
      {{ error }}
    </div>

    <div v-if="showCheckbox" class="base-input__checkbox">
      <input
        id="terms"
        type="checkbox"
        class="base-input__check"
        :checked="props.checkboxChecked"
        @change="onCheckboxChange"
      />
      <label for="terms"> i agree to the website's terms and conditions </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .base-input {
    &__field {
      display: flex;
      width: 100%;
      padding-bottom: 10px;
      font-size: var(--body-medium-size);
      border-bottom: 1px solid #2b2b2b;
    }

    &__input {
      width: 100%;
      font-size: var(--h5-size);
      font-weight: var(--h5-weight);
      line-height: var(--h5-lh);
      color: var(--color-text);
      outline: none;
      background: transparent;
      border: none;

      &::placeholder {
        color: var(--color-neutral-dark-gray);
      }

      &__divider {
        border-bottom: 1px solid #2b2b2b;
      }
    }

    &__button {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
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

    &__checkbox {
      display: flex;
      gap: 4px;
      align-items: flex-start;
      margin-top: 12px;
      font-size: var(--body-medium-size);
      line-height: var(--body-small-lh);
      color: var(--color-black);

      label {
        padding-top: 2px;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .base-input__check {
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

  @media (min-width: $breakpoints-m) {
    .base-input {
      display: flex;
    }
  }
</style>
