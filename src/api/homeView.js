import request from "@/api/service";
// 获取故障预警信息
export function getFaultWarn(data) {
    return request({
      url: "/FaultWarn",
      method: "get",
      params: data,
    });
  }
  // 获取top10 echarts图
export function getTop10(data) {
    return request({
      url: "/FaultWarn/Number/Top10",
      method: "get",
      // params: data,
    });
  }
  












