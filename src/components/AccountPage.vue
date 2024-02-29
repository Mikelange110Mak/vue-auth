<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar__container container-fluid">
        <p class="navbar__title">Личный кабинет</p>
        <div class="navbar__dropdown dropdown">
          <button
            class="navbar__account-btn btn btn-secondary dropdown-toggle"
            id="dropdownMenuButton2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ username }}
          </button>
          <ul
            class="navbar__account-list dropdown-menu dropdown-menu-dark dropdown-menu-end"
            aria-labelledby="dropdownMenuButton2"
          >
            <li class="navbar__account-role dropdown-item">
              Роль: {{ role[0] }}
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li @click="logout" class="navbar__account-exit dropdown-item">
              Выйти
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="content">
      <h3 class="content__title">Контентная часть</h3>
      <div class="content__img-container d-flex justify-content-center">
        <img
          class="content__pic img-fluid"
          src="../assets/images/cat.jpg"
          alt="content-image"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      role: "",
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$axios.get("content");
        this.username = response.data.contentData.user.username;
        this.role = response.data.contentData.user.roles;
        if (this.role.includes("ADMIN")) {
          console.log(response.data.contentData.user.roles);
          this.$router.push("/admin");
        }
        //console.log(response.data.contentData.user);
        //console.log(this.role);
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>