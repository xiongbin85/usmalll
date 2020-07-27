<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">修改</el-button>
          <v-del @confirm="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { requestMenuDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    //修改
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      requestMenuDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestMenuList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>
<style scoped>
</style>