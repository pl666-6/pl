<template>
  <div class="footer">
    <div class="title">校园就业网</div>
    <div class="footer-left">
      <div class="explain">
        本系统宗旨为在校学生提供岗位，由于企业存在会对简历进行筛选，
        导致很多学生连自己想进入的企业都无法接触，为避免这一现象，
        由学校与企业沟通，引入职位，由学校相关人员将招聘的职位等信息录入
        系统以供学生选择，规定的截止日期后由学校安排面试从而减少简历被筛
        掉的概率，企业事先无法知道有哪些人投递，给每个人都有与心仪的企业
        接触的机会
      </div>
    </div>
    <div class="footer-right">
      <div class="link-other">
        <ul>
          <li>
            <a href="http://www.hhtc.edu.cn/">学校官网</a>
          </li>
          <li>
            <a href="http://jwmis.hhtc.edu.cn/">学校教务网</a>
          </li>
          <li>
            <a href="http://jy.hhtc.edu.cn/">校就业平台</a>
          </li>
          <li>
            <a href="https://www.chsi.com.cn/">学信网</a>
          </li>
        </ul>
      </div>
      <div class="problem">如果有任何问题，请及时联系系统作者</div>
      <div class="phone">联系电话：18874534293 | 189420519001</div>
      <div class="QQ">QQ：2568062371</div>
      <div class="">Email：2568062371@qq.com</div>
      <div class=""></div>
      <div class="zuozhe">
        技术支持：彭磊 | 计算机科学与工程 | 计算机科学与技术1班
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 20px;
  background: #ffffff50;
  width: 100%;
  border-radius: 10px;
  padding: 50px;
  box-sizing: border-box;
  .title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff90;
  }
  &::after,
  &::before {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  *zoom: 1;

  .footer-left {
    float: left;
    width: 40%;
    color: #333;
  }
  .footer-right {
    position: relative;
    float: right;
    width: 40%;
    .link-other{
      ul{
        display: flex;
        justify-content: space-between;
      }
      li{
        list-style: none;
        a{
          color: #000;
        }
      }
    }
  }
}
</style>