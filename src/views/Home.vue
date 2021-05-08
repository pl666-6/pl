<template>
  <div>
    <div class="button">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="success">删除</el-button>
    </div>
    <el-table :data="message" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="money" label="money" width="180">
      </el-table-column>
      <el-table-column prop="type" label="type"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      message: "",
    };
  },
  created() {
    this.temp();
  },
  methods: {
    add() {
      let that = this;
      this.$axios
        .get(url + ":1234/save", {
          params: {
            description: 123,
            money: "Henry",
            type: 1,
          },
        })
        .then(function (res) {
          console.log(res.data);
        });
    },
    temp() {
      let that = this;
      this.$axios.get(url + ":1234/find").then(function (res) {
        console.log(res.data);
        that.message = res.data;
        console.log(that.message);
      });
    },
  },
};
</script>
<style>
.home {
  color: red;
}
</style>