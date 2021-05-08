<template>
  <div class="zhiwei_list">
    <vue-particles
      class="bglz"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      lineLinked="false"
      :lineOpacity="0"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="zhiwei_list-content">
      <heads></heads>
      <div class="zhiwei_list-main">
        <div class="zhiwei_list-main-content">
          <div class="zhiwei-title">
            <div class="img_content">
              <img class="img1" :src="url + ':3000/images/' + datas.img" alt />
            </div>

            <div class="company-name">
              <span>{{ datas.company_name }}</span>
            </div>
            <div class="company-describe">
              <div class="publish-time">
                <span>投递时间：</span>
                {{ datas.start_time | toTime }} - {{ datas.end_time |toTime }}
              </div>
              <div class="origin">
                <span>信息来源：</span>学校官方
              </div>
            </div>
          </div>
          <div class="zhiwei-main">
            <div class="title">
              <strong>职位：{{ datas.gangwei_name }}</strong>
            </div>
            <div class="require">
              <strong>职责描述:</strong>
              <p style="white-space: pre-wrap">{{ datas.reqiuire }}</p>
            </div>
            <div class="zige">
              <strong>任职资格：</strong>
              <p style="white-space: pre-wrap">{{ datas.zhuangye }}</p>
            </div>
            <div class="get">
              <strong>你将会获得：</strong>
              <p style="white-space: pre-wrap">{{ datas.money_more }}</p>
            </div>
            <div class="button">
              <el-button @click="sign" type="primary">申请投递</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from '@/http.js'
import heads from "@/components/head";
export default {
  components: {
    heads
  },
  data() {
    return {
      datas: "",
      user: JSON.parse(sessionStorage.getItem("user")),
      url:url,
      hoverEffect: false
    };
  },
  created() {
    if (!this.user) {
      alert("请先登录");
      window.location.href = "/";
    }
    console.log(this.user[0].id);
    console.log(this.$route.query.id);
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
          year + "/" + month + "/" + data
        return Timeed;
      }
      return null;
    }
  },
  methods: {
    sign() {
      this.$axios({
        url: url + ":1234/addDelivery",
        params: {
          p_id: this.user[0].id,
          c_id: this.$route.query.id
        }
      }).then(res => {
        console.log(res);
        if (res.data == "投递成功") {
          this.$message({
            message: res.data,
            type: "success"
          });
        } else {
          this.$message({
            message: "警告哦," + res.data,
            type: "warning"
          });
        }
      });
    },
    load() {
      this.$axios({
        url:
          url + ":1234/searchCompangById?id=" +
          this.$route.query.id,
        method: "GET"
      }).then(res => {
        this.datas = res.data[0];
        console.log(this.datas);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.zhiwei_list {
  width: 100%;
  border-top: 1px solid #dfdfdf;
  background: #000;
  .bglz {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .zhiwei_list-content {
    width: 90%;
    margin: 0 auto;
    .zhiwei_list-main {
      position: relative;
      z-index: 100;
      .zhiwei_list-main-content {
        width: 100%;
        background: #ffffff30;
        .zhiwei-title {
          padding: 20px;
          &::after,
          &::before {
            content: "";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
          }
          .img_content {
            overflow: hidden;
            width: 100px;
            height: 100px;
            border-radius: 10px;
            float: left;
            margin-right: 10px;
            .img1 {
              width: 100px;
              height: 100px;
            }
          }

          .company-name {
            font-size: 30px;
            margin-bottom: 10px;
          }
          .company-describe {
            span {
              color: #999;
            }
          }
        }
        .zhiwei-main {
          width: 90%;
          margin: 0 auto;
          .title {
            margin-bottom: 30px;
            line-height: 50px;
            font-size: 25px;
          }
          .require,
          .zige,
          .get {
            margin-bottom: 30px;
            strong {
              font-size: 25px;
            }
          }
          .button {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>