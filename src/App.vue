<template>
  <router-view></router-view>
  <div v-if="isError">{{ errorMsg }}</div>
</template>

<script>
export default {
  created() {
    this.$axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response?.status === 400) {
          this.isError = true;
          this.errorMsg = err.response.data;
          //alert('pnh')
        }

        //Promise.reject(err)
      }
    );
  },
  data() {
    return {
      errorMsg: "",
      isError: false,
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
