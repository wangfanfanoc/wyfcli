
const path = require('path');

const { promisify } = require('util');

// callback -> promisify(函数) -> Promise -> async await
const download = promisify(require('download-git-repo')); //安装，导入download。包装为promise

const open = require('open');  //安装，导入，打开浏览器

const { vueRepo } = require('../config/repo-config'); //导入下载地址
const { commandSpawn } = require('../utils/terminal');  //导入封装的子进程
const { compile, writeToFile, createDirSync } = require('../utils/utils');


//运行指令 wyf create project (可选参数)
                       //project 是参数 , options 是可选参数
const createProjectAction = async (project,options) => {
  console.log("wyf helps you create your project~")

  // 1.从仓库clone项目  
  await download(vueRepo, project, { clone: true });//仓库地址，目标地址，可选参数

  // 2.执行npm install （需要开启一个新进程）
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'; //判断当前系统环境
  await commandSpawn(command, ['install'], { cwd: `./${project}` }) // cwd运行目录 

  // 3.运行npm run serve （需要开启一个新进程）
     //不要有await， 不然一直阻塞
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });  

  // 4.打开浏览器
  open("http://localhost:8080/");
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result是组件内容(字符串）
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()});

  // 2.将result写入到目标文件
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log(targetPath);
  writeToFile(targetPath, result);
}


// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {name, lowerName: name.toLowerCase()};
  const pageResult = await compile('vue-component.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
}

const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}