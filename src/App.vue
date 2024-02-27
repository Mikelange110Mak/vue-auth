<template>
  <the-header
    :class="{
      greenHeader: headerColor === 'green',
      redHeader: headerColor === 'red',
      primaryHeader: headerColor === 'primary',
    }"
    >{{ headerMsg }}</the-header
  >
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$axios.interceptors.response.use(
      (res) => {
        this.isError = false;
        this.responseAnimation(res.data, "green", 1000);
        return res;
      },
      (err) => {
        if (err?.response?.status === 400) {
          this.isError = true;
          console.log(err.response.data);
          this.responseAnimation(
            err.response.data[0] || err.response.data.message,
            "red",
            1600
          );
        }

        //Promise.reject(err);
      }
    );
  },
  data() {
    return {
      headerMsg: "",
      isError: false,
      headerColor: "primary",
    };
  },
  methods: {
    responseAnimation(msg, color, time) {
      this.headerColor = color;
      this.headerMsg = msg;
      setTimeout(() => {
        this.headerMsg = "";
        this.headerColor = "primary";
      }, time);
    },
  },
};
</script>

<style>
</style>
