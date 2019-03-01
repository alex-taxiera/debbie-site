const path = require('path')

exports.onCreateWebpackConfig = ({
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
      plugins.define({
        'global.GENTLY': false
      })
    ]
  })
}
