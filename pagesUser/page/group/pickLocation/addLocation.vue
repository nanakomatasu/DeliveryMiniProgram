<template>
  <view>
    <view class="wrap">
      <u--form labelPosition="left" :model="form" :rules="rules" ref="form" :labelStyle="labelStyle"
        :borderBottom="false">
        <view class="part-one">
          <u-form-item label="自提点名称" prop="title"  labelWidth="160rpx">
            <u--input v-model="form.title" disabledColor="#ffffff" placeholder="请输入" border="none"
              placeholderStyle="text-align:right"></u--input>
          </u-form-item>
          <u-form-item label="联系人" prop="name"  labelWidth="140rpx">
            <u--input v-model="form.name" disabledColor="#ffffff" placeholder="请输入" border="none"
              placeholderStyle="text-align:right"></u--input>
          </u-form-item>
          <u-form-item label="联系人电话" prop="phone"  labelWidth="160rpx">
            <u--input v-model="form.phone" disabledColor="#ffffff" placeholder="请输入" border="none"
              placeholderStyle="text-align:right"></u--input>
          </u-form-item>
          <u-form-item
          		label="自提点区域"
              labelWidth="100"
          		prop="region"
          >
             <region-picker @change="region_change" :value="['北京市', '市辖区', '东城区']" style="width: 100%;">
                 <view class="picker">
                   <text :style="form.region?'color:#202020':''">{{form.region?form.region:'请选择自提点区域'}}</text>
                   </view>
             </region-picker>
          </u-form-item>
          <u-form-item
          		label="自提点定位"
              labelWidth="100"
          		prop="address"
          		ref="item1"
          >
          	<u-input
          			v-model="form.address"
          			border="none"
                placeholder="请输入"
                placeholderStyle="text-align:right; color:#888888"
          	>
              <template slot="suffix">
                <u-icon name="map" @click="selAddress" color="#D62E36"></u-icon>
              </template>
            </u-input>
          </u-form-item>
          <u-form-item label="佣金设置" prop="commission"  labelWidth="160rpx">
            <u--input v-model="form.commission" disabledColor="#ffffff" placeholder="请输入" border="none"
              placeholderStyle="text-align:right"></u--input>
          </u-form-item>
        </view>
        <view class="part-two">
          <u-form-item label="门脸图" prop="fileList1" labelPosition="top"  labelWidth="140rpx">
            <view class="upload-item">
              <u-upload :fileList="form.fileList1" @afterRead="afterRead" @delete="deletePic" uploadText="上传图片" name="1"
                :maxCount="1"></u-upload>
            </view>
          </u-form-item>
          <view class="upload-tips">需实地拍摄完整真实的牌匾名</view>
        </view>
        <view class="part-three">
          <u-form-item label="店内环境图" prop="fileList2" labelPosition="top"  labelWidth="180rpx">
            <view class="upload-item">
              <u-upload :fileList="form.fileList2" @afterRead="afterRead" @delete="deletePic" uploadText="上传图片" name="2"
                :maxCount="1"></u-upload>
            </view>
          </u-form-item>
          <view class="upload-tips">需实地拍摄反应店内环境的真实照片</view>
        </view>
      </u--form>
    </view>
    <view class="bottom">
      <view class="submit-btn" @click="submitForm">
        保存
      </view>
    </view>
    <u-notify ref="uNotify"></u-notify>
  </view>
</template>

<script>
  import regionPicker from "@/components/region-picker/region-picker.vue"
  import urlConfig from '@/config/index.js'
  export default{
    data(){
      return{
        form:{
          title:'',
          name:'',
          fileList1:[],
          fileList2:[],
          lat:'',
          lng:'',
          address:'',
          commission:'',
          region:'',
          id:'',
          kk:''
        },
        userInfo:{},
        school:{},
        labelStyle: {
          fontWeight: '700'
        },
        rules:{
          title:[
            {
              required:true,
              message:'请输入自提点名称'
            },
            {
              max:20,
              message:'最多20个字符'
            }
          ],
          name:[
            {
              required:true,
              message:'请输入联系人'
            },
            {
              max:20,
              message:'最多20个字符'
            }
          ],
          phone:[
            {
              required:true,
              message:'请输入联系人电话'
            },
            {
              max:11,
              message:'最多11个字符'
            }
          ],
          address:[
            {
              required:true,
              message:'请输入自提点位置'
            }
          ],
          commission:[
            {
              required:true,
              message:'请输入自提点佣金'
            },
            {
              max:6,
              message:'最多6位数'
            }
          ],
          fileList1:[
            {
              validator:(rule,value,callback)=>{
                if(!this.form.fileList1.length){
                  return false
                }else{
                  return true
                }
              },
              message:'请上传门脸图'
            }
          ],
          fileList2:[
            {
              validator:(rule,value,callback)=>{
                if(!this.form.fileList2.length){
                  return false
                }else{
                  return true
                }
              },
              message:'请上传店内环境图'
            }
          ]
        }
      }
    },
    components: {  
        regionPicker  
    },
    onLoad(options) {
      if(options.item){
        const item = JSON.parse(decodeURIComponent(options.item))
        const {title, name, phone, region, address, lng, lat, commission, shop_front, in_store, id} = item
        console.log(item)
        const fileList1 = [{url:shop_front}]
        const fileList2 = [{url:in_store}]
        this.form ={
                title,
                name,
                fileList1,
                fileList2,
                lat,
                lng,
                address,
                commission,
                region,
                id,
                phone
        }
      }
      this.form.lat = uni.getStorageSync('lat');
      this.form.lng = uni.getStorageSync('lng');
      this.userInfo = uni.getStorageSync('userInfo')
      this.school = uni.getStorageSync('school')
      if(this.lat == 0 || !this.lat) {
      	uni.getLocation({
      		// #ifdef H5
      		type: 'gcj02',
      		altitude: true,
      		// #endif
      		success: (res) => {
      			console.log(res)
      			this.form.lat =res.latitude;
      			this.form.lng =res.longitude;
      		},
      		fail: error => {
      			console.log(error)
      		}
      	});
      }
    },
    methods:{
      //选择定位
      selAddress() {
      	console.log('获取定位')
      	//选择地图位置
      	if(this.lat == 0 ) {
      		uni.showModal({
      			title:'提示',
      			content: '无定位信息，请点击重新定位'
      		})
      		return
      	}
      	uni.chooseLocation({
      		latitude: this.lat,
      		longitude: this.lng,
      		success: res => {
            console.log(res)
            this.form.lat = res.latitude
            this.form.lng = res.longitude
      			this.form.address = res.address+res.name		
      		},
      		fail: error=> {
      			console.log(error)
      		} 
      	})
      	
      },
      // 新增图片
      async afterRead(event) {
        // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        let fileListLen = this.form[`fileList${event.name}`].length
        lists.map((item) => {
          this.form[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中'
          })
        })
        for (let i = 0; i < lists.length; i++) {
          const result = await this.uploadFilePromise(lists[i].url)
          let item = this.form[`fileList${event.name}`][fileListLen]
          this.form[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          }))
          fileListLen++
        }
      },
      uploadFilePromise(url) {
        console.log(url)
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: urlConfig+'tradmin/Upload/upload', // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            success: (res) => {
              setTimeout(() => {
                const data = JSON.parse(res.data)
                resolve(data.data)
              }, 1000)
            }
      		  });
        })
      },
      // 删除图片
      deletePic(event) {
        this.form[`fileList${event.name}`].splice(event.index, 1)
      },
      region_change(e){
        console.log(e.detail.value)
        if(e.detail.value.length){
          this.form.region = e.detail.value.join('')
        }
      },
      submitForm(){
        this.$refs.form.validate().then( async ()=>{
          const {title, name, phone, region, address, lng, lat, commission, fileList1, fileList2, id} = this.form
          const shop_front = fileList1[0].url
          const in_store = fileList2[0].url
          const data ={
            userId:this.userInfo.id,
            title,
            name,
            phone,
            region,
            address,
            lng,
            lat,
            commission,
            shop_front,
            in_store
          }
          if(id){
            data.id = id
          }
          const res = await this.$http.post('/api/user/addPickUpLocation', data)
          if(res.code === 200){
            this.$refs.uNotify.success('保存成功')
            this.form ={
                    title:'',
                    name:'',
                    fileList1:[],
                    fileList2:[],
                    lat:'',
                    lng:'',
                    address:'',
                    commission:'',
                    region:''
                  }
          }else{
            this.$refs.uNotify.error(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .wrap{
    box-sizing: border-box;
    padding: 20rpx 20rpx 108rpx 20rpx;
  .part-one {
      background: #fff;
      box-sizing: border-box;
      padding: 24rpx;
      margin-bottom: 20rpx;
      border-radius: 16rpx;
      .picker{
        color: grey;
        font-size: 32rpx;
        display: flex;
        flex: 1;
        width: 100%;
        text{
          margin-left: auto;
        }
      }
    }
    .part-two{
      background: #fff;
      box-sizing: border-box;
      padding: 0 24rpx;
      padding-bottom: 10rpx;
      margin-bottom: 20rpx;
      border-radius: 16rpx;
      position: relative;
      
      .upload-item {
        padding-top: 26rpx;
        margin-left: auto;
      
      }
      .upload-tips {
        position: absolute;
        display: inline-block;
        width: 380rpx;
        color: #888888;
        top: 180rpx;
        left: 20rpx;
        font-size: 24rpx;
      }
    }
    .part-three{
      background: #fff;
      box-sizing: border-box;
      padding: 0 24rpx;
      padding-bottom: 10rpx;
      margin-bottom: 20rpx;
      border-radius: 16rpx;
      position: relative;
      
      .upload-item {
        padding-top: 26rpx;
        margin-left: auto;
      
      }
      .upload-tips {
        position: absolute;
        display: inline-block;
        width: 390rpx;
        color: #888888;
        top: 180rpx;
        left: 20rpx;
        font-size: 24rpx;
      }
    }
  }
  .bottom {
    height: 108rpx;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
  
    .submit-btn {
      width: 686rpx;
      height: 80rpx;
      background: linear-gradient(313deg,#d62e36 6%, #ec434b);
      border-radius: 40rpx;
      text-align: center;
      align-items: center;
      line-height: 80rpx;
      font-size: 28rpx;
      font-weight: 700;
      color: #ffffff;
    }
  }
  ::v-deep .uni-input-input {
    text-align: right;
  }
</style>
<style>
  page{
    background: #F6F6F8;
  }
</style>