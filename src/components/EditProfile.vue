<template>
  <el-dialog
    :modal="true"
    title="Edit Profile/编辑信息"
    :visible.sync="visible"
    width="80%">
    <el-form ref="form" :model="form" label-width="240px">
      <el-form-item label="Password/密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="Name/名字">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Email/邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Uploaded Resume/已保存简历">
        <span>{{form.resumeName || 'not yet uploaded'}}</span>
        <a href="" v-if="form.resumeName" @click.stop.prevent="downloadResume" style="margin-left: 15px;">Download/下载</a>
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
import FileSaver from 'file-saver'
import MimeTypes from 'mime-types'

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
    },
    password: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    currentPassword() {
      return this.form?.password || this.password
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
      const res = await this.$api.file.upload(this.file, this.currentPassword)
      const data = res?.data
      const { name, insertedId } = data
      this.form.resumeId = insertedId
      this.form.resumeName = name
      this.file = null
      
      this.$message('resume uploaded successfuly')
    },
    handleChange(e) {
      if (!e?.raw) return

      this.file = e.raw
    },
    handleRemove() {
      console.log('args for remove is ', arguments)
    },
    async downloadResume() {
       const {data} = await this.$api.file.dl(this.form.resumeId, this.form.resumeName, this.currentPassword)
       const type = MimeTypes.contentType(this.form.resumeName)
       let blob = new Blob([data], {type})
       FileSaver.saveAs(blob, this.form.resumeName)
    }
  }
}
</script>

<style scoped="true">
</style>