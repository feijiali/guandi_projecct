export const calcConfig = {
    lastRemain: {
        title: '上月结余',
        countKey: 'material_standing_book_last_num',
        moneyKey: 'material_standing_book_last_money'
    },
    currentInput: {
        title: '本月收入',
        countKey: 'material_standing_book_receive_num',
        moneyKey: 'material_standing_book_receive_money'
    },
    currentOutput: {
        title: '本月发出',
        countKey: 'material_standing_book_out_num',
        moneyKey: 'material_standing_book_out_money'
    },
    totalInput: {
        title: '累计收入',
        countKey: 'material_standing_book_receive_total_num',
        moneyKey: 'material_standing_book_receive_total_money'
    },
    totalOutput: {
        title: '累计发出',
        countKey: 'material_standing_book_out_total_num',
        moneyKey: 'material_standing_book_out_total_money'
    },
    currentRemain: {
        title: '本月结存',
        countKey: 'material_standing_book_month_num',
        moneyKey: 'material_standing_book_month_money'
    }
}
export const RECEPT_EDIT_RULES = {
    material_standing_book_date: [
        {
            required: true,
            message: '请选择月份'
        }
    ],
    material_standing_book_last_num: [
        {
            required: true,
            message: '请输入上月结余数量'
        }
    ],
    material_standing_book_last_money: [
        {
            required: true,
            message: '请输入上月结余金额'
        }
    ],
    material_standing_book_receive_num: [
        {
            required: true,
            message: '请输入本月收入数量'
        }
    ],
    material_standing_book_receive_money: [
        {
            required: true,
            message: '请输入本月收入金额'
        }
    ],
    material_standing_book_out_num: [
        {
            required: true,
            message: '请输入本月发出数量'
        }
    ],
    material_standing_book_out_money: [
        {
            required: true,
            message: '请输入本月发出金额'
        }
    ],
    material_standing_book_receive_total_num: [
        {
            required: true,
            message: '请输入累计收入数量'
        }
    ],
    material_standing_book_receive_total_money: [
        {
            required: true,
            message: '请输入累计收入金额'
        }
    ],
    material_standing_book_out_total_num: [
        {
            required: true,
            message: '请输入累计发出数量'
        }
    ],
    material_standing_book_out_total_money: [
        {
            required: true,
            message: '请输入累计发出金额'
        }
    ],
    material_standing_book_month_num: [
        {
            required: true,
            message: '请输入本月结存数量'
        }
    ],
    material_standing_book_month_money: [
        {
            required: true,
            message: '请输入本月结存金额'
        }
    ]
}
export const TURNOVER_IMPORT_RULES = {
    tab_exam_depart_name: [
        {
            required: true,
            message: '请选择填报部门'
        }
    ],
    tab_exam_date: [
        {
            required: true,
            message: '请选择月份'
        }
    ]
}
export const TURNOVER_EDIT_RULES = {
    material_money_standing_book_date: [
        {
            required: true,
            message: '请选择月份'
        }
    ],
    material_money_standing_book_money: [
        {
            required: true,
            message: '请输入原值'
        }
    ],
    material_money_standing_book_use_money: [
        {
            required: true,
            message: '请输入本期使用费'
        }
    ],
    material_money_standing_book_amortize_money: [
        {
            required: true,
            message: '请输入本期摊销费'
        }
    ],
    material_money_standing_book_worth_money: [
        {
            required: true,
            message: '请输入净值'
        }
    ]
}
export const SELF_IMPORT_RULES = {
    tab_exam_depart_name: [
        {
            required: true,
            message: '请选择填报部门'
        }
    ],
    tab_exam_date: [
        {
            required: true,
            message: '请选择导入日期'
        }
    ]
}
export const SELF_EDIT_RULES = {
    equipment_standing_book_no: [
        {
            required: true,
            message: '请输入资产编号'
        }
    ],
    equipment_standing_book_name: [
        {
            required: true,
            message: '请输入资产名称'
        }
    ],
    equipment_standing_book_spec: [
        {
            required: true,
            message: '请输入型号规格'
        }
    ],
    equipment_standing_book_level: [
        {
            required: true,
            message: '请输入生产能力'
        }
    ],
    equipment_standing_book_factor: [
        {
            required: true,
            message: '请输入生产厂家'
        }
    ],
    equipment_standing_book_factor_no: [
        {
            required: true,
            message: '请输入出厂编号'
        }
    ],
    equipment_standing_book_year: [
        {
            required: true,
            message: '请输入购置年限'
        }
    ],
    equipment_standing_book_addr: [
        {
            required: true,
            message: '请输入停放地点'
        }
    ]
}
export const LEASE_IMPORT_RULES = {
    tab_exam_depart_name: [
        {
            required: true,
            message: '请选择填报部门'
        }
    ]
}
export const LEASE_EDIT_RULES = {
    equipment_lease_standing_book_no: [
        {
            required: true,
            message: '请输入自编编号'
        }
    ],
    equipment_lease_standing_book_name: [
        {
            required: true,
            message: '请输入设备名称'
        }
    ],
    equipment_lease_standing_book_spec: [
        {
            required: true,
            message: '请输入型号规格'
        }
    ],
    equipment_lease_standing_book_factor: [
        {
            required: true,
            message: '请输入生产厂家'
        }
    ],
    equipment_lease_standing_book_lease: [
        {
            required: true,
            message: '请输入出租公司'
        }
    ],
    equipment_lease_standing_book_lease_info: [
        {
            required: true,
            message: '请输入价格说明'
        }
    ],
    equipment_lease_standing_book_username: [
        {
            required: true,
            message: '请输入登记姓名'
        }
    ],
    equipment_lease_standing_book_phone: [
        {
            required: true,
            message: '请输入登记电话'
        }
    ],
    equipment_lease_standing_book_state: [
        {
            required: true,
            message: '请输入状态'
        }
    ],
    equipment_lease_standing_book_start_time: [
        {
            required: true,
            message: '请选择起租日期'
        }
    ],
    equipment_lease_standing_book_end_time: [
        {
            required: true,
            message: '请选择终租日期'
        }
    ]
}
