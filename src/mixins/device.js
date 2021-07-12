import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas'

export const listMixin = {
    methods: {
        handleConChange(val) {
            // 将修改后的条件与之前的条件进行合并，请求数据
            this.listQuery = this.$utils.mergeListQuery(this.listQuery, val)
            this.refreshData()
        },
        // 显示二维码
        showCode(row) {
            this.infoData = row
            this.$refs.code.show()
        },
        // 编辑
        handleEdit(row) {
            this.$store.commit('material/SET_DEVICE_INFO', row)
            this.$router.linkTo(this.editRouteName)
        },
        // 删除
        handleDelete() {
            let args = Array.prototype.slice.call(arguments, 0)
            this.deleteFun(...args, () => {
                this.$refs.conditions && (this.$refs.conditions.getPartmentList());
            });
        },
        // 导出
        handleExport() {
            this.$utils.handleExport(this.exportURL, this.listQuery, this.exportFileName)
        },
        // 文件上传成功
        handleImported() {
            this.refreshData()
            this.$refs.import.cancel();
            this.$refs.conditions && (this.$refs.conditions.getPartmentList());
        },
        // 筛选条件后重新请求数据
        refreshData() {
            this.tableData = []
            this.totalcount = 0
            this.currentPage = 1
            this.getList()
        }
    }
}
export const editMixin = {
    data() {
        return {
            isShow: this.$route.meta.isProject,
            deviceInfo: JSON.parse(JSON.stringify(this.$store.state.material.deviceInfo))
        }
    },
    methods: {
        async handleSubmit() {
            try {
                await this.checkForm()

                await this.submit()

                this.goBackWithTip()
            } catch (error) {
                console.error(error)
            }
        },
        async checkForm() {
            const { [this.rulesKey]: rules } = await import('@/constants/material.js')

            if (!this.$utils.ruleFormPro(this, rules, this.deviceInfo)) {
                return Promise.reject('校验失败')
            }

            return Promise.resolve()
        },
        async submit() {
            try {
                return await api[this.updateURL](this.deviceInfo)
            } catch (error) {
                return Promise.reject('编辑失败')
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
            partmentList: this.$store.state.material.partmentList
        }
    },
    computed: {
        projectList() {
            return this.$store.getters.organProject;
        },
    },
    methods: {
        // 获取部门
        async getPartmentList() {
            const requestData = {
                organ_type_node: '60,61',
                organ_node: this.params.tab_exam_organ_id
            }

            try {
                const res = await api.queryOrgan(requestData)
                this.partmentList = res.result
            } catch (error) {
                console.error(error)
            }
        },
        async handleProjectChange() {
            this.partmentList = []

            await this.getPartmentList()

            this.params.tab_exam_depart_name = this.partmentList.length
                ? this.partmentList[0].organ
                : ''
        },
        async handleSubmit() {
            try {
                // 校验
                await this.checkFrom()

                // 提交
                await this.submit()

                this.$emit('complete')
            } catch (error) {
                console.error(error)
            }
        },
        async checkFrom() {
            const { [this.rulesKey]: rules } = await import('@/constants/material.js')
            if (!this.$utils.ruleFormPro(this, rules, this.params)) {
                return Promise.reject('校验失败')
            }

            if (!this.fileList.length) {
                this.$tip({
                    isTip: true,
                    message: '请选择台账表!'
                })
                return Promise.reject('校验失败')
            }

            return Promise.resolve()
        },
        async submit() {
            const FD = new FormData()

            for (const key in this.params) {
                FD.append(key, this.params[key])
            }
            FD.append('uploadFile', this.fileList[0].raw)

            try {
                return await api[this.submitRUL](FD)
            } catch (e) {
                return Promise.reject('导入失败!')
            }
        }
    }
}
export const conditionMixin = {
    data() {
        return {
            isProject: this.$route.meta.isProject,
            allId: this.$organ_id_en_or_pro(this), // 选中全部时的id
            partmentList: [],
            dateRange: [],
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
        await this.getPartmentList()
        // this.isProject && (await this.getPartmentList())
    },
    methods: {
        chooseDate(val) {
            this.conditions.start_time = this.dateRange ? this.dateRange[0] : ''
            this.conditions.end_time = this.dateRange ? this.dateRange[1] : ''
            this.changeConditions()
        },
        // 获取项目
        // async getProjectList() {
        //     const requestData = {
        //         organ_type: 30,
        //         organ_node: this.allId
        //     }
        //     try {
        //         const res = await api.queryOrgan(requestData)
        //         this.projectList = res.result
        //         this.$store.commit('material/SET_PROJECT_LIST', this.projectList)
        //     } catch (error) {
        //         console.error(error)
        //     }
        // },
        // 获取部门
        async getPartmentList() {
            const requestData = {
                organ_node: this.conditions.organ_node
            }

            try {
                const res = await api[this.partmentApiName](requestData)
                this.partmentList = res.result
            } catch (error) {
                console.error(error)
            }
        },
        searchFun(val) {
            this.conditions.search = val
            this.changeConditions()
        },
        handleProjectChange(val) {
            this.partmentList = []
            this.conditions.organ_node = val
            this.conditions[this.partmentKey] = '';
            if (this.allId !== val) {
                this.getPartmentList()
            }
            this.changeConditions()
        },
        handlePartmentChange(val) {
            this.conditions[this.partmentKey] = val
            this.changeConditions()
        },

        changeConditions() {
            this.$emit('change', this.conditions)
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
        }
    }
}
export const tableMixin = {
    props: ['currentPage', 'pageSize', 'tableData'],
    watch: {
        tableData() {
            this.$refs.table.doLayout()
        }
    },
    methods: {
        //表格添加类名
        tableRowClassName({ row }) {
            if (row.weight_state > 0) {
                return 'text3'
            }
        },
        showCode(val) {
            this.$emit('show-code', val)
        },
        editFun(val) {
            this.$emit('edit', val)
        },
        deleteFun(val) {
            this.$emit('delete', false, val, this.idKey, this.deleteURL)
        }
    }
}
export const codeInfoMixin = {
    props: ['data'],

    methods: {
        handleClose() {
            this.$emit('close')
        },
        handleSave() {
            this.changeShadow()
            html2canvas(document.querySelector(this.id), {
                useCORS: true,
                allowTaint: true,
                width: 481,
                height: 529
            }).then(canvas => {
                this.changeShadow()
                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob)
                    this.$utils.downloadNormalfile(url, this.fileName)
                })
            })
        },
        changeShadow() {
            let code = document.querySelector('.content .code')

            code.classList.toggle('shadow')
        }
    }
}
