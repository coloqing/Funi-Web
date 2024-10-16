import request from "@/api/service";

export function getFaultWarn(data) {
    return request({
      url: "/FaultWarn",
      method: "get",
      params: data,
    });
  }
  












