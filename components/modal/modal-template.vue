<template>
  <div>
    <input :id="id" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl relative">
        <label :for="id" class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <slot v-if="!loading && !loaded" name="content"></slot>
        <div v-if="loading" class="flex justify-center">
          <GeneralLoading class="h-80" text="loading" />
        </div>
        <slot v-if="loaded" name="loaded"></slot>
        <slot v-if="error" name="error"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralLoading from "@/components/loading/general-loading";
export default {
  components: { GeneralLoading },
  props: {
    id: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
