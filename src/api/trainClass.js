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
// 获取信号量echarts图显示数据

export function signalVal(trainNum, code, startTime, endTime, isTop1) {
  return request({
    url: "/Train/SignalVal",
    method: "get",
    params: {
      trainNum,
      code,
      startTime,
      endTime,
      isTop1,
    },
  });
}

// 获取电路图数据
export function SignalVal(trainValue) {
  return request({
    url: "/Train/SignalVal",
    method: "get",
    params: {
      trainNum: trainValue,
      isTop1: true,
      // startTime: "2024-10-25 14:00:00",
      // endTime: "2024-10-25 14:01:00",
    },
  });
}
