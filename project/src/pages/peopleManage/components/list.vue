<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
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
import { mapGetters, mapActions } from "vuex";
import { requestPeopleDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "people/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestPeopleList: "people/requestPeopleList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestPeopleDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestPeopleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestPeopleList();
  },
};
</script>
<style scoped>
</style>