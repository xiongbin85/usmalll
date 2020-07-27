<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
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
import { requestSizeDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "size/list",
      total: "size/total",
      size: "size/size",
    }),
  },
  data() {
    return {
      arr: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      requestList: "size/requestSizeList",
      requestTotal: "size/requestSizeCount",
      changePage: "size/changePage",
    }),
    change(val) {
      this.changePage(val);
      this.requestList();
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestSizeDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestTotal();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestTotal();
    this.requestList();
    console.log(this.list);
  },
};
</script>
<style scoped>
</style>