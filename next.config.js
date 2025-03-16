/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ["localhost"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
				port: "",
			},
		],
	},
	webpack: (config, { isServer }) => {
		// Add a specific rule to handle the private class fields in undici
		config.module.rules.push({
			test: /node_modules[\\/]cheerio[\\/]node_modules[\\/]undici[\\/].*\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: [
						'@babel/plugin-proposal-private-methods',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-private-property-in-object'
					]
				}
			}
		});
		
		return config;
	}
};

module.exports = nextConfig;