<template>
  <div class="mt-2 mb-2 border-b">
    <div class="flex flex-row space-x-2 items-center justify-between">
      <div
        class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-400 text-white"
      >
        <div class="font-semibold text-xl">
          {{ $convertKhmerNumber(index + 1) }}
        </div>
      </div>
      <div class="flex items-center -space-x-4 hover:space-x-1">
        <button
          class="z-10 block p-4 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
          type="button"
          @click="addCommand"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>

        <button
          v-if="!editing"
          class="z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
          type="button"
          @click="editing === false ? (editing = true) : (editing = false)"
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
        </button>

        <button
          v-if="editing"
          class="z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
          type="button"
          @click="editing === false ? (editing = true) : (editing = false)"
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
          class="z-30 block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
          type="button"
          @click="deleteCommand"
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
      />
      <SimpleValidatedTextArea
        :id="'chapter_description' + index"
        v-model="description"
        name="chapter_description"
        label="chapter_description"
      />
      <SimpleValidatedInput
        :id="'chapter_url' + index"
        v-model="vimeoId"
        name="chapter_url"
        label="Vimeo ID"
      />
      <SimpleValidatedInput
        :id="'chapter_duration' + index"
        v-model="duration"
        name="chapter_duration"
        label="duration"
      />
    </div>
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="flex flex-col space-y-2">
        <span class="text-xs text-gray-600">{{ $t("chapter_name") }}</span>
        <p class="font-semibold">{{ chapter.name }}</p>
      </div>
      <div class="flex flex-col space-y-2">
        <span class="text-xs text-gray-600">{{
          $t("chapter_description")
        }}</span>
        <p class="text-justify">{{ chapter.description }}</p>
      </div>
      <div class="text-gray-700">
        Vimeo ID: <b>{{ chapter.vimeoId }}</b>
      </div>
      <div class="text-gray-600">
        {{ $t("duration") }}: <b>{{ chapter.duration }}</b>
      </div>
    </div>
  </div>
</template>
<script>
import SimpleValidatedInput from "@/components/input/simple-validated-input";
import SimpleValidatedTextArea from "@/components/input/simple-validated-text-area";
export default {
  components: { SimpleValidatedTextArea, SimpleValidatedInput },
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
      name: this.chapter.name,
      description: this.chapter.description,
      vimeoId: this.chapter.vimeoId,
      duration: this.chapter.duration,
      editing: false,
    };
  },
  methods: {
    deleteCommand() {
      this.$emit("deleteCommand", this.index);
    },
    addCommand() {
      this.$emit("addCommand", this.index);
    },
  },
};
</script>
