<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in peopleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestUserAdd,
  requestUserDetail,
  requestUserUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      peopleList: "people/list",
    }),
  },
  data() {
    return {
      form: {
        roleid: null,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestPeopleList: "people/requestPeopleList",
      requestList: "user/requestUserList",
      requestTotal: "user/requestUserCount",
    }),
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        roleid: null,
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      //console.log(this.peopleList);
      requestUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestUserDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.uid = id;
      });
    },
    update() {
      requestUserUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.peopleList.length == 0) {
      this.requestPeopleList();
    }
  },
};
</script>
<style scoped>
</style>