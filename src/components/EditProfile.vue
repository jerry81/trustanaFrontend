<template>
  <el-dialog
    :modal="true"
    title="Edit Profile/编辑信息"
    :visible.sync="visible"
    width="50%">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Name/名字">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Email/邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="button" @click="$emit('cancel')">Cancel/取消</el-button>
    <el-button class="button" type="primary" @click="submit">Submit/提交</el-button>
  </el-dialog>
</template>

<script>

export default {
  name: 'App',
  props: {
    visible: {
        type: Boolean,
        default: false
    },
    form: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style scoped="true">
</style>