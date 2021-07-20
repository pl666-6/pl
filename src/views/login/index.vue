<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form1.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form1.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="warning" @click="register">注册</el-button>
        <el-button type="success" @click="login">登录</el-button>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <br />
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <!-- <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col> -->
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
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
      title: "注册",
      form: {},
      form1: {},
      dialogTableVisible: false,
      options: [],
      options1: [],
      options2: ["男", "女"],
    };
  },
  created() {
    this.test().then((res)=>{
      console.log(res)
      console.log(res)
    })
    this.load();
    this.form1 = {};
    var that = this;
    document.onkeydown = function (e) {
      let e1 =
        e || event || window.event || arguments.callee.caller.arguments[0];

      if (e1.key == "Enter") {
        that.login();
      }
    };
  },
  methods: {
    change1(data) {
      this.$forceUpdate();
      var that = this;
      console.log(data);
      this.$nextTick(() => {
        that.form.major = data;
      });
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
    login() {
      console.log;
      var data = this.form1;
      this.$axios({
        url: url + ":1234/login",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
      }).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "登录成功",
            type: "success",
          });
          sessionStorage.setItem("user", JSON.stringify(res.data.info));
          setTimeout(() => {
            this.$router.push({ path: "/index" });
          }, 2000);
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    register() {
      this.form = {};
      this.dialogTableVisible = true;
    },
    save() {
      var data = this.form;
      this.$axios({
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: url + ":1234/saveOredit",
        data: qs.stringify(data),
      }).then((res) => {
        if (res.data == "注册成功") {
          this.$message({
            message: res.data,
            type: "success",
          });
          this.dialogTableVisible = false;
        } else {
          this.$message({
            message: res.data,
            type: "warning",
          });
        }
      });
    },
    test(){
      return new Promise((resolve,reject)=>{
        $.ajax({
          url: url + ":1234/findXueYuan",
          method: "GET",
          success(res){
            resolve(res)
          },
          error(err){
            reject(err)
          }
        })
      })
    }
  },
};
</script>

<style lang="scss" >
html,
body,
#app {
  height: 100%;
}
.login {
  background: url("../../image/login/bj.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .login-form {
    margin: 10% auto;
    width: 600px;
    height: 200px;
    border-radius: 10px;
    padding: 50px;
    padding-top: 100px;
    background: #ffffff90;
    position: fixed;
    top: 10px;
    left: 30%;
    /deep/ .el-input__inner {
      background: #ffffff50;
      border: none;
    }
  }
  .button {
    text-align: right;
    &:nth-child(1) {
    }
  }
}
.el-select {
  width: 100%;
}
</style>