<template>
  <div class="look_compony">
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
    <div class="look_compony-content">
      <heads></heads>
      <div class="userinfo" style="color:#fff">{{ user[0].realname }}，{{ showTime }}</div>
      <div class="look_compony-main">
        <div class="compony-content">
          <div class="compony-name">
            <div class="join">
              {{ user[0].realname }}你好,很希望你能加入我们
            </div>
            <!-- 公司介绍 -->
            <div class="introduce">
              <div>一、公司简介</div>
              <p style="text-indent: 30px">
                {{ company_info.introduction }}
              </p>
            </div>
            <!-- 公司结构 -->
            <div class="structure">
              <div>二、公司结构</div>
              <p style="text-indent: 30px">
                <strong>行业:</strong>{{ company_info.hangye }}
              </p>
              <p style="text-indent: 30px">
                <strong>员工数:</strong>{{ company_info.scale }}
              </p>
              <p style="text-indent: 30px">
                <strong>公司总部:</strong>{{ company_info.address }}
              </p>
            </div>
            <div></div>
            <div style="color: red; margin-left: 5%; font-size: 25px">
              我们招聘的岗位有:
            </div>
            <div class="require">
              <div>岗位名称</div>
              <div>专业、基本要求</div>
              <div>招聘人数</div>
            </div>
            <ul>
              <li
                class="list"
                v-for="item in position"
                :key="item.id"
                @click="topost(item)"
              >
                <div>{{ item.gangwei_name }}</div>
                <div>{{ item.zhuangye }}</div>
                <div>{{ item.gangwei_id }}</div>
              </li>
            </ul>
            <div class="atention">
              (注)：如果有任何疑问，你可以随时拨打{{
                company_info.phone
              }}联系我们
            </div>
          </div>
        </div>
      </div>
      <footers></footers>
    </div>
  </div>
</template>

<script>
import url from '@/http.js'
import heads from "@/components/head";
import footers from "@/components/footer";
export default {
  components: {
    heads,
    footers,
  },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
      showTime: null,
      date: new Date(),
      position: [],
      company_info: "",
      hoverEffect: false,
    };
  },
  created() {
    if (!this.user) {
      alert("请先登录");
      window.location.href = "/";
    }
    this.load();
  },
  methods: {
    topost(data) {
      this.$router.push({ path: "/zhiwei_list", query: { id: data.id } });
    },
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
        url:
          url + ":1234/searchCompanyBynames?name=" +
          this.$route.query.company_name,
        method: "GET",
      }).then((res) => {
        this.position = res.data;
        this.company_info = res.data[0];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.look_compony {
  background: #000;
  width: 100%;
  position: relative;
  .bglz {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .look_compony-content {
    border-top: 0.1px solid #dfdfdf;
    width: 90%;
    margin: 0 auto;
    &::after,
    &::before {
      /*设置添加的子元素的内容为空*/
      content: "";
      /*设置添加的子元素为块级元素*/
      display: block;
      /*设置添加的子元素的高度为0*/
      height: 0;
      /*设置添加的子元素看不见*/
      visibility: hidden;
      /*给添加的子元素设置clear: both;*/
      clear: both;
    }
    /*兼容IE6*/
    *zoom: 1;
    .userinfo {
      float: right;
      width: 20%;

    }
    .look_compony-main {
      box-sizing: border-box;
      width: 100%;
      margin-top: 80px;
      background: #ffffff50;
      padding: 30px;
      border-radius: 10px;
      z-index: 100;
      position: relative;
      .compony-content {
        .compony-name {
          .join {
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            color: red;
          }
          .introduce,
          .structure {
            width: 90%;
            margin: 30px auto;
            margin-top: 30px;
            & > :nth-child(1) {
              font-size: 25px;
            }
            p {
              line-height: 30px;
            }
          }
          .require,
          .list {
            margin-left: 5%;
            display: flex;
            text-align: center;
            justify-content: space-between;
            border-bottom: 1px dotted #666;
            line-height: 30px;
            div {
              flex: 1;
            }
            & > :nth-child(2) {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          ul {
            li {
              list-style: url("../..//image/compony/right.png");
            }
            li:hover {
              color: rgb(86, 125, 241);
            }
            cursor: pointer;
          }
          .atention {
            margin-top: 30px;
            margin-left: 5%;
            color: red;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>







