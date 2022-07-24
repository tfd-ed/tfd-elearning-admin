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
      @search="fetchOption"
      @input="onInput"
    >
      <template #no-options="{ search, searching }">
        <template v-if="searching">
          <div
            class="hover:underline cursor-pointer"
            @click="newCategory(search)"
          >
            {{ $t("no_result_found") }} {{ $t(label) }}: <b>{{ search }}</b>
          </div>
        </template>
        <em v-else style="opacity: 0.5"
          >{{ $t("start_typing") }} {{ $t(label) }}:...</em
        >
      </template>
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
import { RequestQueryBuilder } from "@nestjsx/crud-request";
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
    route: {
      type: String,
      default: "",
    },

    autoComplete: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selected: "",
      options: [],
    };
  },
  computed: {
    getPlaceHolder() {
      return this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
    },
  },
  methods: {
    async fetchOption(search, loading) {
      const qb = RequestQueryBuilder.create();
      qb.search({
        name: {
          $contL: search,
        },
      });
      if (search.length) {
        loading(true);
        this.options = await this.$axios.$get(`v1/${this.route}`, {
          params: {},
          paramsSerializer: (param) => {
            return qb.query();
          },
        });
        loading(false);
      }
    },
    onInput(event) {
      // Can add validation here
      if (event) {
        this.$emit("input", {
          id: event.id,
          name: event.name,
        });
      } else {
        this.$emit("input", "");
      }
    },
    async newCategory(name) {
      const category = await this.$axios.$post(`v1/${this.route}`, {
        name: name,
      });
      this.options.push(category);
      this.onInput(category);
    },
  },
};
</script>
