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
    <VueEditor
      v-model="description"
      :editor-toolbar="customToolbar"
      class="mt-1 border-gray-200 rounded-lg"
      @text-change="onInput"
    />
    <span class="text-xs font-medium text-red-500 mt-2"> {{ errors[0] }}</span>
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
    autoComplete: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      customToolbar: [
        [
          {
            header: [false, 1, 2, 3, 4, 5, 6],
          },
        ],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          {
            align: "",
          },
          {
            align: "center",
          },
          {
            align: "right",
          },
          {
            align: "justify",
          },
        ],
        ["blockquote", "code-block"],
        [
          {
            list: "ordered",
          },
          {
            list: "bullet",
          },
          {
            list: "check",
          },
        ],
        [
          {
            indent: "-1",
          },
          {
            indent: "+1",
          },
        ], // outdent/indent
        [
          {
            color: [],
          },
          {
            background: [],
          },
        ], // dropdown with defaults from theme
        ["link"],
        ["clean"], // remove formatting button
      ],
      description: "",
    };
  },
  computed: {
    getPlaceHolder() {
      return this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
    },
  },
  mounted() {
    this.description = this.value;
  },
  methods: {
    onInput(event) {
      // Can add validation here
      this.$emit("input", this.description);
    },
    onChange(event) {
      // Supports .lazy
      // Can add validation here
      this.$emit("change", this.description);
    },
    mounted() {
      this.resize();
    },
    resize() {
      const { textarea } = this.$refs;
      textarea.style.height = textarea.scrollHeight - 4 + "px";
    },
  },
};
</script>
