<template>
  <div class="classis">
    <div class="logo">
      <img class="logo-img" src="@/image/compony/2.png" alt="" />
    </div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.id"
        @click="totarget(item, index)"
        v-bind:class="{ on: currentTab == item }"
      >
        {{ item }}
      </li>
    </ul>
    <slot></slot>
    <div class="logout">
      <span @click="editinfo">修改信息</span>
      <span @click="logout">退出登录</span>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="姓名">
          <el-input
            v-model="form.realname"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <br />
          <!-- <el-input v-model="form.school" autocomplete="off"></el-input> -->
          <el-select
            v-model="form.school"
            @change="change"
            placeholder="请选择学院"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <!-- <el-input v-model="form.major" autocomplete="off"></el-input> -->
          <br />
          <el-select
            v-model="form.major"
            @change="change1"
            placeholder="请选择专业"
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="期望岗位">
          <el-input
            v-model="form.Expected_location"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import url from '@/http.js'
export default {
  data() {
    return {
      list: ["首页", "我的投递"],
      currentTab: this.$route.query.currentTab
        ? this.$route.query.currentTab
        : "首页",
      form: {},
      dialogTableVisible: false,
      user: sessionStorage.getItem("user"),
      title: "修改个人信息",
      options: [],
      options1: [],
      options2: ["男", "女"],
    };
  },

  created() {
    this.load();
  },
  methods: {
    change1(data) {
      console.log(data);
      this.form.major = data;
    },
    change(data) {
      var that = this;
      this.options1 = [];
      this.$axios({
        url: url + ":1234/finZhuanYe?id=" + data,
        method: "GET",
      }).then((res) => {
        that.options1 = res.data;
        this.form.major = "";
      });
    },
    load() {
      this.$axios({
        url: url + ":1234/findXueYuan",
        method: "GET",
      }).then((res) => {
        this.options = res.data;
      });
    },
    editinfo() {
      this.dialogTableVisible = true;
      console.log(JSON.parse(this.user)[0]);
      this.form = JSON.parse(this.user)[0];
    },
    save() {
      var data = this.form;
      this.dialogTableVisible = false;
      this.$axios({
        url: url + ":1234/saveOredit",
        method: "POST",
        data: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        this.$message({
          message: res.data,
          type: "success",
        });
        setTimeout(() => {
          alert("信息已经更新，请重新登录");
          sessionStorage.removeItem("user");
          //window.location.href = "/";
          this.$router.push({ path: "/" });
        }, 2000);
      });
    },
    totarget(data, index) {
      this.currentTab = data;
      console.log(this.currentTab);
      if (this.currentTab == "首页") {
        //window.location.href = "/index";
        this.$router.push({ path: "/index", query: { currentTab: data } });
      } else {
        //window.location.href = "/pass";
        this.$router.push({ path: "/pass", query: { currentTab: data } });
      }
    },
    logout() {
      this.$confirm("将要退出，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          setTimeout(() => {
            sessionStorage.removeItem("user");
            window.location.href = "/";
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
      /*
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.load();
          this.$message({
            type: "success",
            message: "退出成功!",
          });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });,
    */
    },
  },
};
</script>

<style lang="scss" scoped>
.classis {
  box-sizing: border-box;
  position: relative;
  text-align: left;
  width: 100%;
  background: #ffffff50;
  margin: 50px auto;
  padding-left: 100px;
  border-radius: 10px;
  .logo {
    float: left;
    .logo-img {
      width: 100px;
    }
  }
  .on {
    color: rgb(91, 157, 214);
    font-weight: bold;
  }
  ul {
    display: flex;
    li {
      cursor: pointer;
      line-height: 100px;
      font-size: 20px;
      list-style: none;
      margin-left: 50px;
      &:hover {
        color: rgb(91, 157, 214);
        font-weight: bold;
      }
    }
  }
  .logout {
    font-size: 14px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 40%;
    color: #999999;
    span {
      margin-left: 20px;
    }
  }
}
</style>