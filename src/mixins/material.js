import { mapGetters } from 'vuex'

export const listMixin = {
    data() {
        return {
            isShow: this.$route.meta.isProject
        }
    },
    mounted() {
        // this.getPartmentList()
    },
    methods: {
        // 改变筛选条件
        handleConChange(val) {
            this.listQuery = this.$utils.mergeListQuery(this.listQuery, val)
            this.refreshData()
        }, // 导入
        handleImport() {
            this.$refs.import.show()
        },
        // 文件上传成功
        handleImported() {
            this.refreshData()
            this.$refs.import.cancel()
            this.$refs.conditions && (this.$refs.conditions.getPartmentList());
        },
        // 导出
        handleExport() {
            this.$utils.handleExport(this.exportURL, this.listQuery, this.exportFilename)
        },
        // 编辑
        handleEdit(row) {
            this.$store.commit('material/SET_RECEPT_AND_SEND_INFO', row)
            this.$router.linkTo(this.editRouteName)
        },
        // 删除
        handleDelete() {
            let args = Array.prototype.slice.call(arguments, 0)
            this.deleteFun(...args, () => {
                this.$refs.conditions && (this.$refs.conditions.getPartmentList());
            });
        }, // 筛选条件后重新请求数据
        refreshData() {
            this.currentPage = 1
            this.tableData = []
            this.totalcount = 0
            this.getList()
        }
    }
}
export const editMixin = {
    data() {
        return {
            isShow: this.$route.meta.isProject,
            info: JSON.parse(JSON.stringify(this.$store.state.material.receptAndSendInfo)),
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                await this.checkField()
                await this.submit()
                this.goBackWithTip()
            } catch (error) {
                console.error(error)
            }
        },
        // check the form
        async checkField() {

            // lazy load
            const { [this.rulesKey]: rules } = await import('@/constants/material.js')
            // change the type of count and money base rules

            if (!this.$utils.ruleFormPro(this, rules, this.info)) {
                return Promise.reject('校验失败')
            }
        },
        // send form info
        async submit() {
            try {
                // lazy load
                const { [this.rulesKey]: rules } = await import('@/constants/material.js')

                // unFormatKey
                const unFormatKey = new Set(this.unFormatList)

                for (const key in rules) {
                    !unFormatKey.has(key) && (this.info[key] = parseFloat(this.info[key]));
                }
                return await api[this.updateURL](this.info)
            } catch (error) {
                return Promise.reject('编辑失败', error)
            }
        },
        goBackWithTip() {
            this.$tip({
                isTip: false,
                closeTime: 1000,
                func: () => {
                    this.$router.go(-1)
                }
            })
        }
    }
}
export const importMixin = {
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            },
        }
    },
    computed: {
        projectList() {
            return this.$store.getters.organProject;
        },
    },
    methods: {
        async handleSubmit() {
            try {
                // 校验
                await this.checkFrom()

                await this.submit()

                this.$emit('complete')
            } catch (error) {
                console.error(error)
            }
        },
        async submit() {
            const FD = new FormData()

            for (const key in this.params) {
                FD.append(key, this.params[key])
            }
            FD.append('uploadFile', this.fileList[0].raw)

            try {
                return await api[this.importURL](FD)
            } catch (e) {
                return Promise.reject('导入失败!')
            }
        }
    }
}
export const tableMixin = {
    props: ['data', 'currentPage', 'pageSize'],
    watch: {
        data: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.$refs.table.doLayout()
                })
            }
        }
    },
    methods: {
        //表格添加类名
        tableRowClassName({ row }) {
            if (row.weight_state > 0) {
                return 'text3'
            }
        },
        editFun(val) {
            this.$emit('edit', val)
        },
        deleteFun(val) {
            this.$emit('delete', false, val, this.idKey, this.deleleURL)
        }
    }
}
export const conditionMixin = {
    data() {
        return {
            isProject: this.$route.meta.isProject,
            allId: this.$organ_id_en_or_pro(this), // 选中全部时的id
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    computed: {
        projectList() {
            return this.$store.getters.organProject;
        },
        ...mapGetters({
            subject_label: 'subject_label'
        })
    },
    async created() {
        // if (!this.isProject) {
        // await this.getProjectList()
        // }
    },
    methods: {
        // async getProjectList() {
        //     const requestData = {
        //         organ_type: 30,
        //         organ_node: this.$organ_id_en_or_pro(this)
        //     }
        //     try {
        //         const res = await api.queryOrgan(requestData)
        //         this.projectList = res.result
        //         this.$store.commit('material/SET_PROJECT_LIST', this.projectList)
        //     } catch (error) {
        //         console.error(error)
        //     }
        // },
        handleMonthChange() {
            this.changeConditions()
        },
        async handleImport() {
            // 默认第一个工区
            this.$store.commit('material/SET_PROJECT_ID', this.projectList[0].organ_id)
            const requestData = {
                organ_type_node: '60,61',
                organ_node: this.projectList[0].organ_id
            }

            // 拿第一个工区的id。获取到部门id
            try {
                const res = await api.queryOrgan(requestData)
                this.$store.commit('material/SET_PARTMENT_LIST', res.result)
            } catch (error) {
                console.error(error)
            }

            this.$emit('import')
        },
        handleExport() {
            this.$emit('export')
        },
        changeConditions() {
            this.$emit('change', this.conditions)
        }
    }
}
