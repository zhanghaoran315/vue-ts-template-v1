<script setup lang="ts">
import { onMounted, reactive } from 'vue';

const props = defineProps(['configInfo']);

const defaultConfig = {
  codeLength: 4,
  identifyCode: '',
  identifyCodes: '1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZ',
  fontSizeMin: 25,
  fontSizeMax: 35,
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  colorMin: 50,
  colorMax: 160,
  lineColorMin: 40,
  lineColorMax: 180,
  dotColorMin: 0,
  dotColorMax: 255,
  contentWidth: 112,
  contentHeight: 40
};

const config = reactive({ ...defaultConfig, ...props.configInfo });

// 外部表单检验之后借组件实例回调
function verify(value = '') {
  return value.toUpperCase() === config.identifyCode.toUpperCase();
}

// 外部借组件实例回调
function refreshCode() {
  config.identifyCode = '';
  makeCode();
  drawPic();
}

function makeCode() {
  for (let i = 0; i < config.codeLength; i++) {
    config.identifyCode += config.identifyCodes[randomNum(0, config.identifyCodes.length)];
  }
}

function drawPic() {
  const canvas = document.getElementById('s-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return
  ctx.textBaseline = 'bottom';
  // 绘制背景
  ctx.fillStyle = randomColor(config.backgroundColorMin, config.backgroundColorMax);
  ctx.fillRect(0, 0, config.contentWidth, config.contentHeight);
  // 绘制文字
  for (let i = 0; i < config.identifyCode.length; i++) {
    drawText(ctx, config.identifyCode[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
}

function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min: number, max: number) {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function drawText(ctx: any, txt: string, i: number) {
  ctx.fillStyle = randomColor(config.colorMin, config.colorMax);
  ctx.font = randomNum(config.fontSizeMin, config.fontSizeMax) + 'px SimHei';
  const x = (i + 1) * (config.contentWidth / (config.identifyCode.length + 1));
  const y = randomNum(config.fontSizeMax, config.contentHeight - 5);
  const deg = randomNum(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 270);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 270);
  ctx.translate(-x, -y);
}

function drawLine(ctx: any) {
  // 绘制干扰线
  for (let i = 0; i < 2; i++) {
    ctx.strokeStyle = randomColor(config.lineColorMin, config.lineColorMax);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, config.contentWidth), randomNum(0, config.contentHeight));
    ctx.lineTo(randomNum(0, config.contentWidth), randomNum(0, config.contentHeight));
    ctx.stroke();
  }
}

function drawDot(ctx: any) {
  // 绘制干扰点
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, config.contentWidth), randomNum(0, config.contentHeight), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}

onMounted(() => {
  refreshCode();
});

defineExpose({
  refreshCode,
  verify
});
</script>

<template>
  <canvas id="s-canvas" @click="refreshCode" :width="config.contentWidth" :height="config.contentHeight"></canvas>
</template>
