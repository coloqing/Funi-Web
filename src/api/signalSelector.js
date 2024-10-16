import request from "@/api/service";

export function getSignals(page, pagesize) {
  return request({
    url: "/signal",
    method: "get",
    params: {
      pageIndex: page,
      pageRow: pagesize,
    },
  });
}
