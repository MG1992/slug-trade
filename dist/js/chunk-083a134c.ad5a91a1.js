(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-083a134c"],{"05cf":function(t,e,n){"use strict";n.d(e,"g",(function(){return a})),n.d(e,"q",(function(){return o})),n.d(e,"l",(function(){return s})),n.d(e,"s",(function(){return r})),n.d(e,"j",(function(){return c})),n.d(e,"e",(function(){return l})),n.d(e,"o",(function(){return u})),n.d(e,"m",(function(){return d})),n.d(e,"f",(function(){return p})),n.d(e,"d",(function(){return f})),n.d(e,"p",(function(){return h})),n.d(e,"n",(function(){return v})),n.d(e,"h",(function(){return m})),n.d(e,"i",(function(){return g})),n.d(e,"c",(function(){return b})),n.d(e,"b",(function(){return C})),n.d(e,"a",(function(){return y})),n.d(e,"r",(function(){return w})),n.d(e,"k",(function(){return _}));n("99af");var i=n("db04");function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return Object(i["a"])({url:"/pattern/invest/investinfo/".concat(t,"/").concat(e),method:"get"})}function o(t){return Object(i["a"])({url:"/pattern/invest/transtoration",method:"post",data:t})}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return Object(i["a"])({url:"/pattern/invest/rationrecord/".concat(t,"/").concat(e),method:"get"})}function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20;return Object(i["a"])({url:"/pattern/invest/unfrozenrecord/".concat(t,"/").concat(e,"/").concat(n),method:"get"})}function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20;return Object(i["a"])({url:"/pattern/wealth/separaterecord/".concat(t,"/").concat(e,"/").concat(n),method:"get"})}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;return Object(i["a"])({url:"/pattern/invest/contractrecord/".concat(t,"/").concat(e),method:"get"})}function u(t){return Object(i["a"])({url:"/pattern/invest/transtocontract",method:"post",data:t})}function d(t){return Object(i["a"])({url:"/pattern/invest/transincontract",method:"post",data:t})}function p(){return Object(i["a"])({url:"/member/frmconfig/".concat((new Date).getTime()),method:"get"})}function f(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all";return Object(i["a"])({url:"/pattern/invest/contractbalance/".concat(t),method:"get"})}function h(t){return Object(i["a"])({url:"/pattern/invest/transtocontractbalance",method:"post",data:t})}function v(t){return Object(i["a"])({url:"/pattern/invest/rationtranstoaccount",method:"post",data:t})}function m(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Object(i["a"])({url:"/global/otc/advertise/getmyadvertise/".concat(t,"/20/all"),method:"get"})}function g(){return Object(i["a"])({url:"/global/payment/getpaymentlist",method:"get"})}function b(t){return Object(i["a"])({url:"/member/fileupload",method:"post",headers:{contentType:"multipart/form-data"},data:t})}function C(t){return Object(i["a"])({url:"/global/payment/addpayment",method:"post",data:t})}function y(t){return Object(i["a"])({url:"/global/payment/activpm/".concat(t),method:"get"})}function w(t){return Object(i["a"])({url:"/global/payment/unactivpym/".concat(t),method:"get"})}function _(t){return Object(i["a"])({url:"/global/otc/advertise/undercarriageadv/".concat(t),method:"get"})}},"1f50":function(t,e,n){"use strict";var i=n("5fb6"),a=n.n(i);a.a},"280b":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper header-page"},[n("Header",{attrs:{title:t.$t("pledge.pledge.title"),rightText:t.$t("pledge.pledge.transfer")},on:{"click-right":t.handleHeaderRightBtn}}),n("div",{staticClass:"banner"},[n("p",{staticClass:"nav"},[t._v(t._s(t.$t("pledge.pledge.nowPrice")))]),n("div",{staticClass:"content"},[t._v(" "+t._s(t.$n(t.investPrice,"maximumSignificantDigits8"))+" ")])]),n("div",{staticClass:"border-bottom"}),t._l(t.list,(function(e,i){return n("div",{key:i,staticClass:"item"},[n("div",{staticClass:"nav"},[n("div",{staticClass:"nav-left"},[t._v(" "+t._s(t.$t("pledge.pledge.store"))+" "+t._s(t.$n(e.amount,"maximumSignificantDigits8"))+" "+t._s(t.$t("pledge.pledge.unit"))+" SSCV ")]),n("div",{staticClass:"nav-right"},[t._v(" "+t._s(1==e.invest_status?t.$t("pledge.pledge.inOperation"):t.$t("pledge.pledge.Removed"))+" ")])]),n("div",{staticClass:"content"},[n("div",{staticClass:"content-left"},[n("div",{staticClass:"content-left-top"},[t._v(" "+t._s(t.$t("pledge.pledge.beginTime"))+t._s(e.created_time)+" ")]),n("div",{staticClass:"content-left-bottom"},[t._v(" "+t._s(t.$t("pledge.pledge.endTime"))+t._s(e.invest_endtime)+" ")])]),1==e.invest_status?n("div",{staticClass:"content-right",on:{click:function(n){return t.handleBtnClick(e.id)}}},[t._v(" "+t._s(t.$t("pledge.pledge.remove"))+" ")]):t._e()]),n("div",{staticClass:"border-bottom"})])})),n("div",{staticClass:"footer"},[n("ButtonCommon",{staticClass:"footer-btn",on:{click:function(e){t.isShowBuyPop=!0}}},[t._v(" 分红 ")])],1),n("van-popup",{attrs:{round:"",position:"bottom"},model:{value:t.isShowBuyPop,callback:function(e){t.isShowBuyPop=e},expression:"isShowBuyPop"}},[n("div",{staticClass:"popup"},[n("p",{staticClass:"nav"},[t._v(t._s(t.$t("pledge.pledge.buyPopTitle")))]),n("div",{staticClass:"balance"},[n("div",{staticClass:"content"},[t._v(" 当前兑换比例: "+t._s(t.exchangeNum)+" SSCV : 1 "+t._s(t.exchangeCurrency)+" ")]),n("div",{staticClass:"close",on:{click:function(e){t.isShowBuyPop=!1}}},[t._v(" "+t._s(t.$t("requestResponse.CANCEL"))+" ")])]),n("div",{staticClass:"balance-input"},[n("div",{staticClass:"balance-input-left"},[n("p",[t._v("您的可兑换数量为 "+t._s(t.Contractbalance.amount)+" SSCV")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.buyPopAmount,expression:"buyPopAmount"}],attrs:{type:"number",placeholder:"请输入兑换数量"},domProps:{value:t.buyPopAmount},on:{input:function(e){e.target.composing||(t.buyPopAmount=e.target.value)}}})])]),n("div",{staticClass:"inpot-box"},[n("p",[t._v(t._s(t.$t("mine.accountManage.safetyVerification")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:t.$t("home.subscribe.inputWalletPwd")},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("ButtonCommon",{staticClass:"popup-btn",on:{click:t.handleBuyPopupSubmit}},[t._v(" "+t._s(t.$t("requestResponse.CONFIRM"))+" ")])],1)]),n("van-popup",{attrs:{round:"",position:"bottom"},model:{value:t.isShowConfirmAgainPop,callback:function(e){t.isShowConfirmAgainPop=e},expression:"isShowConfirmAgainPop"}},[n("div",{staticClass:"popup"},[n("p",{staticClass:"nav"},[t._v(t._s(t.$t("pledge.pledge.popNav")))]),n("div",{staticClass:"inpot-box"},[n("p",[t._v(t._s(t.$t("mine.accountManage.safetyVerification")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:t.$t("home.subscribe.inputWalletPwd")},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("ButtonCommon",{staticClass:"popup-btn",on:{click:t.handlePopupSubmit}},[t._v(" "+t._s(t.$t("requestResponse.CONFIRM"))+" ")])],1)]),n("van-popup",{attrs:{round:"",position:"bottom"},model:{value:t.isShowInvestmentPop,callback:function(e){t.isShowInvestmentPop=e},expression:"isShowInvestmentPop"}},[n("div",{staticClass:"popup"},[n("p",{staticClass:"nav"},[t._v(t._s(t.$t("pledge.pledge.InvestmentPopTitle")))]),n("div",{staticClass:"balance-input"},[n("div",{staticClass:"balance-input-left"},[n("p",[t._v(t._s(t.$t("pledge.pledge.inputNum")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.investNum,expression:"investNum"}],attrs:{type:"number",placeholder:t.$t("pledge.pledge.balancePlaceHolder")},domProps:{value:t.investNum},on:{input:function(e){e.target.composing||(t.investNum=e.target.value)}}})]),n("div",{staticClass:"balance-input-right",on:{click:function(e){t.isShowInvestmentPop=!1}}},[t._v(" "+t._s(t.$t("requestResponse.CANCEL"))+" ")])]),n("div",{staticClass:"inpot-box"},[n("p",[t._v(t._s(t.$t("mine.accountManage.safetyVerification")))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:t.$t("home.subscribe.inputWalletPwd")},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),n("ButtonCommon",{staticClass:"popup-btn",on:{click:t.handleInvestmentPopSubmit}},[t._v(" "+t._s(t.$t("requestResponse.CONFIRM"))+" ")])],1)])],2)},a=[],o=(n("d3b7"),n("ac1f"),n("1276"),n("2909")),s=(n("e7e5"),n("d399")),r=(n("8a58"),n("e41f")),c=n("981c"),l=n("8348"),u=n("05cf"),d={name:"currencyShares",components:{Header:c["a"],VanPopup:r["a"],ButtonCommon:l["a"]},data:function(){return{isShowConfirmAgainPop:!1,isShowInvestmentPop:!1,isShowBuyPop:!1,list:[],page:1,password:"",id:"",investPrice:0,investNum:"",exchangeNum:0,exchangeCurrency:"",Contractbalance:{},buyPopAmount:""}},watch:{isShowConfirmAgainPop:function(){this.password=""},isShowInvestmentPop:function(){this.password=""},isShowBuyPop:function(){this.password="",this.buyPopAmount=""}},created:function(){this.init()},methods:{init:function(){this.list=[],this.getContractrecord(),this.getFrmconfig(),this.getContractbalance()},handlePopupSubmit:function(){var t=this;this.password?Object(u["m"])({m_security_pwd:this.password,contract_id:this.id}).finally((function(){t.isShowConfirmAgainPop=!1,t.init()})):Object(s["a"])(this.$t("common.pleaseEnterPassword"))},handleBuyPopupSubmit:function(){var t=this;this.password?!this.buyPopAmount||this.buyPopAmount>this.Contractbalance.amount?Object(s["a"])("请输入正确的可兑换数量"):Object(u["p"])({m_security_pwd:this.password,amount:this.buyPopAmount,currency:this.Contractbalance.currency}).then((function(e){1===e.status&&(t.isShowBuyPop=!1,Object(s["a"])("兑换成功"),t.getContractbalance())})):Object(s["a"])(this.$t("common.pleaseEnterPassword"))},handleBtnClick:function(t){this.isShowConfirmAgainPop=!0,this.id=t},getContractrecord:function(){var t=this;Object(u["e"])(this.page).then((function(e){var n;1===e.status&&((n=t.list).push.apply(n,Object(o["a"])(e.data.list)),e.data.hasNextPage&&(t.page++,t.getContractrecord()))}))},getFrmconfig:function(){var t=this;Object(u["f"])().then((function(e){if(1===e.status){t.investPrice=e.data.invest_contract_price;var n=e.data.contract_balance_tranto_conf.split(",");t.exchangeNum=1/n[0],t.exchangeCurrency=n[1]}}))},getContractbalance:function(){var t=this;Object(u["d"])("SSCV").then((function(e){1===e.status&&(t.Contractbalance=e.data[0]||{amount:0})}))},handleHeaderRightBtn:function(){this.isShowInvestmentPop=!0},handleInvestmentPopSubmit:function(){var t=this;this.password?this.investNum&&this.investNum%10===0?Object(u["o"])({m_security_pwd:this.password,amount:this.investNum,currency:"SSCV"}).finally((function(){t.isShowInvestmentPop=!1,t.init()})):Object(s["a"])(this.$t("pledge.pledge.balancePlaceHolder")):Object(s["a"])(this.$t("common.pleaseEnterPassword"))}}},p=d,f=(n("1f50"),n("2877")),h=Object(f["a"])(p,i,a,!1,null,"6eda707e",null);e["default"]=h.exports},4475:function(t,e,n){},5246:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("8a0b")},"5fb6":function(t,e,n){},"66b9":function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("e3b3"),n("bc1b")},"6b41":function(t,e,n){"use strict";var i=n("d282"),a=n("b1d2"),o=n("ad06"),s=Object(i["a"])("nav-bar"),r=s[0],c=s[1];e["a"]=r({props:{title:String,fixed:Boolean,zIndex:[Number,String],leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,border:{type:Boolean,default:!0}},data:function(){return{height:null}},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.navBar.getBoundingClientRect().height)},methods:{genLeft:function(){var t=this.$createElement,e=this.slots("left");return e||[this.leftArrow&&t(o["a"],{class:c("arrow"),attrs:{name:"arrow-left"}}),this.leftText&&t("span",{class:c("text")},[this.leftText])]},genRight:function(){var t=this.$createElement,e=this.slots("right");return e||(this.rightText?t("span",{class:c("text")},[this.rightText]):void 0)},genNavBar:function(){var t,e=this.$createElement;return e("div",{ref:"navBar",style:{zIndex:this.zIndex},class:[c({fixed:this.fixed}),(t={},t[a["b"]]=this.border,t)]},[e("div",{class:c("left"),on:{click:this.onClickLeft}},[this.genLeft()]),e("div",{class:[c("title"),"van-ellipsis"]},[this.slots("title")||this.title]),e("div",{class:c("right"),on:{click:this.onClickRight}},[this.genRight()])])},onClickLeft:function(t){this.$emit("click-left",t)},onClickRight:function(t){this.$emit("click-right",t)}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:c("placeholder"),style:{height:this.height+"px"}},[this.genNavBar()]):this.genNavBar()}})},8348:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"confirm-btn-wrapper",style:t.calStyle},[n("van-button",{staticClass:"confirm-btn",class:t.disabled,attrs:{disabled:t.disabled},on:{click:t.handleClick}},[t._t("default")],2)],1)},a=[],o=(n("c7cd"),n("66b9"),n("b650")),s={name:"buttonCommon",props:{fixed:{type:Boolean},disabled:{type:Boolean}},components:{VanButton:o["a"]},computed:{calStyle:function(){return this.fixed&&{position:"fixed",bottom:0,left:0,padding:"0 15px 22px 15px"}}},data:function(){return{}},created:function(){},methods:{handleClick:function(){this.$emit("click")}}},r=s,c=(n("9fe5"),n("2877")),l=Object(c["a"])(r,i,a,!1,null,"b36bff8e",null);e["a"]=l.exports},"857a":function(t,e,n){var i=n("1d80"),a=/"/g;t.exports=function(t,e,n,o){var s=String(i(t)),r="<"+e;return""!==n&&(r+=" "+n+'="'+String(o).replace(a,"&quot;")+'"'),r+">"+s+"</"+e+">"}},"872e":function(t,e,n){"use strict";var i=n("d352"),a=n.n(i);a.a},"8a0b":function(t,e,n){},"8a58":function(t,e,n){"use strict";n("68ef"),n("a71a"),n("9d70"),n("3743"),n("4d75")},"981c":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-wrapper"},[n("van-nav-bar",{attrs:{title:t.title,"left-text":t.leftText,"right-text":t.rightText,"left-arrow":t.leftArrow},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight},scopedSlots:t._u([{key:"title",fn:function(){return[t.title?n("span",[t._v(t._s(t.title))]):t._t("title")]},proxy:!0},{key:"right",fn:function(){return[t.rightText?n("span",[t._v(t._s(t.rightText))]):t._t("right")]},proxy:!0},{key:"left",fn:function(){return[t.leftText?n("span",[t._v(t._s(t.leftText))]):t._t("left")]},proxy:!0}],null,!0)})],1)},a=[],o=(n("5246"),n("6b41")),s={name:"Header",components:{VanNavBar:o["a"]},props:{title:{type:String,default:function(){return"标题"}},leftText:{type:String,default:function(){return""}},rightText:{type:String,default:function(){return""}},leftArrow:{type:Boolean,default:function(){return!0}}},data:function(){return{}},methods:{onClickLeft:function(){this.$router.go(-1),this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")}}},r=s,c=(n("872e"),n("2877")),l=Object(c["a"])(r,i,a,!1,null,null,null);e["a"]=l.exports},"9fe5":function(t,e,n){"use strict";var i=n("4475"),a=n.n(i);a.a},af03:function(t,e,n){var i=n("d039");t.exports=function(t){return i((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},b650:function(t,e,n){"use strict";var i=n("c31d"),a=n("2638"),o=n.n(a),s=n("d282"),r=n("ba31"),c=n("b1d2"),l=n("48f4"),u=n("ad06"),d=n("543e"),p=Object(s["a"])("button"),f=p[0],h=p[1];function v(t,e,n,i){var a,s=e.tag,p=e.icon,f=e.type,v=e.color,m=e.plain,g=e.disabled,b=e.loading,C=e.hairline,y=e.loadingText,w={};function _(t){b||g||(Object(r["a"])(i,"click",t),Object(l["a"])(i))}function x(t){Object(r["a"])(i,"touchstart",t)}v&&(w.color=m?v:c["h"],m||(w.background=v),-1!==v.indexOf("gradient")?w.border=0:w.borderColor=v);var S=[h([f,e.size,{plain:m,loading:b,disabled:g,hairline:C,block:e.block,round:e.round,square:e.square}]),(a={},a[c["d"]]=C,a)];function P(){var i,a=[];return b?a.push(n.loading?n.loading():t(d["a"],{class:h("loading"),attrs:{size:e.loadingSize,type:e.loadingType,color:"currentColor"}})):p&&a.push(t(u["a"],{attrs:{name:p,classPrefix:e.iconPrefix},class:h("icon")})),i=b?y:n.default?n.default():e.text,i&&a.push(t("span",{class:h("text")},[i])),a}return t(s,o()([{style:w,class:S,attrs:{type:e.nativeType,disabled:g},on:{click:_,touchstart:x}},Object(r["b"])(i)]),[t("div",{class:h("content")},[P()])])}v.props=Object(i["a"])({},l["c"],{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"}}),e["a"]=f(v)},bc1b:function(t,e,n){},c7cd:function(t,e,n){"use strict";var i=n("23e7"),a=n("857a"),o=n("af03");i({target:"String",proto:!0,forced:o("fixed")},{fixed:function(){return a(this,"tt","","")}})},d352:function(t,e,n){},e41f:function(t,e,n){"use strict";var i=n("d282"),a=n("a142"),o=n("6605"),s=n("ad06"),r=Object(i["a"])("popup"),c=r[0],l=r[1];e["a"]=c({mixins:[Object(o["a"])()],props:{round:Boolean,duration:[Number,String],closeable:Boolean,transition:String,safeAreaInsetBottom:Boolean,closeIcon:{type:String,default:"cross"},closeIconPosition:{type:String,default:"top-right"},position:{type:String,default:"center"},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},beforeCreate:function(){var t=this,e=function(e){return function(n){return t.$emit(e,n)}};this.onClick=e("click"),this.onOpened=e("opened"),this.onClosed=e("closed")},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.round,i=this.position,o=this.duration,r="center"===i,c=this.transition||(r?"van-fade":"van-popup-slide-"+i),u={};if(Object(a["c"])(o)){var d=r?"animationDuration":"transitionDuration";u[d]=o+"s"}return e("transition",{attrs:{name:c},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],style:u,class:l((t={round:n},t[i]=i,t["safe-area-inset-bottom"]=this.safeAreaInsetBottom,t)),on:{click:this.onClick}},[this.slots(),this.closeable&&e(s["a"],{attrs:{role:"button",tabindex:"0",name:this.closeIcon},class:l("close-icon",this.closeIconPosition),on:{click:this.close}})])])}}})}}]);
//# sourceMappingURL=chunk-083a134c.ad5a91a1.js.map