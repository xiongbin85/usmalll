<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @closed="clear">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px" v-if="form.pid>0">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="change">
            <img :src="imgUrl" v-if="imgUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestClassifyAdd,
  requestClassifyDetail,
  requestClassifyUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  data() {
    return {
      imgUrl: "",
      form: {
        pid: null,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "classify/requestClassifyList",
    }),
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        pid: null,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    change(file) {
      //console.log(file);
      //限制上传图片的大小
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      //上传的文件后缀必须是.png .jpg .gif .jpeg
      var extname = file.name.slice(file.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }
      this.imgUrl = URL.createObjectURL(file.raw);
      this.form.img = file.raw;
      //console.log(this.form);
    },
    //点击的是修改时弹框动画结束清除所有值
    clear() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      //console.log(this.form);
      //当为顶级分类时二级分类名不能为空
      if (this.form.pid == 0 && this.form.catename == "") {
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      //当为二级分类时图片不能为空
      if (this.form.pid != 0) {
        if (this.form.catename == "" || this.form.img == null) {
          warningAlert("条件不能有空值,请完善信息");
          return;
        }
      }
      requestClassifyAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestClassifyDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    update() {
      if (this.form.pid == 0 && this.form.catename == "") {
        warningAlert("条件不能有空值,请完善信息");
        return;
      }
      if (this.form.pid != 0) {
        if (this.form.catename == "" || this.form.img == null) {
          warningAlert("条件不能有空值,请完善信息");
          return;
        }
      }
      //console.log(this.form);
      requestClassifyUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list == "") {
      this.requestList();
    }
  },
};
</script>
<style lang="stylus" scoped  >
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border-color: #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #d9d9d9;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>