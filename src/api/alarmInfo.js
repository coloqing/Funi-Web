import request from "@/api/service";

export function getLines() {
  return request({
    url: "/lines",
    method: "get",
  });
}

export function getTrains(lineId) {
  return request({
    url: "/train",
    method: "get",
    params: {
      lineId: lineId,
    },
  });
}

export function getAlarmList(page, pagesize) {
  return request({
    url: "/FaultWarn",
    method: "get",
    params: {
      pageIndex: page,
      pageRow: pagesize,
    },
  });
}
