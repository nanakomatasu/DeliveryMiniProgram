<template>
  <view class="wrap">
    <view class="header">
      <view class="title">
        请输入您的银行卡信息
      </view>
      <view class="tips">
        请绑定持卡人本人的银行卡
      </view>
    </view>
    <view class="form">
      		<u--form
      				labelPosition="left"
      				:model="form"
      				:rules="rules"
      				ref="form"
      		>
      			<u-form-item
      					label="选择银行"
      					prop="bank"
                labelWidth="70"
      					borderBottom
      			>
      				<u--input
      						v-model="form.bank"
      						border="none"
                  placeholder="请选择银行"
                  placeholderStyle="text-align:right; color:#888888"
      				></u--input>
      			</u-form-item>
            <u-form-item
            		label="银行卡号"
                labelWidth="70"
            		prop="cardNum"
            		borderBottom
                placeholderStyle="text-align:right; color:#888888"
            >
            	<u--input
            			v-model="form.cardNum"
            			border="none"
                  placeholder="请输入银行卡号"
                  placeholderStyle="text-align:right; color:#888888"
            	></u--input>
            </u-form-item>
            <u-form-item
            		label="持卡人姓名"
                labelWidth="80"
            		prop="name"
            		borderBottom
            		ref="item1"
            >
            	<u--input
            			v-model="form.name"
            			border="none"
                  placeholder="请输入持卡人姓名"
                  placeholderStyle="text-align:right; color:#888888"
            	></u--input>
            </u-form-item>
            <u-form-item
            		label="手机号"
            		prop="tel"
                labelWidth="60"
            		borderBottom
            >
            	<u--input
            			v-model="form.tel"
            			border="none"
                  placeholder="银行预留手机号"
                  placeholderStyle="text-align:right; color:#888888"
            	></u--input>
            </u-form-item>
            <u-form-item
            		label="验证码"
            		prop="codeNum"
                labelWidth="60"
            		borderBottom
            		ref="item1"
                class="code-num"
            >
              <u-input   v-model="form.codeNum"
                placeholderClass="placeholder" border="none" fontSize='28rpx'>
                <template slot="suffix" >
                  <u-code ref="uCode" @change="codeChange" seconds="120" changeText="重新获取XS" start-text="获取验证码" end-text="重新获取"></u-code>
                  <view class="get-code-text" v-show="tips !== '获取验证码' && tips !== '重新获取'" style="color: #888888;">{{tips}}</view>
                  <view class="get-code-text" @click="getCode" v-show="tips === '重新获取'">重新获取</view>
                  <view class="get-code-text" @click="getCode" v-show="tips === '获取验证码'">获取验证码</view>
                </template>
              </u-input>
            </u-form-item>
          </u--form>
    </view>
    <view class="submit-btn">
      <u-button
      type="primary"
      text="完成"
      shape="circle"
      color="linear-gradient(313deg,#d62e36 6%, #ec434b)"
      style="font-weight:700; font-size: 32rpx; height: 88rpx; width: 480rpx;"
      ></u-button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form:{
            bank:'',
            cardNum:'',
            name:'',
            tel:'',
            codeNum:''
        },
        tips:'获取验证码',
        rules:{
          bank:[
            {
              required:true,
              message:'请选择银行卡'
            }
          ],
          cardNum:[
            {
              required:true,
              message:'请输入银行卡号'
            }
          ],
          name:[
            {
              required:true,
              message:'请输入持卡人姓名'
            }
          ],
          tel:[
            {
              required:true,
              message:'请输入预留手机号'
            }
          ]
        }
      }
    },
    methods:{
      codeChange(text){
        this.tips = text
      }
    }
  }
</script>

<style lang="scss">
.wrap{
  box-sizing: border-box;
  padding: 40rpx 0 0;
  .header{
    margin-bottom: 40rpx;
    box-sizing: border-box;
    padding: 0 32rpx;
    .title{
      font-size: 40rpx;
      font-weight: 700;
      margin-bottom: 20rpx;
    }
    .tips{
      font-size: 28rpx;
      line-height: 40rpx;
      color: #888888;
    }
  }
  .form{
      background: #ffffff;
      ::v-deep .u-form-item__body{
        padding-left: 32rpx;
        padding-right: 32rpx;
      }
      .get-code-text{
        font-size: 32rpx;
        line-height: 40rpx;
        color: #D93038;
      }
  }
  .submit-btn{
    margin-top: 100rpx;
  }
  ::v-deep .uni-input-input {
    text-align: right;
  }
  .code-num{
    ::v-deep .uni-input-input {
      text-align: left;
    }
  }
}
</style>
<style>
  page{
    background: #F6F6F8;
  }
</style>
