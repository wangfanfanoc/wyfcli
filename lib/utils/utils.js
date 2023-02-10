const path = require('path');
const fs = require('fs');

const ejs = require('ejs');//安装，引入ejs

//模板编译函数
const compile = (templateName, dataConfig) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition); //模版路径 绝对路径

  return new Promise((resolve, reject) => {
                                //data 传入ejs模版
    ejs.renderFile(templatePath, {data:dataConfig} , {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(result);
    })
  })
}

// source/components/category/why
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
}


const writeToFile = (path, content) => {
  // 判断path是否存在, 如果不存在, 创建对应的文件夹
  return fs.promises.writeFile(path, content);
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}

