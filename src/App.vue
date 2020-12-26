<template>
  <div id="app">
    <profile :profile="response[0]"/>
    <el-button 
      class="button" 
      type="primary" 
      @click="edit"
    >Edit Info/编辑</el-button>
    <edit-profile 
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
      response: [{}],
      editing: false,
      edited: {}
    }
  },
  async created() {
    const {data} = await this.$api.user.getUsers()
    this.response = data
  },
  methods: {
    edit() {
      this.editing = true
      this.edited = { ...this.response[0] }
    },
    commit(result) {
      console.log('do the save now ', result)
      this.editing = false
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
