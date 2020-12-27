<template>
  <div id="app">
    <div style="display: flex; margin: 10px;">
      <input placeholder="password" type="password" v-model="password" style="margin-right: 10px; padding: 4px"/>
      <el-button type="primary" @click="decrypt">Decrypt/揭秘</el-button>
    </div>
    <div>
      <profile :profile="firstUser" :hasResume="hasResume"/>
      <el-button 
        v-if="response.length"
        class="button" 
        type="primary" 
        @click="edit"
      >Edit Info/编辑</el-button>
    </div>
    <el-button 
      v-if="!response.length"
      class="button" 
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
  </div>
</template>

<script>
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
export default {
  name: 'App',
  components: { 
    Profile, 
    EditProfile 
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
      const {data} = await this.$api.user.findAll(this.password)
      this.response = data
    },
    edit() {
      this.edited = { ...this.firstUser }
      this.editing = true
    },
    async commit(result) {
      this.editing = false
      if (this.response.length) {
        const {data} = await this.$api.user.edit(result, result.password || this.password)
        console.log('user edited', data)
      } else {
        const {data} = await this.$api.user.create(result, result.password || this.password)
        console.log('user created', data)
      }
      this.refresh()
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
.button {
  padding: 10px;
  margin-left: 20px;
}
</style>
