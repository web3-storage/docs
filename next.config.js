const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.jsx'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './out',
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: false,
}

module.exports = withNextra(nextConfig)
