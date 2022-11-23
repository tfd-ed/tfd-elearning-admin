<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(editChapter)">
      <div
        class="flex flex-row space-x-2 items-center justify-between mb-2 bg-gray-50 rounded-xl"
      >
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-400 text-white"
        >
          <div class="font-semibold text-xl">
            {{ $convertKhmerNumber(chapter.chapterNumber) }}
          </div>
        </div>
        <div class="text-sm text-gray-600">
          {{ $moment(chapter.createdDate).format("LLLL") }}
        </div>
        <div class="flex items-center -space-x-4 hover:space-x-1">
          <div
            v-if="!editing"
            class="cursor-pointer z-20 block p-4 text-gray-700 transition-all bg-gray-100 border-2 border-white rounded-full active:bg-gray-50 hover:scale-110 focus:outline-none focus:ring"
            @click="editing = !editing"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <button
            v-if="editing"
            type="submit"
            class="z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <title>square-upload</title>
              <g fill="#34495e">
                <path
                  fill="#34495e"
                  d="M7,3.4V12h2V3.4l4,4L14.4,6L8.7,0.3c-0.4-0.4-1-0.4-1.4,0L1.6,6L3,7.4L7,3.4z"
                ></path>
                <path
                  d="M14,14H2v-3H0v4c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-4h-2V14z"
                ></path>
              </g>
            </svg>
          </button>
          <button
            class="z-30 block p-4 cursor-pointer text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
            type="button"
            @click="onDeleteChapter"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="editing" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SimpleValidatedInput
          :id="'chapter_name_' + index"
          v-model="name"
          name="chapter_name"
          label="chapter_name"
          rules="required"
        />
        <SimpleValidatedTextArea
          :id="'chapter_description' + index"
          v-model="description"
          name="chapter_description"
          label="chapter_description"
          rules="required"
        />
        <SimpleValidatedInput
          :id="'chapter_url' + index"
          v-model="vimeoId"
          name="chapter_url"
          label="Vimeo ID"
          rules="required"
        />
        <SimpleValidatedInput
          :id="'chapter_duration' + index"
          v-model="duration"
          name="duration"
          label="duration"
          rules="required|max_value:10000"
        />
      </div>
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex flex-col space-y-2">
          <span class="text-xs text-gray-600">{{ $t("chapter_name") }}</span>
          <p class="font-semibold">{{ name }}</p>
        </div>
        <div class="flex flex-col space-y-2">
          <span class="text-xs text-gray-600">{{
            $t("chapter_description")
          }}</span>
          <p class="text-justify">{{ description }}</p>
        </div>
        <div class="text-gray-700">
          Vimeo ID: <b>{{ vimeoId }}</b>
        </div>
        <div class="text-gray-600">
          {{ $t("duration") }}: <b>{{ duration }}</b>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import SimpleValidatedInput from "@/components/inputs/simple-validated-input";
import SimpleValidatedTextArea from "@/components/inputs/simple-validated-text-area";
export default {
  components: {
    ValidationObserver,
    SimpleValidatedTextArea,
    SimpleValidatedInput,
  },
  props: {
    chapter: {
      type: Object,
    },
    index: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  emits: ["deleteCommand", "addCommand"],
  data() {
    return {
      id: "",
      name: "",
      description: "",
      vimeoId: "",
      duration: "",
      editing: true,
    };
  },
  mounted() {
    this.id = this.chapter.id;
    this.name = this.chapter.name;
    this.description = this.chapter.description;
    this.vimeoId = this.chapter.vimeoId;
    this.duration = this.chapter.duration;
    if (this.chapter.name !== "") {
      this.editing = false;
    }
  },
  methods: {
    async editChapter() {
      if (this.id) {
        /**
         * Editing
         * @type {Promise<any>}
         */
        try {
          const update = await this.$axios.$patch(
            `${this.$api.chapters}/${this.id}`,
            {
              name: this.name,
              description: this.description,
              vimeoId: this.vimeoId,
              duration: parseInt(this.duration),
            }
          );
          this.$toast.success(
            this.$i18n.t("chapters") +
              ": " +
              this.chapter.name +
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
      } else {
        try {
          const newChapter = await this.$axios.$post(this.$api.chapters, {
            name: this.name,
            description: this.description,
            vimeoId: this.vimeoId,
            duration: parseInt(this.duration),
            chapterNumber: this.index + 1,
            course: this.$route.params.id,
          });
          this.id = newChapter.id;
          this.$toast.success(
            this.$i18n.t("chapters") +
              newChapter.name +
              " " +
              this.$i18n.t("created"),
            {
              duration: 3000,
            }
          );
        } catch (e) {
          this.$toast.error(e.response.data.message, {
            duration: 3000,
          });
        }
      }
      this.editing = !this.editing;
    },
    async onDeleteChapter() {
      this.$emit("deleteCommand", this.id);
    },
  },
};
</script>
