<template>
  <div class="signal" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"   @click="togg_erts">
    <div id="mask"></div>
    <div
      class="side-bar"
      :class="bg_className"
      :ref="signal_id"
      :style="cssVariables"
    ></div>
    <div class="right-panel">
      <div class="signal-name" :class="col_className">{{ signal_name }}</div>
      <div class="signal-value" :class="col_className">{{ signal_value }}</div>
      <div class="delete">
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          fill="currentColor"
          width="1em"
          height="1em"
          data-icon="delete"
          aria-hidden="true"
        >
          <path
            d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    signal_name: String,
    signal_id: Number,
    signal_value: Number,
    color: String,
  },
  data() {
    return {
      bg_className: "",
      col_className: "",
    };
  },
  computed: {
    cssVariables() {
      return {
        "--color": this.color,
      };
    },
  },
  methods: {
    // 组件内单机
    togg_erts() {
      // 亮度 togg
      // let i = signal_id
      if (this.bg_className === "") {
        this.bg_className = "side-bar_filter";
        this.col_className = "right-panel_filter";
      } else {
        this.bg_className = "";
        this.col_className = "";
      }
      // 传递昵称
      this.$emit("erts-click", this.signal_name);
    },
    // 组件外多昵称 传递
    togg_names(bol) {
      // 亮度 togg
      //   if (!bol) {
      if (this.bg_className === "") {
        this.bg_className = "side-bar_filter";
        this.col_className = "right-panel_filter";
      } else {
        this.bg_className = "";
        this.col_className = "";
      }
      // 传递昵称
      //   this.$emit("erts-click", this.signal_name);
    },
    // 明确 所以显示/隐藏
    all_togg(bol) {
      if (bol) {
        this.bg_className = "";
        this.col_className = "";
      } else {
        this.bg_className = "side-bar_filter";
        this.col_className = "right-panel_filter";
      }
    },
    // 鼠标移入
    onMouseEnter(){
        // console.log('鼠标移入',this.signal_name);
        this.$emit('opac-click',this.signal_name,1)
    },
    // 鼠标移出
    onMouseLeave(){
        // console.log('鼠标移出',this.signal_name);
        this.$emit('opac-click',this.signal_name,0)

    },
  },
};
</script>

<style lang="less" scoped>
.signal {
  background-color: #242a3b;
  height: 5dvh;
  width: 11dvw;
  display: flex;
  border-radius: 2px;
  position: relative;

  #mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* 半透明黑色 */
    z-index: 1000;
    /* 确保遮罩在最前面 */
    display: none;
    /* 初始状态隐藏 */
  }

  .side-bar {
    width: 4px;
    height: 5dvh;
    background-color: var(--color);
    margin-right: 0.3dvw;
    flex: 0 0 auto;
  }
  .side-bar_filter {
    filter: brightness(60%);
  }
  .right-panel_filter {
    color: #4e5464 !important;
  }
  .right-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.3vh;

    .signal-name {
      color: #ffffff8c;
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .signal-value {
      color: white;
      font-size: 0.8dvw;
    }

    .delete {
      color: red;
      font-size: 14px;
      position: absolute;
      right: 8px;
      bottom: 2px;
      cursor: pointer;
      visibility: hidden;
    }
  }
}

.signal:hover .delete {
  visibility: visible;
}
</style>
