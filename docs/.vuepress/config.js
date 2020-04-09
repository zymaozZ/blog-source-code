module.exports = {
    title: 'zymao',
    description: '我爱学习学习爱我',
    serviceWorker: true,
    head: [ 
        // 标签栏里的头像
        // ['link', { rel: 'icon', href: '/img/base/logo.jpg' }], 
    ],
    base: '/', 
    markdown: {
        // 代码块显示行号
        lineNumbers: true
    },
    theme: 'reco',
    themeConfig: {
        author: 'zymao',
        type: 'blog',
        authorAvatar: '/img/base/avatar.png',
        friendLink: [
            {
                title: 'github',
                desc: '我的github主页',
                logo: "/img/base/github.png",
                link: 'https://github.com/zymaozZ',
                email: 'recoluan@qq.com'
            },
            {
                title: '掘金',
                desc: '我的掘金主页',
                logo: "https://b-gold-cdn.xitu.io/v3/static/img/simplify-logo.3e3c253.svg",
                link: 'https://juejin.im/user/57c5c9f4a341316fa6340e9a'
            }
        ],
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            }
        },
        nav: [
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: 'Github', link: 'https://github.com/zymaozZ/', target: '_blank', icon: 'reco-github' }
        ],
        sidebar: 'auto',
        sidebarDepth: 2
    }
}
