(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2935693e"],{5246:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743"),i("8a0b")},6529:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFBQUVGMzVENDI2RjExRUI4MjE5OEZFNkRBMzAxMjk1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFBQUVGMzVFNDI2RjExRUI4MjE5OEZFNkRBMzAxMjk1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUFBRUYzNUI0MjZGMTFFQjgyMTk4RkU2REEzMDEyOTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUFBRUYzNUM0MjZGMTFFQjgyMTk4RkU2REEzMDEyOTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7YEB9kAAAB8ElEQVR42ryXv0tCURTHrxdxcLUtccqGILCxWeQ5ODQ0WeFqmEt/QW0N4aKCq0HNUQ2ZWG2uTi1tYqO0NVhU3wPnykOe9/26zy98QPS98/3yfPfcc2OfTzXhQ2mQBzmQASn+fgrGYAQGYOK1YNzjNWVQBbse6w5BB9yAH92F0qWQBd5A14e54Gu7fK8VJEACtMAjyIrgynKNFtf0FCAJHkBNmFONaybdAlDKW1AQ5lXg2gldgEZE5vYQjWUBLMOPXfd3WIsBaKk1xerUVC1ABSiHfNudREvwW7M6yvYAVcPm92AH7GtCVFWAtM8m48WcjGfgDlxomlVacm+Pwpy0DY411+clbyxRmT+DNc09Ocm7mk5/4CMCc1JG2rZUJ/2CI7AJXgybk1Juu+EluAZfoOQQIoz5vBFNNb8fgA3+vBgitDl5S55klmkdvDqEODNgThpLHqOEzxDnBsxJI8kznPAZQhgwJw0kD5DDACHCmpPnRK2CjsebVIjDkOZzzxiP5XHevUzviMv0DrZoYlZPgEbn+grngboa1+2NqAfaKzBvs5fjTHgK+hGa99lj6VBKa3svohB9rj1zOxeobtc2/NhLXNvTyYhSnoAiv7Fh3vYi15oFORv2eLlUPDYre5Op8L29sKdjWi5XjPHj+b8AAwCVHIDXInBpQAAAAABJRU5ErkJggg=="},"6b41":function(t,e,i){"use strict";var n=i("d282"),a=i("b1d2"),l=i("ad06"),c=Object(n["a"])("nav-bar"),s=c[0],o=c[1];e["a"]=s({props:{title:String,fixed:Boolean,zIndex:[Number,String],leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,border:{type:Boolean,default:!0}},data:function(){return{height:null}},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.navBar.getBoundingClientRect().height)},methods:{genLeft:function(){var t=this.$createElement,e=this.slots("left");return e||[this.leftArrow&&t(l["a"],{class:o("arrow"),attrs:{name:"arrow-left"}}),this.leftText&&t("span",{class:o("text")},[this.leftText])]},genRight:function(){var t=this.$createElement,e=this.slots("right");return e||(this.rightText?t("span",{class:o("text")},[this.rightText]):void 0)},genNavBar:function(){var t,e=this.$createElement;return e("div",{ref:"navBar",style:{zIndex:this.zIndex},class:[o({fixed:this.fixed}),(t={},t[a["b"]]=this.border,t)]},[e("div",{class:o("left"),on:{click:this.onClickLeft}},[this.genLeft()]),e("div",{class:[o("title"),"van-ellipsis"]},[this.slots("title")||this.title]),e("div",{class:o("right"),on:{click:this.onClickRight}},[this.genRight()])])},onClickLeft:function(t){this.$emit("click-left",t)},onClickRight:function(t){this.$emit("click-right",t)}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:o("placeholder"),style:{height:this.height+"px"}},[this.genNavBar()]):this.genNavBar()}})},"859d":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIzMzQyQkQ1NDI2RjExRUJCRDU2OUE2QUFEQUVBMkIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIzMzQyQkQ2NDI2RjExRUJCRDU2OUE2QUFEQUVBMkIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjMzNDJCRDM0MjZGMTFFQkJENTY5QTZBQURBRUEyQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjMzNDJCRDQ0MjZGMTFFQkJENTY5QTZBQURBRUEyQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7rkCfbAAAB70lEQVR42ryXv0tCURTHb5dwcLUtccqGILCxWeQ5ODQ0WeFqmEt/QW0N4aKGq0VBW1RDIlabq1OLm9jo2mBRfQ+cKw953vfrPg98QPTe8/3yfOfcc1eu7p+Ej0iCLMiAFEjw9xMwAgPQA2OvCVc9rimCMtj1mLcPWuAO/OgWSpdEFvgAbR/igte2ea8VxEAMNMALSIvgkeYcDc7pyUAcPIOKMBcVzhl3M0AuH0BOmI8c547pDNQiErebqC0yYBl+7Lq/w5o3QKVWF8uLumoBykAx5NvuFFSC35rqKNoNlA2LU3vdAfsaE2VlIOmzyXgRJ+EpeAQXmmaVlNzboxCn2AbHmvVZyQdLVOKvYE2zJyP5VNPFH/iMQJwiJW1HqlP8giOwCd4Mi1Mk3E7DS3ALvkDBwUQY8Vkjmmh+PwAb/HneRGhx0pY8ySyKdfDuYOLMgDjFSPIYJXyaODcgTjGQPMMJnyaEAXGKnuQBsh/ARFhx0hyrKmh53KRMHIYUn2kqAzS9Dn2YuAkpPmTNmQEanatLnAeqaly3N6IOaC5BvMlajjPhKehGKN5ljYVDKdX2XkQmupx76nYvUN2uafixFzi3p5sRuTwBeR/Vsehtz3OuaZC7Ib0sW6DksVnZm0yJ93bC3o6pXK4Z49fzfwEGAN4Uf3bcROB4AAAAAElFTkSuQmCC"},"872e":function(t,e,i){"use strict";var n=i("d352"),a=i.n(n);a.a},"8a0b":function(t,e,i){},"981c":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header-wrapper"},[i("van-nav-bar",{attrs:{title:t.title,"left-text":t.leftText,"right-text":t.rightText,"left-arrow":t.leftArrow},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight},scopedSlots:t._u([{key:"title",fn:function(){return[t.title?i("span",[t._v(t._s(t.title))]):t._t("title")]},proxy:!0},{key:"right",fn:function(){return[t.rightText?i("span",[t._v(t._s(t.rightText))]):t._t("right")]},proxy:!0},{key:"left",fn:function(){return[t.leftText?i("span",[t._v(t._s(t.leftText))]):t._t("left")]},proxy:!0}],null,!0)})],1)},a=[],l=(i("5246"),i("6b41")),c={name:"Header",components:{VanNavBar:l["a"]},props:{title:{type:String,default:function(){return"标题"}},leftText:{type:String,default:function(){return""}},rightText:{type:String,default:function(){return""}},leftArrow:{type:Boolean,default:function(){return!0}}},data:function(){return{}},methods:{onClickLeft:function(){this.$router.go(-1),this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")}}},s=c,o=(i("872e"),i("2877")),r=Object(o["a"])(s,n,a,!1,null,null,null);e["a"]=r.exports},b4b7:function(t,e,i){"use strict";var n=i("f29c"),a=i.n(n);a.a},c3a6:function(t,e,i){"use strict";i("68ef"),i("9d70"),i("3743")},d352:function(t,e,i){},f29c:function(t,e,i){},fe56:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper header-page"},[i("Header",{attrs:{title:""}}),t.type?i("div",[i("div",{staticClass:"nav"},[t._v(t._s(t.$t("pledge.collection.add"))+t._s(t.type.name))]),i("div",{staticClass:"input-item"},[i("div",{staticClass:"input-item-name"},[t._v(t._s(t.$t("pledge.collection.name")))]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],attrs:{type:"text",placeholder:t.$t("pledge.collection.namePld")},domProps:{value:t.userName},on:{input:[function(e){e.target.composing||(t.userName=e.target.value)},t.nameValidator]}})]),i("div",{staticClass:"input-item"},[i("div",{staticClass:"input-item-name"},[t._v(" "+t._s(3===t.type.id?t.$t("pledge.collection.bankAccount"):t.$t("pledge.collection.account"))+" ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],attrs:{type:"text",placeholder:1===t.type.id?t.$t("pledge.collection.wechatPld"):2===t.type.id?t.$t("pledge.collection.aliPld"):t.$t("pledge.collection.bankAccountPld")},domProps:{value:t.account},on:{input:[function(e){e.target.composing||(t.account=e.target.value)},t.accountValidator]}})]),3===t.type.id?i("div",{staticClass:"input-item"},[i("div",{staticClass:"input-item-name"},[t._v(" "+t._s(t.$t("pledge.collection.bankName"))+" ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bankName,expression:"bankName"}],attrs:{type:"text",placeholder:t.$t("pledge.collection.bankPld")},domProps:{value:t.bankName},on:{input:[function(e){e.target.composing||(t.bankName=e.target.value)},t.bankValidator]}})]):i("div",{staticClass:"input-item file"},[i("div",{staticClass:"input-item-name mb28"},[t._v(" "+t._s(t.$t("pledge.collection.addQr"))+" ")]),i("van-uploader",{attrs:{"max-count":1,"preview-full-image":"","after-read":t.readPicture,"max-size":10485760},on:{delete:t.handleDel,oversize:t.onOversize},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}},[i("label",{staticClass:"fileUpload",attrs:{for:"upfile"}},[t._v(t._s(t.$t("pledge.collection.clickUpload")))])])],1),i("ButtonCommon",{staticClass:"btn",on:{click:t.handleAddPay}},[t._v(t._s(t.$t("pledge.collection.add")))])],1):i("div",[i("div",{staticClass:"nav"},[t._v(t._s(t.$t("pledge.collection.add")))]),t._l(t.typeList,(function(e,n){return i("div",{key:n,staticClass:"type-list"},[i("van-icon",{attrs:{name:""+e.icon,size:"16"}}),i("div",{staticClass:"item",on:{click:function(i){return t.handleChooseType(e)}}},[i("span",[t._v(t._s(e.name))]),i("van-icon",{attrs:{name:"arrow",color:"#999",size:"10"}})],1)],1)}))],2)],1)},a=[],l=(i("4160"),i("a434"),i("ac1f"),i("5319"),i("159b"),i("e7e5"),i("d399")),c=(i("e930"),i("8f80")),s=(i("c3a6"),i("ad06")),o=i("981c"),r=i("8348"),d=i("3679"),u=i.n(d),h=i("3882"),m=i.n(h),p=i("996f"),g=i.n(p),v=i("859d"),A=i.n(v),f=i("6529"),b=i.n(f),k=i("05cf"),y={name:"pledge",components:{Header:o["a"],VanIcon:s["a"],VanUploader:c["a"],ButtonCommon:r["a"]},data:function(){return{ali:m.a,bank:g.a,wechat:u.a,checkActive:b.a,checkDisabled:A.a,type:"",userName:"",account:"",bankName:"",imgUrl:"",fileList:[]}},computed:{typeList:function(){return[{type:"wechat",name:this.$t("pledge.collection.wechat"),icon:this.wechat,id:1},{type:"ali",name:this.$t("pledge.collection.ali"),icon:this.ali,id:2},{type:"bank",name:this.$t("pledge.collection.bank"),icon:this.bank,id:3}]}},methods:{nameValidator:function(t){this.userName=t.target.value.replace(/\s/g,"")},bankValidator:function(t){this.bankName=t.target.value.replace(/\s/g,"")},accountValidator:function(t){3!==this.type.id?this.account=t.target.value.replace(/\s/g,""):this.account=t.target.value.replace(/\D/g,"")},handleChooseType:function(t){this.type=t},onOversize:function(){Object(l["a"])(this.$t("common.fileSizeCantNotOver10M"))},submitBefore:function(){return this.userName?this.account?3!==this.type.id||this.bankName?!(3!==this.type.id&&!this.imgUrl)||(Object(l["a"])(this.$t("pledge.collection.imgPld")),!1):(Object(l["a"])(this.$t("pledge.collection.bankPld")),!1):(Object(l["a"])(this.$t("pledge.collection.".concat(3===this.type.id?"bankAccountPld":2===this.type.id?"aliPld":"wechatPld"))),!1):(Object(l["a"])(this.$t("pledge.collection.namePld")),!1)},handleAddPay:function(){var t=this;this.submitBefore()&&Object(k["b"])({payment_type:this.type.id,payment_no:this.account,payment_url:this.imgUrl,bank:this.bankName,name:this.userName}).then((function(e){1===e.status&&"success"===e.msg&&(Object(l["a"])(t.$t("pledge.collection.addPaymentSuccess")),t.$router.back())}))},readPicture:function(t){var e=this;l["a"].loading({forbidClick:!0,duration:0,message:this.$t("common.uploading")});var i=new FormData;i.append("file",t.file),Object(k["c"])(i).then((function(t){1===t.status&&(e.imgUrl="http://sscv-image.hrwallet.xyz"+t.data,l["a"].clear())})).catch((function(){l["a"].clear()}))},handleDel:function(t){var e=this;this.fileList.forEach((function(i,n){i.url===t.url&&(e.fileList=e.fileList.splice(n,1),e.imgUrl="")}))}}},N=y,I=(i("b4b7"),i("2877")),B=Object(I["a"])(N,n,a,!1,null,"ef040054",null);e["default"]=B.exports}}]);
//# sourceMappingURL=chunk-2935693e.a85d589f.js.map