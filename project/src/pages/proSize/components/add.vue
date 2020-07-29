<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @closed="clear">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item v-for="(item, index) in arr" label="规格属性" :key="index" label-width="80px">
          <el-input v-model="item.value" class="del"></el-input>
          <el-button @click.prevent="addNew(item)" type="primary" v-if="index==0">新增商品规格</el-button>
          <el-button @click.prevent="removeDomain(item)" type="danger" v-else>删除</el-button>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">确 定</el-button>
        <el-button @click="update" type="primary" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestSizeAdd,
  requestSizeDetail,
  requestSizeUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      arr: [
        {
          value: "",
        },
      ],
      form: {
        attrs: "",
        specsname: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "size/requestSizeList",
      requestTotal: "size/requestSizeCount",
    }),
    addNew() {
      this.arr.push({
        value: "",
      });
    },
    removeDomain(item) {
      var index = this.form.arr.indexOf(item);
      if (index !== -1) {
        this.form.arr.splice(index, 1);
      }
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      arr: [
        {
          value: "",
        },
      ];
      this.form = {
        attr: [],
        specsname: "",
        status: 1,
      };
    },
    //点击的是修改时弹框动画结束清除所有值
    clear() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      //console.log(this.form.attrs);
      if (this.form.specsname == "" || this.form.attrs == '[""]') {
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      requestSizeAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestSizeDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.arr = JSON.parse(res.data.list[0].attrs).map((item) => {
          return {
            value: item,
          };
        });
      });
    },
    update() {
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      if (this.form.specsname == "" || this.form.attrs == '[""]') {
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      requestSizeUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
          this.requestTotal();
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
.del {
  width: 75%;
}
</style>