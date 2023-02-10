  /**
 * 执行终端命令相关的代码
 */
const { spawn } = require('child_process'); //安装，导入子进程

// npm install 
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args); //childProcess是进程对象
    childProcess.stdout.pipe(process.stdout); //将子进程的信息流输出到process进程的控制台
    childProcess.stderr.pipe(process.stderr); //输出错误信息
    childProcess.on("close", () => {  //监控流的关闭
      resolve();
    })
  })
}

// const commandExec = (...args) => {
//   return new Promise((resolve, reject) => {
//     const childProcess = spawn(...args);
//     childProcess.stdout.pipe(process.stdout);
//     childProcess.stderr.pipe(process.stderr);
//     childProcess.on("close", () => {
//       resolve();
//     })
//   })
// }

module.exports = {
  commandSpawn
}
