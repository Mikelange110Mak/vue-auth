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
          <tbody>
            <tr v-for="(user, index) in sortedUsersList" :key="index">
              <td>{{ user.username }}</td>
              <td>{{ user.roles[0] }}</td>
              <td>
                <div class="table__btn-cnt" v-if="user.roles[0] !== 'ADMIN'">
                  <button class="table__edit-user btn" @click="editUser(user)">
                    Edit
                  </button>
                  <button
                    class="table__delete-user btn"
                    @click="deleteUser(user, $event)"
                  >
                    Delete
                  </button>
                </div>
              </td>
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
      usersList: { admin: {}, users: [] },
    };
  },
  methods: {
    async getUsersList() {
      try {
        const response = await this.$axios.get("users");
        this.usersList = response.data.adminData;
        //console.log(this.usersList);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(user, event) {
      console.log(user);
      let a = event.target.closest("tr");
      console.log(a);
    },
  },
  mounted() {
    this.getUsersList();
  },
  computed: {
    sortedUsersList() {
      const users = [...this.usersList.users];

      // Сортирую пользователей, чтобы админы были первыми
      users.sort((a, b) => {
        const roleA = a.roles[0];
        const roleB = b.roles[0];

        if (roleA === "ADMIN") return -1;
        if (roleB === "ADMIN") return 1;

        return 0;
      });
      return users;
    },
  },
};
</script>

<style>
.table__btn-cnt {
  display: flex;
  justify-content: space-around;
}

.btn {
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  border-radius: 6px;
}

.table__edit-user {
  background-color: rgb(245, 160, 2);
  color: #eeecec;
  padding: 5px 11px;
  margin-right: 5px;
}

.table__delete-user {
  background-color: #be3333;
  color: #eeecec;
  padding: 5px 9px;
}
</style>
