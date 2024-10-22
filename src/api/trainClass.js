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
