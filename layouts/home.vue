<template>
  <div class="min-h-full relative">
    <NavNavbar />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/footer/footer";
export default {
  components: { Footer },
};
</script>
