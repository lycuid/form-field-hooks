const webpack = require('webpack');
const merge = require('webpack-merge');
const configs = require('./webpack.config.js');

module.exports = merge(configs.baseConfigs, {
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	]
});
