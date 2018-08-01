export const navigation = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    },
    {
        name: '组织管理',
        url: '/basic',
        icon: 'icon-star',
        children: [
            {
                name: '用户管理',
                url: '/basic/userManage',
                icon: 'icon-star'
            },
            {
                name: '角色管理',
                url: '/basic/userManage',
                icon: 'icon-star'
            },
            {
                name: '单位管理',
                url: '/basic/userManage',
                icon: 'icon-star'
            },
            {
                name: '部门管理',
                url: '/basic/departmentManage',
                icon: 'icon-star'
            },
            {
                name: '员工管理',
                url: '/basic/staffmentManage',
                icon: 'icon-star'
            }
        ]
    },
    {
        title: true,
        name: '组织架构配置'
    },
    {
        name: 'Components',
        url: '/components',
        icon: 'icon-puzzle',
        children: [
            {
                name: 'Buttons',
                url: '/components/buttons',
                icon: 'icon-puzzle'
            },
            {
                name: 'Social Buttons',
                url: '/components/social-buttons',
                icon: 'icon-puzzle'
            },
            {
                name: 'Cards',
                url: '/components/cards',
                icon: 'icon-puzzle'
            },
            {
                name: 'Forms',
                url: '/components/forms',
                icon: 'icon-puzzle'
            },
            {
                name: 'Modals',
                url: '/components/modals',
                icon: 'icon-puzzle'
            },
            {
                name: 'Switches',
                url: '/components/switches',
                icon: 'icon-puzzle'
            },
            {
                name: 'Tables',
                url: '/components/tables',
                icon: 'icon-puzzle'
            },
            {
                name: 'Tabs',
                url: '/components/tabs',
                icon: 'icon-puzzle'
            }
        ]
    },
    {
        name: 'Icons',
        url: '/icons',
        icon: 'icon-star',
        children: [
            {
                name: 'Font Awesome',
                url: '/icons/font-awesome',
                icon: 'icon-star',
                badge: {
                    variant: 'secondary',
                    text: '4.7'
                }
            },
            {
                name: 'Simple Line Icons',
                url: '/icons/simple-line-icons',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Widgets',
        url: '/widgets',
        icon: 'icon-calculator',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    },
    {
        name: 'Charts',
        url: '/charts',
        icon: 'icon-pie-chart'
    },
    {
        divider: true
    },
    {
        title: true,
        name: '基本信息',
    },
    {
        name: 'Pages',
        url: '/pages',
        icon: 'icon-star',
        children: [
            {
                name: 'Login',
                url: '/pages/login',
                icon: 'icon-star'
            },
            {
                name: 'Register',
                url: '/pages/register',
                icon: 'icon-star'
            },
            {
                name: 'Error 404',
                url: '/pages/404',
                icon: 'icon-star'
            },
            {
                name: 'Error 500',
                url: '/pages/500',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Download CoreUI',
        url: 'http://coreui.io/angular/',
        icon: 'icon-cloud-download',
        class: 'mt-auto',
        variant: 'success'
    },
    {
        name: 'Try CoreUI PRO',
        url: 'http://coreui.io/pro/angular/',
        icon: 'icon-layers',
        variant: 'danger'
    }
];
