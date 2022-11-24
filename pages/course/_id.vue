<template>
  <div v-if="!$fetchState.pending">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!--        <HeadNavigator-->
        <!--          path="/course"-->
        <!--          :label="getCourse($route.params.id).title"-->
        <!--        />-->
        <div class="flex flex-row items-center justify-between">
          <h1 class="text-3xl mt-2 font-bold text-gray-900">
            {{ $t("course") }}/ {{ title }}
          </h1>
          <div>
            <ShadowButton
              v-if="course.status === 'DRAFTED'"
              text="make_published"
              color="bg-blue-700"
              @onClick="makePublished"
            />
            <ShadowButton
              v-else
              text="make_drafted"
              color="bg-yellow-500"
              @onClick="makeDrafted"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div class="lg:col-span-2">
            <ImageLoader
              class="object-cover w-full h-56"
              :src="
                course.thumbnail
                  ? course.thumbnail.path
                  : 'https://dummyimage.com/720x400'
              "
            />
            <div class="shadow-lg rounded-lg">
              <div class="px-4 py-3 border-0 card-header">
                <h4 class="font-semibold mt-2 text-gray-800">
                  {{ $t("course_stats") }}
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
                      course.status === 'PUBLISHED'
                        ? 'border-green-500'
                        : 'animate-pulse border-yellow-400'
                    "
                  >
                    <span
                      class="-ml-0.5 h-2 w-2 shrink-0 rounded-full"
                      :class="
                        course.status === 'PUBLISHED'
                          ? 'bg-green-600 border-green-500'
                          : 'bg-yellow-500 border-green-400'
                      "
                    ></span>
                    <span class="capitalize">{{
                      $t(course.status.toString().toLowerCase())
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
                        <circle cx="26" cy="6" r="3" stroke="#34495e"></circle>
                        <path
                          d="M19,31h-6v-8h-3v-7 c0-2.209,1.791-4,4-4h4c2.209,0,4,1.791,4,4v7h-3V31z"
                        ></path>
                        <circle cx="16" cy="5" r="4"></circle>
                      </g>
                    </svg>
                    <span>{{ $t("students") }}</span>
                  </div>
                  <span class="font-mono text-gray-900">{{
                    course.purchases.length
                  }}</span>
                </div>
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <ChapterIcon />
                    <span>{{ $t("chapters") }}</span>
                  </div>
                  <span class="font-mono text-gray-900">{{
                    course.chapters.length
                  }}</span>
                </div>
                <!--                <div class="flex items-center justify-between py-3 text-sm">-->
                <!--                  <div class="flex items-center space-x-2 text-gray-700">-->
                <!--                    <svg-->
                <!--                      xmlns="http://www.w3.org/2000/svg"-->
                <!--                      viewBox="0 0 20 20"-->
                <!--                      fill="currentColor"-->
                <!--                      class="flex-none w-5 h-5"-->
                <!--                    >-->
                <!--                      <path-->
                <!--                        fill-rule="evenodd"-->
                <!--                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"-->
                <!--                        clip-rule="evenodd"-->
                <!--                      />-->
                <!--                    </svg>-->
                <!--                    <span>{{ $t("comments") }}</span>-->
                <!--                  </div>-->
                <!--                  <span class="font-mono text-gray-900">32,422</span>-->
                <!--                </div>-->
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <MoneyIcon class="text-green-600" />
                    <span>{{ $t("price") }}</span>
                  </div>
                  <span class="font-mono text-gray-900">{{ priceLabel }}</span>
                </div>
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="flex-none w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ $t("purchases") }}</span>
                  </div>
                  <span class="font-mono text-gray-900"
                    >${{
                      parseFloat(course.purchases.length) *
                      parseFloat(priceLabel)
                    }}</span
                  >
                </div>
                <!--                <div class="flex items-center justify-between py-3 text-sm">-->
                <!--                  <div class="flex items-center space-x-2 text-gray-700">-->
                <!--                    <svg-->
                <!--                      xmlns="http://www.w3.org/2000/svg"-->
                <!--                      viewBox="0 0 20 20"-->
                <!--                      fill="currentColor"-->
                <!--                      class="flex-none w-5 h-5"-->
                <!--                    >-->
                <!--                      <path-->
                <!--                        fill-rule="evenodd"-->
                <!--                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"-->
                <!--                        clip-rule="evenodd"-->
                <!--                      />-->
                <!--                    </svg>-->
                <!--                    <span>{{ $t("completed") }}</span>-->
                <!--                  </div>-->
                <!--                  <span>12</span>-->
                <!--                </div>-->
                <!--                <div class="flex items-center justify-between py-3 text-sm">-->
                <!--                  <div class="flex items-center space-x-2 text-gray-700">-->
                <!--                    <ThunderIcon />-->
                <!--                    <span>{{ $t("learning") }}</span>-->
                <!--                  </div>-->
                <!--                  <span>32</span>-->
                <!--                </div>-->
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
                @submit.prevent="handleSubmit(editCourse)"
              >
                <SimpleValidatedInput
                  id="course_name_edit"
                  v-model="course.title"
                  name="course_name"
                  label="course_name"
                  rules="required"
                />

                <SimpleValidatedInput
                  id="course_url_edit"
                  v-model="course.titleURL"
                  name="course_url"
                  label="course_url"
                  rules="required"
                />

                <SimpleSelect
                  id="course_category_edit"
                  v-model="course.category"
                  name="course_category"
                  label="course_category"
                  route="categories"
                  rules="required"
                />

                <SimpleSelect
                  id="course_instructor_edit"
                  v-model="course.instructor"
                  name="course_instructor"
                  label="instructor"
                  route="instructors"
                  rules="required"
                />
                <SimpleSelectLocal
                  id="course_type_edit"
                  v-model="course.type"
                  name="course_type"
                  label="course_type"
                  rules="required"
                  :options="options"
                />

                <SimpleValidatedTextArea
                  id="short_course_description_edit"
                  v-model="course.shortDescription"
                  name="short_course_description_edit"
                  label="short_course_description"
                  rules="required"
                />
                <ValidatedRichTextArea
                  id="course_description_edit"
                  v-model="course.description"
                  name="course_description"
                  label="course_description"
                  rules="required"
                />
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <SimpleValidatedInput
                    id="course_price_edit"
                    v-model="course.price"
                    :disabled="course.type === 'FREE'"
                    name="course_price"
                    label="course_price"
                    rules="required|double"
                  />
                  <SimpleFileUpload
                    id="course_tb_edit"
                    v-model="replacedTB"
                    name="course_tb"
                    label="course_tb"
                    rules="mimes:image/jpeg,image/png,image/jpg|size:3000"
                  />
                </div>

                <SimpleValidatedInput
                  id="payment_link_edit"
                  v-model="course.paymentLink"
                  name="payment_link"
                  label="payment_link"
                  rules="required"
                />
                <SimpleValidatedInput
                  id="promotional_vimeo_link_edit"
                  v-model="course.promotionalVimeoLink"
                  name="promotional_vimeo_link"
                  label="promotional_vimeo_link"
                  rules="required"
                />

                <div class="mt-4 flex flex-row justify-center">
                  <button type="submit">
                    <ShadowButton color="bg-green-700" text="submit" />
                  </button>
                </div>
              </form>
            </ValidationObserver>
            <p class="font-semibold text-lg text-gray-700 py-6 border-t mt-4">
              {{ $t("chapters") }}
            </p>
            <div class="flex flex-col space-y-12">
              <ChapterEditCard
                v-for="(chapter, index) in orderBy(
                  course.chapters,
                  'chapterNumber',
                  true
                )"
                :key="index"
                :chapter="chapter"
                :index="index"
                @deleteCommand="deleteRequest"
              ></ChapterEditCard>
            </div>

            <button
              class="mt-2 transition hover:scale-105 w-full h-12 bg-gray-100 text-black rounded-xl"
              @click="addCommand"
            >
              {{ $t("new_chapter") }}
            </button>
          </div>
        </div>
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
import SimpleValidatedInput from "@/components/inputs/simple-validated-input";
import SimpleSelect from "@/components/inputs/simple-select";
import SimpleValidatedTextArea from "@/components/inputs/simple-validated-text-area";
import SimpleFileUpload from "@/components/inputs/simple-file-upload";
import MoneyIcon from "@/components/icons/money-icon";
import ImageLoader from "@/components/loaders/image-loader";
import { ValidationObserver } from "vee-validate";
import ShadowButton from "@/components/buttons/shadow-button";
import ThunderIcon from "@/components/icons/thunder-icon";
import HeadNavigator from "@/components/navigator/head-navigator";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import GeneralContentLoading from "@/components/loadings/general-content-loading";
import ChapterIcon from "@/components/icons/chapter-icon";
import ChapterEditCard from "@/components/cards/chapter-edit-card";
import ValidatedRichTextArea from "@/components/inputs/validated-rich-text-area";
import StatusIcon from "~/components/icons/status-icon";
import Vue2Filters from "vue2-filters";
import SimpleSelectLocal from "@/components/inputs/simple-select-local";
import { CourseEnum } from "static/enums/course-enum";
export default {
  components: {
    SimpleSelectLocal,
    StatusIcon,
    ValidatedRichTextArea,
    ChapterEditCard,
    ChapterIcon,
    GeneralContentLoading,
    HeadNavigator,
    ThunderIcon,
    ShadowButton,
    ValidationObserver,
    ImageLoader,
    MoneyIcon,
    SimpleFileUpload,
    SimpleValidatedTextArea,
    SimpleSelect,
    SimpleValidatedInput,
  },
  mixins: [Vue2Filters.mixin],
  layout: "home",
  data() {
    return {
      loading: false,
      loaded: false,
      error: false,
      course: "",
      title: "",
      replacedTB: "",
      priceLabel: "",
      options: CourseEnum,
    };
  },
  async fetch() {
    const join = [
      {
        field: "purchases",
        select: ["id"],
      },
      {
        field: "instructor",
        select: ["id", "name"],
      },
      {
        field: "thumbnail",
        select: ["path"],
      },
      {
        field: "chapters",
      },
      {
        field: "category",
        select: ["id", "name"],
      },
    ];
    const course = await this.$axios.$get(
      `${this.$api.courses}/${this.$route.params.id}`,
      {
        params: {},
        paramsSerializer: (param) => {
          return RequestQueryBuilder.create({
            join: join,
          }).query();
        },
      }
    );
    // console.log(course);
    this.course = course;
    this.title = course.title;
    this.priceLabel = course.price;
  },
  computed: {
    orderedChapters() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.course.chapters.sort((a, b) =>
        a.chapterNumber.localeCompare(b.chapterNumber)
      );
    },
    ...mapGetters({
      getCourse: "course/getCourse",
    }),
  },
  methods: {
    popCourseUpdated() {
      this.$toast.success(
        this.$i18n.t("course") +
          ": " +
          this.course.title +
          " " +
          this.$i18n.t("updated"),
        {
          duration: 3000,
        }
      );
    },
    async editCourse() {
      try {
        this.loading = true;
        let file = "";
        if (this.replacedTB) {
          /**
           * Replace TB
           */
          let formData = new FormData();
          let blob = await fetch(this.replacedTB.src).then((r) => r.blob());
          formData.append("file", blob, this.replacedTB.name);
          file = await this.$axios.$post("/v1/files", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          /**
           * Release Object URL
           */
          URL.revokeObjectURL(this.replacedTB.src);
          /**
           * Call API to delete old file later...
           * To-do
           */
        }
        const updated = await this.$axios.$patch(
          `${this.$api.courses}/${this.$route.params.id}`,
          {
            title: this.course.title,
            titleURL: this.course.titleURL,
            shortDescription: this.course.shortDescription,
            description: this.course.description,
            price: parseFloat(this.course.price),
            instructor: this.course.instructor,
            type: this.course.type,
            thumbnail: file ? file.id : this.course.thumbnail.id,
            category: this.course.category,
            paymentLink: this.course.paymentLink,
            promotionalVimeoLink: this.course.promotionalVimeoLink,
          }
        );
        this.popCourseUpdated();
        /**
         * Wait for image to be uploaded to AWS
         */
        setTimeout(() => {
          this.course.thumbnail = file;
        }, 3000);
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
    async addCommand() {
      this.course.chapters.push({
        name: "",
        shortDescription: "",
        description: "",
        duration: "",
        vimeoId: "",
        chapterNumber: this.course.chapters.length + 1,
      });
    },
    async makeDrafted() {
      try {
        this.loading = true;
        const updated = await this.$axios.$patch(
          `${this.$api.courses}/${this.$route.params.id}`,
          {
            status: "DRAFTED",
          }
        );
        this.popCourseUpdated();
        this.course.status = "DRAFTED";
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
    async makePublished() {
      try {
        this.loading = true;
        const updated = await this.$axios.$patch(
          `${this.$api.courses}/${this.$route.params.id}`,
          {
            status: "PUBLISHED",
          }
        );
        this.popCourseUpdated();
        this.course.status = "PUBLISHED";
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
    async deleteRequest(id) {
      this.loading = true;
      if (!id) {
        /**
         * Delete empty chapter
         */
        this.course.chapters.splice(-1);
      } else {
        try {
          /**
           * Remove from Server
           */
          this.$axios.$delete(`${this.$api.chapters}/${id}`);
          /**
           * Remove from Chapter List
           * @type {T[]}
           */
          this.course.chapters = this.course.chapters.filter(
            (item) => item.id !== id
          );
        } catch (e) {
          this.loading = false;
          console.log(e);
          this.$toast.error(e.response.data.message, {
            duration: 3000,
          });
        }
      }
      this.loading = false;
    },
  },
};
</script>
