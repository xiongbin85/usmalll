<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @closed="clear">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="key"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestPeopleAdd,
  requestPeopleDetail,
  requestPeopleUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
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
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      key: [],
    };
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestPeopleList: "people/requestPeopleList",
    }),
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击的是修改时弹框动画结束清除所有值
    clear() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //console.log(this.form.menus);
      if (this.form.rolename == "" || this.form.menus == "[]") {
        //console.log(this.form.menus == "[]");
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      //console.log(this.form);
      requestPeopleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestPeopleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取单条数据并渲染到弹框中里面
    getDetail(id) {
      requestPeopleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.key = JSON.parse(res.data.list.menus);
        this.form.id = id;
      });
    },
    //修改
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      if (this.form.rolename == "" || this.form.menus == "[]") {
        //console.log(this.form.menus == "[]");
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      requestPeopleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestPeopleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.requestMenuList();
    }
  },
};
</script>
<style scoped>
</style>