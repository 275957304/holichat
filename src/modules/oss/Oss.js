'use strict';
import { getItem } from '../../utils/'
import api from '../../api/'
export default class Oss {

  static getInstance() {
    if (!this._instance){
      this._instance = new Oss()
    }
    return this._instance
  }

  constructor() {
    this.isInitSucceeded = false
    this.isUploading = false
    this.uploadArray = []
    this.initOssClient()
	}

  initOssClient(){
    const uid = getItem('uid');
    const session = getItem('session');
    if (uid && session) {
      api.get_sts_auth.then(
        (data) => {
          console.log(data)
          if (data){
            this.AccessKeyId = data.data.AccessKeyId
            this.AccessKeySecret = data.data.AccessKeySecret
            this.SecurityToken = data.data.SecurityToken
            this.Bucket = data.data.Bucket
            this.ossClient = new OSS.Wrapper({
              region: 'oss-cn-hangzhou',
              accessKeyId: this.AccessKeyId,
              accessKeySecret: this.AccessKeySecret,
              bucket: this.Bucket,
              stsToken: this.SecurityToken,
              timeout: "600000",
            })

            this.upload()
          }
        },
        (err) => {
          console.log(err)
        }
      )
    }
    else {

    }
  }

  upload(){
    if (this.uploadArray.length >= 1){
      var uploadObj = this.uploadArray.pop()
      if (uploadObj){
        this.isInitSucceeded = true
        this.ossClient.multipartUpload(uploadObj.storeAs, uploadObj.file).then(
          ()=>{
            if (uploadObj.callback){
              uploadObj.callback(1)
            }
            if (this.uploadArray.length >= 1){
              this.upload()
            }
            else {
              this.isInitSucceeded = false
            }
          }
        ).catch(function (err) {
          console.log(err)
          if (uploadObj.callback){
            uploadObj.callback(0)
          }
          if (this.uploadArray.length >= 1){
            this.upload()
          }
          else {
            this.isInitSucceeded = false
          }
        })
      }

    }
  }

  push(storeAs, file, callback){
    if (storeAs && file){
      var uploadObj = {
        storeAs: storeAs,
        file: file,
        callback: callback,
      }
      this.uploadArray.unshift(uploadObj)
      if (!this.isUploading){
        this.upload()
      }

    }

  }
}
