import oa from './oa'
import approval from './approval'
import news from './news'
import organization from './organization'
import messageConfig from './messageConfig'
import backstage from './backstage'
import authority from './authority'
import weekSetting from './weekSetting'
import summary from './summary'
import engineering from './engineering'
import material from './material'
import safety3 from './safety3'
import wisdom from './wisdom'
import business from './business'

import { BasicLayout } from '@/layouts'
const Routes = [
    {
        path: '/enterprise',
        name: 'enterprise',
        component: BasicLayout,
        children: [
            ...messageConfig,
            ...backstage,
            ...summary,
            ...oa,
            ...business,
            ...organization,
            ...authority,
            ...weekSetting,
            ...approval,
            ...news,
            ...engineering,
            ...material,
            ...safety3,
            ...wisdom,
        ]
    }
]
export default Routes
