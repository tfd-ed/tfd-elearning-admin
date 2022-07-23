<template>
  <div v-if="!$fetchState.pending">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!--        <HeadNavigator-->
        <!--          path="/course"-->
        <!--          :label="getCourse($route.params.id).title"-->
        <!--        />-->
        <h1 class="text-3xl mt-2 font-bold text-gray-900">
          {{ $t("course") }}/ {{ title }}
        </h1>
      </div>
    </div>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div class="lg:col-span-2">
            <ImageLoader
              class="object-cover w-full h-56"
              :src="
                thumbnail ? thumbnail.path : 'https://dummyimage.com/720x400'
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
                    getCourse($route.params.id).purchases
                  }}</span>
                </div>
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <ChapterIcon />
                    <span>{{ $t("chapters") }}</span>
                  </div>
                  <span class="font-mono text-gray-900">{{
                    chapters.length
                  }}</span>
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
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ $t("comments") }}</span>
                  </div>
                  <span class="font-mono text-gray-900">32,422</span>
                </div>
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <MoneyIcon class="text-green-600" />
                    <span>{{ $t("price") }}</span>
                  </div>
                  <span class="font-mono text-gray-900">{{
                    getCourse($route.params.id).price
                  }}</span>
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
                      parseFloat(getCourse($route.params.id).purchases) *
                      parseFloat(getCourse($route.params.id).price)
                    }}</span
                  >
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
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ $t("completed") }}</span>
                  </div>
                  <span>12</span>
                </div>
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-center space-x-2 text-gray-700">
                    <ThunderIcon />
                    <span>{{ $t("learning") }}</span>
                  </div>
                  <span>32</span>
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
                @submit.prevent="handleSubmit(editCourse)"
              >
                <SimpleValidatedInput
                  id="course_name_edit"
                  v-model="title"
                  name="course_name"
                  label="course_name"
                  rules="required"
                />

                <CategorySelect
                  id="course_category_edit"
                  v-model="category"
                  name="course_category"
                  label="course_category"
                  rules="required"
                />

                <SimpleValidatedTextArea
                  id="course_description_edit"
                  v-model="description"
                  name="course_description"
                  label="course_description"
                  rules="required"
                />
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <SimpleValidatedInput
                    id="course_price_edit"
                    v-model="price"
                    name="course_price"
                    label="course_price"
                    rules="required|double"
                  />
                  <SimpleFileUpload
                    id="course_tb_edit"
                    v-model="thumbnail"
                    name="course_tb"
                    label="course_tb"
                    rules="mimes:image/jpeg,image/png,image/jpg|size:3000"
                  />
                </div>

                <SimpleValidatedInput
                  id="payment_link_edit"
                  v-model="paymentLink"
                  name="payment_link"
                  label="payment_link"
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
                v-for="(chapter, index) in chapters"
                :key="index"
                :chapter="chapter"
                :index="index"
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
      <!-- /End replace -->
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
import SimpleValidatedInput from "@/components/input/simple-validated-input";
import CategorySelect from "@/components/input/category-select";
import SimpleValidatedTextArea from "@/components/input/simple-validated-text-area";
import SimpleFileUpload from "@/components/input/simple-file-upload";
import MoneyIcon from "@/components/icons/money-icon";
import ImageLoader from "@/components/loader/image-loader";
import { ValidationObserver } from "vee-validate";
import ShadowButton from "@/components/button/shadow-button";
import ThunderIcon from "@/components/icons/thunder-icon";
import HeadNavigator from "@/components/navigator/head-navigator";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import GeneralContentLoading from "@/components/loading/general-content-loading";
import ChapterIcon from "@/components/icons/chapter-icon";
import ChapterEditCard from "@/components/card/chapter-edit-card";
export default {
  components: {
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
    CategorySelect,
    SimpleValidatedInput,
  },
  layout: "home",
  data() {
    return {
      loading: false,
      loaded: false,
      error: false,
      title: "",
      description: "",
      price: "",
      instructor: "",
      category: "",
      paymentLink: "",
      thumbnail: "",
      chapters: [],
    };
  },
  async fetch() {
    const join = [
      {
        field: "purchases",
        select: ["id"],
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
      `/v1/course/${this.$route.params.id}`,
      {
        params: {},
        paramsSerializer: (param) => {
          return RequestQueryBuilder.create({
            join: join,
          }).query();
        },
      }
    );
    this.title = course.title;
    this.description = course.description;
    this.price = course.price;
    this.instructor = course.instructor;
    this.category = course.category;
    this.paymentLink = course.paymentLink;
    this.thumbnail = course.thumbnail;
    this.chapters = course.chapters;
  },
  computed: {
    ...mapGetters({
      getCourse: "course/getCourse",
    }),
  },
  methods: {
    async editCourse() {
      try {
        const updated = await this.$axios.$patch(
          `v1/course/${this.$route.params.id}`,
          {
            title: this.title,
            description: this.description,
            price: parseFloat(this.price),
            instructor: this.instructor,
            category: this.category,
            paymentLink: this.paymentLink,
          }
        );
        this.$toast.success(
          this.$i18n.t("course") +
            ": " +
            this.title +
            " " +
            this.$i18n.t("updated"),
          {
            duration: 3000,
          }
        );
      } catch (e) {
        this.$toast.error(e.response.data.message, {
          duration: 3000,
        });
      }
    },
    async addCommand() {
      this.chapters.push({
        name: "",
        description: "",
        duration: "",
        vimeoId: "",
        chapterNumber: this.chapters.length + 1,
      });
    },
  },
};
</script>
