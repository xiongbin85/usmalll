<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">修改</el-button>
          <v-del @confirm="del(scope.row.uid)"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="change"
    ></el-pagination>
  </div>
</template>
<script>
import { requestUserDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "user/list",
      total: "user/total",
      size: "user/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "user/requestUserList",
      requestTotal: "user/requestUserCount",
      changePage: "user/changePage",
    }),
    change(val) {
      this.changePage(val);
      this.requestList();
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestUserDelete({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped>
</style>