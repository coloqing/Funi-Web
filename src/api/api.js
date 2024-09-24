const Mock = require("mockjs");

export function test() {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|1-10": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
      },
    ],
  });
  return Mock.mock("@paragraph(1, 3)");
}

export function getLineTrains() {
  var data = Mock.mock({
    "array|20": [
      {
        "number|+2002": 11001002,
      },
    ],
  });

  return data;
}
