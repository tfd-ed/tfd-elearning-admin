<template>
  <div v-if="!$fetchState.pending">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl mt-2 font-bold text-gray-900">
          {{ $t("instructor") }}/{{ instructor.name }}
        </h1>
      </div>
    </div>
    <div>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:col-span-2">
              <ImageLoader
                class="object-cover w-full"
                :src="
                  instructor.profile
                    ? instructor.profile.path
                    : 'https://dummyimage.com/720x400'
                "
              />
              <div class="shadow-lg rounded-lg">
                <div class="px-4 py-3 border-0 card-header">
                  <h4 class="font-semibold mt-2 text-gray-800">
                    {{ $t("instructor_stats") }}
                  </h4>
                </div>
                <div class="px-4 mb-1 -mt-2 divide-y divide-gray-200 card-body">
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
                      <span>{{ $t("students") }}</span>
                    </div>
                    <span class="font-mono text-gray-900">0</span>
                  </div>
                  <div class="flex items-center justify-between py-3 text-sm">
                    <div class="flex items-center space-x-2 text-gray-700">
                      <ChapterIcon />
                      <span>{{ $t("course") }}</span>
                    </div>
                    <span class="font-mono text-gray-900">0</span>
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
                  @submit.prevent="handleSubmit(updateInstructorInfo)"
                >
                  <SimpleValidatedInput
                    id="instructor_name_edit"
                    v-model="instructor.name"
                    name="instructor_name"
                    label="instructor_name"
                    rules="required"
                  />

                  <SimpleValidatedInput
                    id="instructor_dob"
                    v-model="instructor.dateOfBirth"
                    type="date"
                    name="date_of_birth"
                    label="date_of_birth"
                    rules="required"
                  />
                  <ValidatedRichTextArea
                    id="instructor_biography_edit"
                    v-model="instructor.biography"
                    name="instructor_biography"
                    label="instructor_biography"
                    rules="required"
                  />
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SimpleFileUpload
                      id="course_tb_edit"
                      v-model="thumbnail"
                      class="col-span-2"
                      name="course_tb"
                      label="course_tb"
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
              <p class="font-semibold text-lg text-gray-700 py-6 border-t mt-4">
                {{ $t("course") }}
              </p>
              <div class="flex flex-col space-y-12">
                Course List (Coming Soon)
              </div>
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
import GeneralContentLoading from "@/components/loadings/general-content-loading";
import ImageLoader from "@/components/loaders/image-loader";
import ChapterIcon from "@/components/icons/chapter-icon";
import { ValidationObserver } from "vee-validate";
import SimpleValidatedInput from "@/components/inputs/simple-validated-input";
import SimpleValidatedTextArea from "@/components/inputs/simple-validated-text-area";
import ValidatedRichTextArea from "@/components/inputs/validated-rich-text-area";
import SimpleFileUpload from "@/components/inputs/simple-file-upload";
import ShadowButton from "@/components/buttons/shadow-button";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

export default {
  components: {
    ShadowButton,
    SimpleFileUpload,
    ValidatedRichTextArea,
    SimpleValidatedTextArea,
    SimpleValidatedInput,
    ValidationObserver,
    ChapterIcon,
    ImageLoader,
    GeneralContentLoading,
  },
  layout: "home",
  middleware: "auth",
  data() {
    return {
      instructor: {},
      thumbnail: "",
    };
  },
  async fetch() {
    const join = [
      {
        field: "profile",
        select: ["path"],
      },
      { field: "instructedCourses", select: ["id", "title"] },
    ];
    this.instructor = await this.$axios.$get(
      `${this.$api.instructors}/${this.$route.params.id}`,
      {
        params: {},
        paramsSerializer: (param) => {
          return RequestQueryBuilder.create({
            join: join,
          }).query();
        },
      }
    );
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
      getAuth: "loggedInUser",
    }),
  },
  methods: {
    popCourseUpdated() {
      this.$toast.success(
        this.$i18n.t("instructor") +
          ": " +
          this.instructor.name +
          " " +
          this.$i18n.t("updated"),
        {
          duration: 3000,
        }
      );
    },
    async updateInstructorInfo() {
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
        }
        const updated = await this.$axios.$patch(
          `${this.$api.instructors}/${this.$route.params.id}`,
          {
            name: this.instructor.name,
            dateOfBirth: this.instructor.dateOfBirth,
            biography: this.instructor.biography,
            profile: file ? file.id : this.instructor.profile.id,
          }
        );
        this.popCourseUpdated();
        /**
         * Wait for image to be uploaded to AWS
         */
        setTimeout(() => {
          this.instructor.profile = file;
        }, 3000);
      } catch (e) {
        console.log(e);
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
  },
};
</script>
