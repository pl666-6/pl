<template>
  <div class="pass">
    <vue-particles
      class="bglz"
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
    >
    </vue-particles>
    <div class="pass-content">
      <headss></headss>
      <div class="main-content">
        <div class="left">
          <div class="name">
            <div class="img">
              <img
                v-if="user.sex == '男'"
                src="@/image/compony/user-face-male.png"
                alt=""
              />
              <img v-else src="@/image/compony/user-face-female.png" alt="" />
            </div>
            <div class="word">
              <span>Hi,{{ user.realname }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <span> 简历投递记录 </span>
            <span> 记录了平台所有的简历投递信息，方便统一查看 </span>
          </div>
          <div class="right-content">
            <div class="content-top">
              <div>投递公司</div>
              <div>投递岗位</div>
              <div>投递时间</div>
              <div>投递状态</div>
            </div>
            <div class="content-main">
              <div
                class="content-main-content"
                v-for="item in alldata"
                :key="item.id"
              >
                <div class="company">{{ item.company_name }}</div>
                <div class="gangwei">{{ item.gangwei_name }}</div>
                <div class="time">{{ item.time | toTime }}</div>
                <div class="time">{{ item.ispass }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footers></footers>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span
        >请留意首页上的通知,准时参加相应的招聘会,如有急事参加不了，请联系网站管理员取消</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headss from "@/components/head";
import footers from "@/components/footer";
import url from '@/http.js'
export default {
  components: { headss, footers },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user"))[0],
      alldata: [],
      timedata: [],
      isMale: null,
      dialogVisible: false,
    };
  },
  created() {
    this.load();
  },
  filters: {
    toTime(data) {
      if (data) {
        var time = new Date(data);
        var year = time.getFullYear();
        var month =
          time.getMonth() + 1 < 10
            ? "0" + (time.getMonth() + 1)
            : time.getMonth() + 1;
        var data = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        var hours =
          time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        var minutes =
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        var Timeed =
          year + "/" + month + "/" + data + " " + hours + ":" + minutes;
        return Timeed;
      }
      return null;
    },
  },
  methods: {
    async load() {
      let alldata = await this.$axios({
        url:  url + ":1234/findAllDeliveryByid?id=" + this.user.id,
        method: "GET",
      });
      let timedata = await this.$axios({
        url:  url + ":1234/addDeliveryTimeById?id=" + this.user.id,
        method: "GET",
      });
      console.log(alldata);
      console.log(timedata);
      this.alldata = alldata.data;
      this.timedata = timedata.data;
      this.alldata.forEach((item, index) => {
        item.time = this.timedata[index].time;
      });
      console.log(this.alldata);
      if (this.alldata.length != 0) {
        this.dialogVisible = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pass {
  width: 100%;
  background: #000;
  border-top: 1px solid #dfdfdf;
  position: relative;
  .bglz {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .pass-content {
    width: 90%;
    margin: 0 auto;
    .main-content {
      &::before,
      &::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      *zoom: 1;
    }
    .left {
      height: 100px;
      float: left;
      width: 25%;
      background: #303641;
      .name {
        position: relative;
        .img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 10px 0 0 10px;
          display: inline-block;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .word {
          position: absolute;
          top: 30%;
          font-size: 40px;
          left: 100px;
          color: #ffffff;
        }
      }
    }
    .right {
      float: right;
      width: 70%;
      background: #ffffff50;
      padding-left: 30px;
      padding-top: 50px;
      position: relative;
      z-index: 100;
      .title {
        & > :nth-child(1) {
          font-size: 30px;
        }
      }
      .right-content {
        margin-top: 30px;
        width: 90%;
        .content-top {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          div {
            flex: 1;
            text-align: center;
          }
        }
        .content-main {
          .content-main-content {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            text-align: left;
            border-bottom: 1px dotted;
            padding-bottom: 10px;
            div {
              flex: 1;
              text-align: center; 
            }
          }
          .content-main-content:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>