import request from "@/api/service";

export function getState(token) {
  return request({
    url: "/train/state",
    method: "get",
  });
}
