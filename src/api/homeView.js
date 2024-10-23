import request from "@/api/service";
// 获取故障预警信息
export function getFaultWarn(data) {
    return request({
      url: "/FaultWarn",
      method: "get",
      params: data,
    });
  }
// 获取 辅变系统
export function getTrainStateCount(data) {
    return request({
      url: "/Train/TrainStateCount",
      method: "get",
      // params: data,
    });
  }
  // 获取top10 echarts图
export function getTop10(data) {
    return request({
      url: "/FaultWarn/Number/Top10",
      method: "get",
      params: data,
    });
  }
  // 获取历史预警分布统计 echarts图
export function getCyc(data) {
    return request({
      url: "/FaultWarn/Number/Cyc",
      method: "get",
      params: data,
    });
  }
  // 获取故障预警统计 echarts图
export function getFaultWarnAdd(data) {
    return request({
      url: "/FaultWarn/Number",
      method: "get",
      params: data,
    });
  }
  












