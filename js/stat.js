'use strict';

(() => {
  const CLOUD_WIDTH = 500;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const GAP = 10;
  const BAR_GAP = 50;
  const BAR_WIDTH = 40;
  const maxBarHeight = 150;
  const barEnd = 240;

  const renderCloud = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const renderText = (ctx, x, y, text) => {
    ctx.fillStyle = `#000`;
    ctx.font = `16px PT Mono`;
    ctx.textBaseline = `hanging`;
    ctx.fillText(text, x, y);
  };

  const renderBar = (ctx, x, yTextName, yRect, yTextTime, color, name, barWidth, barHeight, time) => {
    renderText(ctx, x, yTextName, name);
    ctx.fillStyle = color;
    ctx.fillRect(x, yRect, barWidth, barHeight);
    renderText(ctx, x, yTextTime, time);
  };

  window.renderStatistics = (ctx, names, times) => {
    const maxTime = Math.max(...times);
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);
    renderText(ctx, 140, 30, `Ура вы победили!`);
    renderText(ctx, 140, 50, `Список результатов:`);
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const time = Math.round(times[i]);
      const barHeight = (time / maxTime * maxBarHeight);
      if (name === `Вы`) {
        renderBar(ctx, CLOUD_X + GAP + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, barEnd + GAP, barEnd - barHeight, barEnd - barHeight - 2 * GAP, `rgba(255, 0, 0, 1)`, name, BAR_WIDTH, barHeight, time);
      } else {
        renderBar(ctx, CLOUD_X + GAP + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, barEnd + GAP, barEnd - barHeight, barEnd - barHeight - 2 * GAP, `hsl(240, ${window.util.getRandomNumber(20, 100)}%, 50%)`, name, BAR_WIDTH, barHeight, time);
      }
    }
  };
})();
