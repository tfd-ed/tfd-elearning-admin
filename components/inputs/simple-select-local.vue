<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="id"
    :name="name"
    tag="div"
    :rules="rules"
  >
    <p
      class="text-gray-600 mb-2 text-xs"
      :class="errors.length ? 'text-red-500' : 'text-gray-600'"
    >
      {{ $t(label) }}
    </p>
    <v-select
      :value="value"
      label="name"
      :filterable="false"
      :options="options"
      @input="onInput"
    >
      <template slot="option" slot-scope="option">
        <div class="d-center">
          {{ option.name }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          {{ option.name }}
        </div>
      </template>
      <template #search="{ attributes, events }">
        <input class="vs__search" v-bind="attributes" v-on="events" />
      </template>
    </v-select>
    <span class="text-xs font-medium text-red-500 mt-2"> {{ errors[0] }}</span>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate";
import "vue-select/dist/vue-select.css";
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
    route: {
      type: String,
      default: "",
    },

    autoComplete: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    getPlaceHolder() {
      return this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
    },
  },
  methods: {
    onInput(event) {
      // Can add validation here
      if (event) {
        this.$emit("input", event);
      } else {
        this.$emit("input", "");
      }
    },
  },
};
</script>
