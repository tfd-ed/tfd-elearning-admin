<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <label class="sr-only" for="email">Email</label>
      <input
        id="email"
        class="w-full p-3 text-sm border-gray-200 rounded-lg"
        placeholder="Email address"
        type="email"
      />
    </div>
    <div>
      <label class="sr-only" for="phone">Phone</label>
      <input
        id="phone"
        class="w-full p-3 text-sm border-gray-200 rounded-lg"
        placeholder="Phone Number"
        type="tel"
      />
    </div>
  </div>
</template>
