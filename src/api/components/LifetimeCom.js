import request from "@/api/service";
// 获取 寿命
export function getPartsLife(query) {
  return request({
    url: "/Train/GetPartsLife",
    method: "get",
    params:query
  });
}




















