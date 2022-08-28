<template>
  <div class="flex flex-col h-screen">
    <NavNavbar />
    <nuxt class="flex-grow" />
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/footer/footer";
export default {
  components: { Footer },
};
</script>
