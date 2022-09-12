<template>
  <section>
    <div class="flex flex-col justify-center min- py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-3xl font-extrabold text-center text-neutral-600">
          TFD E-Elearning Admin
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="px-4 py-8 sm:px-10">
          <form class="space-y-6" method="POST" @submit.prevent="handleLogin">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="login.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required=""
                  class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="login.password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required=""
                  class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                />
              </div>
            </div>

            <div class="flex flex-row justify-center">
              <button type="submit">
                <ShadowButton color="bg-blue-700" text="login" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ShadowButton from "~/components/buttons/shadow-button";
export default {
  name: "IndexPage",
  auth: "guest",
  components: { ShadowButton },
  data() {
    return {
      logging: false,
      logged: false,
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      this.logging = true;
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        this.$auth.setUser(response.data.user);
        this.$router.push(this.localePath("/course"));
        this.logging = false;
        this.logged = true;
        this.login = {
          email: "",
          password: "",
        };
      } catch (err) {
        // this.$toast.global.error(); //Using custom toast
        this.logging = false;

        this.$toast.error(err.response.data.message, {
          duration: 3000,
        });
      }
    },
  },
};
</script>
