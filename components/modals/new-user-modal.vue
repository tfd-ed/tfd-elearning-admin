<template>
  <ModalTemplate
    id="newUserModal"
    title="Create New User"
    :loading="loading"
    :loaded="loaded"
    :error="error"
  >
  </ModalTemplate>
</template>
<script>
import ModalTemplate from "@/components/modals/modal-template";
export default {
  components: { ModalTemplate },
  data() {
    return {
      loading: false,
      loaded: false,
      error: false,
    };
  },
};
</script>
