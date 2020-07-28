<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路径" label-width="80px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option v-for="item in url" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
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
  requestMenuAdd,
  requestMenuDetail,
  requestMenuUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      icons: [
        "el-icon-eleme",
        "el-icon-s-goods",
        "el-icon-upload",
        "el-icon-s-platform",
        "el-icon-s-finance",
        "el-icon-loading",
      ],
      url: [
        "/home",
        "/menuManage",
        "/peopleManage",
        "/userManage",
        "/proClassify",
        "/proManage",
        "/proSize",
        "/slideShow",
        "/vipManage",
        "/activity",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //添加数据
    add() {
      if (
        this.form.title == "" ||
        (this.form.icon == "" && this.form.url == "")
      ) {
        warningAlert("条件不能有空值,请完善信息");
        return;
      } else {
        requestMenuAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.requestMenuList();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    //获取单条数据详情
    getDetail(id) {
      requestMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //更新数据
    update() {
      if (
        this.form.title == "" ||
        (this.form.icon == "" && this.form.url == "")
      ) {
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      requestMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestMenuList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
</style>