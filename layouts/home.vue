<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <nuxt class="flex-grow" />
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/footers/footer";
import Navbar from "@/components/navs/navbar";
export default {
  components: { Navbar, Footer },
};
</script>
