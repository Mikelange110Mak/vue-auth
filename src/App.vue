<template>
  <the-header :class="{ greenHeader: headerColor, redHeader: !headerColor }">{{
    errorMsg
  }}</the-header>
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
        return res;
      },
      (err) => {
        if (err?.response?.status === 400) {
          this.isError = true;
          this.errorMsg = err.response.data;
          this.headerColor = false;
        }

        //Promise.reject(err)
      }
    );
  },
  data() {
    return {
      errorMsg: "",
      isError: false,
      headerColor: true,
    };
  },
  methods: {
    headerMsg(data) {
      console.log("HeaderMsg" + data);
    },
  },
};
</script>

<style>
</style>
