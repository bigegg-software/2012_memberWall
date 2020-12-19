<template>
  <vue-seamless-scroll
    :data="staffList"
    :class-option="optionLeft"
    class="seamless-warp2"
    id="seamless-warp2"
  >
    <ul class="scrollBox" :style="{ height: height }">
      <li class="staff" v-for="(item, index) in staffList" :key="index">
        <div class="staffContent" v-for="(items, i) in item" :key="i">
          <div class="staffPhoto">
            <img :src="items.avatar" alt />
          </div>
          <div class="staffText">
            <div class="staffname">{{ items.name }}</div>
            <div class="department">
              {{
              items.departList
              }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script>
import Parse from "@/parse/index.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      height: 0, //页面高度
      count: 0,
      staffList: [] //员工列表
    };
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
        step: 0.4 // 数值越大速度滚动越快
      };
    }
  },
  created() {
    let currentUser = Parse.User.current();
    if (currentUser) {
      // do stuff with the user
    } else {
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    this.getUserList();
    (this.height =
      document.getElementById("seamless-warp2").offsetHeight - 20 + "px"),
      this.refreshTable(); //窗体刷新
  },
  methods: {
    async getUserList() {
      let query = new Parse.Query("Member");
      let staff = [];
      query.equalTo("active", true);
      await query.each(item => {
        item = item.toJSON();
        let departList = item.departList.map(a => {
          return (a = a.name);
        });
        item.departList = departList.join("-");
        staff.push(item);
      });
      let staffArr = [];

      if (staff.length % 2 != 0) {
        staff.push(staff[0]);
      }
      for (let i = 0; i < staff.length; ) {
        staffArr.push([staff[i], staff[i + 1]]);
        i += 2;
      }
      this.staffList = staffArr;
    },
    //页面刷新
    refreshTable() {
      let that = this;
      window.onresize = () => {
        return (() => {
          that.height =
            document.getElementById("seamless-warp2").offsetHeight - 20 + "px";
        })();
      };
    }
  }
};
</script>
<style scoped>
.seamless-warp2 {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url("../assets/login_bg.jpg") center/cover no-repeat;
}
.scrollBox {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0.06rem 0;
  box-sizing: border-box;
  list-style: none;
}
.staff {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 1.88rem;
  height: 100%;
  margin-right: 0.072917rem;
}
.staffContent {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  width: 1.88rem;
  /* height: 2.2rem; */
  height: 49%;
  padding: 0.1rem 0.104167rem 0.09rem;
  box-sizing: border-box;
  background: #fff;
}
.staffPhoto {
  width: 1.69rem;
  height: 1.69rem;
}
.staffPhoto img {
  width: 100%;
  height: 100%;
}
.staffText {
  text-align: center;
}
.staffname {
  font-size: 0.104167rem;
}
.department {
  margin-top: 0.02rem;
  font-size: 0.072917rem;
  color: #888;
}
</style>
