(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02983fba"],{"10d7":function(t,e,n){},"1ec9":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAeCAYAAADHJYVoAAACPElEQVRIx+2WwUsUcRzF3/c3i+0IS5AdhOiQRezuuK4JRlOX/Qf0kqfdjoViRQe3ELzMRZCiQxQZRFCQneyidPLipbZWsDRXJdKuHTKoZZ1J/c3z4EXY1HF3jn6uM9/Hb97vDd8nCEjnXTZ7+NcRxbHZmQfyM8iMCvJSKu9mPe2uUOt3nnZXUnk3G2RO9nvoOFRvy+4wycGqQZGRqzFzyHHEP7T4lXuM/dHuGMiuvY8mk8cNM/f+vpQDi6cGvRZs6AkCVoBPL6HB6P46El090PP2vJvhpi4GEQYAAhY3dbE972b2FW8dqPRpcgpEEw4D0aTJqdaBSl+VLRmHkV9l9xHIftSLyNOTMfPOtCNbEQBY++s9AdiLMCD718rrEQC94jhU42W3AjKKsBDZ6ImZpux4vf4d5NkQxVcWHjaeUwCgDFyDYBEQ1qlKESwoQQ5HHHG47ADAx7nFS77PFxBJkJTa4y0EUBLhdTttfVIAoH2+JpCsR3jnz6eQbPV9jAGAIqkgcipUOwSnSSolIr6Ar0K2+6WI+AoA7HTyFiCjIZ171E4nb1atucKXUp9PPAYQqUF1Swlu2+3Wsz13aOHzUobgOMGm4JGTNYH02BcS0wcu6Jn5by0b/tYESCvA7ZUaVKS7s+38auBqsby8HPvt6TESXfukYvJE1MjF4/Hg1WJXblVhbnGYxH9KEUbsdHJIpIZStJsP80tZaP85gUYB1mGoG5fbEm/qqnO7KZZ+NPva7VCGOXvROhOoiG4DlKnreO9yZNYAAAAASUVORK5CYII="},4903:function(t,e,n){"use strict";var i=n("10d7"),a=n.n(i);a.a},5246:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("8a0b")},"6b41":function(t,e,n){"use strict";var i=n("d282"),a=n("b1d2"),s=n("ad06"),r=Object(i["a"])("nav-bar"),c=r[0],o=r[1];e["a"]=c({props:{title:String,fixed:Boolean,zIndex:[Number,String],leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,border:{type:Boolean,default:!0}},data:function(){return{height:null}},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.navBar.getBoundingClientRect().height)},methods:{genLeft:function(){var t=this.$createElement,e=this.slots("left");return e||[this.leftArrow&&t(s["a"],{class:o("arrow"),attrs:{name:"arrow-left"}}),this.leftText&&t("span",{class:o("text")},[this.leftText])]},genRight:function(){var t=this.$createElement,e=this.slots("right");return e||(this.rightText?t("span",{class:o("text")},[this.rightText]):void 0)},genNavBar:function(){var t,e=this.$createElement;return e("div",{ref:"navBar",style:{zIndex:this.zIndex},class:[o({fixed:this.fixed}),(t={},t[a["b"]]=this.border,t)]},[e("div",{class:o("left"),on:{click:this.onClickLeft}},[this.genLeft()]),e("div",{class:[o("title"),"van-ellipsis"]},[this.slots("title")||this.title]),e("div",{class:o("right"),on:{click:this.onClickRight}},[this.genRight()])])},onClickLeft:function(t){this.$emit("click-left",t)},onClickRight:function(t){this.$emit("click-right",t)}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:o("placeholder"),style:{height:this.height+"px"}},[this.genNavBar()]):this.genNavBar()}})},"788b":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"market-wrapper header-page"},[n("Header",{attrs:{title:t.$t("market.market"),leftArrow:!1},scopedSlots:t._u([{key:"right",fn:function(){return[n("VanIcon",{attrs:{name:"search",size:"18",color:"#3E536C"}})]},proxy:!0}])}),n("div",{staticClass:"nav"},[n("div",{staticClass:"tab-box"},t._l(t.typeList,(function(e,i){return n("div",{key:i,staticClass:"item",class:{active:1===i},on:{click:t.HandleHeaderClik}},[n("span",[t._v(t._s(e.value))])])})),0),n("div",{staticClass:"currency-box"},t._l(t.currencyList,(function(e,i){return n("div",{key:i,staticClass:"item",class:{active:0===i},on:{click:t.HandleHeaderClik}},[t._v(" "+t._s(e)+" ")])})),0),n("div",{staticClass:"nav-box"},[n("div",{staticClass:"nav-box-left"},[n("div",{staticClass:"nav-box-left-name"},[t._v(" "+t._s(t.$t("market.name"))+" "),n("van-icon",{staticClass:"nav-icon",attrs:{name:t.sort,size:"10"}})],1),n("div",{staticClass:"nav-box-left-time"},[t._v(" "+t._s(t.$t("market.24time"))+" "),n("van-icon",{staticClass:"nav-icon",attrs:{name:t.sort,size:"10"}})],1)]),n("div",{staticClass:"nav-box-center"},[t._v(" "+t._s(t.$t("market.newPrice"))),n("van-icon",{staticClass:"nav-icon",attrs:{name:t.sort,size:"10"}})],1),n("div",{staticClass:"nav-box-right"},[t._v(" "+t._s(t.$t("market.upDownRange"))),n("van-icon",{staticClass:"nav-icon",attrs:{name:t.sort,size:"10"}})],1)])]),n("div",{staticClass:"content"},t._l(t.marketDataKey,(function(e,i){return n("div",{key:i,staticClass:"row",class:t.getPercentClass(e)},[n("div",{staticClass:"left"},[n("p",{staticClass:"currency"},[t._v(" "+t._s(e.base_currency)+" "),n("span",{staticClass:"currency-tips"},[t._v(" /"+t._s(e.quote_currency)+" ")])]),n("p",{staticClass:"tips"},[t._v(" "+t._s(t.$t("market.24time"))+" "+t._s(t.$n(t.BigNumber(e.quote_price).times(e.trans_amount).toNumber(),"currency"))+" ")])]),n("div",{staticClass:"text-center center"},[n("p",{staticClass:"price"},[t._v(t._s(e.quote_price))]),n("p",{staticClass:"cny"},[t._v(" "+t._s(t.$n(t.BigNumber(e.cny_price).toNumber(),"currency"))+" ")])]),n("div",{staticClass:"text-right right"},[n("div",{staticClass:"text-center box"},[t._v(" "+t._s(t.getPercentText(e))+" ")])])])})),0)],1)},a=[],s=(n("99af"),n("d81d"),n("b64b"),n("e7e5"),n("d399")),r=(n("96cf"),n("1da1")),c=n("5530"),o=(n("c3a6"),n("ad06")),l=n("981c"),u=n("e870"),f=n("2f62"),d=n("901e"),h=n.n(d),v=n("cf88"),g=n.n(v),A=n("1ec9"),m=n.n(A),p=n("c9bb"),k=n.n(p),b={name:"market",components:{Header:l["a"],VanIcon:o["a"]},data:function(){return{sort:g.a,sortUp:m.a,sortDown:k.a,tickersList:[],timerout:"",msgsKeys:[],BigNumber:h.a}},computed:Object(c["a"])(Object(c["a"])({},Object(f["e"])({ticker_price:function(t){return t.home.ticker_price},marketData:function(t){return t.home.marketData}})),{},{marketDataKey:function(){return this.marketData},typeList:function(){return[{name:1,value:this.$t("market.type1")},{name:2,value:this.$t("market.type2")},{name:3,value:this.$t("market.type3")},{name:4,value:this.$t("market.type4")},{name:5,value:this.$t("market.type5")}]},currencyList:function(){return["DCEP","HUSD","BTC","ETH"]}}),activated:function(){this.init()},deactivated:function(){},methods:Object(c["a"])(Object(c["a"])({},Object(f["c"])({GetTotalEarnings:"mine/GetTotalEarnings",sendSocketMsg:"home/sendSocketMsg",setReceiveFun:"home/setReceiveFun"})),{},{init:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["q"])();case 2:n=e.sent,n&&1===n.status&&(t.tickersList=n.data,t.msgsKeys=Object.keys(n.data).map((function(t){return n.data[t].symbol})));case 4:case"end":return e.stop()}}),e)})))()},getSocket:function(){var t=this,e=function(e){e.data&&e.data.symbol&&(console.log(e.data.symbol),t.$set(t.marketData,e.data.symbol,e.data),console.log(t.marketData))};this.setReceiveFun(e);var n={msgs:this.getMsgs(),timeout:1e4};this.sendSocketMsg(n)},getMsgs:function(t){return this.msgsKeys.map((function(e){return{key:"ticker_".concat(e).concat("cancel"===t?"_cancel":""),ts:(new Date).getTime()}}))},socketClose:function(){var t=this.getMsgs("cancel");this.sendSocketMsg(t)},HandleHeaderClik:function(){Object(s["a"])(this.$t("common.pleaseExpected"))},toLine:function(t){this.$router.push({path:"kLine",query:t})},timer:function(){var t=this;clearInterval(this.timerout),this.timerout=setInterval((function(){Object(u["q"])().then((function(e){e&&1===e.status&&(t.tickersList=e.data)}))}),3e5)},getPercent:function(t){return(t.quote_price-t.open)/t.open*100||0},getPercentText:function(t){var e=t.chg;return 0==e?"0.00%":(e>0?"+":"")+e+"%"},getPercentClass:function(t){var e=t.chg;return e<0?"down":e>0?"up":void 0}})},x=b,C=(n("4903"),n("2877")),y=Object(C["a"])(x,i,a,!1,null,"1b6f6969",null);e["default"]=y.exports},"872e":function(t,e,n){"use strict";var i=n("d352"),a=n.n(i);a.a},"8a0b":function(t,e,n){},"981c":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-wrapper"},[n("van-nav-bar",{attrs:{title:t.title,"left-text":t.leftText,"right-text":t.rightText,"left-arrow":t.leftArrow},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight},scopedSlots:t._u([{key:"title",fn:function(){return[t.title?n("span",[t._v(t._s(t.title))]):t._t("title")]},proxy:!0},{key:"right",fn:function(){return[t.rightText?n("span",[t._v(t._s(t.rightText))]):t._t("right")]},proxy:!0},{key:"left",fn:function(){return[t.leftText?n("span",[t._v(t._s(t.leftText))]):t._t("left")]},proxy:!0}],null,!0)})],1)},a=[],s=(n("5246"),n("6b41")),r={name:"Header",components:{VanNavBar:s["a"]},props:{title:{type:String,default:function(){return"标题"}},leftText:{type:String,default:function(){return""}},rightText:{type:String,default:function(){return""}},leftArrow:{type:Boolean,default:function(){return!0}}},data:function(){return{}},methods:{onClickLeft:function(){this.$router.go(-1),this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")}}},c=r,o=(n("872e"),n("2877")),l=Object(o["a"])(c,i,a,!1,null,null,null);e["a"]=l.exports},c9bb:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAeCAYAAADHJYVoAAACOUlEQVRIx+2Wv09TURTHv9/bBvueKYNdWGUwYJEgCQac+AckDJ3ARAcNxB9xEI1jNxrEwZgI0ZhoYp2YIE4sLBSVBF8KzxITcDAmLrg0tNj03a+DLgZLX21Hvuu955N7v+fcew4RUh/8Lx02KPebiLNxIXn6e5gYE2ZTLl8Yq1ZKO0Ggt9VKaSeXL4w1DZdkcp4/rcBmBbgAIMBVYLM5z5+WdGQ8ay1sb2/HfxwEWQmXagYTS6dikfGurq5iaPh6/nNnxVYXISXr3p3020x0ZKD3zG5d+NrHwrCgBUGJsMkmuEcwNXS+e6Wm52ueP2lhlxsB/86DEhZ2ec3zJw+dXFL0nVd4bKEbaFIGfDrY132HZJUAkPP8eQkTaJFIPLvYl5wwkozAK2itrkoyhqSF9K2VZAlfSVoDABHDywQ+kVRzdlAkt4zBOI51rMaqBwB675cGbaAXELsBsQmcSPkkr+Vn3fcGAGyA1xDONgcGAFFCjxWyAMB0WmahWN6HFGudH6yk4o5j0mlaiq9a67VeptN/nn+iPXYLxsy1hGzMXCLu3jzUiXru7k8SfCIp+h//SlXQ7a1HJ+drtrm+qfJwVXYBQqIBH/aiNClv1lmp26DPPTjoRCVYFJAMUcs+2iIjm5nYbqi5ZTMT222PukMgl+p4sdQedYf+BT5yKFqdYTEVd0ZJZmp4nEnFndHVGRYbHor+smmqPAar54JcgiUYXt+cdd6Eev5hNHBPHQf42R/DiY31hww1iP4CMgzqMR1egWQAAAAASUVORK5CYII="},cf88:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAeCAYAAADHJYVoAAAB2UlEQVRIx+1Wv2tTYRQ950sQDbjYRRAHHSTJkyYKSl+n/gM6ObWCDkqDP3AVnKWuItiiCArGqZPi1MXpvaqgr8GXBKE6iOCiixAlvHePg1LEGvtiXjv1rN93D/c7997vHiIjXsTv91r67agr7Hp13DvwKUuMy3IpaHWmk35vNU31NOn3VoNWZ3pkckkuiOI5pdYUUAIAASWl1gyieE7SP+M56KDb7e7+8j1tSjgxMJh4smdnYaZcLn/NTP6y9fZg35LHkLwN307GO1zx5LHxQ+82JA9fd6YELQoay1psgp8JnvKPVJ4N1DyM4obBloYh/lkHjRlsKYzixrrMJRWXo85Ngy5gRDjw9kS9coVkQgAIonhBwixyAok7k3Vv1klyAs8gX5yV5BxJg/QxT2YJH0iaA4CC42kCbZIaTQ6K5BvnMINtbGO47gGA5ZX2hJnugaxI4iitCCAmdc6vec8dAKSmhwKqoxD/+qMo6bAZmgDgJDmQ+3KVg9i/Nv6EHuQs9/218fdr1UsA53PKe96vVS+u20RhFDdMuAWg+B+siSMu+3VvYUvW3NYu6E23Fr+bonClfV3C1b8Q3/Br1WskbWhT9KedQ2p3BZQI9FBw5yfHK48yjf9mGdEfsmDzijFAM4QAAAAASUVORK5CYII="},d352:function(t,e,n){}}]);
//# sourceMappingURL=chunk-02983fba.fa76b709.js.map