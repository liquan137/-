module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all'
  },
  chainWebpack(config) {
    config.watchOptions({
      ignored: /node_modules|\.git|unpackage|[/\\]dist[/\\]|jsencrypt[/\\]_site/
    })
  }
}
