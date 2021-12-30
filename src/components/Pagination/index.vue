<!--
  vant分页组件 二次封装
  props:
  finishedText{
    type: String,
    default: '没有更多了'
  },
  data: {
    default: Object
  },

  调用：
  html:
    <pagination :data="pageData" @getList="getList" @returnList="returnList" showLoadingWhenActivated listName="row">
      内容...
    </pagination>

    data： 接口返回的对象数据，包含属性
      pageNum 页码，
      pageSize 页条数，
      list 当前页面数据，
      total 总条数
    getList：请求分页数据函数 getList({pageSize: x, pageNum: x}),
    returnList： 返回请求过的总数据,
    showLoadingWhenActivated： activated的时候是否显示加载状态，Boolean 默认false
    listName： 列表数组字段 String 默认 list

  js:
    async getList(param) {
      this.pageSize = param && param.pageSize || 10
      this.pageNum = param && param.pageNum || 1
      const params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      const res = await list(params)
      // pageData见上面data说明
      this.pageData = res （或 this.pageData = Object.assign({}, res, params)）
    },
    returnList(list) {
      this.list = list
    }
    示例仅供参考，以实际返回参数进行调整
-->
<template>
  <van-pull-refresh
    v-model="loading"
    @refresh="getData(0)"
    :pulling-text="$t('common.pullText')"
    :loosing-text="$t('common.loosText')"
    :loading-text="$t('common.loadText')"
  >
    <van-list
      v-model="bottomLloading"
      :finished="finished"
      :finished-text="finishedTextComputed"
      offset="100"
      @load="getData"
    >
      <slot />
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { PullRefresh as VanPullRefresh, List as VanList } from "vant";
export default {
  name: "pagination",
  components: { VanPullRefresh, VanList },
  props: {
    finishedText: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    showLoadingWhenActivated: {
      type: Boolean,
      default: false
    },
    listName: {
      type: String,
      default: "list"
    }
  },
  computed: {
    finishedTextComputed() {
      return this.finishedText || this.$t("common.noMore");
    }
  },
  data() {
    return {
      loading: true,
      bottomLloading: true,
      // 数据加载结束 到底了
      finished: false,
      pageNum: 1,
      pageSize: 10,
      list: []
    };
  },
  watch: {
    data: {
      handler(data) {
        this.loading = false;
        this.bottomLloading = false;

        this.pageNum = data.pageNum;
        this.pageSize = data.pageSize;
        if (data.pageNum > 1) {
          this.list = this.list.concat(data[this.listName]);
        } else {
          // 请求第1页 下拉刷新
          this.list = data[this.listName];
          this.finished = false;
        }
        console.log(this.list);
        // 末页
        if (data.pageNum * data.pageSize >= data.total) {
          this.finished = true;
        }
        this.$emit("returnList", this.list);
      },
      deep: true
    }
  },
  activated() {
    // 激活组件的时候显示加载状态
    if (this.showLoadingWhenActivated) {
      this.bottomLloading = true;
    }
    this.finished = false;
  },
  mounted() {},
  methods: {
    // 获取数据
    getData(pageNum) {
      if (pageNum || pageNum === 0) {
        this.pageNum = pageNum;
      }
      if (pageNum === 0) {
        this.loading = true;
      } else {
        this.bottomLloading = true;
      }

      // 异步更新数据
      this.$emit("getList", {
        pageSize: this.pageSize,
        pageNum: this.pageNum + 1
      });
    }
  }
};
</script>
