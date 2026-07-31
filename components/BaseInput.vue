<script setup lang="ts">
  import IconArrow from '~/assets/icons/IconArrow.vue'

  const props = withDefaults(
    defineProps<{
      modelValue: string
      placeholder?: string
      error?: string | null
    }>(),
    {
      placeholder: 'Give an email, get the newsletter',
      error: null,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    submit: []
  }>()

  const onInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
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

      // &__divider {
      //  border-bottom: 1px solid #2b2b2b;
      // }
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

    @media (min-width: $breakpoints-m) {
      .base-input {
        display: flex;
      }
    }
  }
</style>
