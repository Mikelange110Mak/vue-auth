<template>
  <the-header
    :class="{
      greenHeader: headerColor === 'green', // Добавляет класс 'greenHeader', если значение переменной 'headerColor' равно 'green'
      redHeader: headerColor === 'red', // Добавляет класс 'redHeader', если значение переменной 'headerColor' равно 'red'
      primaryHeader: headerColor === 'primary', // Добавляет класс 'primaryHeader', если значение переменной 'headerColor' равно 'primary'
    }"
    >{{ headerMsg }}</the-header
  ><!-- Блок, реагирующий на клик и вызывающий метод 'stopEditing' -->
  <div class="admin" @click="stopEditing">
    <div class="admin__body">
      <div class="users">
        <div class="users__title">Список зарегистрированных пользователей</div>
        <!-- Граница где заканчивается событие клика 'stopEditing' -->
        <table class="table table-hover" @click.stop="">
          <tbody>
            <tr class="users__table-title">
              <th class="users__thTitle">Пользователь</th>
              <th class="users__thTitle">Роль</th>
              <th class="users__thTitle">Действие</th>
            </tr>
          </tbody>
          <tbody>
            <!-- Цикл для отображения каждого пользователя в отдельной строке -->
            <tr v-for="(user, index) in sortedUsersList" :key="index">
              <!-- Ячейка с именем пользователя -->
              <td class="table__username-th">
                <!-- Eсли режим редактирования НЕ АКТИВЕН, то спан с ником юзера -->
                <span v-if="!user.editing">{{ user.username }}</span>

                <!-- Если режим редактирования АКТИВЕН, то инпут в котором можно отредактировать юзернейм -->
                <input
                  class="table__editing"
                  v-else
                  v-model="user.username"
                  @blur="stopEditing(user)"
                  :size="user.username.length"
                />
              </td>

              <!-- Ячейка с ролью пользователя -->
              <td class="table__userrole-th">{{ user.roles[0] }}</td>
              <td>
                <!-- Ячейка с кнопками действий, невозможно применить действия на пользователей с ролью ADMIN -->
                <div class="table__btn-cnt" v-if="user.roles[0] !== 'ADMIN'">
                  <!-- Кнопка для редактирования пользователя -->
                  <button class="table__edit-user btn" @click="editUser(user)">
                    Edit
                  </button>
                  <!-- Кнопка для удаления пользователя -->
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
      usersList: { admin: {}, users: [] }, // Список пользователей
      headerMsg: "asd", // Сообщение для header, используется когда проворачиваешь действия с пользователями
      headerColor: "primary", // Цвет для header
      editingUser: {}, // Пользователь, который редактируется в данный момент
    };
  },
  methods: {
    // Метод для получения списка пользователей
    async getUsersList() {
      try {
        // Запрос на получение данных о пользователях
        const response = await this.$axios.get("users");
        // Запись полученных данных в usersList
        this.usersList = response.data.adminData;
      } catch (error) {
        console.log(error);
      }
    },
    // Метод для удаления пользователя
    async deleteUser(user, event) {
      // Нахождение ближайшего родительского элемента tr
      let parentTr = event.target.closest("tr");
      // Сначала накидываю на него анимацию
      parentTr.classList.add("animation");
      // Потом удаляю
      setTimeout(() => {
        parentTr.remove();
      }, 400);
      // Вызов метода для удаления пользователя из базы данных
      this.removeFromDb(user);
      // Вызов метода для отображения в header что все успешно
      this.responseAnimation(
        `Пользователь ${user.username} успешно удален`,
        "green",
        1600
      );
    },

    //  Метод для редактирования пользователя
    async editUser(user) {
      // Сброс режима редактирования для предыдущего пользователя
      this.editingUser.editing = false;
      // Установка режима редактирования для текущего пользователя
      user.editing = true;

      //Установка текущего пользователя в объект editingUser.
      //Это позволяет отслеживать, какой пользователь редактируется в данный момент.
      //Когда мы устанавливаем editingUser равным user, мы фактически указываем, что пользователь user редактируется сейчас.
      this.editingUser = user;
    },

    //  Метод удаления пользователя из бд
    async removeFromDb(user) {
      const response = await this.$axios.delete("delete-user", { data: user });
      console.log(response);
      console.log(`${user.username} был удален`);
    },

    //  Метод для отображения сообщения в header
    responseAnimation(msg, color, time) {
      this.headerColor = color;
      this.headerMsg = msg;

      setTimeout(() => {
        this.headerMsg = "";
        this.headerColor = "primary";
      }, time);
    },
    stopEditing(user) {
      user.editing = false;
    },
  },
  //  Вызов метода для получения пользователей
  mounted() {
    this.getUsersList();
  },
  computed: {
    // Метод сортировки пользователей, чтобы админы были первыми
    sortedUsersList() {
      const users = [...this.usersList.users];

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
.table__editing {
  text-align: center;
  border: 1px solid #333;
}
.table__username-th {
  max-width: 240px;
}
</style>
