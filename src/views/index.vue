<template>

  <div class="index">
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
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="navigation">
      <div class="navigation-content"></div>
    </div>
    <el-carousel indicator-position="outside">
      <el-carousel-item>
        <img src="../image/login/jb.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../image/login/jb.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../image/login/jb.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="index-main">
      <div class="index-main-content">
        <div class="index-main-one">
          <div>{{ user[0].realname }}，{{ showTime }}</div>
        </div>
        <div class="info">
          <div class="tongzhi">通知2</div>
          <marquee
            class="tongzhi-info"
            width="100%"
            behavior="scroll"
            direction="left"
            align="middle"
            onMouseOver="this.stop()"
            onMouseOut="this.start()"
            >{{ marqueedata }}!</marquee
          >
        </div>
        <!-- <div class="classis">
          <ul>
            <li
              v-for="item in list"
              :key="item.id"
              @click="currentTab = item"
              v-bind:class="{ on: currentTab == item }"
            >
              {{ item }}
            </li>
          </ul>
          <div class="logout" @click="logout">退出登录</div>
        </div> -->
        <heads>
          <div class="search_content">
            <div class="search_conpany">
              <input
                type="text"
                placeholder="请输入公司名称"
                v-model="search"
              />
              <i @click="tosearch"></i>
            </div>
          </div>
        </heads>
        <div class="zhaopin">
          <div class="zhaopin-title">
            <div class="zhaopin-title-cn">热门公司/岗位<br />Hot Company</div>
          </div>
          <div class="zhaopin-content">
            <div class="zhaopin-content-title"></div>
            <div class="zhaopin-content-main">
              <div
                class="zhaopin-content-main-more"
                @click="toMore(item)"
                v-for="item in Compony"
                :key="item.id"
              >
                <div class="img">
                  <img :src="item.img" alt="" />
                </div>
                <div class="company">{{ item.gangwei_name }}</div>
              </div>
              <!-- <div class="zhaopin-content-main-more">
                <div class="img">
                  <img src="../image/index/ali.jpg" alt="" />
                </div>
                <div class="company">阿里巴巴（Alibaba）</div>
              </div>
              <div class="zhaopin-content-main-more">
                <div class="img">
                  <img src="../image/index/ali.jpg" alt="" />
                </div>
                <div class="company">阿里巴巴（Alibaba）</div>
              </div>
              <div class="zhaopin-content-main-more">
                <div class="img">
                  <img src="../image/index/ali.jpg" alt="" />
                </div>
                <div class="company">阿里巴巴（Alibaba）</div>
              </div>
              <div class="zhaopin-content-main-more">
                <div class="img">
                  <img src="../image/index/ali.jpg" alt="" />
                </div>
                <div class="company">阿里巴巴（Alibaba）</div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="link-other">
          <div class="link-other-name"></div>
        </div>
        <footers></footers>
      </div>
    </div>
    <div id="nav">
      <div class="img">
        <img src="@/image/index/erweima.jpg" alt="" />
      </div>
      <div class="word">
        <span>添加微信资讯更多有关消息</span>
      </div>
    </div>
  </div>
</template>
<script>
import footers from "@/components/footer.vue";
import heads from "@/components/head.vue";
import url from '@/http.js'
export default {
  components: {
    heads,
    footers,
  },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
      date: new Date(),
      showTime: null,
      list: ["首页", "我的投递"],
      currentTab: "首页",
      Compony: [],
      marqueedata: "",
      search: "",
    };
  },
  created() {
    if (!this.user) {
      alert("请先登录");
      window.location.href = "/";
    }
    this.load();
  },
  mounted() {
    this.scroll();
  },

  methods: {
    tosearch() {
      this.$axios
        .get(url + ":1234/searchCompanyByname", {
          params: { name: this.search },
        })
        .then((res) => {
          console.log(res);
          this.Compony = res.data;
          this.Compony.forEach((item) => {
            item.img = url + ":3000/images/" + item.img;
          });
        });
    },
    toMore(data) {
      /*var company_name = data.company_name
      this.$router.push({path:'/more/'+company_name}) */
      this.$router.push({
        path: "/more",
        query: { company_name: data.company_name },
      });
    },
    scroll() {
      var scroll = document.getElementById("nav");
      console.log(scroll);
      document.onscroll = function () {
        var temp = document.documentElement.scrollTop;
        if (temp >= 400) {
          scroll.style.opacity = 1;
        } else {
          scroll.style.opacity = 0;
        }
      };
    },
    /*logout() {
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
          setTimeout(() => {
            sessionStorage.removeItem("user");
            window.location.href = "/";
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出成功",
          });
        });
    },*/
    load() {
      var hour = this.date.getHours();
      if (hour >= 6 && hour < 10) {
        this.showTime = "早上好！";
      } else if (hour >= 10 && hour < 12) {
        this.showTime = "上午好！";
      } else if (hour > 12 && hour < 14) {
        this.showTime = "中午好！";
      } else if (hour >= 12 && hour < 14) {
        this.showTime = "中午好！";
      } else if (hour >= 14 && hour < 18) {
        this.showTime = "下午好！";
      } else if (hour >= 18 && hour < 22) {
        this.showTime = "晚上好！";
      } else {
        this.showTime = "夜深了！早点休息";
      }

      this.$axios({
        url: url + ":1234/findAllCompany",
        method: "GET",
      }).then((res) => {
        console.log(res);
        this.Compony = res.data;
        this.Compony.forEach((item) => {
          item.img = url + ":3000/images/" + item.img;
        });
      });
      this.$axios({
        url: url + ":1234/News",
        method: "GET",
      }).then((res) => {
        console.log(res.data[0].news);
        this.marqueedata = res.data[0].news;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-carousel__container {
  height: 500px;
}
.el-carousel__item {
  color: #475669;
  font-size: 18px;
  line-height: 300px;
  margin: 0;
  img {
    width: 100%;
    height: 100%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.index {
  width: 100%;
  //height: 100%;
  background: #000;
  position: relative;
  .search_content {
    position: absolute;
    right: 200px;
    top: 40%;
    .search_conpany {
      border: 1px solid #999;
      width: 300px;
      border-radius: 30px;
      position: relative;
      &::after,
      &::before {
        display: block;
        height: 0;
        clear: both;
      }
      input {
        border: none;
        background: transparent;
        color: #999999;
        border-radius: 20px;
        height: 30px;
        width: 200px;
        margin-left: 20px;
      }
      i {
        float: right;
        background: url("../image/index/search.png");
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 12px;
        margin-top: 3px;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }

  .bglz {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .index-main {
    position: relative;

    .index-main-content {
      width: 80%;
      margin: 0 auto;
      position: relative;
      .index-main-one {
        text-align: right;
        color: #fff;
      }
      .classis {
        position: relative;
        border-radius: 10px;
        text-align: left;
        width: 100%;
        background: #ffffff30;
        margin: 50px auto;
        .on {
          color: rebeccapurple;
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
          }
        }
        .logout {
          position: absolute;
          right: 10px;
          top: 40%;
          color: #999999;
        }
      }
      .info {
        box-sizing: border-box;
        width: 100%;
        margin: 10px auto;
        background: #ffffff90;
        padding-left: 5%;
        border-radius: 10px;
        display: flex;
        .tongzhi {
          color: red;
          font-weight: bold;
          font-size: 20px;
          line-height: 50px;
          width: 100px;
          text-align: center;
        }
        .tongzhi-info {
          line-height: 50px;
        }
      }

      .zhaopin {
        display: flex;
        background: #ffffff30;
        border-radius: 10px;
        .zhaopin-title {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;
          text-align: center;
          color: #ff3838;
          font-size: 30px;
        }
        .zhaopin-content {
          width: 80%;

          .zhaopin-content-main {
            display: flex;
            flex-wrap: wrap;

            .zhaopin-content-main-more {
              cursor: pointer;
              width: 33.33%;
              height: 300px;
              box-sizing: border-box;
              &:hover {
                .company {
                  color: pink;
                }
              }
              .img {
                width: 80%;
                height: 80%;
                margin: 10px auto;
                overflow: hidden;
                border-radius: 10px;
                img {
                  width: 100%;
                  height: 100%;
                  transition: all 2s;
                  &:hover {
                    transform: scale(1.25);
                  }
                }
              }
              .company {
                transition: all 1s;
                text-align: center;
              }
            }
          }
        }
      }
      .link-other {
        width: 10;
      }
    }
  }
  #nav {
    position: fixed;
    top: 40%;
    right: 20px;
    width: 100px;
    height: 200px;
    background-color: #ffffff;
    opacity: 0;
    padding-top: 20px;
    font-size: 16px;
    transition: all 1s;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    .img {
      text-align: center;
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
}
</style>