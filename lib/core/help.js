const program = require('commander');

const helpOptions = () => {
  // 增加自己的options
  program.option('-w --why', 'a why cli');
  //在使用指令的后面加上可选参数，可以在程序中通过program获取，（program是导入的）
  //例如：wyf -d /src/components ; 在程序中可以通过program.dest获取
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')
  program.option('-f --framework <framework>', 'your frameword')
  //监听指令
  program.on('--help', function () {
    console.log("");
    console.log("Other:")
    console.log("  other options~");
  })
}

module.exports = helpOptions;

// 1.Buffer
// 2.理论: 事件循环(浏览器/Node)
