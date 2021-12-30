<template>
  <div class="uploader-wrapper">
    <van-uploader
      v-model="fileList"
      :max-count="maxCount"
      preview-full-image
      :after-read="readPicture"
      @delete="handleDel"
    >
      <label for="upfile">{{ label }}</label>
    </van-uploader>
    <!-- <div>
      <label @click="toUpload"> {{ label }}11 </label>
      <div v-if="fileList.length">
        <div class="img-wrapper" v-for="(item, index) in fileList" :key="index">
          <span @click="toDel(index)">x</span>
          <img :src="item" />
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { Uploader as VanUploader, Toast } from "vant";
import { fileUpload } from "@/http/modules/otc";
export default {
  name: "FileUploader",
  props: {
    label: {
      type: String
    },
    fixed: {
      type: Boolean
    },
    maxCount: {
      type: Number
    },
    fileList: {
      type: Array
    }
  },
  components: {
    VanUploader
  },
  computed: {},
  data() {
    return {
      // fileList: []
      api: window.api
    };
  },
  created() {},
  methods: {
    // 获取文档流
    readPicture(file) {
      Toast.loading({
        forbidClick: true,
        duration: 0,
        message: this.$t("common.uploading")
      });
      const formData = new FormData(); // 创建form对象
      formData.append("file", file.file);
      console.log(formData);
      fileUpload(formData)
        .then(res => {
          if (res.status === 1) {
            this.$emit("done", res.data);
            Toast.clear();
          }
        })
        .catch(() => {
          Toast.clear();
        });
    },
    handleDel(obj) {
      console.log(this.fileList);
      console.log(obj);
      this.fileList.forEach((element, index) => {
        if (element.url === obj.url) {
          // this.fileList.splice(index, 1);
          this.$emit("delete", index);
        }
      });
    }
    // toUpload() {
    //   const self = this;
    //   window.api.getPicture(
    //     {
    //       sourceType: "",
    //       encodingType: "",
    //       mediaValue: "pic",
    //       destinationType: "base64",
    //       allowEdit: true,
    //       quality: 50,
    //       targetWidth: 100,
    //       targetHeight: 100,
    //       saveToPhotoAlbum: false
    //     },
    //     function(ret, err) {
    //       console.log("ret" + JSON.stringify(ret));
    //       if (ret) {
    //         Toast.loading({
    //           forbidClick: true,
    //           duration: 0,
    //           message: self.$t("common.uploading")
    //         });
    //         const formData = new FormData(); // 创建form对象
    //         formData.append("file", ret.base64Data);
    //         fileUpload(formData)
    //           .then(res => {
    //             if (res.status === 1) {
    //               self.$emit("done", res.data);
    //               Toast.clear();
    //             }
    //           })
    //           .catch(() => {
    //             Toast.clear();
    //           });
    //       } else {
    //         console.log(JSON.stringify(err));
    //       }
    //     }
    //   );
    // }
  }
};
</script>
<style lang="scss" scoped>
.uploader-wrapper {
  label {
    display: block;
    margin: 0.453333rem 0 1.386667rem;
    width: 2.933333rem;
    height: 2.933333rem;
    line-height: 2.933333rem;
    text-align: center;
    background: #f7f6fb;
    border: 0.026667rem solid #eaeaea;
    border-radius: 0.106667rem;
    font-size: 0.4rem;
    font-weight: 500;
    color: #aeb8c0;
  }
  .img-wrapper {
    position: relative;
    width: 90px;
    img {
      width: 100%;
    }
    .del {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.373333rem;
      height: 0.373333rem;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 0.32rem;
    }
  }
}
</style>