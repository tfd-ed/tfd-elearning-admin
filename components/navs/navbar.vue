<template>
  <nav class="bg-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="/favicon.ico" alt="Workflow" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!--              <nuxt-link-->
              <!--                :to="localePath('/dashboard')"-->
              <!--                exact-->
              <!--                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"-->
              <!--                >{{ $t("dashboard") }}</nuxt-link-->
              <!--              >-->
              <nuxt-link
                :to="localePath('/course')"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact
                >{{ $t("course") }}</nuxt-link
              >
              <nuxt-link
                :to="localePath('/user')"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact
                >{{ $t("users") }}</nuxt-link
              >
              <nuxt-link
                :to="localePath('/admin')"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact
                >{{ $t("admin") }}</nuxt-link
              >
              <nuxt-link
                :to="localePath('/instructor')"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact
                >{{ $t("instructor") }}</nuxt-link
              >
              <nuxt-link
                :to="localePath('/purchase')"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact
                >{{ $t("purchases") }}</nuxt-link
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <nuxt-link
              v-if="$i18n.locale === 'en'"
              class="cursor-pointer -mt-2 hover:scale-110 mr-4"
              :to="switchLocalePath('km')"
            >
              <CountryFlag country="kh" size="normal" />
            </nuxt-link>
            <nuxt-link
              v-if="$i18n.locale === 'km'"
              class="cursor-pointer -mt-2 hover:scale-110 mr-4"
              :to="switchLocalePath('en')"
            >
              <CountryFlag country="gb" size="normal" />
            </nuxt-link>
            <!-- Notification dropdown -->
            <div class="ml-3 relative">
              <div class="flex justify-center">
                <div>
                  <div class="dropdown dropdown-hover relative">
                    <label
                      tabindex="0"
                      class="btn btn-circle bg-transparent border-transparent m-1"
                    >
                      <button
                        id="dropdownMenuButton2"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        class="dropdown-toggle bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span class="sr-only">View notifications</span>
                        <!-- Heroicon name: outline/bell -->
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </button>
                    </label>

                    <ul
                      tabindex="0"
                      class="dropdown-content menu z-10 w-56 bg-white border border-gray-100 rounded-md shadow-lg"
                    >
                      <div class="flow-root py-2">
                        <div class="-my-2 divide-y divide-gray-100">
                          <div class="p-2">
                            <strong
                              class="block p-2 text-xs font-medium text-gray-400"
                            >
                              2019-04-31
                            </strong>

                            <li
                              class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                              role="menuitem"
                            >
                              Coming Soon!
                            </li>
                            <li
                              class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                              role="menuitem"
                            >
                              Coming Soon!
                            </li>
                            <li
                              class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                              role="menuitem"
                            >
                              Coming Soon!
                            </li>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div class="flex justify-center">
                <div>
                  <div class="dropdown dropdown-hover relative">
                    <label
                      tabindex="0"
                      class="btn btn-circle bg-transparent border-transparent m-1"
                    >
                      <button
                        id="dropdownMenuButton1"
                        class="dropdown-toggle max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span class="sr-only">Open user menu</span>
                        <img
                          class="h-8 w-8 rounded-full"
                          :src="
                            getLogged.profile
                              ? getLogged.profile.path
                              : 'https://avatars.dicebear.com/api/micah/' +
                                getLogged.username +
                                '.svg?background=%23FFFFFF'
                          "
                          alt=""
                        /></button
                    ></label>

                    <ul
                      tabindex="0"
                      class="dropdown-content menu z-10 w-56 bg-white border border-gray-100 rounded-md shadow-lg"
                    >
                      <div class="flow-root py-2">
                        <div class="-my-2 divide-y divide-gray-100">
                          <div class="p-2">
                            <strong
                              class="block p-2 text-xs font-medium text-gray-400"
                            >
                              {{ getLogged.email }}
                            </strong>

                            <nuxt-link
                              :to="localePath('/user/myinfo')"
                              class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                              role="menuitem"
                            >
                              {{ $t("profile") }}
                            </nuxt-link>

                            <li
                              class="cursor-pointer block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                              role="menuitem"
                            >
                              {{ $t("setting") }} (Coming Soon)
                            </li>
                          </div>

                          <div class="p-2">
                            <strong
                              class="block p-2 text-xs font-medium text-gray-400"
                            >
                              {{ $t("system") }}
                            </strong>

                            <button
                              class="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-700 rounded-lg hover:bg-red-50"
                              @click="logout"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 36 36"
                                class="fill-current"
                              >
                                <title>ic_arrow_back_36px</title>
                                <g>
                                  <path
                                    d="M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z"
                                  ></path>
                                </g>
                              </svg>

                              {{ $t("logout") }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <!--        <nuxt-link-->
        <!--          :to="localePath('/dashboard')"-->
        <!--          exact-->
        <!--          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"-->
        <!--          aria-current="page"-->
        <!--          >{{ $t("dashboard") }}</nuxt-link-->
        <!--        >-->
        <nuxt-link
          :to="localePath('/course')"
          exact
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >{{ $t("course") }}</nuxt-link
        >
        <nuxt-link
          exact
          :to="localePath('/user')"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >{{ $t("users") }}</nuxt-link
        >
        <nuxt-link
          exact
          :to="localePath('/admin')"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >{{ $t("admin") }}</nuxt-link
        >
        <nuxt-link
          exact
          :to="localePath('/instructor')"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >{{ $t("instructor") }}</nuxt-link
        >
        <nuxt-link
          exact
          :to="localePath('/purchase')"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >{{ $t("purchases") }}</nuxt-link
        >
      </div>
    </div>
  </nav>
</template>
<script>
import CountryFlag from "vue-country-flag";
import { mapGetters } from "vuex";
export default {
  components: {
    CountryFlag,
  },
  computed: {
    ...mapGetters({
      getLogged: "loggedInUser",
    }),
  },
  methods: {
    async logout() {
      window.localStorage.clear();
      await this.$auth.logout();
    },
  },
};
</script>
