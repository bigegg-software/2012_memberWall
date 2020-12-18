<template>
  <vue-seamless-scroll
    :data="staffList"
    :class-option="optionLeft"
    class="seamless-warp2"
    id="seamless-warp2"
  >
    <ul class="scrollBox" :style="{height: height,width:'auto'}">
      <li class="staff" v-for="(item, index) in staffList" :key="index">
        <div class="staffContent" v-for="(items, i) in item" :key="i">
          <div class="staffPhoto">
            <img :src="items.avatar" alt />
          </div>
          <div class="staffText">
            <div class="staffname">{{items.name}}</div>
            <div
              class="department"
            >{{items.department_parent?items.department_parent+"-"+items.department_name:items.department_name}}</div>
          </div>
        </div>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      height: "", //页面高度
      staffList: [
        // [1,2],[3,4],[1,2],[3,4],[1,2]
      ], //员工列表
      // limitMoveNum:this.staffList? this.staffList.length:""
    };
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
        // step: 0.2, // 数值越大速度滚动越快
        token: ""
      };
    },
    staffListq() {
      if (document.querySelector(".scrollBox")) {
        // console.log(document.querySelector('.scrollBox').style.width)
        // document.querySelector('.scrollBox').parentNode.parentNode.style.width=56024*2+'px';
        // document.querySelector('.scrollBox').parentNode.parentNode.style.width=Math.ceil(this.staffList.length/2)*376+'px';
        // document.querySelector('.scrollBox').parentNode.parentNode.style.width=document.querySelector('.scrollBox').style.width*2+'px';
      }

      console.log(Math.ceil(this.staffList.length) * 362 + "px");
      return Math.ceil(this.staffList.length / 2) * 376 + "px";
    }
  },
  mounted() {
    (this.height =
      document.getElementById("seamless-warp2").offsetHeight - 20 + "px"), //页面高度
      this.refreshTable(); //窗体刷新
    this.getToken();
  },
  methods: {
    async setArrGroup(arr) {
      //拆分成数据所需格式
      var arrLen = 2;
      // var newDataArr = [];
      for (var i = 0; i < arr.length; i += arrLen) {
        this.staffList.push(arr.slice(i, i + arrLen));
      }
      console.log(this.staffList, "11111111111");
      // return newDataArr;
    },
    async getToken() {
      // let token = await this.$axios({
      //   method: "get",
      //   url: "/api/gettoken",
      //   params: {
      //     appkey: "dingdepyqs1hjgyxeywp",
      //     appsecret:
      //       "NHJgwsZEPccFMIefb0aESXDnOjASYbzKX6vJT6TrzxQG8brkkgHjoWS_jX8pijCU"
      //   }
      // });
      // this.token = token.data.access_token;
      // console.log(token.data.access_token)
      this.token = "0876067b0cfe32d1b782599ae5b89fce";
      // window.localStorage.setItem(token,this.token)//设置缓存
      this.getDepartment();
    },

    async getDepartment() {
      let department = await this.$axios({
        method: "get",
        url: "/api/department/list",
        params: {
          access_token: this.token
        }
      });
      // console.log(department);
      let allUser = [];
      for (let i = 0; i < department.data.department.length; i++) {
        let userList = await this.getDepartmentParent(
          department.data.department,
          i
        );
        // allUser.push(...userList);
        setTimeout(() => {
          this.setArrGroup(userList);
        }, 10);
      }
      // await this.setArrGroup(allUser);
    },
    //获取部门的所有上级父部门路径
    async getDepartmentParent(departmentList, index) {
      let department = departmentList[index];
      let departmentParent = await this.$axios({
        method: "get",
        url: "/api/department/list_parent_depts_by_dept",
        params: {
          access_token: this.token,
          id: department.id
        }
      });
      // console.log(departmentParent.data.parentIds);
      let three =
        departmentParent.data.parentIds &&
        departmentParent.data.parentIds.length == 3
          ? departmentParent.data.parentIds
          : undefined;
      let four =
        departmentParent.data.parentIds &&
        departmentParent.data.parentIds.length == 4
          ? departmentParent.data.parentIds
          : undefined;

      if (three) {
        return await this.getUserDetails(department);
      }
      if (four) {
        let a = departmentList.find(item => {
          return item.id == four[1];
        });
        return await this.getUserDetails(department, a.name);
      }
      return [];
    },
    //获取部门用户详情
    async getUserDetails(department, parentName) {
      let userDetails = await this.$axios({
        method: "get",
        url: "/api/user/listbypage",
        params: {
          access_token: this.token,
          department_id: department.id,
          offset: "0",
          size: "100"
        }
      });
      let userlist = userDetails.data.userlist.filter(
        item => item.active == true
      ); //返回用户active为true的
      // console.log(userDetails.data.userlist, "1111111111111");
      userlist.map(userInfo => {
        userInfo.department_parent = parentName;
        userInfo.department_id = department.id;
        userInfo.department_name = department.name;
      });
      return userlist;
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
  height: 2.2rem;
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
