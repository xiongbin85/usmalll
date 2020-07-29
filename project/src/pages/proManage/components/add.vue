<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="getEditor" @closed="clear">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="getFirstCate()">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in classifylist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in cateChildren"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="change">
            <img :src="imgUrl" v-if="imgUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" placeholder="请选择" @change="getFirstSize()">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option
              v-for="item in sizelist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="80px">
          <el-select v-model="sizeArr" multiple placeholder="请选择">
            <el-option label="---请选择---" disabled value></el-option>
            <el-option v-for="item in sizeChildren" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <div id="desc"></div>
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
import { mapGetters, mapActions } from "vuex";
import {
  requestProAdd,
  requestProDetail,
  requestProUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      classifylist: "classify/list",
      sizelist: "size/list",
    }),
  },
  data() {
    return {
      imgUrl: "",
      sizeArr: [],
      cateChildren: [],
      sizeChildren: [],
      editor: null,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestClassify: "classify/requestClassifyList",
      requestSize: "size/requestAllList",
      requestList: "pro/requestProList",
      requestTotal: "pro/requestProCount",
    }),
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      this.sizeArr = [];
      this.cateChildren = [];
      this.sizeChildren = [];
      this.editor.txt.html("");
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击修改时弹框动画结束时清除所有值
    clear() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //获取已选择的一级分类
    getFirstCate(bool) {
      this.classifylist.forEach((item) => {
        if (item.id == this.form.first_cateid) {
          this.cateChildren = item.children;
        }
      });
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    //获取已选择的商品规格
    getFirstSize(bool) {
      //console.log(id);
      this.sizelist.forEach((item) => {
        if (item.id == this.form.specsid) {
          this.sizeChildren = item.attrs;
        }
      });
      if (!bool) {
        this.sizeArr = [];
      }
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
    //富文本编辑器
    getEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    add() {
      this.form.specsattr = JSON.stringify(this.sizeArr);
      //console.log(this.form);
      if (
        this.form.first_cateid == "" ||
        this.form.second_cateid == "" ||
        this.form.goodsname == "" ||
        this.form.price == "" ||
        this.form.market_price == "" ||
        this.form.img == null
      ) {
        warningAlert("条件里面不能有空值");
        return;
      } else {
        requestProAdd(this.form).then((res) => {
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
      }
    },
    getDetail(id) {
      requestProDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
        //console.log(this.form);
        this.this.sizeArr = JSON.parse(res.data.list.specsattr);
        this.getFirstCate(true);
        this.getFirstSize(true);
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.this.sizeArr);
      requestProUpdate(this.form).then((res) => {
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
  mounted() {
    if (this.classifylist.length == 0) {
      this.requestClassify();
    }
    if (this.sizelist.length == 0) {
      this.requestSize();
    }
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #333;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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