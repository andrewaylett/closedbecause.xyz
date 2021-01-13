const detectFrontmatter = require('remark-frontmatter')
const visit = require('unist-util-visit')
const remove = require('unist-util-remove')
const yaml = require('yaml')

const extractFrontmatter = () => (tree, file) => {
    visit(tree, 'yaml', (node) => {
        file.data.frontmatter = Object.assign(
            {
                title: file.stem,
            },
            yaml.parse(node.value)
        )
    })
    remove(tree, 'yaml')
}

const withMDX = require('@next/mdx')({
    options: {
        remarkPlugins: [detectFrontmatter, extractFrontmatter],
    },
})
module.exports = withMDX({
    webpack(config, { dev }) {
        if (!dev) {
            config.devtool = 'source-map'
            for (const plugin of config.plugins) {
                if (plugin['constructor']['name'] === 'UglifyJsPlugin') {
                    plugin.options.sourceMap = true
                    break
                }
            }
        }
        return config
    },
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
