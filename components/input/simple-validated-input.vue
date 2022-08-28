<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="id"
    :name="name"
    tag="div"
    :rules="rules"
  >
    <label
      class="relative block p-3 bg-white border-2 rounded-lg"
      :class="errors.length ? 'border-red-500' : 'border-gray-200'"
      :for="name"
    >
      <input
        :id="id"
        v-no-autocomplete
        :value="value"
        class="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer"
        :type="type"
        :placeholder="getPlaceHolder"
        @input="onInput"
        @change="onChange"
      />
      <span
        v-if="label.includes('email')"
        class="absolute inset-y-0 inline-flex items-center right-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
      </span>
      <span
        v-if="label.includes('price')"
        class="absolute inset-y-0 inline-flex items-center right-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 48 48"
          class="fill-green-600"
        >
          <title>ic_monetization_on_48px</title>
          <g>
            <path
              d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2.83 32.18V40H21.5v-3.86c-3.41-.73-6.33-2.92-6.54-6.81h3.91c.2 2.1 1.64 3.73 5.3 3.73 3.93 0 4.8-1.96 4.8-3.18 0-1.65-.89-3.22-5.33-4.28-4.96-1.19-8.36-3.24-8.36-7.34 0-3.43 2.77-5.67 6.22-6.42V8h5.33v3.89c3.72.91 5.58 3.72 5.71 6.77H28.6c-.11-2.22-1.28-3.73-4.44-3.73-3 0-4.8 1.35-4.8 3.29 0 1.69 1.3 2.77 5.33 3.82 4.04 1.05 8.36 2.77 8.36 7.82 0 3.65-2.76 5.66-6.22 6.32z"
            ></path>
          </g>
        </svg>
      </span>
      <span
        class="absolute bg-transparent text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-sarpheab peer-focus:dark:text-sarpheab peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {{ $t(label) }}
      </span>
    </label>
    <div class="text-xs font-medium text-red-500 mt-2">
      {{ errors[0] }}
    </div>
    <slot name="guide"></slot>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    rules: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  computed: {
    getPlaceHolder() {
      return this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
    },
  },
  methods: {
    onInput(event) {
      // Can add validation here
      this.$emit("input", event.target.value);
    },
    onChange(event) {
      // Supports .lazy
      // Can add validation here
      this.$emit("change", event.target.value);
    },
  },
};
</script>
