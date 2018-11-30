const path = require('path');

const fileBaseName = 'bundle';

var exports = module.exports = { fileBaseName };

exports.baseConfigs = {
	entry: path.resolve('src', 'index.tsx'),
	output: { filename: `${fileBaseName}.js` },
	module: {
		rules: [
			{
				test: /\.ts|tsx?$/,
				include: path.resolve(__dirname, '..'),
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
		]
	},

	resolve: {
		modules: [path.resolve('node_modules'), path.resolve('src'), path.resolve('assets')],
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
	}
}
