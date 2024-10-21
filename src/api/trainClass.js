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
