var vm = new Vue({
    el: '#app',
    data: {
        type: 'self', // lease:租赁
        id: 0,
        env: 'dev', // prod正式
        gd: '',
        info: {},
        lists: {
            self: [
                { name: '工程项目', key: 'organ' },
                { name: '项目部', key: 'equipment_standing_book_depart' },
                { name: '资产编号', key: 'equipment_standing_book_no' },
                { name: '资产名称', key: 'equipment_standing_book_name' },
                { name: '型号规格', key: 'equipment_standing_book_spec' },
                { name: '生产能力', key: 'equipment_standing_book_level' },
                { name: '生产厂家', key: 'equipment_standing_book_factor' },
                { name: '出厂编号', key: 'equipment_standing_book_factor_no' },
                { name: '购置年限', key: 'equipment_standing_book_year' },
                { name: '停放地点', key: 'equipment_standing_book_addr' },
                { name: '导入时间', key: 'equipment_standing_book_date' }
            ],
            lease: [
                { name: '工程项目', key: 'organ' },
                { name: '项目部', key: 'equipment_lease_standing_book_depart' },
                { name: '自编编号', key: 'equipment_lease_standing_book_no' },
                { name: '设备名称', key: 'equipment_lease_standing_book_name' },
                { name: '型号规格', key: 'equipment_lease_standing_book_spec' },
                { name: '生产厂家', key: 'equipment_lease_standing_book_factor' },
                { name: '出租公司', key: 'equipment_lease_standing_book_lease' },
                { name: '价格说明', key: 'equipment_lease_standing_book_lease_info' },
                { name: '登记姓名', key: 'equipment_lease_standing_book_username' },
                { name: '登记电话', key: 'equipment_lease_standing_book_phone' },
                { name: '状态', key: 'equipment_lease_standing_book_state' },
                { name: '起租日期', key: 'equipment_lease_standing_book_start_time' },
                { name: '终租日期', key: 'equipment_lease_standing_book_end_time' }
            ]
        }
    },
    computed: {
        list() {
            if (!this.gd) {
                this.lists.self = [{ name: '资产名称', key: 'equipment_standing_book_name' },
                { name: '型号规格', key: 'equipment_standing_book_spec' },]
                this.lists.lease = [{ name: '设备名称', key: 'equipment_lease_standing_book_name' },
                { name: '型号规格', key: 'equipment_lease_standing_book_spec' },]
            }
            return this.lists[this.type]
        }
    },
    created() {
        this.getQuery()
        this.getData()
    },
    methods: {
        getQuery() {
            const query = window.location.search.slice(1);
            this.type = query.match(/type\=(\w*)/)[1];
            this.id = query.match(/id\=(\w*)/)[1] * 1
            this.env = query.match(/env\=(\w*)/)[1]
            this.gd = query.match(/gd\=(\w*)/) && query.match(/gd\=(\w*)/)[1] || ''
        },
        getData() {
            const key =
                this.type === 'self'
                    ? 'equipment_standing_book_id'
                    : 'equipment_lease_standing_book_id'
            const path =
                this.env == 'dev'
                    ? 'https://dev.cninct.com/GUANDI_DEV'
                    : 'https://build.cninct.com/GUANDI'
            const route =
                this.type === 'self'
                    ? 'QueryEquipmentStandingBook'
                    : 'QueryEquipmentLeaseStandingBook'
            const requestData = {
                [key]: this.id
            }
            const url = `${path}?op=${route}`

            axios
                .post(url, requestData)
                .then(res => {
                    if (!res.data.ext.result[0]) return
                    this.info = res.data.ext.result[0]
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
})
