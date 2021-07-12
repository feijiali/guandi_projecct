
export default {
    data() {
        return {
        };
    },
    methods: {
        async queryOrganTree(organId) {
            let data = await api.queryOrganAccountCountTree({
                organ_node: organId ? organId : this.$organ_id_en_or_pro(this),
            });
            // this.$store.dispatch("app/set_organ_treedata", [
            //     {
            //         tag: this.$organ_id_en_or_pro(this),
            //         node: {
            //             organ_id: this.$organ_id_en_or_pro(this),
            //             organ_area: "全部",
            //             organ: "全部",
            //         },
            //         leaves: data.result,
            //     },
            // ]);
            this.$store.dispatch("app/set_organ_treedata", data.result);
        },
    }
};
