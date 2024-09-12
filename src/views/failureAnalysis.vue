<template>
  <div class="failure_analysis">
    <!-- 页面统一结构 -->
    <!-- 顶部 -->
    <div class="failure_title">
      <!-- logo -->
      <div class="failure_Tleft">
        <div class="logo"></div>
        <div class="title font_size26w">
          <img class="menu" src="../../public/img/menu.png" />
          <div>运营管理</div>
          <div class="icon">/</div>
          <div>实时检查</div>
          <div class="icon">/</div>
          <div>历史分析</div>
        </div>
      </div>
      <!-- icon -->
      <div class="failure_Tright font_size26w">我是icon</div>
    </div>
    <!-- 内容区 -->
    <div class="failure_content">
      <!-- 侧边栏 -->
      <div class="failure_sidebar font_size20">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="index.toString()"
              v-for="(item, index) in menu_list"
              :key="index"
            >
              <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.Level1 }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group
                v-for="(item2, i) in item.Level2"
                :key="index + '_' + i"
              >
                <el-menu-item :index="`${index}_${i}`"   @click="handleSelect(item2)">{{
                  item2
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <!-- 版本库 -->
        <div class="version font_size20">
          <div>版本号</div>
          <div>V1.0.1</div>
        </div>
      </div>
      <!-- 故障列表、故障详情 -->
      <div class="failure_details">
        <div class="fault_list">
          <div class="fault_list_content font_size20">故障list</div>
          <div class="padding"></div>
        </div>
        <div class="fault_analyse font_size20">故障分析</div>
      </div>
    </div>

    <!-- <train /> -->
  </div>
</template>
<script>
// import train from '../components/train.vue'

export default {
  name: "failureAnalysis",
  comments: {
    //   train
  },
  data() {
    return {
      // 一级二级菜单列表
      menu_list: [
        {
          Level1: "运营管理",
          icon: "icon-yunying",
          Level2: ["选项一", "选项二", "选项三"],
        },
        { Level1: "健康管理", icon: "icon-jiankangguanli", Level2: [] },
        { Level1: "维护管理", icon: "icon-wrench-fill", Level2: [] },
        { Level1: "历史数摞", icon: "icon-lishishuju", Level2: [] },
        { Level1: "智能分析", icon: "icon-zhinengfenxi", Level2: [] },
        { Level1: "规则引擎", icon: "icon-icon_guizeyinqing", Level2: [] },
        { Level1: "知识库", icon: "icon-a-zhishiku-011", Level2: [] },
        { Level1: "系统设置", icon: "icon-xitongshezhi", Level2: [] },
        { Level1: "个人设置", icon: "icon-jiankangguanli", Level2: [] },
      ],
    };
  },
  methods: {
    //打开菜单
    handleOpen( key, keyPath) {
      console.log("Menu item opened:", key, keyPath);
      // 这里可以添加打开菜单项时的逻辑
    },
    // 关闭菜单
    handleClose(key, keyPath) {
      console.log("Menu item closed:", key, keyPath);
      // 这里可以添加关闭菜单项时的逻辑
    },
    // 点击二级菜单
    handleSelect(click){
        console.log('被点击的对象',click)
    }
  },
};
</script>
<style scoped lang="less">
.failure_analysis {
  height: 100%;
  width: 100%;
  // background-color: pink;
  color: white;

  //   顶部通栏
  .failure_title {
    height: 6.3%;
    width: 100vw;
    background-color: #111c37;
    display: flex;
    justify-content: space-between;

    // logo
    .failure_Tleft {
      display: flex;

      // logo
      .logo {
        width: 10.48vw;
        background-image: url(../../public/img/logo.png);
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: 50%;
      }

      .title {
        width: 40vw;
        display: flex;
        align-items: center;

        .menu {
          width: 2vw;
          height: 2vw;
          margin-right: 1vw;
          cursor: pointer;
        }

        > div {
          line-height: 1vw;
          cursor: pointer;
        }

        .icon {
          margin: 0 0.5vw;
          cursor: context-menu;
        }

        // background-color: aquamarine;
      }
    }

    // icon
    .failure_Tright {
      width: 40vw;
      background-color: aqua;
    }
  }

  // 内容区
  .failure_content {
    height: 93.7%;
    width: 100vw;
    background-color: #0a111d;
    display: flex;

    // 侧边栏
    .failure_sidebar {
      width: 10.48vw;
      height: 80%;
      // background-color: pink;
      background: linear-gradient(to bottom, #101b36 75%, #060a11);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .version {
        display: flex;
        justify-content: space-evenly;
      }
    }

    // 故障列表、故障详情
    .failure_details {
      width: 89.52vw;
      height: 100%;
      // background-color: rgb(66, 145, 145);
      box-sizing: border-box;
      padding: 1vw;
      display: flex;

      // 故障列表
      .fault_list {
        width: 42.3%;
        background-color: purple;
        display: flex;

        .fault_list_content {
          width: 100%;
        }

        .padding {
          width: 1vw;
          background-color: #0a111d;
        }
      }

      // 故障分析
      .fault_analyse {
        width: 57.7%;
        background-color: plum;
      }
    }
  }
}
</style>

<style>
/* 侧边栏 */
.failure_sidebar .el-submenu__title {
  background-color: #101b36 !important;
}

.failure_sidebar .el-menu {
  border: 0;
  background-color: #101b36 !important;
}

.failure_sidebar .el-submenu__title {
  padding-left: 2vw !important;
  padding: 0 1.5vw;
}

.el-menu-item,
.failure_sidebar .el-submenu__title {
  height: 3vw;
  line-height: 3vw;
  font-size: 1vw;
}

.failure_sidebar .el-submenu [class^="el-icon-"],
.iconfont {
  vertical-align: middle;
  margin-right: 0.3vw;
  width: 1.5vw;
  text-align: center;
  font-size: 0.8vw;
}

.failure_sidebar .el-submenu .el-menu-item {
  min-width: auto;
  background-color: #101b36 !important;
}

/* icon */
.failure_sidebar .el-submenu {
  font-size: 1vw;
}

/* 下拉icon */
.failure_sidebar .el-submenu__icon-arrow {
  font-size: 0.9vw;
}

.failure_sidebar .el-submenu__icon-arrow {
  right: 1vw;
}

.failure_sidebar .el-dropdown-menu__item,
.el-menu-item {
  font-size: 1vw;
}

/* 二级菜单 */
.el-submenu .el-menu-item {
  padding-left: 1vw !important;
  height: 3.5vh;
  line-height: 3.5vh;
  padding: 0 3vw;
  min-width: auto;
  font-size: 1vw;
}
.el-submenu__icon-arrow {
  margin-top: 0px;
}
.el-menu-item-group__title {
  padding: 0px;
}
</style>
