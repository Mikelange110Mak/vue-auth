<template>
  <div class="header" :class="color">
    <slot />
  </div>
</template>
<script>
export default {
  emits: ["action"],
  props: {
    color: {
      type: String,
      default: "",
      validator(value) {
        return ["", "greenHeader", "redHeader"].includes(value);
      },
    },
  },
};
</script>