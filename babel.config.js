const prodPlugins = [];
// 如果是发布模式则启用的插件
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console');
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [...prodPlugins]
};
