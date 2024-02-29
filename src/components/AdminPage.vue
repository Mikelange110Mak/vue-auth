<template>
  <div class="admin">
    <div class="admin__body">
      <div class="users">
        <div class="users__title">Список зарегистрированных пользователей</div>
        <table class="table table-hover">
          <tbody>
            <tr class="users__table-title">
              <th class="users__thTitle">Пользователь</th>
              <th class="users__thTitle">Роль</th>
              <th class="users__thTitle">Действие</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      usersList: "",
    };
  },
  methods: {
    async getUsersList() {
      try {
        const response = await this.$axios.get("users");
        this.usersList = JSON.parse(JSON.stringify(response.data.adminData));
        console.log(console.log(this.usersList));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getUsersList();
  },
};
</script>
