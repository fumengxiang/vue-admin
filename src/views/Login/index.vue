<template>
  <div class="login-contain">
    <div class="login">
      <ul class="login-menu">
        <li v-for="(item, index) in menu"
            :key="item.id"
            @click="menuClick(index)"
            :class="{current: item.current}">{{item.text}}</li>
        <!-- <li :class="{current: menu[0].current}" @click="loginBtn">登录</li>
        <li :class="{current: menu[1].current}" @click="registBtn">注册</li> -->
      </ul>
      <!-- 表单数据 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <label for="username">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" size="medium " id="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input minlength=6 maxlength=20 type="text" v-model="ruleForm.password" autocomplete="off" size="medium " id="password"></el-input>
        </el-form-item>
        <el-form-item prop="password2" v-show="menu[1].current">
          <label for="password2">重复密码</label>
          <el-input minlength=6 maxlength=20 type="text" v-model="ruleForm.password2" autocomplete="off" size="medium " id="password2"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="login-code">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="ruleForm.code" size="medium " id="code"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" class="login-button" size="medium">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"  class="login-button">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript, validateUsername1, validatePassword1, valdateCode1 } from '@/utils/validate.js'
export default {
  name: 'Login',
  data () {
    // 验证验证码的规则
    var validateCode = (rule, value, callback) => {
      value = stripscript(value)// 将验证的数据改为过滤后的数据
      this.ruleForm.code = value// 将输入框绑定的数据改为过滤后的数据
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else if (!valdateCode1(value)) {
        callback(new Error('验证码为6位字母或数字'))
      } else {
        callback()
      }
    }
    // 验证用户名的规则
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else if (!validateUsername1(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    // 验证密码的规则
    var validatePassword = (rule, value, callback) => {
      value = stripscript(value)// 将验证的数据改为过滤后的数据
      this.ruleForm.password = value// 将输入框绑定的数据改为过滤后的数据
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!validatePassword1(value)) {
        callback(new Error('密码应同时包括字母和数字，且长度在6-20位之间'))
      } else {
        callback()
      }
    }
    // 验证重复密码的规则
    var validatePassword2 = (rule, value, callback) => {
      // 因为重复密码门的表单模块使用的是v-show来控制此模块的隐藏与显示（即无论如何重复密码的模块都会渲染，但可能不会展示，即此单元的输入都会有值所以在点击登录时应该忽略次模块的验证）
      if (this.menu[0].current === true) callback()
      value = stripscript(value)
      this.ruleForm.password2 = value
      if (value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入的密码不相同'))
      } else {
        callback()
      }
    }
    // 定义变量
    return {
      menu: [
        { id: '001', name: 'login', current: true, text: '登录' },
        { id: '002', name: 'regist', current: false, text: '注册' }
      ],
      // 表单数据
      ruleForm: {
        username: '',
        password: '',
        password2: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePassword2, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
  },
  methods: {
    menuClick (index) {
      this.menu.map((n) => {
        n.current = false
        // map方法返回的值就直接存入到原来的数组中
        return n
      })
      this.menu[index].current = true
    },
    // 表单函数
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {
  },
  computed: {
  },
  created () {},
  mounted () {}
}
</script>

<style scoped lang="scss">
.login-contain {
  height: 100vh;
  background-color: #1abc9c;
  .login {
    width: 330px;
    margin: 0 auto;
  }
}
.login-menu {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  // padding-left: 100px;
  width: 330px;
  li {
    color: #fff;
    text-align: center;
    line-height: 36px;
    height: 36px;
    width: 88px;
    border-radius: 4px;
    cursor: pointer;
  }
  .current {
    background-color: rgba($color: #000000, $alpha: .5);
  }
}
.el-form {
  margin-top: 35px;
  label {
    // display: block;
    font-size: 16px;
  }
  .login-button {
    width: 100%;
  }
  .el-form-item {
    margin-top: 5px;
    margin-bottom: 13px;
  }
  .login-code {
    margin-bottom: 30px;
  }
}
</style>
