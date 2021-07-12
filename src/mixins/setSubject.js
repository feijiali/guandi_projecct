

export default {
    data() {
        return {
        };
    },
    methods: {
        //获取项目
        async getSubjectData(organId) {
            let data = await api.queryOrganAccountCountTree({
                organ_type_node: this.$route.meta.isProject ? '50' : "50,30",
                organ_node: organId ? organId : this.$organ_id_en_or_pro(this),
            });
            this.$store.dispatch("app/set_subject", data.result);
            this.$store.dispatch("app/set_subject_list", [
                {
                    tag: this.$organ_id_en_or_pro(this),
                    node: {
                        organ_id: this.$organ_id_en_or_pro(this),
                        organ_area: "全部",
                        organ: "全部",
                    },
                    leaves: data.result,
                },
            ]);
        },
    }
};
