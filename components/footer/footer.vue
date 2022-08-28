<template>
  <footer class="bg-gray-100">
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex justify-center text-teal-600 sm:justify-start">
          <img class="h-12" src="/favicon.ico" />
        </div>

        <p class="mt-4 text-sm text-center text-gray-500 lg:text-right lg:mt-0">
          {{ $t("copyright") }} &copy;
          {{
            $i18n.locale === "km"
              ? $convertKhmerNumber(new Date().getFullYear())
              : new Date().getFullYear()
          }},
          {{ $t("all_right_reserved") }}
        </p>
      </div>
    </div>
  </footer>
</template>
