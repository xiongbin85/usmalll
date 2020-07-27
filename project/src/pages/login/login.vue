<template>
  <div class="main">
    <div class="login">
      <h1>登录</h1>
      <el-input class="input" v-model="user.username" placeholder="请输入用户名"></el-input>
      <el-input class="input" v-model="user.password" placeholder="请输入密码" show-password></el-input>
      <div>
        <el-button @click="login" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { successAlert, warningAlert } from "../../util/alert";
import { requestLogin } from "../../util/request";
export default {
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "login/changeUser",
    }),
    login() {
      requestLogin(this.user).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeUser(res.data.list);
          this.$router.push("/home");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #553443, #2f3d5f);
}
.login {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  text-align: center;
  margin-bottom: 10px;
}
.input {
  width: 80%;
  margin-bottom: 10px;
  text-align: center;
  margin-left: 10%;
}
.el-button {
  width: 80%;
  margin-left: 10%;
}
</style>