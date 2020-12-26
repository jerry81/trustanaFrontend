<template>
  <el-dialog
    :modal="true"
    title="Edit Profile/编辑信息"
    :visible.sync="visible"
    width="80%">
    <el-form ref="form" :model="form" label-width="240px">
      <el-form-item label="Name/名字">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Email/邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Upload Resume/上传简历">
        <el-upload class="upload-demo"
          action = ""
          :on-change="handleChange"
          :on-remove="handleRemove"
          :auto-upload="false"
          :multiple="false">
          <el-button class="" size="small" type="primary"> Add File / 选文件 </el-button>
        </el-upload>
        <el-button
          :disabled="file == null"
          type="primary"
          style="margin-top: 15px; margin-bottom:15px; align-self: flex-end;"
          @click="onUploadNowClick"> Upload Now/立即上传 
        </el-button>
      </el-form-item>
    </el-form>
    <el-button style="margin-top: 10px" class="button" @click="$emit('cancel')">Cancel/取消</el-button>
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
  data() {
    return {
      file: null,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.form)
    },
    async onUploadNowClick() {
      const res = await this.$api.user.upload(this.file)
      const id = res?.data?.insertedId
      this.form.resumeId = id
      this.$message('resume uploaded successfuly')
    },
    handleChange(e) {
      if (!e?.raw) return

      this.file = e.raw
    },
    handleRemove() {
      console.log('args for remove is ', arguments)
    }
  }
}
</script>

<style scoped="true">
</style>