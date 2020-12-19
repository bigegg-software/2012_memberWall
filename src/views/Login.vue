<template>
  <div class="login">
    <div class="loginName">员工墙大屏展示</div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名!' },{requiredValue:'admin',message:'用户或密码错误'}] },
        ]"
          placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' },{requiredValue:'admin',message:'用户或密码错误'}] },
        ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <!-- <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        >记住密码</a-checkbox>-->
        <!-- <a class="login-form-forgot" href>忘记密码</a> -->
        <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
        <!-- Or
        <a href>立即注册</a>-->
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Parse from "@/parse/index.js";

export default {
  name: "Login",
  data() {
    return {};
  },

  mounted() {},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const user = await Parse.User.logIn(
              values.userName,
              values.password
            );
            this.$router.push({ path: "/" });
          } catch (error) {
            this.$message.warning("用户或密码错误");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.loginName {
  font-size: 0.260417rem;
  font-weight: bold;
  font-family: "SimHei";
  margin-bottom: 0.208333rem;
}
#components-form-demo-normal-login {
  width: 3rem;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>




