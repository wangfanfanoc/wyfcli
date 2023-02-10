#!/usr/bin/env node
//sheba  一种指令，根据配置的环境，来执行文件。

//在package.json里配置bin，之后运行npm link 进行连接。
//之后输入wyf 就等于node index.js


//先安装，引入commander
const program = require('commander');

const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create');

//定义版本号  从package.json中取版本号
program.version(require('./package.json').version);

//帮助和可选信息（可选参数）
helpOptions();

// 创建其他指令
createCommands();


//解析终端指令 放在最后  //process 是进程对象，process.argv是一个数组，命令后的参数从数组[2]开始
program.parse(process.argv);
