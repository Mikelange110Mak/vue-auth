<template>
  <the-header
    :class="{
      greenHeader: headerColor === 'green',
      redHeader: headerColor === 'red',
      primaryHeader: headerColor === 'primary',
    }"
    >{{ headerMsg }}</the-header
  >
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
              <td class="table__username-th">
                <span v-if="!editingUser">{{ user.username }}</span>
                <input v-else v-model="user.username" @blur="stopEditing" />
              </td>
              <td class="table__userrole-th">{{ user.roles[0] }}</td>
              <td>
                <div class="table__btn-cnt" v-if="user.roles[0] !== 'ADMIN'">
                  <button
                    class="table__edit-user btn"
                    @click="editUser(user, $event)"
                  >
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
import TheHeader from "./TheHeader.vue";

export default {
  data() {
    return {
      usersList: { admin: {}, users: [] },
      headerMsg: "asd",
      headerColor: "primary",
      editingUser: false,
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
      let parentTr = event.target.closest("tr");
      parentTr.classList.add("animation");
      setTimeout(() => {
        parentTr.remove();
      }, 400);
      this.removeFromDb(user);
      this.responseAnimation(
        `Пользователь ${user.username} успешно удален`,
        "green",
        1600
      );
    },
    async editUser(user, event) {
      console.log(user);
      console.log(event.target);
      event.stopPropagation();
      this.editingUser = user;
    },
    async removeFromDb(user) {
      const response = await this.$axios.delete("delete-user", { data: user });
      console.log(response);
      console.log(`${user.username} был удален`);
    },

    responseAnimation(msg, color, time) {
      this.headerColor = color;
      this.headerMsg = msg;

      setTimeout(() => {
        this.headerMsg = "";
        this.headerColor = "primary";
      }, time);
    },
    stopEditing() {
      this.editingUser = true;
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
  components: {
    TheHeader,
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
.animation {
  -webkit-transform: translateX(-80%);
  -ms-transform: translateX(-80%);
  transform: translateX(-80%);
  opacity: 0;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.header {
  left: 0;
  top: 0;
}
</style>
