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
        return ["", "greenHeader", "redHeader", "primaryHeader"].includes(
          value
        );
      },
    },
  },
};
</script>
<style>
.header {
  color: aliceblue;
  position: absolute;
  padding: 0.5rem 1rem;
  width: 100%;
  border-radius: 0;
}
.primaryHeader {
  background-color: inherit;
  border-color: inherit;
}

.greenHeader {
  background-color: #297a2f;
  border-color: #297a2f;
}

.redHeader {
  background-color: #7a0808;
  border-color: #7a0808;
}
</style>