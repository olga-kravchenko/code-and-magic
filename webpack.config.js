const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/backend.js`,
    `./js/wizard-data.js`,
    `./js/avatar.js`,
    `./js/modal.js`,
    `./js/move-modal.js`,
    `./js/wizards-setting.js`,
    `./js/input.js`,
    `./js/main.js`,
    `./js/game-setting.js`,
    `./js/stat.js`,
    `./js/game.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
