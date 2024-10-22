import request from "@/api/service";

export function indicatorInfo(trainId, trainNum) {
  return request({
    url: "/TrainDevice/AllDeviceSignal",
    method: "get",
    params: {
      trainId: trainId,
      trainNum: trainNum,
    },
  });
}
// 获取电路图数据
export function SignalVal() {
  return request({
    url: "/Train/SignalVal",
    method: "get",
    params: {
      trainNum:1,
      isTop1:true
    },
  });
}











