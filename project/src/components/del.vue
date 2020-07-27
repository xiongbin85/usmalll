<template>
  <el-button @click="del" type="danger">删除</el-button>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    del() {
      this.$confirm("是否删除该菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("confirm");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>