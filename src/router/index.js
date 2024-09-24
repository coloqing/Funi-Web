import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TrainClass from "../views/TrainClass.vue";
import failureAnalysis from "../views/failureAnalysis.vue";
import Test from "../views/Test.vue";
import AlarmInfo from "@/views/AlarmInfo.vue";
import HomePic from "@/views/HomePic.vue";
import TrainPic from "@/views/TrainPic.vue";

Vue.use(VueRouter);

const routes = [
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
