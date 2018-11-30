const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const configs = require('./webpack.config.js');

module.exports = merge(configs.baseConfigs, {
	mode: 'production',
	optimization: { minimize: true },
	output: {
		filename: path.join(`${configs.fileBaseName}.[chunkhash].js`)
	},
	plugins: [
		new webpack.DefinePlugin({
			'process_env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
});
