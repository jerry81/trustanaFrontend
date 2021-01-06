<template>
  <div id="app">
    <div style="display: flex; margin: 10px;">
      <input id="home-password" placeholder="password" type="password" v-model="password" style="margin-right: 10px; padding: 4px"/>
      <el-button id="submit-password" type="primary" @click="decrypt">Decrypt/揭秘</el-button>
    </div>
    <div>
      <profile :profile="firstUser" :hasResume="hasResume"/>
      <el-button 
        v-if="response.length"
        class="profile-button" 
        type="primary" 
        @click="edit"
      >Edit Info/编辑</el-button>
    </div>
    <el-button 
      v-if="!response.length"
      class="profile-button" 
      type="primary" 
      @click="create"
    >Create User/添加信息</el-button>
    <edit-profile 
     :visible="editing" 
     :form="edited"
     @cancel="editing=false"
     @submit="commit"
     :password="password"
    />
    <exercise2 style="margin-top: 50px;"/>
  </div>
</template>

<script>
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Exercise2 from './components/Exercise2'
export default {
  name: 'App',
  components: { 
    Profile, 
    EditProfile,
    Exercise2
  },
  data: () => {
    return {
      response: [],
      editing: false,
      edited: {},
      password: '',
      decrypted: false,
    }
  },
  computed: {
    hasResume() {
      return this.firstUser?.resumeName || 'Not yet uploaded 尚未上传'
    },
    firstUser() {
      return this.response?.length ? this.response[0] : {}
    }
  },
  async created() {
    await this.refresh()
  },
  methods: {
    async refresh() {
      try {
             const {data} = await this.$api.user.findAll(this.password)
            this.response = data
      } catch(e) {
        this.$message.error('there was an issue while decrypting the data')
      }
    },
    edit() {
      this.edited = { ...this.firstUser }
      this.editing = true
    },
    async commit(result) {
      try {
            this.editing = false
            if (this.response.length) {
              const {data} = await this.$api.user.edit(result, result.password || this.password)
              console.log('user edited', data)
            } else {
              const {data} = await this.$api.user.create(result, result.password || this.password)
              console.log('user created', data)
            }
            this.refresh()
      } catch (e) {
        this.$message.error('error while attempting to encrypt data')
      }
    },
    async create() {
      this.edited = {}
      this.editing = true
    },
    async decrypt() {
      this.decrypted = true
      this.refresh()
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.profile-button, button {
  padding: 10px;
  margin-left: 20px;
}
</style>
