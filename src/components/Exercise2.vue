<template>
  <div id="ex2" style="padding: 20px; border: 1px solid #ccc;">
    <h2>Exercise 2</h2>
    <div style="margin:10px">
        <span>Input string/输入的字符串: </span><input v-model="inputString">
        <el-button @click="storeString" type="primary">store string/保存</el-button>
    </div>
    <div style="margin:10px; padding: 10px; border: 1px solid #ddd;">
        <el-checkbox
          label="Single Use/一次性"
          v-model="singleUse"
        />
        <div v-if="!singleUse" style="margin: 5px">
          <span>Seconds until expiration/有效期（秒）: </span>
          <input style="margin-left: 5px; margin-right: 5px" v-model="expiration"/>
        </div>
        <el-button style="margin: 10px;" @click="generate" type="primary">generate token</el-button>
    </div>
    <div>
      <span v-if="tokenUrl" style="font-size: 12px">Token is/密钥是： {{tokenUrl}}</span>
      <div style="display: flex; flex-direction: column; margin: 15px">
        <span>Retreive string with token/读取保存字符串: </span>
        <input style="width: 90%; padding: 5px" placeholder="token/密钥" v-model="inputToken"/>
        <el-button style="margin: 10px; width: 200px;" @click="decrypt" type="primary">decrypt with token</el-button>
      </div>
    </div>
    <div style="color: green; font-weight: bold">
      Result String is: {{ resultString }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      inputString: '',
      singleUse: false,
      expiration: 0,
      inputToken: '',
      tokenUrl: '',
      resultString: ''
    }
  },
  methods: {
    async generate() {
      const res = await this.$api.ex2.generateToken({
        oneTime: this.singleUse,
        expiration: this.expiration ? moment().add(this.expiration, 'seconds').toISOString() : moment().add(10, 'years').toISOString()
      })
      this.tokenUrl = `${res.data.stringified.encryptedData}?tokenId=${res.data.parsed.tokenId}`
      console.log('tokenUrl is ', this.tokenUrl)
    },
    async decrypt() {
      try {
      const res = await this.$api.ex2.getSensitiveData(this.inputToken)
      this.resultString = res.data.value || res.data.message
      } catch(e) {
        this.resultString = "error while retreiving sensitive data" + e.message
      }
    },
    async storeString() {
      const res = await this.$api.ex2.setSensitiveData({sensitiveInfo: this.inputString})
      this.$message.success(`sensitive info ${res.data[0].value.encryptedData} was saved`)
    }
  }
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