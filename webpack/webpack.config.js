const path = require('path');

const fileBaseName = 'bundle';

var exports = module.exports = { fileBaseName };

exports.baseConfigs = {
	entry: path.resolve('src', 'index.ts'),
	output: {
		libraryTarget: 'umd',
		filename: `${fileBaseName}.js`
	},
	module: {
		rules: [
			{
				test: /\.ts|tsx?$/,
				include: path.resolve(__dirname, '..'),
				loader: 'awesome-typescript-loader'
			}
		]
	},

	resolve: {
		modules: [path.resolve('node_modules'), path.resolve('src')],
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	}
}
