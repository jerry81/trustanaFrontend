<template>
  <div id="app">
    <profile :profile="firstUser"/>
    <el-button 
      class="button" 
      type="primary" 
      @click="edit"
    >Edit Info/编辑</el-button>
    <el-button 
      v-if="!response.length"
      class="button" 
      type="primary" 
      @click="create"
    >Create User/添加信息</el-button>
    <edit-profile 
      v-if="response.length"
      :visible="editing" 
      :form="edited"
      @cancel="editing=false"
      @submit="commit"
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
      edited: {}
    }
  },
  computed: {
    firstUser() {
      return this.response?.length ? this.response[0] : {}
    }
  },
  async created() {
    await this.refresh()
  },
  methods: {
    async refresh() {
      const {data} = await this.$api.user.findAll()
      this.response = data
    },
    edit() {
      this.edited = { ...this.firstUser }
      this.editing = true
    },
    async commit(result) {
      this.editing = false
      if (this.response.length) {
        const {data} = await this.$api.user.edit(result)
        console.log('user edited', data)
      } else {
        const {data} = await this.$api.user.create(result)
        console.log('user created', data)
      }
      this.refresh()
    },
    async create() {
      this.edited = {}
      this.editing = true
    }
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
