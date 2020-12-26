<template>
  <div id="profile">
    <h2>User Profile/个人信息</h2>
    <div>
        <span>Name/名字: </span><span>{{profile.name}}</span>
    </div>
    <div>
        <span>Email/邮箱: </span><span>{{profile.email}}</span>
    </div>
    <div>
        <span>Resume Filename/简历文件名: </span><span>{{hasResume}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: {
    profile: {
        type: Object,
        default: () => {}
    },
    hasResume: {
        type: String,
        default: 'None uploaded yet/尚未上传'
    }
  },
}
</script>

<style>
#profile {
    display: flex;
    flex-direction: column;
    width: auto;
    margin: 10px;
    border: 1px solid #ccc;
    padding: 10px;
}
#profile div {
    margin: 10px;
}
</style>