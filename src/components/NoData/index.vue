<template>
  <van-empty :image="emptyIcon" :description="descriptionComputed" />
</template>

<script>
import { Empty as VanEmpty } from "vant"
import emptyIcon from "@/assets/icons/empty_icon.png"

export default {
  components: {
    VanEmpty,
  },
  props: {
    description: {
      type: String,
      default: "",
    },
  },
  computed: {
    descriptionComputed() {
      return this.description || this.$t("mine.activateMiner.noRecord")
    },
  },
  data() {
    return {
      emptyIcon,
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style scoped>
</style>