import request from "@/api/service";
// 获取线路号
export function getLines() {
  return request({
    url: "/lines",
    method: "get",
  });
}
// 获取列车号
export function getTrains(lineId, page, pagesize) {
  return request({
    url: "/train",
    method: "get",
    params: {
      lineId: lineId,
      pageIndex: page,
      pageRow: pagesize,
    },
  });
}

export function getAlarmList(
  lineValue,
  trainValue,
  stateValue,
  st,
  et,
  alarmNameValue,
  alarmTypeValue,
  page,
  pagesize
) {
  return request({
    url: "/FaultWarn",
    method: "get",
    params: {
      lineId: lineValue,
      trainNum: trainValue,
      state: stateValue,
      alarmName: alarmNameValue,
      alarmType: alarmTypeValue,
      pageIndex: page,
      pageRow: pagesize,
      startTime: st,
      endTime: et,
    },
  });
}

// 故障预警导出
export function faultWarnExcel(data) { 
  return request({
    url: "/FaultWarn/excel",
    method: "get",
    responseType: 'blob',
    params:data
  });
}
// 关键数据 导出
export function trainExcel(data) {
  return request({
    url: "/Train/excel",
    method: "get",
    responseType: 'blob',
    params:data

  });
}


