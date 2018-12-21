const { resolve } = require('path');

const fileBaseName = 'bundle';

var exports = module.exports = { fileBaseName };

exports.baseConfigs = {
	entry: resolve('src', 'index.tsx'),
	output: {
		libraryTarget: 'umd',
		filename: `${fileBaseName}.js`
	},
	module: {
		rules: [
			{
				test: /\.ts|tsx?$/,
				include: resolve(__dirname, '..'),
				loader: 'awesome-typescript-loader'
			}
		]
	},

	resolve: {
		modules: [resolve('node_modules'), resolve('src')],
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	}
}
