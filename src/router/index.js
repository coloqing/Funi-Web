import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TrainClass from "../views/TrainClass.vue";
import failureAnalysis from "../views/failureAnalysis.vue";
import Test from "../views/Test.vue";
import AlarmInfo from "@/views/AlarmInfo.vue";
import HomePic from "@/views/HomePic.vue";
import TrainPic from "@/views/TrainPic.vue";
// import Background from "@/views/Background.vue";

Vue.use(VueRouter);

const routes = [
// 后台
// {  
//   path: '/',  
//   component: Layout,  
//   redirect: '/dashboard',  
//   children: [  
//     // {  
//     //   path: "/Background",
//     //   name: "Background",
//     //   component: Background,
//     //   meta: { title: 'Dashboard', icon: 'dashboard' }  
//     // },  
//   ]  
// },  
// 其他非布局路由

  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/TrainClass",
    name: "TrainClass",
    component: TrainClass,
  },
  {
    path: "/failureAnalysis",
    name: "failureAnalysis",
    component: failureAnalysis,
  },
  {
    path: "/Test",
    name: "Test",
    component: Test,
  },
  {
    path: "/AlarmInfo",
    name: "AlarmInfo",
    component: AlarmInfo,
  },
  {
    path: "/HomePic",
    name: "HomePic",
    component: HomePic,
  },
  {
    path: "/TrainPic",
    name: "TrainPic",
    component: TrainPic,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
