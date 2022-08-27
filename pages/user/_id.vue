<template>
  <div v-if="!$fetchState.pending">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-row items-center justify-between">
          <h1 class="text-3xl mt-2 font-bold text-gray-900">
            {{ $t("users") }} / {{ getUser($route.params.id).username }}
          </h1>
          <div>
            <ShadowButton
              v-if="user.status === 'BANNED'"
              text="activate"
              color="bg-blue-700"
              @onClick="Activate"
            />
            <ShadowButton v-else text="ban" color="bg-red-500" @onClick="Ban" />
          </div>
        </div>
      </div>
    </header>
    <div>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:col-span-2">
              <ImageLoader
                class="object-cover w-full"
                :src="
                  user.profile
                    ? user.profile.path
                    : 'https://dummyimage.com/720x400'
                "
              />
              <div class="shadow-lg rounded-lg">
                <div class="px-4 py-3 border-0 card-header">
                  <h4 class="font-semibold mt-2 text-gray-800">
                    {{ $t("users") }}
                  </h4>
                </div>
                <div class="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
                  <div class="flex items-center justify-between py-3 text-sm">
                    <div class="flex items-center space-x-2 text-gray-700">
                      <StatusIcon />
                      <span>{{ $t("status") }}</span>
                    </div>
                    <span
                      class="flex items-center justify-center space-x-1.5 rounded-full border-2 px-3 py-1 text-xs font-medium text-gray-800"
                      :class="
                        user.status === 'ACTIVE'
                          ? 'border-green-500'
                          : 'animate-pulse border-red-500'
                      "
                    >
                      <span
                        class="-ml-0.5 h-2 w-2 shrink-0 rounded-full"
                        :class="
                          user.status === 'ACTIVE'
                            ? 'bg-green-600 border-green-500'
                            : 'bg-red-500 border-green-400'
                        "
                      ></span>
                      <span class="capitalize">{{
                        $t(String(user.status).toLowerCase())
                      }}</span>
                    </span>
                  </div>
                  <div class="flex items-center justify-between py-3 text-sm">
                    <div class="flex items-center space-x-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        class="flex-none w-5 h-5"
                      >
                        <title>multiple-11</title>
                        <g
                          stroke-linecap="square"
                          stroke-linejoin="miter"
                          stroke-width="2"
                          fill="none"
                          stroke="#34495e"
                          stroke-miterlimit="10"
                        >
                          <path
                            d="M10.713,13.719 C10.232,12.705,9.197,12,8,12H4c-1.657,0-3,1.343-3,3v5h2v7h6"
                            stroke-linecap="butt"
                            stroke="#34495e"
                          ></path>
                          <circle cx="6" cy="6" r="3" stroke="#34495e"></circle>
                          <path
                            d="M21.287,13.719 C21.768,12.705,22.803,12,24,12h4c1.657,0,3,1.343,3,3v5h-2v7h-6"
                            stroke-linecap="butt"
                            stroke="#34495e"
                          ></path>
                          <circle
                            cx="26"
                            cy="6"
                            r="3"
                            stroke="#34495e"
                          ></circle>
                          <path
                            d="M19,31h-6v-8h-3v-7 c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4v7h-3V31z"
                          ></path>
                          <circle cx="16" cy="5" r="4"></circle>
                        </g>
                      </svg>
                      <span>{{ $t("name") }}</span>
                    </div>
                    <span class="font-mono text-gray-900"> {{ name }}</span>
                  </div>
                  <div class="flex items-center justify-between py-3 text-sm">
                    <div class="flex items-center space-x-2 text-gray-700">
                      <ChapterIcon />
                      <span>{{ $t("purchases") }}</span>
                    </div>
                    <span class="font-mono text-gray-900">{{
                      user.purchases.length
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="p-2 bg-white rounded-b-lg shadow-lg lg:p-10 lg:col-span-3 border-t-8 border-red-600"
            >
              <ValidationObserver
                ref="course_edit_form"
                v-slot="{ handleSubmit }"
              >
                <p class="font-semibold text-lg text-gray-700 py-4">
                  {{ $t("general_info") }}
                </p>
                <form
                  method="post"
                  class="space-y-4"
                  @submit.prevent="handleSubmit(updateUserInfo)"
                >
                  <SimpleValidatedInput
                    id="user_name_edit"
                    v-model="user.username"
                    name="username"
                    label="username"
                    rules="required"
                  />

                  <SimpleValidatedInput
                    id="user_firstname_edit"
                    v-model="user.firstname"
                    name="firstname"
                    label="firstname"
                    rules="required"
                  />

                  <SimpleValidatedInput
                    id="user_lastname_edit"
                    v-model="user.lastname"
                    name="lastname"
                    label="lastname"
                    rules="required"
                  />

                  <SimpleValidatedInput
                    id="user_email_edit"
                    v-model="user.email"
                    name="email"
                    label="email"
                    rules="email|required"
                  />

                  <SimpleValidatedInput
                    id="user_dob"
                    v-model="user.dateOfBirth"
                    type="date"
                    name="date_of_birth"
                    label="date_of_birth"
                    rules="required"
                  />

                  <SimpleValidatedInput
                    id="user_password_edit"
                    v-model="password"
                    name="password"
                    type="password"
                    label="password"
                    rules="min:8"
                  />

                  <SimpleValidatedInput
                    id="user_password_edit_2"
                    v-model="confirmation"
                    name="confirmation"
                    label="confirmation"
                    rules="min:8|confirmed:user_password_edit"
                  />

                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SimpleFileUpload
                      id="user_tb_edit"
                      v-model="thumbnail"
                      class="col-span-2"
                      name="user_tb"
                      label="user_tb"
                      rules="mimes:image/jpeg,image/png,image/jpg|size:3000"
                    />
                  </div>

                  <div class="mt-4 flex flex-row justify-center">
                    <button type="submit">
                      <ShadowButton color="bg-green-700" text="submit" />
                    </button>
                  </div>
                </form>
              </ValidationObserver>
              <!--              <p class="font-semibold text-lg text-gray-700 py-6 border-t mt-4">-->
              <!--                {{ $t("course") }}-->
              <!--              </p>-->
              <!--              <div class="flex flex-col space-y-12">-->
              <!--                Course List (Coming Soon)-->
              <!--              </div>-->
            </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </div>
  </div>
  <div
    v-else
    class="transition lg:w-1/2 rounded-lg p-8 flex flex-col mx-auto w-full"
  >
    <GeneralContentLoading />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import ImageLoader from "~/components/loader/image-loader";
import ChapterIcon from "~/components/icons/chapter-icon";
import SimpleValidatedInput from "~/components/input/simple-validated-input";
import SimpleFileUpload from "~/components/input/simple-file-upload";
import ShadowButton from "~/components/button/shadow-button";
import { ValidationObserver } from "vee-validate";
import StatusIcon from "~/components/icons/status-icon";
import GeneralContentLoading from "~/components/loading/general-content-loading";
export default {
  components: {
    GeneralContentLoading,
    StatusIcon,
    ValidationObserver,
    ShadowButton,
    SimpleFileUpload,
    SimpleValidatedInput,
    ChapterIcon,
    ImageLoader,
  },
  layout: "home",
  middleware: "auth",
  data() {
    return {
      name: "",
      user: {
        profile: "",
        purchases: [],
      },
      thumbnail: "",
      password: "",
      confirmation: "",
    };
  },
  async fetch() {
    const join = [
      {
        field: "profile",
        select: ["path"],
      },
      {
        field: "purchases",
      },
    ];
    this.user = await this.$axios.$get(
      `${this.$api.users}/${this.$route.params.id}`,
      {
        params: {},
        paramsSerializer: (param) => {
          return RequestQueryBuilder.create({
            join: join,
          }).query();
        },
      }
    );
    this.name = this.user.firstname + " " + this.user.lastname;
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
      getAuth: "loggedInUser",
    }),
  },
  mounted() {
    if (this.getAuth.id === this.$route.params.id) {
      this.$router.push("/user/myinfo");
    }
  },
  methods: {
    popCourseUpdated() {
      this.$toast.success(
        this.$i18n.t("users") +
          ": " +
          this.user.username +
          " " +
          this.$i18n.t("updated"),
        {
          duration: 3000,
        }
      );
    },
    async updateUserInfo() {
      try {
        let file = "";
        if (this.thumbnail) {
          /**
           * Replace TB
           */
          let formData = new FormData();
          let blob = await fetch(this.thumbnail.src).then((r) => r.blob());
          formData.append("file", blob, this.thumbnail.name);
          file = await this.$axios.$post("/v1/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          /**
           * Release Object URL
           */
          URL.revokeObjectURL(this.thumbnail.src);
          /**
           * Call API to delete old file later...
           * To-do
           */
          await this.$axios.$patch(
            `${this.$api.users}/${this.$route.params.id}`,
            {
              username: this.user.username,
              dateOfBirth: this.user.dateOfBirth,
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              password: this.password,
              profile: file.id,
            }
          );
        } else {
          await this.$axios.$patch(
            `${this.$api.users}/${this.$route.params.id}`,
            {
              username: this.user.username,
              dateOfBirth: this.user.dateOfBirth,
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              password: this.password,
            }
          );
        }

        this.popCourseUpdated();
        /**
         * Wait for image to be uploaded to AWS
         */
        setTimeout(() => {
          this.user.profile = file;
        }, 3000);
      } catch (e) {
        console.log(e);
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
    async Ban() {
      try {
        await this.$axios.$patch(
          `${this.$api.users}/${this.$route.params.id}`,
          {
            status: "BANNED",
          }
        );
        this.popCourseUpdated();
        this.user.status = "BANNED";
      } catch (e) {
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
    async Activate() {
      try {
        await this.$axios.$patch(
          `${this.$api.users}/${this.$route.params.id}`,
          {
            status: "ACTIVE",
          }
        );
        this.popCourseUpdated();
        this.user.status = "ACTIVE";
      } catch (e) {
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
  },
};
</script>
