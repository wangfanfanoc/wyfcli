const program = require('commander');

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./actions');

const createCommands = () => {
  //运行指令 wyf create project (可选参数)
  program
    .command('create <project> [others...]') //指令名称，参数，可选参数
    .description('clone a repository into a folder') //描述
    .action(createProjectAction);

    
  //进入到src的父目录，再运行指令 wyf addcpn helloWord (可选参数)
  program
    .command('addcpn <name>')
    .description('add vue component, 例如: wyf addcpn HelloWorld [-d src/components]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components');//组件名称，目标文件夹
    });
  
  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: why addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouteAction(page, program.dest || 'src/pages')
    })

  program
  .command('addstore <store>')
  .description('add vue page and router config, 例如: why addpage Home [-d src/pages]')
  .action((store) => {
    addStoreAction(store, program.dest || 'src/store/modules')
  })
}


module.exports = createCommands;
