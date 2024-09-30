<template>
  <canvas ref="circuit_fig"></canvas>
</template>

<script>
export default {
  methods: {
    // 渲染电路图 （广三）
    fun_circuitFig1(w, h, x, y) {
      // 画布宽度 高度 圆心坐标x y
      // 电压表
      var ammeter = new Image();
      ammeter.src = "./img/canvas/ammeter.png";
      // 电感器
      var Inductors = new Image();
      Inductors.src = "./img/canvas/Inductors.png";
      // 电阻
      var resistance = new Image();
      resistance.src = "./img/canvas/resistance.png";
      // 传感器
      var sensor = new Image();
      sensor.src = "./img/canvas/sensor.png";

      // const ctx = this.$refs.circuit_fig;
      const ctx = this.$refs.circuit_fig.getContext("2d");
      const canvas = this.$refs.circuit_fig;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = 1600 * ratio; // 实际渲染像素
      canvas.height = 800 * ratio; // 实际渲染像素
      canvas.style.width = `${w}px`; // 控制显示大小
      canvas.style.height = `${h}px`; // 控制显示大小
      // 文本
      ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.fillStyle = "#95979d"; // 设置文本颜色
      // 文本 输入接触EEB
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      // 各个点的名称
      // ======================================
      // 绘制线的颜色
      ctx.strokeStyle = "white";
      // 默认配置
      ctx.lineCap = "butt";
      // 圆的半径，即小圆点的大小
      var radius = 5;
      // 圆右边起点 圆心 + 半径
      var center_r = x + radius;
      // 电子元件宽度高度
      var electronic_w = 40;
      var electronic_h = 40;
      // ===================================
      // 开始绘制 电路图左边区域 =========区域1==========
      ctx.beginPath();
      // 圆1
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      // 绘制圆形
      ctx.stroke();
      // DC文本间距
      var DC_jianju = 40;
      // DC1500V+  汉字 12   大写字母 8   数字 5
      ctx.fillText(
        "DC1500V+",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        y - DC_jianju
      );
      // 虚线1
      ctx.beginPath();
      // 起点
      ctx.moveTo(center_r, y);
      // 终点
      // 虚线1 终点
      var dashed1 = center_r + 320;
      ctx.lineTo(dashed1, y);
      // 虚线的配置
      ctx.setLineDash([10,3]);
      ctx.stroke();
      // 电感器 水平移动距离
      var Inductors_level = center_r + 90;
      // ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      // ctx.fillStyle = "#95979d"; // 设置文本颜色
      // // 文本 输入接触EEB
      // ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 7.33  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        "输入接触器B",
        Inductors_level + electronic_w / 2 - (12 * 4 + 7.33 * 3) / 2,
        y + 40
      );
      // 传感器 水平移动距离
      var sensor_level = center_r + 180;
      // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.font = "12px Arial";
      // 设置文本颜色
      ctx.fillStyle = "#95979d";
      // 文本 输入电压传感器
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // 图片中心位置 - 文本中心位置
        "输入电流传感器",
        sensor_level + electronic_w - (12 * 7 + 7.33 * 0) / 2,
        y + electronic_h
      );
      // 圆心 + 图片高度 + 文本行高 + 1
      ctx.fillText(
        "--A",
        sensor_level + electronic_w - (12 * 1 + 7.33 * 1) / 2,
        y + electronic_h + 14
      );

      // 圆2
      // 重新修改为实线
      ctx.setLineDash([]);
      ctx.beginPath();
      // 圆2 的圆心y坐标
      var center_r2_y = y + 150;
      ctx.arc(x, center_r2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // DC1500V+
      ctx.fillText(
        "DC1500V-",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        center_r2_y + DC_jianju
      );
      // 虚线2
      var dashed2 = center_r + 320;
      ctx.beginPath();
      ctx.moveTo(center_r, center_r2_y);
      ctx.lineTo(dashed2, center_r2_y);
      ctx.setLineDash([10,3]);
      ctx.stroke();

      // 虚线3
      ctx.beginPath();
      ctx.moveTo(x + 30, y);
      ctx.lineTo(x + 30, center_r2_y);
      ctx.setLineDash([10,3]);
      ctx.stroke();
      // 电压表 水平移动距离
      var ammeter1_level = x + 30;
      // 电压表 垂直移动距离
      var ammeter1_vertical = center_r2_y;
      // 文本 电压 --v
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // （圆心点 + 移动距离 -图片宽度一半 ）- 文本长度 - 一丢丢距离
        "网压",
        ammeter1_level - electronic_w / 2 - (12 * 2 + 7.33 * 0) - 5,
        center_r2_y - (center_r2_y - y) / 2 - 6
      );
      // console.log("圆点2的圆心", center_r2_y);
      ctx.fillText(
        "--v",
        ammeter1_level - electronic_w / 2 - (12 * 1 + 7.33 * 1) - 5,
        center_r2_y - (center_r2_y - y) / 2 + 6
      );
      // 矩形
      ctx.setLineDash([]);
      ctx.beginPath();
      // 矩形超出的距离
      var rectangle_overflow = 15;
      // 矩形的宽度
      var rectangle_w = dashed1 + 100;
      // 矩形的高度
      // var rectangle_h = 150;
      ctx.moveTo(dashed1, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed1, y - rectangle_overflow);
      ctx.stroke();
      // 斜杠
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.stroke();
      var rectangle_jianju = 10;
      // HVM模块
      ctx.fillText(
        "输入变换器",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 1 + 7.33 * 3 + 5 * 5) / 2,
        y - rectangle_overflow - rectangle_jianju
      );
      // ----°c
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju
      );
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju + 12 * 1.2
      );
      // DC  AC
      ctx.fillText(
        "DC",
        dashed1 + 12 * 1,
        (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
          (y - rectangle_overflow)
      );
      // AC
      ctx.fillText(
        "AC",
        rectangle_w - 12 * 2,
        center_r2_y +
          rectangle_overflow -
          (y - rectangle_overflow) -
          (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
          (y - rectangle_overflow)
      );

      //线圈
      ctx.setLineDash([10,3]);
      // 线圈长度
      var coil_w = rectangle_w + 60;
      var coil_h = 30;
      // 线圈1
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y);
      ctx.lineTo(coil_w, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y + coil_h);
      ctx.lineTo(coil_w, y + coil_h);
      ctx.stroke();
      //弧形 (x,y,半径,弧度,是否对称)
      // 弧的半径
      var arc_r = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(coil_w, y + arc_r, arc_r, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 线圈2
      ctx.setLineDash([10,3]);
      // bott
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y);
      ctx.lineTo(coil_w, center_r2_y);
      ctx.stroke();
      // top
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y - coil_h);
      ctx.lineTo(coil_w, center_r2_y - coil_h);
      ctx.stroke();
      //弧形
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 系统电路图（广三东延） 左边区域绘制结束（不包括图片）
      // 开始绘制 电路图右上边区域 =========区域2==========
      // 左手边为区域2 原点(线圈1 左上角)
      // ==========线圈1 + 线圈2==========
      // 弧
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = y + arc_r;
        } else {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = center_r2_y - coil_h + arc_r;
        }
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 2,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 4,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.stroke();
        // 弧虚线top1.1
        ctx.setLineDash([10,3]);
        // 长度
        var coil_xu_top1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y - arc_r);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r);
        ctx.stroke();
        // 弧虚线bott1.1
        // 长度
        var coil_xu_bott1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(coil_xu_bott1_1, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
        // ======半导体top======
        ctx.setLineDash([]);
        // 宽度
        var diode_img_w = 50;
        // 超出部分
        var diode_img_h = 10;
        // 矩形
        ctx.beginPath();
        ctx.moveTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y - arc_r - diode_img_h
        );
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y + (arc_r + 1) * 4 + diode_img_h
        );
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y + (arc_r + 1) * 4 + diode_img_h);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.stroke();
        // 半导体图标（二极管）
        // 二极管 顶点坐标
        if (i === 0) {
          var erjg_y = y;
        } else {
          var erjg_y = center_r2_y - coil_h;
        }
        var erjg_x = coil_xu_top1_1 + diode_img_w / 2;
        var erjg_h = 30;
        // 竖
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y);
        ctx.lineTo(erjg_x, erjg_y + erjg_h);
        ctx.stroke();
        // 横
        // 距离定点 的距离
        var top_erjg = 8;
        ctx.beginPath();
        ctx.moveTo(erjg_x - top_erjg, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg);
        ctx.stroke();
        // 三角形
        // 三角形高度
        var sjx_erjg = 15;
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x - top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x, erjg_y + top_erjg);
        ctx.stroke();
        // ==================
        // 弧虚线top1.2
        // 起点
        var hu_top1_2 = coil_xu_bott1_1 + diode_img_w;
        // 长度
        var hu_top1_2w = 50;
        ctx.setLineDash([10,3]);
        ctx.beginPath();
        // 弧虚线top1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y - arc_r);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y - arc_r);
        ctx.stroke();
        ctx.beginPath();
        // 弧虚线bott1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
      }
      // 顶部虚线
      // 原点坐标
      var top_xu_x = (hu_top1_2 + hu_top1_2w - hu_top1_2) / 2 + hu_top1_2;
      var top_xu_y = y;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(top_xu_x, top_xu_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 虚线
      // 虚线高度
      var top_xu_h = 60;
      var top_xu_w = 640;
      ctx.moveTo(top_xu_x, top_xu_y);
      ctx.lineTo(top_xu_x, top_xu_y - top_xu_h);
      ctx.lineTo(top_xu_x + top_xu_w, top_xu_y - top_xu_h);
      ctx.stroke();
      // 相电流传感器
      ctx.fillText(
        "U_DC_Out",
        top_xu_x + top_xu_w - (12 * 0 + 7.33 * (7 + 3) + 5 * 0),
        top_xu_y - top_xu_h + 12 * 1.3
      );
      // 传感器5
      // 图片中心位置
      // var sensor5_x = rectangle3_xu_x + rectangle3_xu_w -310
      var sensor6_y = top_xu_y - top_xu_h;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        top_xu_x + top_xu_w + radius,
        top_xu_y - top_xu_h,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // ===================顶部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle3_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      // var rectangle3_y = coil_rtop_y  - arc_r - diode_img_h
      var rectangle3_y = y - arc_r - diode_img_h;
      var rectangle3_w = 70;
      var rectangle3_h = 70;
      ctx.beginPath();
      ctx.moveTo(rectangle3_x, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle3_x + 12, rectangle3_y + 12 * 1.5);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle3_x + rectangle3_w - 12 * 2,
        rectangle3_y + rectangle3_h - 12
      );
      ctx.fillText(
        "充电机",
        (rectangle3_x + rectangle3_w - rectangle3_x) / 4 + rectangle3_x,
        rectangle3_y + rectangle3_h + 12
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.stroke();
      // 横向虚线1=============
      ctx.setLineDash([10,3]);
      // 虚线1起点
      var rectangle3_xu_x = rectangle3_x + rectangle3_w;
      // 往下移动距离
      var rectangle3_xu_ = 25;
      var rectangle3_xu_y = rectangle3_y + rectangle3_xu_;
      // 虚线长度
      var rectangle3_xu_w = 500;
      // 虚线1
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y);
      ctx.lineTo(rectangle3_xu_x + rectangle3_xu_w, rectangle3_xu_y);
      ctx.stroke();

      // 传感器6
      var sensor6_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      // 相电流传感器
      ctx.fillText("--A", sensor6_x + (electronic_w / 2) * 3, sensor6_y - 12);
      // 传感器5
      // 图片中心位置
      var sensor5_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      var sensor5_y = rectangle3_xu_y;
      // 相电流传感器
      ctx.fillText(
        "蓄电池充放电流传感器",
        sensor5_x + (electronic_w / 2) * 3,
        sensor5_y - 12
      );
      ctx.fillText("--A", sensor5_x + (electronic_w / 2) * 3, sensor5_y + 12);
      // 增加虚线1 和 虚线2 的宽度
      var jianju = 10;
      // 横向虚线2=============
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle3_xu_x + rectangle3_xu_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 电容器 图案
      // 左顶点坐标
      var capacitor_topX = rectangle3_xu_x + rectangle3_xu_w;
      var capacitor_topY = rectangle3_xu_y;
      var capacitor_bottX = rectangle3_xu_x + rectangle3_xu_w;
      var capacitor_bottY = rectangle3_xu_y + rectangle3_xu_ + jianju;
      // 矩形宽度
      var capacitor_w = 60;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w, capacitor_bottY);
      ctx.lineTo(capacitor_bottX, capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      // 底部
      //弧形
      var hu_radius = 4;
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 横
      ctx.beginPath();
      ctx.moveTo(capacitor_bottX, capacitor_bottY + hu_radius * 2);
      ctx.lineTo(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius * 2
      );
      ctx.stroke();
      // 顶部
      // 弧形
      var hu_radius2 = 7;
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 口
      // 高度
      var kou_h = 18;
      // ----------左
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2, capacitor_topY);
      ctx.lineTo(capacitor_topX + hu_radius2 * 2, capacitor_topY - kou_h);
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2,
        capacitor_topY - kou_h
      );
      ctx.lineTo(capacitor_topX + capacitor_w - hu_radius2 * 2, capacitor_topY);
      ctx.stroke();
      // 间距
      var kou_w = 5;
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2 + kou_w, capacitor_topY);
      ctx.lineTo(
        capacitor_topX + hu_radius2 * 2 + kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY
      );
      ctx.stroke();

      // 外部电极
      // 负极 左点坐标
      var fu_x_left = capacitor_topX + hu_radius2 - hu_radius2 / 2;
      var fu_y_left = capacitor_topY - hu_radius2;
      var fu_h_left = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x_left, fu_y_left);
      ctx.lineTo(fu_x_left, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fu_x_left + hu_radius2, fu_y_left);
      ctx.lineTo(fu_x_left + hu_radius2, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 正极 右点坐标
      var zheng_x_right =
        capacitor_topX +
        capacitor_w -
        hu_radius2 +
        hu_radius2 -
        hu_radius2 -
        hu_radius2 / 2;
      var zheng_y_right = capacitor_topY - hu_radius2;
      var zheng_h_right = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x_right, zheng_y_right);
      ctx.lineTo(zheng_x_right, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(zheng_x_right + hu_radius2, zheng_y_right);
      ctx.lineTo(zheng_x_right + hu_radius2, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      //       ctx.arc(capacitor_topX + capacitor_w - hu_radius2, capacitor_topY, hu_radius2, 0, -Math.PI, true);
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();

      // - +
      // 负极
      var fu_x = capacitor_topX + 5;
      var fu_y = (capacitor_topY - capacitor_bottY) / 2 + capacitor_bottY;
      var fu_w = 10;
      var fu_h = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y);
      ctx.stroke();
      // 正极
      var zheng_x = capacitor_topX + capacitor_w - 5;
      var zheng_y = fu_y;
      var zheng_w = 10;
      var zheng_h = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y);
      ctx.stroke();
      // ----°c
      ctx.fillText(
        "----°c",
        (capacitor_topX +
          capacitor_w -
          hu_radius2 -
          (capacitor_topX + hu_radius2)) /
          2 +
          (capacitor_topX + hu_radius2) -
          (12 * 0 + 7.33 * 1 + 5 * 4) / 2,
        capacitor_bottY + 12 * 2
      );
      /*
            // 矩形宽度
      var capacitor_w = 60
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w,capacitor_bottY);
      ctx.lineTo(capacitor_bottX,capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      */

      ctx.fillText(
        "DC+",
        capacitor_topX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_topY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );
      ctx.fillText(
        "DC-",
        capacitor_bottX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_bottY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );

      // ===================顶部电压表2=======================
      // 电压表1 左边圆心坐标
      var voltmeter_top1_x =
        (rectangle3_x + rectangle3_w - rectangle3_x) / 2 + rectangle3_x;
      var voltmeter_top1_y = sensor6_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top1_x, voltmeter_top1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // 虚线top1
      // 往上移动的距离
      var voltmeter_top1_h = 70;
      var voltmeter_top1_w = 60;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top1_x, voltmeter_top1_y - radius);
      ctx.lineTo(
        voltmeter_top1_x,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表1坐标
      var top1_voltmeter_imgX =
        (voltmeter_top1_x + voltmeter_top1_w - voltmeter_top1_x) / 2 +
        voltmeter_top1_x;
      var top1_voltmeter_imgY = voltmeter_top1_y - radius - voltmeter_top1_h;
      // DC  AC
      ctx.fillText(
        "充电机输入电压",
        top1_voltmeter_imgX - (12 * 7 + 7.33 * 0 + 5 * 0) / 2,
        top1_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 电压表2 左边圆心坐标
      // 电表间距
      var voltmeter_jianju = 22;
      var voltmeter_top2_x =
        voltmeter_top1_x + voltmeter_top1_w + voltmeter_jianju;
      var voltmeter_top2_y = rectangle3_xu_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top2_x, voltmeter_top2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // 虚线top1
      // 往上移动的距离
      var voltmeter_top2_h = 70;
      var voltmeter_top2_w = 60;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top2_x, voltmeter_top2_y - radius);
      ctx.lineTo(
        voltmeter_top2_x,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表2坐标
      var top2_voltmeter_imgX =
        (voltmeter_top2_x + voltmeter_top2_w - voltmeter_top2_x) / 2 +
        voltmeter_top2_x;
      var top2_voltmeter_imgY = voltmeter_top1_y - voltmeter_top1_h - radius;
      // DC  AC
      ctx.fillText(
        "蓄电池电压",
        top2_voltmeter_imgX - (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        top2_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);

      // ===================底部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle4_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      var rectangle4_y = coil_rtop_y - arc_r - diode_img_h - 10;
      var rectangle4_w = 70;
      var rectangle4_h = 140;
      ctx.beginPath();
      ctx.moveTo(rectangle4_x, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle4_x + 12, rectangle4_y + 12 * 1.3);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle4_x + rectangle4_w - 12 * 2,
        rectangle4_y + rectangle4_h - 12
      );
      ctx.fillText(
        "----°c",
        (rectangle4_x + rectangle4_w - rectangle4_x) / 4 + rectangle4_x,
        rectangle4_y + rectangle4_h + 12
      );
      ctx.fillText(
        "逆变器",
        rectangle4_x - 12 * (3 + 1),
        rectangle4_y + rectangle4_h - 12 * 2
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.stroke();
      // 虚线1起点
      ctx.setLineDash([10,3]);
      var rectangle4_xu_x = rectangle4_x + rectangle4_w;
      // 往下移动距离
      // var rectangle3_xu_ = 25;
      var rectangle4_xu_y = rectangle4_y + rectangle3_xu_;
      // 虚线长度
      var rectangle4_xu_w = 640;
      // 横向虚线1.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y);
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.stroke();
      // 传感器2
      // 图片中心位置
      var sensor2_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        220;
      var sensor2_y = rectangle4_xu_y;
      // 相电流传感器
      ctx.fillText(
        "U相电流传感器",
        sensor2_x + (electronic_w / 2) * 3,
        sensor2_y - 12
      );
      ctx.fillText(
        "--A",
        sensor2_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor2_y - 12 * 2.2
      );
      // 连接点1
      var lj_h = 20;
      var lj_w = 30;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y - lj_h
      );
      ctx.stroke();
      //
      ctx.fillText(
        "输出接触器",
        lj_w / 2 +
          (rectangle4_xu_x + rectangle4_xu_w) -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 -
          (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        rectangle4_xu_y - lj_h - 12
      );

      // 横向虚线1.2=============
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y
      );
      ctx.lineTo(rectangle4_xu_x + rectangle4_xu_w, rectangle4_xu_y);
      ctx.stroke();
      // 小圆1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "U",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y
      );

      // 横向虚线2.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 传感器3
      // 图片中心位置
      var sensor3_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        150;
      var sensor3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // E相电流传感器
      ctx.fillText(
        "V相电流传感器",
        sensor3_x + (electronic_w / 2) * 3,
        sensor3_y - 12
      );
      ctx.fillText(
        "--A",
        sensor3_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor3_y - 12 * 2.2
      );
      // 连接点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);

      // 横向虚线2.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();

      // 小圆2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "V",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      // 横向虚线3.1=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 传感器4
      // 图片中心位置
      var sensor4_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        80;
      var sensor4_y = rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2;
      // F相电流传感器
      ctx.fillText(
        "W相电流传感器",
        sensor4_x + (electronic_w / 2) * 3,
        sensor4_y + 12
      );
      ctx.fillText(
        "--A",
        sensor4_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor4_y + 12 * 2.2
      );
      // 连接点3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 横向虚线3.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 小圆3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "W",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      // 横向虚线4=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.stroke();
      // 小圆4
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "X",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      // =============底部电表============
      // 电压表1 左边圆心坐标=========================
      var voltmeter_bott1_x = voltmeter_top1_x + voltmeter_top1_w;
      var voltmeter_bott1_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott1_x, voltmeter_bott1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // 虚线top1
      // // 往上移动的距离
      var voltmeter_bott1_h =
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * (3 + 5 / 3);
      var voltmeter_bott1_w = 65;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott1_x, voltmeter_bott1_y - radius);
      ctx.lineTo(voltmeter_bott1_x, voltmeter_bott1_h);
      ctx.lineTo(voltmeter_bott1_x + voltmeter_bott1_w, voltmeter_bott1_h);
      ctx.lineTo(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      var bott1_voltmeter_imgX =
        (voltmeter_bott1_x + voltmeter_bott1_w - voltmeter_bott1_x) / 2 +
        voltmeter_bott1_x;
      var bott1_voltmeter_imgY = voltmeter_bott1_h;
      ctx.fillText(
        "UV相电压",
        bott1_voltmeter_imgX - (12 * 3 + 7.33 * 2 + 5 * 0) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // // 电压表2 左边圆心坐标=======================
      var voltmeter_bott2_x =
        voltmeter_bott1_x + voltmeter_bott1_w + voltmeter_jianju;
      var voltmeter_bott2_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott2_x, voltmeter_bott2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // // 虚线top1
      // // 往上移动的距离
      var voltmeter_bott2_h = voltmeter_bott1_h;
      var voltmeter_bott2_w = voltmeter_bott1_w;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott2_x, voltmeter_bott2_y + radius);
      ctx.lineTo(voltmeter_bott2_x, voltmeter_bott2_h);
      ctx.lineTo(voltmeter_bott2_x + voltmeter_bott2_w, voltmeter_bott2_h);
      ctx.lineTo(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      var bott2_voltmeter_imgX =
        (voltmeter_bott2_x + voltmeter_bott2_w - voltmeter_bott2_x) / 2 +
        voltmeter_bott2_x;
      var bott2_voltmeter_imgY = voltmeter_bott2_h;
      ctx.fillText(
        "UW电压",
        bott2_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // // 电压表3 左边圆心坐标=======================
      var voltmeter_bott3_x =
        voltmeter_bott2_x + voltmeter_bott2_w + voltmeter_jianju;
      var voltmeter_bott3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott3_x, voltmeter_bott3_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // // 虚线top1
      // // // 往上移动的距离
      var voltmeter_bott3_h = voltmeter_bott1_h;
      var voltmeter_bott3_w = voltmeter_bott2_w;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott3_x, voltmeter_bott3_y + radius);
      ctx.lineTo(voltmeter_bott3_x, voltmeter_bott3_h);
      ctx.lineTo(voltmeter_bott3_x + voltmeter_bott3_w, voltmeter_bott3_h);
      ctx.lineTo(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // // 顶部电压表1坐标
      var bott3_voltmeter_imgX =
        (voltmeter_bott3_x + voltmeter_bott3_w - voltmeter_bott3_x) / 2 +
        voltmeter_bott3_x;
      var bott3_voltmeter_imgY = voltmeter_bott3_h;
      ctx.fillText(
        "VW电压",
        bott3_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott3_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 变阻器 对应点
      var black_spots_x = sensor2_x + (electronic_w + electronic_w / 2);
      var black_spots_y = voltmeter_top1_y;
      // 点1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, black_spots_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 变阻器icon1
      // 三角形顶点
      var vertex_x =
        ((black_spots_x - (voltmeter_top2_x + voltmeter_top2_w)) / 2) *
          (1 + 0.4) +
        (voltmeter_top2_x + voltmeter_top2_w);
      var vertex_y = black_spots_y;
      // 竖
      // 长度
      var shu_w = 10;
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y - shu_w);
      ctx.lineTo(vertex_x, vertex_y + shu_w);
      ctx.stroke();
      // 三角形
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y - shu_w * 0.8);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y + shu_w * 0.8);
      ctx.lineTo(vertex_x, vertex_y);
      ctx.stroke();
      // 点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, rectangle3_xu_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 连接线
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x, black_spots_y + radius);
      ctx.lineTo(black_spots_x, rectangle3_xu_y - radius);
      ctx.stroke();
      // 变阻器 对应点
      var black_spots_x2 = black_spots_x;
      var black_spots_y2 =
        ((rectangle3_xu_y - radius - (black_spots_y + radius)) / 2) *
          (1 - 0.4) +
        black_spots_y +
        radius;
      // 变阻器icon2
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x2 - shu_w, black_spots_y2);
      ctx.lineTo(black_spots_x2 + shu_w, black_spots_y2);
      ctx.stroke();
      // // 三角形
      ctx.beginPath();
      ctx.moveTo(black_spots_x2, black_spots_y2);
      ctx.lineTo(black_spots_x2 - shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2 + shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2, black_spots_y2);
      ctx.stroke();

      // 绘制图片 路径 x轴 y轴 宽度 高度
      sensor.onload = function () {
        // 图片1

        ctx.drawImage(
          Inductors,
          Inductors_level,
          y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器
        ctx.drawImage(
          sensor,
          sensor_level + electronic_w / 2,
          y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器2
        ctx.drawImage(
          sensor,
          sensor2_x + electronic_w / 2,
          sensor2_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器3
        ctx.drawImage(
          sensor,
          sensor3_x + electronic_w / 2,
          sensor3_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器4
        ctx.drawImage(
          sensor,
          sensor4_x + electronic_w / 2,
          sensor4_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器5
        ctx.drawImage(
          sensor,
          sensor5_x + electronic_w / 2,
          sensor5_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器6
        ctx.drawImage(
          sensor,
          sensor6_x + electronic_w / 2,
          sensor6_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 电压表
        ctx.drawImage(
          ammeter,
          ammeter1_level - electronic_w / 2,
          center_r2_y - (center_r2_y - y) / 2 - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 顶部电压表1
        ctx.drawImage(
          ammeter,
          top1_voltmeter_imgX - electronic_w / 2,
          top1_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 顶部电压表2
        ctx.drawImage(
          ammeter,
          top2_voltmeter_imgX - electronic_w / 2,
          top2_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表1
        ctx.drawImage(
          ammeter,
          bott1_voltmeter_imgX - electronic_w / 2,
          bott1_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表2
        ctx.drawImage(
          ammeter,
          bott2_voltmeter_imgX - electronic_w / 2,
          bott2_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表3
        ctx.drawImage(
          ammeter,
          bott3_voltmeter_imgX - electronic_w / 2,
          bott3_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
      };
    },
    // 渲染电路图 （广十二 广十四）
    fun_circuitFig(w, h, x, y) {
      // 顶部绘制
      // 画布宽度 高度 圆心坐标x y
      // 电压表
      var ammeter = new Image();
      ammeter.src = "./img/canvas/ammeter.png";
      // 电感器
      var Inductors = new Image();
      Inductors.src = "./img/canvas/Inductors.png";
      // 电阻
      var resistance = new Image();
      resistance.src = "./img/canvas/resistance.png";
      // 传感器
      var sensor = new Image();
      sensor.src = "./img/canvas/sensor.png";

      // const ctx = this.$refs.circuit_fig;
      const ctx = this.$refs.circuit_fig.getContext("2d");
      const canvas = this.$refs.circuit_fig;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = 2200 * ratio; // 实际渲染像素
      canvas.height = 1100 * ratio; // 实际渲染像素
      canvas.style.width = `${w/1.2}px`; // 控制显示大小
      canvas.style.height = `${h/1.2}px`; // 控制显示大小
      // 文本
      ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.fillStyle = "#95979d"; // 设置文本颜色
      // 文本 输入接触EEB
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      // 各个点的名称
      // ================顶部图的绘制======================
      // 绘制线的颜色
      ctx.strokeStyle = "white";
      // 默认配置
      ctx.lineCap = "butt";
      // 圆的半径，即小圆点的大小
      var radius = 5;
      // 圆右边起点 圆心 + 半径
      var center_r = x + radius;
      // 电子元件宽度高度
      var electronic_w = 40;
      var electronic_h = 40;
      // ===================================
      // 开始绘制 电路图左边区域 =========区域1==========
      ctx.beginPath();
      // 圆1
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      // 绘制圆形
      ctx.stroke();
      // DC文本间距
      var DC_jianju = 40;
      // DC1500V+  汉字 12   大写字母 8   数字 5
      ctx.fillText(
        "DC1500V+",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        y - DC_jianju
      );
      // 虚线1
      ctx.beginPath();
      // 起点
      ctx.moveTo(center_r, y);
      // 终点
      // 虚线1 终点
      var dashed1 = center_r + 320;
      ctx.lineTo(dashed1, y);
      // 虚线的配置
      ctx.setLineDash([10,3]);
      ctx.stroke();
      // 电感器 水平移动距离
      var Inductors_level = center_r + 90;
      // ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      // ctx.fillStyle = "#95979d"; // 设置文本颜色
      // // 文本 输入接触EEB
      // ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 7.33  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        "输入接触器B",
        Inductors_level + electronic_w / 2 - (12 * 4 + 7.33 * 3) / 2,
        y + 40
      );
      // 传感器 水平移动距离
      var sensor_level = center_r + 180;
      // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.font = "12px Arial";
      // 设置文本颜色
      ctx.fillStyle = "#95979d";
      // 文本 输入电压传感器
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // 图片中心位置 - 文本中心位置
        "输入电流传感器",
        sensor_level + electronic_w - (12 * 7 + 7.33 * 0) / 2,
        y + electronic_h
      );
      // 圆心 + 图片高度 + 文本行高 + 1
      ctx.fillText(
        "--A",
        sensor_level + electronic_w - (12 * 1 + 7.33 * 1) / 2,
        y + electronic_h + 14
      );

      // 圆2
      // 重新修改为实线
      ctx.setLineDash([]);
      ctx.beginPath();
      // 圆2 的圆心y坐标
      var center_r2_y = y + 150;
      ctx.arc(x, center_r2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // DC1500V+
      ctx.fillText(
        "DC1500V-",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        center_r2_y + DC_jianju
      );
      // 虚线2
      var dashed2 = center_r + 320;
      ctx.beginPath();
      ctx.moveTo(center_r, center_r2_y);
      ctx.lineTo(dashed2, center_r2_y);
      ctx.setLineDash([10,3]);
      ctx.stroke();

      // 虚线3
      ctx.beginPath();
      ctx.moveTo(x + 30, y);
      ctx.lineTo(x + 30, center_r2_y);
      ctx.setLineDash([10,3]);
      ctx.stroke();
      // 电压表 水平移动距离
      var ammeter1_level = x + 30;
      // 电压表 垂直移动距离
      var ammeter1_vertical = center_r2_y;
      // 文本 电压 --v
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // （圆心点 + 移动距离 -图片宽度一半 ）- 文本长度 - 一丢丢距离
        "网压",
        ammeter1_level - electronic_w / 2 - (12 * 2 + 7.33 * 0) - 5,
        center_r2_y - (center_r2_y - y) / 2 - 6
      );
      // console.log("圆点2的圆心", center_r2_y);
      ctx.fillText(
        "--v",
        ammeter1_level - electronic_w / 2 - (12 * 1 + 7.33 * 1) - 5,
        center_r2_y - (center_r2_y - y) / 2 + 6
      );
      // 矩形
      ctx.setLineDash([]);
      ctx.beginPath();
      // 矩形超出的距离
      var rectangle_overflow = 15;
      // 矩形的宽度
      var rectangle_w = dashed1 + 100;
      // 矩形的高度
      // var rectangle_h = 150;
      ctx.moveTo(dashed1, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed1, y - rectangle_overflow);
      ctx.stroke();
      // 斜杠
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.stroke();
      var rectangle_jianju = 10;
      // HVM模块
      ctx.fillText(
        "输入变换器",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 1 + 7.33 * 3 + 5 * 5) / 2,
        y - rectangle_overflow - rectangle_jianju
      );
      // ----°c
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju
      );
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju + 12 * 1.2
      );
      // DC  AC
      ctx.fillText(
        "DC",
        dashed1 + 12 * 1,
        (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
          (y - rectangle_overflow)
      );
      // AC
      ctx.fillText(
        "AC",
        rectangle_w - 12 * 2,
        center_r2_y +
          rectangle_overflow -
          (y - rectangle_overflow) -
          (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
          (y - rectangle_overflow)
      );

      //线圈
      ctx.setLineDash([10,3]);
      // 线圈长度
      var coil_w = rectangle_w + 60;
      var coil_h = 30;
      // 线圈1
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y);
      ctx.lineTo(coil_w, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y + coil_h);
      ctx.lineTo(coil_w, y + coil_h);
      ctx.stroke();
      //弧形 (x,y,半径,弧度,是否对称)
      // 弧的半径
      var arc_r = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(coil_w, y + arc_r, arc_r, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 线圈2
      ctx.setLineDash([10,3]);
      // bott
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y);
      ctx.lineTo(coil_w, center_r2_y);
      ctx.stroke();
      // top
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y - coil_h);
      ctx.lineTo(coil_w, center_r2_y - coil_h);
      ctx.stroke();
      //弧形
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 系统电路图（广三东延） 左边区域绘制结束（不包括图片）
      // 开始绘制 电路图右上边区域 =========区域2==========
      // 左手边为区域2 原点(线圈1 左上角)
      // ==========线圈1 + 线圈2==========
      // 弧
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = y + arc_r;
        } else {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = center_r2_y - coil_h + arc_r;
        }
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 2,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 4,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.stroke();
        // 弧虚线top1.1
        ctx.setLineDash([10,3]);
        // 长度
        var coil_xu_top1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y - arc_r);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r);
        ctx.stroke();
        // 弧虚线bott1.1
        // 长度
        var coil_xu_bott1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(coil_xu_bott1_1, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
        // ======半导体top======
        ctx.setLineDash([]);
        // 宽度
        var diode_img_w = 50;
        // 超出部分
        var diode_img_h = 10;
        // 矩形
        ctx.beginPath();
        ctx.moveTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y - arc_r - diode_img_h
        );
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y + (arc_r + 1) * 4 + diode_img_h
        );
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y + (arc_r + 1) * 4 + diode_img_h);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.stroke();
        // 半导体图标（二极管）
        // 二极管 顶点坐标
        if (i === 0) {
          var erjg_y = y;
        } else {
          var erjg_y = center_r2_y - coil_h;
        }
        var erjg_x = coil_xu_top1_1 + diode_img_w / 2;
        var erjg_h = 30;
        // 竖
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y);
        ctx.lineTo(erjg_x, erjg_y + erjg_h);
        ctx.stroke();
        // 横
        // 距离定点 的距离
        var top_erjg = 8;
        ctx.beginPath();
        ctx.moveTo(erjg_x - top_erjg, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg);
        ctx.stroke();
        // 三角形
        // 三角形高度
        var sjx_erjg = 15;
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x - top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x, erjg_y + top_erjg);
        ctx.stroke();
        // ==================
        // 弧虚线top1.2
        // 起点
        var hu_top1_2 = coil_xu_bott1_1 + diode_img_w;
        // 长度
        var hu_top1_2w = 50;
        ctx.setLineDash([10,3]);
        ctx.beginPath();
        // 弧虚线top1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y - arc_r);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y - arc_r);
        ctx.stroke();
        ctx.beginPath();
        // 弧虚线bott1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
      }
      // 顶部虚线
      // 原点坐标
      var top_xu_x = (hu_top1_2 + hu_top1_2w - hu_top1_2) / 2 + hu_top1_2;
      var top_xu_y = y;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(top_xu_x, top_xu_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 虚线
      // 虚线高度
      var top_xu_h = 60;
      var top_xu_w = 640;
      ctx.moveTo(top_xu_x, top_xu_y);
      ctx.lineTo(top_xu_x, top_xu_y - top_xu_h);
      ctx.lineTo(top_xu_x + top_xu_w, top_xu_y - top_xu_h);
      ctx.stroke();
      // 相电流传感器
      ctx.fillText(
        "U_DC_Out",
        top_xu_x + top_xu_w - (12 * 0 + 7.33 * (7 + 3) + 5 * 0),
        top_xu_y - top_xu_h + 12 * 1.3
      );
      // 传感器5
      // 图片中心位置
      // var sensor5_x = rectangle3_xu_x + rectangle3_xu_w -310
      var sensor6_y = top_xu_y - top_xu_h;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        top_xu_x + top_xu_w + radius,
        top_xu_y - top_xu_h,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // ===================顶部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle3_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      // var rectangle3_y = coil_rtop_y  - arc_r - diode_img_h
      var rectangle3_y = y - arc_r - diode_img_h;
      var rectangle3_w = 70;
      var rectangle3_h = 70;
      ctx.beginPath();
      ctx.moveTo(rectangle3_x, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle3_x + 12, rectangle3_y + 12 * 1.5);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle3_x + rectangle3_w - 12 * 2,
        rectangle3_y + rectangle3_h - 12
      );
      ctx.fillText(
        "充电机",
        (rectangle3_x + rectangle3_w - rectangle3_x) / 4 + rectangle3_x,
        rectangle3_y + rectangle3_h + 12
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.stroke();
      // 横向虚线1=============
      ctx.setLineDash([10,3]);
      // 虚线1起点
      var rectangle3_xu_x = rectangle3_x + rectangle3_w;
      // 往下移动距离
      var rectangle3_xu_ = 25;
      var rectangle3_xu_y = rectangle3_y + rectangle3_xu_;
      // 虚线长度
      var rectangle3_xu_w = 500;
      // 虚线1
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y);
      ctx.lineTo(rectangle3_xu_x + rectangle3_xu_w, rectangle3_xu_y);
      ctx.stroke();

      // 传感器6
      var sensor6_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      // 相电流传感器
      ctx.fillText("--A", sensor6_x + (electronic_w / 2) * 3, sensor6_y - 12);
      // 传感器5
      // 图片中心位置
      var sensor5_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      var sensor5_y = rectangle3_xu_y;
      // 相电流传感器
      ctx.fillText(
        "蓄电池充放电流传感器",
        sensor5_x + (electronic_w / 2) * 3,
        sensor5_y - 12
      );
      ctx.fillText("--A", sensor5_x + (electronic_w / 2) * 3, sensor5_y + 12);
      // 增加虚线1 和 虚线2 的宽度
      var jianju = 10;
      // 横向虚线2=============
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle3_xu_x + rectangle3_xu_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 电容器 图案
      // 左顶点坐标
      var capacitor_topX = rectangle3_xu_x + rectangle3_xu_w;
      var capacitor_topY = rectangle3_xu_y;
      var capacitor_bottX = rectangle3_xu_x + rectangle3_xu_w;
      var capacitor_bottY = rectangle3_xu_y + rectangle3_xu_ + jianju;
      // 矩形宽度
      var capacitor_w = 60;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w, capacitor_bottY);
      ctx.lineTo(capacitor_bottX, capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      // 底部
      //弧形
      var hu_radius = 4;
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 横
      ctx.beginPath();
      ctx.moveTo(capacitor_bottX, capacitor_bottY + hu_radius * 2);
      ctx.lineTo(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius * 2
      );
      ctx.stroke();
      // 顶部
      // 弧形
      var hu_radius2 = 7;
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 口
      // 高度
      var kou_h = 18;
      // ----------左
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2, capacitor_topY);
      ctx.lineTo(capacitor_topX + hu_radius2 * 2, capacitor_topY - kou_h);
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2,
        capacitor_topY - kou_h
      );
      ctx.lineTo(capacitor_topX + capacitor_w - hu_radius2 * 2, capacitor_topY);
      ctx.stroke();
      // 间距
      var kou_w = 5;
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2 + kou_w, capacitor_topY);
      ctx.lineTo(
        capacitor_topX + hu_radius2 * 2 + kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY
      );
      ctx.stroke();

      // 外部电极
      // 负极 左点坐标
      var fu_x_left = capacitor_topX + hu_radius2 - hu_radius2 / 2;
      var fu_y_left = capacitor_topY - hu_radius2;
      var fu_h_left = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x_left, fu_y_left);
      ctx.lineTo(fu_x_left, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fu_x_left + hu_radius2, fu_y_left);
      ctx.lineTo(fu_x_left + hu_radius2, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 正极 右点坐标
      var zheng_x_right =
        capacitor_topX +
        capacitor_w -
        hu_radius2 +
        hu_radius2 -
        hu_radius2 -
        hu_radius2 / 2;
      var zheng_y_right = capacitor_topY - hu_radius2;
      var zheng_h_right = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x_right, zheng_y_right);
      ctx.lineTo(zheng_x_right, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(zheng_x_right + hu_radius2, zheng_y_right);
      ctx.lineTo(zheng_x_right + hu_radius2, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      //       ctx.arc(capacitor_topX + capacitor_w - hu_radius2, capacitor_topY, hu_radius2, 0, -Math.PI, true);
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();

      // - +
      // 负极
      var fu_x = capacitor_topX + 5;
      var fu_y = (capacitor_topY - capacitor_bottY) / 2 + capacitor_bottY;
      var fu_w = 10;
      var fu_h = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y);
      ctx.stroke();
      // 正极
      var zheng_x = capacitor_topX + capacitor_w - 5;
      var zheng_y = fu_y;
      var zheng_w = 10;
      var zheng_h = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y);
      ctx.stroke();
      // ----°c
      ctx.fillText(
        "----°c",
        (capacitor_topX +
          capacitor_w -
          hu_radius2 -
          (capacitor_topX + hu_radius2)) /
          2 +
          (capacitor_topX + hu_radius2) -
          (12 * 0 + 7.33 * 1 + 5 * 4) / 2,
        capacitor_bottY + 12 * 2
      );
      /*
            // 矩形宽度
      var capacitor_w = 60
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w,capacitor_bottY);
      ctx.lineTo(capacitor_bottX,capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      */

      ctx.fillText(
        "DC+",
        capacitor_topX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_topY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );
      ctx.fillText(
        "DC-",
        capacitor_bottX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_bottY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );

      // ===================顶部电压表2=======================
      // 电压表1 左边圆心坐标
      var voltmeter_top1_x =
        (rectangle3_x + rectangle3_w - rectangle3_x) / 2 + rectangle3_x;
      var voltmeter_top1_y = sensor6_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top1_x, voltmeter_top1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // 虚线top1
      // 往上移动的距离
      var voltmeter_top1_h = 70;
      var voltmeter_top1_w = 60;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top1_x, voltmeter_top1_y - radius);
      ctx.lineTo(
        voltmeter_top1_x,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表1坐标
      var top1_voltmeter_imgX =
        (voltmeter_top1_x + voltmeter_top1_w - voltmeter_top1_x) / 2 +
        voltmeter_top1_x;
      var top1_voltmeter_imgY = voltmeter_top1_y - radius - voltmeter_top1_h;
      // DC  AC
      ctx.fillText(
        "充电机输入电压",
        top1_voltmeter_imgX - (12 * 7 + 7.33 * 0 + 5 * 0) / 2,
        top1_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 电压表2 左边圆心坐标
      // 电表间距
      var voltmeter_jianju = 22;
      var voltmeter_top2_x =
        voltmeter_top1_x + voltmeter_top1_w + voltmeter_jianju;
      var voltmeter_top2_y = rectangle3_xu_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top2_x, voltmeter_top2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // 虚线top1
      // 往上移动的距离
      var voltmeter_top2_h = 70;
      var voltmeter_top2_w = 60;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top2_x, voltmeter_top2_y - radius);
      ctx.lineTo(
        voltmeter_top2_x,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表2坐标
      var top2_voltmeter_imgX =
        (voltmeter_top2_x + voltmeter_top2_w - voltmeter_top2_x) / 2 +
        voltmeter_top2_x;
      var top2_voltmeter_imgY = voltmeter_top1_y - voltmeter_top1_h - radius;
      // DC  AC
      ctx.fillText(
        "蓄电池电压",
        top2_voltmeter_imgX - (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        top2_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);

      // ===================底部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle4_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      var rectangle4_y = coil_rtop_y - arc_r - diode_img_h - 10;
      var rectangle4_w = 70;
      var rectangle4_h = 140;
      ctx.beginPath();
      ctx.moveTo(rectangle4_x, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle4_x + 12, rectangle4_y + 12 * 1.3);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle4_x + rectangle4_w - 12 * 2,
        rectangle4_y + rectangle4_h - 12
      );
      ctx.fillText(
        "----°c",
        (rectangle4_x + rectangle4_w - rectangle4_x) / 4 + rectangle4_x,
        rectangle4_y + rectangle4_h + 12
      );
      ctx.fillText(
        "逆变器",
        rectangle4_x - 12 * (3 + 1),
        rectangle4_y + rectangle4_h - 12 * 2
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.stroke();
      // 虚线1起点
      ctx.setLineDash([10,3]);
      var rectangle4_xu_x = rectangle4_x + rectangle4_w;
      // 往下移动距离
      // var rectangle3_xu_ = 25;
      var rectangle4_xu_y = rectangle4_y + rectangle3_xu_;
      // 虚线长度
      var rectangle4_xu_w = 640;
      // 横向虚线1.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y);
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.stroke();
      // 传感器2
      // 图片中心位置
      var sensor2_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        220;
      var sensor2_y = rectangle4_xu_y;
      // 相电流传感器
      ctx.fillText(
        "U相电流传感器",
        sensor2_x + (electronic_w / 2) * 3,
        sensor2_y - 12
      );
      ctx.fillText(
        "--A",
        sensor2_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor2_y - 12 * 2.2
      );
      // 连接点1
      var lj_h = 20;
      var lj_w = 30;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y - lj_h
      );
      ctx.stroke();
      //
      ctx.fillText(
        "输出接触器",
        lj_w / 2 +
          (rectangle4_xu_x + rectangle4_xu_w) -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 -
          (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        rectangle4_xu_y - lj_h - 12
      );

      // 横向虚线1.2=============
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y
      );
      ctx.lineTo(rectangle4_xu_x + rectangle4_xu_w, rectangle4_xu_y);
      ctx.stroke();
      // 小圆1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "U",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y
      );

      // 横向虚线2.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 传感器3
      // 图片中心位置
      var sensor3_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        150;
      var sensor3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // E相电流传感器
      ctx.fillText(
        "V相电流传感器",
        sensor3_x + (electronic_w / 2) * 3,
        sensor3_y - 12
      );
      ctx.fillText(
        "--A",
        sensor3_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor3_y - 12 * 2.2
      );
      // 连接点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);

      // 横向虚线2.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();

      // 小圆2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "V",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      // 横向虚线3.1=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 传感器4
      // 图片中心位置
      var sensor4_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        80;
      var sensor4_y = rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2;
      // F相电流传感器
      ctx.fillText(
        "W相电流传感器",
        sensor4_x + (electronic_w / 2) * 3,
        sensor4_y + 12
      );
      ctx.fillText(
        "--A",
        sensor4_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor4_y + 12 * 2.2
      );
      // 连接点3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 横向虚线3.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 小圆3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "W",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      // 横向虚线4=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.stroke();
      // 小圆4
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "X",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      // =============底部电表============
      // 电压表1 左边圆心坐标=========================
      var voltmeter_bott1_x = voltmeter_top1_x + voltmeter_top1_w;
      var voltmeter_bott1_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott1_x, voltmeter_bott1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // 虚线top1
      // // 往上移动的距离
      var voltmeter_bott1_h =
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * (3 + 5 / 3);
      var voltmeter_bott1_w = 65;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott1_x, voltmeter_bott1_y - radius);
      ctx.lineTo(voltmeter_bott1_x, voltmeter_bott1_h);
      ctx.lineTo(voltmeter_bott1_x + voltmeter_bott1_w, voltmeter_bott1_h);
      ctx.lineTo(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      var bott1_voltmeter_imgX =
        (voltmeter_bott1_x + voltmeter_bott1_w - voltmeter_bott1_x) / 2 +
        voltmeter_bott1_x;
      var bott1_voltmeter_imgY = voltmeter_bott1_h;
      ctx.fillText(
        "UV相电压",
        bott1_voltmeter_imgX - (12 * 3 + 7.33 * 2 + 5 * 0) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // // 电压表2 左边圆心坐标=======================
      var voltmeter_bott2_x =
        voltmeter_bott1_x + voltmeter_bott1_w + voltmeter_jianju;
      var voltmeter_bott2_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott2_x, voltmeter_bott2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // // 虚线top1
      // // 往上移动的距离
      var voltmeter_bott2_h = voltmeter_bott1_h;
      var voltmeter_bott2_w = voltmeter_bott1_w;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott2_x, voltmeter_bott2_y + radius);
      ctx.lineTo(voltmeter_bott2_x, voltmeter_bott2_h);
      ctx.lineTo(voltmeter_bott2_x + voltmeter_bott2_w, voltmeter_bott2_h);
      ctx.lineTo(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      var bott2_voltmeter_imgX =
        (voltmeter_bott2_x + voltmeter_bott2_w - voltmeter_bott2_x) / 2 +
        voltmeter_bott2_x;
      var bott2_voltmeter_imgY = voltmeter_bott2_h;
      ctx.fillText(
        "UW电压",
        bott2_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // // 电压表3 左边圆心坐标=======================
      var voltmeter_bott3_x =
        voltmeter_bott2_x + voltmeter_bott2_w + voltmeter_jianju;
      var voltmeter_bott3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott3_x, voltmeter_bott3_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // // 虚线top1
      // // // 往上移动的距离
      var voltmeter_bott3_h = voltmeter_bott1_h;
      var voltmeter_bott3_w = voltmeter_bott2_w;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott3_x, voltmeter_bott3_y + radius);
      ctx.lineTo(voltmeter_bott3_x, voltmeter_bott3_h);
      ctx.lineTo(voltmeter_bott3_x + voltmeter_bott3_w, voltmeter_bott3_h);
      ctx.lineTo(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // // 顶部电压表1坐标
      var bott3_voltmeter_imgX =
        (voltmeter_bott3_x + voltmeter_bott3_w - voltmeter_bott3_x) / 2 +
        voltmeter_bott3_x;
      var bott3_voltmeter_imgY = voltmeter_bott3_h;
      ctx.fillText(
        "VW电压",
        bott3_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott3_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 变阻器 对应点
      var black_spots_x = sensor2_x + (electronic_w + electronic_w / 2);
      var black_spots_y = voltmeter_top1_y;
      // 点1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, black_spots_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 变阻器icon1
      // 三角形顶点
      var vertex_x =
        ((black_spots_x - (voltmeter_top2_x + voltmeter_top2_w)) / 2) *
          (1 + 0.4) +
        (voltmeter_top2_x + voltmeter_top2_w);
      var vertex_y = black_spots_y;
      // 竖
      // 长度
      var shu_w = 10;
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y - shu_w);
      ctx.lineTo(vertex_x, vertex_y + shu_w);
      ctx.stroke();
      // 三角形
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y - shu_w * 0.8);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y + shu_w * 0.8);
      ctx.lineTo(vertex_x, vertex_y);
      ctx.stroke();
      // 点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, rectangle3_xu_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 连接线
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x, black_spots_y + radius);
      ctx.lineTo(black_spots_x, rectangle3_xu_y - radius);
      ctx.stroke();
      // 变阻器 对应点
      var black_spots_x2 = black_spots_x;
      var black_spots_y2 =
        ((rectangle3_xu_y - radius - (black_spots_y + radius)) / 2) *
          (1 - 0.4) +
        black_spots_y +
        radius;
      // 变阻器icon2
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x2 - shu_w, black_spots_y2);
      ctx.lineTo(black_spots_x2 + shu_w, black_spots_y2);
      ctx.stroke();
      // // 三角形
      ctx.beginPath();
      ctx.moveTo(black_spots_x2, black_spots_y2);
      ctx.lineTo(black_spots_x2 - shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2 + shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2, black_spots_y2);
      ctx.stroke();

      // 绘制图片 路径 x轴 y轴 宽度 高度
      // sensor.onload = function () {
      //   // 图片1

      //   ctx.drawImage(
      //     Inductors,
      //     Inductors_level,
      //     y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 传感器
      //   ctx.drawImage(
      //     sensor,
      //     sensor_level + electronic_w / 2,
      //     y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 传感器2
      //   ctx.drawImage(
      //     sensor,
      //     sensor2_x + electronic_w / 2,
      //     sensor2_y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 传感器3
      //   ctx.drawImage(
      //     sensor,
      //     sensor3_x + electronic_w / 2,
      //     sensor3_y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 传感器4
      //   ctx.drawImage(
      //     sensor,
      //     sensor4_x + electronic_w / 2,
      //     sensor4_y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 传感器5
      //   ctx.drawImage(
      //     sensor,
      //     sensor5_x + electronic_w / 2,
      //     sensor5_y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 传感器6
      //   ctx.drawImage(
      //     sensor,
      //     sensor6_x + electronic_w / 2,
      //     sensor6_y - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 电压表
      //   ctx.drawImage(
      //     ammeter,
      //     ammeter1_level - electronic_w / 2,
      //     center_r2_y - (center_r2_y - y) / 2 - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 顶部电压表1
      //   ctx.drawImage(
      //     ammeter,
      //     top1_voltmeter_imgX - electronic_w / 2,
      //     top1_voltmeter_imgY - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 顶部电压表2
      //   ctx.drawImage(
      //     ammeter,
      //     top2_voltmeter_imgX - electronic_w / 2,
      //     top2_voltmeter_imgY - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 底部电压表1
      //   ctx.drawImage(
      //     ammeter,
      //     bott1_voltmeter_imgX - electronic_w / 2,
      //     bott1_voltmeter_imgY - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 底部电压表2
      //   ctx.drawImage(
      //     ammeter,
      //     bott2_voltmeter_imgX - electronic_w / 2,
      //     bott2_voltmeter_imgY - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      //   // 底部电压表3
      //   ctx.drawImage(
      //     ammeter,
      //     bott3_voltmeter_imgX - electronic_w / 2,
      //     bott3_voltmeter_imgY - electronic_h / 2,
      //     electronic_w,
      //     electronic_h
      //   );
      // };
      // 底部图的绘制
       // 各个点的名称
      // ================================================底部部图的绘制================================================
      y = 720
      // 绘制线的颜色
      ctx.strokeStyle = "white";
      // 默认配置
      ctx.lineCap = "butt";
      // 圆的半径，即小圆点的大小
      var radius = 5;
      // 圆右边起点 圆心 + 半径
      var center_r = x + radius;
      // 电子元件宽度高度
      var electronic_w = 40;
      var electronic_h = 40;
      // ===================================
      // 开始绘制 电路图左边区域 =========区域1==========
      ctx.beginPath();
      // 圆1
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      // 绘制圆形
      ctx.stroke();
      // DC文本间距
      var DC_jianju = 40;
      // DC1500V+  汉字 12   大写字母 8   数字 5
      ctx.fillText(
        "DC1500V+",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        y - DC_jianju
      );
      // 虚线1
      ctx.beginPath();
      // 起点
      ctx.moveTo(center_r, y);
      // 终点
      // 虚线1 终点
      var dashed1 = center_r + 320;
      ctx.lineTo(dashed1, y);
      // 虚线的配置
      ctx.setLineDash([10,3]);
      ctx.stroke();
      // 电感器 水平移动距离
      var Inductors_level = center_r + 90;
      // ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      // ctx.fillStyle = "#95979d"; // 设置文本颜色
      // // 文本 输入接触EEB
      // ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 7.33  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        "输入接触器B",
        Inductors_level + electronic_w / 2 - (12 * 4 + 7.33 * 3) / 2,
        y + 40
      );
      // 传感器 水平移动距离
      var sensor_level = center_r + 180;
      // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.font = "12px Arial";
      // 设置文本颜色
      ctx.fillStyle = "#95979d";
      // 文本 输入电压传感器
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // 图片中心位置 - 文本中心位置
        "输入电流传感器",
        sensor_level + electronic_w - (12 * 7 + 7.33 * 0) / 2,
        y + electronic_h
      );
      // 圆心 + 图片高度 + 文本行高 + 1
      ctx.fillText(
        "--A",
        sensor_level + electronic_w - (12 * 1 + 7.33 * 1) / 2,
        y + electronic_h + 14
      );

      // 圆2
      // 重新修改为实线
      ctx.setLineDash([]);
      ctx.beginPath();
      // 圆2 的圆心y坐标
      var center_r2_y = y + 150;
      ctx.arc(x, center_r2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // DC1500V+
      ctx.fillText(
        "DC1500V-",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        center_r2_y + DC_jianju
      );
      // 虚线2
      var dashed2 = center_r + 320;
      ctx.beginPath();
      ctx.moveTo(center_r, center_r2_y);
      ctx.lineTo(dashed2, center_r2_y);
      ctx.setLineDash([10,3]);
      ctx.stroke();

      // 虚线3
      ctx.beginPath();
      ctx.moveTo(x + 30, y);
      ctx.lineTo(x + 30, center_r2_y);
      ctx.setLineDash([10,3]);
      ctx.stroke();
      // 电压表 水平移动距离
      var ammeter1_level = x + 30;
      // 电压表 垂直移动距离
      var ammeter1_vertical = center_r2_y;
      // 文本 电压 --v
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // （圆心点 + 移动距离 -图片宽度一半 ）- 文本长度 - 一丢丢距离
        "网压",
        ammeter1_level - electronic_w / 2 - (12 * 2 + 7.33 * 0) - 5,
        center_r2_y - (center_r2_y - y) / 2 - 6
      );
      // console.log("圆点2的圆心", center_r2_y);
      ctx.fillText(
        "--v",
        ammeter1_level - electronic_w / 2 - (12 * 1 + 7.33 * 1) - 5,
        center_r2_y - (center_r2_y - y) / 2 + 6
      );
      // 矩形
      ctx.setLineDash([]);
      ctx.beginPath();
      // 矩形超出的距离
      var rectangle_overflow = 15;
      // 矩形的宽度
      var rectangle_w = dashed1 + 100;
      // 矩形的高度
      // var rectangle_h = 150;
      ctx.moveTo(dashed1, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed1, y - rectangle_overflow);
      ctx.stroke();
      // 斜杠
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.stroke();
      var rectangle_jianju = 10;
      // HVM模块
      ctx.fillText(
        "输入变换器",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 1 + 7.33 * 3 + 5 * 5) / 2,
        y - rectangle_overflow - rectangle_jianju
      );
      // ----°c
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju
      );
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju + 12 * 1.2
      );
      // DC  AC
      ctx.fillText(
        "DC",
        dashed1 + 12 * 1,
        (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
          (y - rectangle_overflow)
      );
      // AC
      ctx.fillText(
        "AC",
        rectangle_w - 12 * 2,
        center_r2_y +
          rectangle_overflow -
          (y - rectangle_overflow) -
          (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
          (y - rectangle_overflow)
      );

      //线圈
      ctx.setLineDash([10,3]);
      // 线圈长度
      var coil_w = rectangle_w + 60;
      var coil_h = 30;
      // 线圈1
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y);
      ctx.lineTo(coil_w, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y + coil_h);
      ctx.lineTo(coil_w, y + coil_h);
      ctx.stroke();
      //弧形 (x,y,半径,弧度,是否对称)
      // 弧的半径
      var arc_r = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(coil_w, y + arc_r, arc_r, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 线圈2
      ctx.setLineDash([10,3]);
      // bott
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y);
      ctx.lineTo(coil_w, center_r2_y);
      ctx.stroke();
      // top
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y - coil_h);
      ctx.lineTo(coil_w, center_r2_y - coil_h);
      ctx.stroke();
      //弧形
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 系统电路图（广三东延） 左边区域绘制结束（不包括图片）
      // 开始绘制 电路图右上边区域 =========区域2==========
      // 左手边为区域2 原点(线圈1 左上角)
      // ==========线圈1 + 线圈2==========
      // 弧
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = y + arc_r;
        } else {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = center_r2_y - coil_h + arc_r;
        }
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 2,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 4,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.stroke();
        // 弧虚线top1.1
        ctx.setLineDash([10,3]);
        // 长度
        var coil_xu_top1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y - arc_r);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r);
        ctx.stroke();
        // 弧虚线bott1.1
        // 长度
        var coil_xu_bott1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(coil_xu_bott1_1, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
        // ======半导体top======
        ctx.setLineDash([]);
        // 宽度
        var diode_img_w = 50;
        // 超出部分
        var diode_img_h = 10;
        // 矩形
        ctx.beginPath();
        ctx.moveTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y - arc_r - diode_img_h
        );
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y + (arc_r + 1) * 4 + diode_img_h
        );
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y + (arc_r + 1) * 4 + diode_img_h);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.stroke();
        // 半导体图标（二极管）
        // 二极管 顶点坐标
        if (i === 0) {
          var erjg_y = y;
        } else {
          var erjg_y = center_r2_y - coil_h;
        }
        var erjg_x = coil_xu_top1_1 + diode_img_w / 2;
        var erjg_h = 30;
        // 竖
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y);
        ctx.lineTo(erjg_x, erjg_y + erjg_h);
        ctx.stroke();
        // 横
        // 距离定点 的距离
        var top_erjg = 8;
        ctx.beginPath();
        ctx.moveTo(erjg_x - top_erjg, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg);
        ctx.stroke();
        // 三角形
        // 三角形高度
        var sjx_erjg = 15;
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x - top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x, erjg_y + top_erjg);
        ctx.stroke();
        // ==================
        // 弧虚线top1.2
        // 起点
        var hu_top1_2 = coil_xu_bott1_1 + diode_img_w;
        // 长度
        var hu_top1_2w = 50;
        ctx.setLineDash([10,3]);
        ctx.beginPath();
        // 弧虚线top1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y - arc_r);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y - arc_r);
        ctx.stroke();
        ctx.beginPath();
        // 弧虚线bott1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
      }
      // 顶部虚线
      // 原点坐标
      var top_xu_x = (hu_top1_2 + hu_top1_2w - hu_top1_2) / 2 + hu_top1_2;
      var top_xu_y = y;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(top_xu_x, top_xu_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 虚线
      // 虚线高度
      var top_xu_h = 60;
      var top_xu_w = 640;
      ctx.moveTo(top_xu_x, top_xu_y);
      ctx.lineTo(top_xu_x, top_xu_y - top_xu_h);
      ctx.lineTo(top_xu_x + top_xu_w, top_xu_y - top_xu_h);
      ctx.stroke();
      // 相电流传感器
      ctx.fillText(
        "U_DC_Out",
        top_xu_x + top_xu_w - (12 * 0 + 7.33 * (7 + 3) + 5 * 0),
        top_xu_y - top_xu_h + 12 * 1.3
      );
      // 传感器5
      // 图片中心位置
      // var sensor5_x = rectangle3_xu_x + rectangle3_xu_w -310
      var sensor6_y = top_xu_y - top_xu_h;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        top_xu_x + top_xu_w + radius,
        top_xu_y - top_xu_h,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // ===================顶部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle3_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      // var rectangle3_y = coil_rtop_y  - arc_r - diode_img_h
      var rectangle3_y = y - arc_r - diode_img_h;
      var rectangle3_w = 70;
      var rectangle3_h = 70;
      ctx.beginPath();
      ctx.moveTo(rectangle3_x, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle3_x + 12, rectangle3_y + 12 * 1.5);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle3_x + rectangle3_w - 12 * 2,
        rectangle3_y + rectangle3_h - 12
      );
      ctx.fillText(
        "充电机",
        (rectangle3_x + rectangle3_w - rectangle3_x) / 4 + rectangle3_x,
        rectangle3_y + rectangle3_h + 12
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.stroke();
      // 横向虚线1=============
      ctx.setLineDash([10,3]);
      // 虚线1起点
      var rectangle3_xu_x = rectangle3_x + rectangle3_w;
      // 往下移动距离
      var rectangle3_xu_ = 25;
      var rectangle3_xu_y = rectangle3_y + rectangle3_xu_;
      // 虚线长度
      var rectangle3_xu_w = 500;
      // 虚线1
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y);
      ctx.lineTo(rectangle3_xu_x + rectangle3_xu_w, rectangle3_xu_y);
      ctx.stroke();

      // 传感器6
      var sensor6_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      // 相电流传感器
      ctx.fillText("--A", sensor6_x + (electronic_w / 2) * 3, sensor6_y - 12);
      // 传感器5
      // 图片中心位置
      var sensor5_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      var sensor5_y = rectangle3_xu_y;
      // 相电流传感器
      ctx.fillText(
        "蓄电池充放电流传感器",
        sensor5_x + (electronic_w / 2) * 3,
        sensor5_y - 12
      );
      ctx.fillText("--A", sensor5_x + (electronic_w / 2) * 3, sensor5_y + 12);
      // 增加虚线1 和 虚线2 的宽度
      var jianju = 10;
      // 横向虚线2=============
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle3_xu_x + rectangle3_xu_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 电容器 图案
      // 左顶点坐标
      var capacitor_topX = rectangle3_xu_x + rectangle3_xu_w;
      var capacitor_topY = rectangle3_xu_y;
      var capacitor_bottX = rectangle3_xu_x + rectangle3_xu_w;
      var capacitor_bottY = rectangle3_xu_y + rectangle3_xu_ + jianju;
      // 矩形宽度
      var capacitor_w = 60;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w, capacitor_bottY);
      ctx.lineTo(capacitor_bottX, capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      // 底部
      //弧形
      var hu_radius = 4;
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 横
      ctx.beginPath();
      ctx.moveTo(capacitor_bottX, capacitor_bottY + hu_radius * 2);
      ctx.lineTo(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius * 2
      );
      ctx.stroke();
      // 顶部
      // 弧形
      var hu_radius2 = 7;
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 口
      // 高度
      var kou_h = 18;
      // ----------左
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2, capacitor_topY);
      ctx.lineTo(capacitor_topX + hu_radius2 * 2, capacitor_topY - kou_h);
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2,
        capacitor_topY - kou_h
      );
      ctx.lineTo(capacitor_topX + capacitor_w - hu_radius2 * 2, capacitor_topY);
      ctx.stroke();
      // 间距
      var kou_w = 5;
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2 + kou_w, capacitor_topY);
      ctx.lineTo(
        capacitor_topX + hu_radius2 * 2 + kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY
      );
      ctx.stroke();

      // 外部电极
      // 负极 左点坐标
      var fu_x_left = capacitor_topX + hu_radius2 - hu_radius2 / 2;
      var fu_y_left = capacitor_topY - hu_radius2;
      var fu_h_left = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x_left, fu_y_left);
      ctx.lineTo(fu_x_left, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fu_x_left + hu_radius2, fu_y_left);
      ctx.lineTo(fu_x_left + hu_radius2, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 正极 右点坐标
      var zheng_x_right =
        capacitor_topX +
        capacitor_w -
        hu_radius2 +
        hu_radius2 -
        hu_radius2 -
        hu_radius2 / 2;
      var zheng_y_right = capacitor_topY - hu_radius2;
      var zheng_h_right = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x_right, zheng_y_right);
      ctx.lineTo(zheng_x_right, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(zheng_x_right + hu_radius2, zheng_y_right);
      ctx.lineTo(zheng_x_right + hu_radius2, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      //       ctx.arc(capacitor_topX + capacitor_w - hu_radius2, capacitor_topY, hu_radius2, 0, -Math.PI, true);
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();

      // - +
      // 负极
      var fu_x = capacitor_topX + 5;
      var fu_y = (capacitor_topY - capacitor_bottY) / 2 + capacitor_bottY;
      var fu_w = 10;
      var fu_h = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y);
      ctx.stroke();
      // 正极
      var zheng_x = capacitor_topX + capacitor_w - 5;
      var zheng_y = fu_y;
      var zheng_w = 10;
      var zheng_h = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y);
      ctx.stroke();
      // ----°c
      ctx.fillText(
        "----°c",
        (capacitor_topX +
          capacitor_w -
          hu_radius2 -
          (capacitor_topX + hu_radius2)) /
          2 +
          (capacitor_topX + hu_radius2) -
          (12 * 0 + 7.33 * 1 + 5 * 4) / 2,
        capacitor_bottY + 12 * 2
      );
      /*
            // 矩形宽度
      var capacitor_w = 60
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w,capacitor_bottY);
      ctx.lineTo(capacitor_bottX,capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      */

      ctx.fillText(
        "DC+",
        capacitor_topX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_topY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );
      ctx.fillText(
        "DC-",
        capacitor_bottX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_bottY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );

      // ===================顶部电压表2=======================
      // 电压表1 左边圆心坐标
      var voltmeter_top1_x =
        (rectangle3_x + rectangle3_w - rectangle3_x) / 2 + rectangle3_x;
      var voltmeter_top1_y = sensor6_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top1_x, voltmeter_top1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // 虚线top1
      // 往上移动的距离
      var voltmeter_top1_h = 70;
      var voltmeter_top1_w = 60;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top1_x, voltmeter_top1_y - radius);
      ctx.lineTo(
        voltmeter_top1_x,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表1坐标
      var top1_voltmeter_imgX =
        (voltmeter_top1_x + voltmeter_top1_w - voltmeter_top1_x) / 2 +
        voltmeter_top1_x;
      var top1_voltmeter_imgY = voltmeter_top1_y - radius - voltmeter_top1_h;
      // DC  AC
      ctx.fillText(
        "充电机输入电压",
        top1_voltmeter_imgX - (12 * 7 + 7.33 * 0 + 5 * 0) / 2,
        top1_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 电压表2 左边圆心坐标
      // 电表间距
      var voltmeter_jianju = 22;
      var voltmeter_top2_x =
        voltmeter_top1_x + voltmeter_top1_w + voltmeter_jianju;
      var voltmeter_top2_y = rectangle3_xu_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top2_x, voltmeter_top2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // 虚线top1
      // 往上移动的距离
      var voltmeter_top2_h = 70;
      var voltmeter_top2_w = 60;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top2_x, voltmeter_top2_y - radius);
      ctx.lineTo(
        voltmeter_top2_x,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表2坐标
      var top2_voltmeter_imgX =
        (voltmeter_top2_x + voltmeter_top2_w - voltmeter_top2_x) / 2 +
        voltmeter_top2_x;
      var top2_voltmeter_imgY = voltmeter_top1_y - voltmeter_top1_h - radius;
      // DC  AC
      ctx.fillText(
        "蓄电池电压",
        top2_voltmeter_imgX - (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        top2_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);

      // ===================底部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle4_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      var rectangle4_y = coil_rtop_y - arc_r - diode_img_h - 10;
      var rectangle4_w = 70;
      var rectangle4_h = 140;
      ctx.beginPath();
      ctx.moveTo(rectangle4_x, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle4_x + 12, rectangle4_y + 12 * 1.3);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle4_x + rectangle4_w - 12 * 2,
        rectangle4_y + rectangle4_h - 12
      );
      ctx.fillText(
        "----°c",
        (rectangle4_x + rectangle4_w - rectangle4_x) / 4 + rectangle4_x,
        rectangle4_y + rectangle4_h + 12
      );
      ctx.fillText(
        "逆变器",
        rectangle4_x - 12 * (3 + 1),
        rectangle4_y + rectangle4_h - 12 * 2
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.stroke();
      // 虚线1起点
      ctx.setLineDash([10,3]);
      var rectangle4_xu_x = rectangle4_x + rectangle4_w;
      // 往下移动距离
      // var rectangle3_xu_ = 25;
      var rectangle4_xu_y = rectangle4_y + rectangle3_xu_;
      // 虚线长度
      var rectangle4_xu_w = 640;
      // 横向虚线1.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y);
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.stroke();
      // 传感器2
      // 图片中心位置
      var sensor2_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        220;
      var sensor2_y = rectangle4_xu_y;
      // 相电流传感器
      ctx.fillText(
        "U相电流传感器",
        sensor2_x + (electronic_w / 2) * 3,
        sensor2_y - 12
      );
      ctx.fillText(
        "--A",
        sensor2_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor2_y - 12 * 2.2
      );
      // 连接点1
      var lj_h = 20;
      var lj_w = 30;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y - lj_h
      );
      ctx.stroke();
      //
      ctx.fillText(
        "输出接触器",
        lj_w / 2 +
          (rectangle4_xu_x + rectangle4_xu_w) -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 -
          (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        rectangle4_xu_y - lj_h - 12
      );

      // 横向虚线1.2=============
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y
      );
      ctx.lineTo(rectangle4_xu_x + rectangle4_xu_w, rectangle4_xu_y);
      ctx.stroke();
      // 小圆1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "U",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y
      );

      // 横向虚线2.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 传感器3
      // 图片中心位置
      var sensor3_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        150;
      var sensor3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // E相电流传感器
      ctx.fillText(
        "V相电流传感器",
        sensor3_x + (electronic_w / 2) * 3,
        sensor3_y - 12
      );
      ctx.fillText(
        "--A",
        sensor3_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor3_y - 12 * 2.2
      );
      // 连接点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);

      // 横向虚线2.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();

      // 小圆2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "V",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      // 横向虚线3.1=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 传感器4
      // 图片中心位置
      var sensor4_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        80;
      var sensor4_y = rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2;
      // F相电流传感器
      ctx.fillText(
        "W相电流传感器",
        sensor4_x + (electronic_w / 2) * 3,
        sensor4_y + 12
      );
      ctx.fillText(
        "--A",
        sensor4_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor4_y + 12 * 2.2
      );
      // 连接点3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 横向虚线3.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
          rectangle4_xu_w -
          (rectangle4_xu_x + rectangle4_xu_w) / 5 +
          lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 小圆3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "W",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      // 横向虚线4=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.stroke();
      // 小圆4
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      ctx.fillText(
        "X",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      // =============底部电表============
      // 电压表1 左边圆心坐标=========================
      var voltmeter_bott1_x = voltmeter_top1_x + voltmeter_top1_w;
      var voltmeter_bott1_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott1_x, voltmeter_bott1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // 虚线top1
      // // 往上移动的距离
      var voltmeter_bott1_h =
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * (3 + 5 / 3);
      var voltmeter_bott1_w = 65;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott1_x, voltmeter_bott1_y - radius);
      ctx.lineTo(voltmeter_bott1_x, voltmeter_bott1_h);
      ctx.lineTo(voltmeter_bott1_x + voltmeter_bott1_w, voltmeter_bott1_h);
      ctx.lineTo(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      var bott1_voltmeter_imgX =
        (voltmeter_bott1_x + voltmeter_bott1_w - voltmeter_bott1_x) / 2 +
        voltmeter_bott1_x;
      var bott1_voltmeter_imgY = voltmeter_bott1_h;
      ctx.fillText(
        "UV相电压",
        bott1_voltmeter_imgX - (12 * 3 + 7.33 * 2 + 5 * 0) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // // 电压表2 左边圆心坐标=======================
      var voltmeter_bott2_x =
        voltmeter_bott1_x + voltmeter_bott1_w + voltmeter_jianju;
      var voltmeter_bott2_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott2_x, voltmeter_bott2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // // 虚线top1
      // // 往上移动的距离
      var voltmeter_bott2_h = voltmeter_bott1_h;
      var voltmeter_bott2_w = voltmeter_bott1_w;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott2_x, voltmeter_bott2_y + radius);
      ctx.lineTo(voltmeter_bott2_x, voltmeter_bott2_h);
      ctx.lineTo(voltmeter_bott2_x + voltmeter_bott2_w, voltmeter_bott2_h);
      ctx.lineTo(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      var bott2_voltmeter_imgX =
        (voltmeter_bott2_x + voltmeter_bott2_w - voltmeter_bott2_x) / 2 +
        voltmeter_bott2_x;
      var bott2_voltmeter_imgY = voltmeter_bott2_h;
      ctx.fillText(
        "UW电压",
        bott2_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // // 电压表3 左边圆心坐标=======================
      var voltmeter_bott3_x =
        voltmeter_bott2_x + voltmeter_bott2_w + voltmeter_jianju;
      var voltmeter_bott3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott3_x, voltmeter_bott3_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // // 虚线top1
      // // // 往上移动的距离
      var voltmeter_bott3_h = voltmeter_bott1_h;
      var voltmeter_bott3_w = voltmeter_bott2_w;
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott3_x, voltmeter_bott3_y + radius);
      ctx.lineTo(voltmeter_bott3_x, voltmeter_bott3_h);
      ctx.lineTo(voltmeter_bott3_x + voltmeter_bott3_w, voltmeter_bott3_h);
      ctx.lineTo(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // // 顶部电压表1坐标
      var bott3_voltmeter_imgX =
        (voltmeter_bott3_x + voltmeter_bott3_w - voltmeter_bott3_x) / 2 +
        voltmeter_bott3_x;
      var bott3_voltmeter_imgY = voltmeter_bott3_h;
      ctx.fillText(
        "VW电压",
        bott3_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott3_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 变阻器 对应点
      var black_spots_x = sensor2_x + (electronic_w + electronic_w / 2);
      var black_spots_y = voltmeter_top1_y;
      // 点1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, black_spots_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 变阻器icon1
      // 三角形顶点
      var vertex_x =
        ((black_spots_x - (voltmeter_top2_x + voltmeter_top2_w)) / 2) *
          (1 + 0.4) +
        (voltmeter_top2_x + voltmeter_top2_w);
      var vertex_y = black_spots_y;
      // 竖
      // 长度
      var shu_w = 10;
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y - shu_w);
      ctx.lineTo(vertex_x, vertex_y + shu_w);
      ctx.stroke();
      // 三角形
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y - shu_w * 0.8);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y + shu_w * 0.8);
      ctx.lineTo(vertex_x, vertex_y);
      ctx.stroke();
      // 点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, rectangle3_xu_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([10,3]);
      // 连接线
      ctx.setLineDash([10,3]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x, black_spots_y + radius);
      ctx.lineTo(black_spots_x, rectangle3_xu_y - radius);
      ctx.stroke();
      // 变阻器 对应点
      var black_spots_x2 = black_spots_x;
      var black_spots_y2 =
        ((rectangle3_xu_y - radius - (black_spots_y + radius)) / 2) *
          (1 - 0.4) +
        black_spots_y +
        radius;
      // 变阻器icon2
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x2 - shu_w, black_spots_y2);
      ctx.lineTo(black_spots_x2 + shu_w, black_spots_y2);
      ctx.stroke();
      // // 三角形
      ctx.beginPath();
      ctx.moveTo(black_spots_x2, black_spots_y2);
      ctx.lineTo(black_spots_x2 - shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2 + shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2, black_spots_y2);
      ctx.stroke();
      // y 轴移动720像素
      let y_move = y - 200
      // 容器 宽度 60 进行调整 
      // 绘制七条线 ali
      // 圆1
      var extra_line1X = capacitor_bottX -50; 
      var extra_line1Y = sensor6_y - electronic_h / 2;
      // 圆2
      var extra_line2X = capacitor_bottX -40;
      var extra_line2Y = sensor5_y - electronic_h / 2;
      // 圆3
      var extra_line3X = capacitor_bottX - 30;
      var extra_line3Y = capacitor_bottY;
      // 圆4
      var extra_line4X = rectangle4_xu_x + rectangle4_xu_w + radius - 45;
      var extra_line4Y = rectangle4_xu_y;
      // 圆5
      var extra_line5X = rectangle4_xu_x + rectangle4_xu_w + radius - 35;
      var extra_line5Y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // 圆6
      var extra_line6X = rectangle4_xu_x + rectangle4_xu_w + radius - 25;
      var extra_line6Y = rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2;
      // 圆7
      var extra_line7X = rectangle4_xu_x + rectangle4_xu_w + radius - 15;
      var extra_line7Y = rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3;
      // ================================顶部圆================================

      ctx.setLineDash([]);
      // 第一个圆
      ctx.beginPath();
      ctx.arc(
      extra_line1X,
      extra_line1Y + electronic_h/2 -y_move,
      radius,
      0,
      2 * Math.PI
      );
      // 第二个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line2X,
        extra_line2Y + electronic_h/2 -y_move,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第三个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line3X,
        extra_line3Y -y_move,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第四个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line4X,
        extra_line4Y -y_move,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第五个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line5X,
        extra_line5Y -y_move,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第六个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line6X,
        extra_line6Y -y_move,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第七个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line7X,
        extra_line7Y -y_move,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 绘制线
      ctx.setLineDash([]);
      // 线1
      ctx.beginPath();
      ctx.moveTo(extra_line1X,extra_line1Y + electronic_h/2 - radius);
      ctx.lineTo(extra_line1X,extra_line1Y + electronic_h/2 -y_move + radius);
      ctx.stroke();
      // 线2
      ctx.beginPath();
      ctx.moveTo(extra_line2X,extra_line2Y + electronic_h/2 - radius);
      ctx.lineTo(extra_line2X,extra_line2Y + electronic_h/2 -y_move + radius);
      ctx.stroke();
      // 线3
      ctx.beginPath();
      ctx.moveTo(extra_line3X, extra_line3Y - radius);
      ctx.lineTo(extra_line3X, extra_line3Y -y_move + radius);
      ctx.stroke();
      // 线4
      ctx.beginPath();
      ctx.moveTo(extra_line4X, extra_line4Y - radius);
      ctx.lineTo(extra_line4X, extra_line4Y -y_move + radius);
      ctx.stroke();
      // 线5
      ctx.beginPath();
      ctx.moveTo(extra_line5X, extra_line5Y - radius);
      ctx.lineTo(extra_line5X, extra_line5Y -y_move + radius);
      ctx.stroke();
      // 线6
      ctx.beginPath();
      ctx.moveTo(extra_line6X, extra_line6Y - radius);
      ctx.lineTo(extra_line6X, extra_line6Y -y_move + radius);
      ctx.stroke();
      // 线7
      ctx.beginPath();
      ctx.moveTo(extra_line7X, extra_line7Y - radius);
      ctx.lineTo(extra_line7X, extra_line7Y -y_move + radius);
      ctx.stroke();
      
      // ================================底部圆================================
      // 第一个圆
      ctx.beginPath();
      ctx.arc(
      extra_line1X,
      extra_line1Y + electronic_h/2,
      radius,
      0,
      2 * Math.PI
      );
      // 第二个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line2X,
        extra_line2Y + electronic_h/2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第三个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line3X,
        extra_line3Y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第四个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line4X,
        extra_line4Y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第五个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line5X,
        extra_line5Y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第六个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line6X,
        extra_line6Y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 第七个圆
      ctx.stroke();
        ctx.beginPath();
        ctx.arc(
        extra_line7X,
        extra_line7Y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      //  连接线


      // 绘制图片 路径 x轴 y轴 宽度 高度
      sensor.onload = function () {
        // ==============================================顶部图片==========================================
        // y 轴移动720像素
        ctx.drawImage(
          Inductors,
          Inductors_level,
          y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 传感器
        ctx.drawImage(
          sensor,
          sensor_level + electronic_w / 2,
          y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 传感器2
        ctx.drawImage(
          sensor,
          sensor2_x + electronic_w / 2,
          sensor2_y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 传感器3
        ctx.drawImage(
          sensor,
          sensor3_x + electronic_w / 2,
          sensor3_y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 传感器4
        ctx.drawImage(
          sensor,
          sensor4_x + electronic_w / 2,
          sensor4_y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 传感器5
        ctx.drawImage(
          sensor,
          sensor5_x + electronic_w / 2,
          sensor5_y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 传感器6
        ctx.drawImage(
          sensor,
          sensor6_x + electronic_w / 2,
          sensor6_y - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 电压表
        ctx.drawImage(
          ammeter,
          ammeter1_level - electronic_w / 2,
          center_r2_y - (center_r2_y - y) / 2 - electronic_h / 2  - y_move,
          electronic_w,
          electronic_h
        );
        // 顶部电压表1
        ctx.drawImage(
          ammeter,
          top1_voltmeter_imgX - electronic_w / 2,
          top1_voltmeter_imgY - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 顶部电压表2
        ctx.drawImage(
          ammeter,
          top2_voltmeter_imgX - electronic_w / 2,
          top2_voltmeter_imgY - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 底部电压表1
        ctx.drawImage(
          ammeter,
          bott1_voltmeter_imgX - electronic_w / 2,
          bott1_voltmeter_imgY - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 底部电压表2
        ctx.drawImage(
          ammeter,
          bott2_voltmeter_imgX - electronic_w / 2,
          bott2_voltmeter_imgY - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );
        // 底部电压表3
        ctx.drawImage(
          ammeter,
          bott3_voltmeter_imgX - electronic_w / 2,
          bott3_voltmeter_imgY - electronic_h / 2 - y_move,
          electronic_w,
          electronic_h
        );


        // ==============================================底部图片==========================================
        // 图片1
        ctx.drawImage(
          Inductors,
          Inductors_level,
          y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器
        ctx.drawImage(
          sensor,
          sensor_level + electronic_w / 2,
          y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器2
        ctx.drawImage(
          sensor,
          sensor2_x + electronic_w / 2,
          sensor2_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器3
        ctx.drawImage(
          sensor,
          sensor3_x + electronic_w / 2,
          sensor3_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器4
        ctx.drawImage(
          sensor,
          sensor4_x + electronic_w / 2,
          sensor4_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器5
        ctx.drawImage(
          sensor,
          sensor5_x + electronic_w / 2,
          sensor5_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器6
        ctx.drawImage(
          sensor,
          sensor6_x + electronic_w / 2,
          sensor6_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 电压表
        ctx.drawImage(
          ammeter,
          ammeter1_level - electronic_w / 2,
          center_r2_y - (center_r2_y - y) / 2 - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 顶部电压表1
        ctx.drawImage(
          ammeter,
          top1_voltmeter_imgX - electronic_w / 2,
          top1_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 顶部电压表2
        ctx.drawImage(
          ammeter,
          top2_voltmeter_imgX - electronic_w / 2,
          top2_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表1
        ctx.drawImage(
          ammeter,
          bott1_voltmeter_imgX - electronic_w / 2,
          bott1_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表2
        ctx.drawImage(
          ammeter,
          bott2_voltmeter_imgX - electronic_w / 2,
          bott2_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表3
        ctx.drawImage(
          ammeter,
          bott3_voltmeter_imgX - electronic_w / 2,
          bott3_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
      };


    },
  },
  // 挂载后
  mounted() {
    // this.fun_circuitFig1(1600, 800, 50, 300);
    this.fun_circuitFig(1800, 900, 280, 200);
  },
};
</script>
