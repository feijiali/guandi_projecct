
export default {
    data() {
        return {
        };
    },
    methods: {
        // 查询节点下的项目
        async getOrganProjectData() {
            let data = await api.queryOrgan({
                organ_type: 30,
                organ_node: this.$organ_id_en_or_pro(this),
            });
            this.$store.dispatch("app/set_organ_project", data.result);
        },
    }
};
