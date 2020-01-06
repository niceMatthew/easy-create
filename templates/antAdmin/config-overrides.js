const path = require('path');
const { override, fixBabelImports, addWebpackAlias, enableEslintTypescript } = require('customize-cra');

/**
 *  设置打包输出的公共路径
 * @param { webpack配置 } config 
 * @param { 当前运行环境 } env 
 */
function setPublicPath(config, env) {

  // 开发环境不做修改
  if (env === 'development') {
      return config;
  } else {
      const publicPath = process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/' : '/';
      config.output.publicPath = publicPath;
      return config;
  }
}

/**
* antd按需加载
*/
function babelPluginImportInject() {
  return fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
  });
}

/**
* 添加webpack对less的处理，开启css Module
* @param { webpack配置 } config 
* @param { 当前运行环境 } env 
*/
function lessLoader(config, env) {
  const rule = {
      test: /\.less$/,
      use: [ 'style-loader', {
          loader: 'css-loader',
          options: {
              modules: true,
              localsConvention: 'camelCase'       // css-loader 3.1.0配置项
          }
      }, 'less-loader']
  }
  config.module.rules[2].oneOf.unshift(rule);

  return config;
}

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(
    setPublicPath,
    babelPluginImportInject(),
    addWebpackAlias({
        '@': path.resolve(__dirname, './src')
    }),
    enableEslintTypescript()
)
}