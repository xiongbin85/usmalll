<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
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
import { requestProDelete } from "../../../util/request";
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
  computed: {
    ...mapGetters({
      list: "pro/list",
      total: "pro/total",
      size: "pro/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "pro/requestProList",
      requestTotal: "pro/requestProCount",
      changePage: "pro/changePage",
    }),
    change(val) {
      this.changePage(val);
      this.requestList();
    },
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestProDelete({ id: id }).then((res) => {
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
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>