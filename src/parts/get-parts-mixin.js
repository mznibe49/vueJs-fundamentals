export default {
    created() {
        this.$store.dispatch('getParts');
    },
    computed: {
        parts() {
            // we retur default value if the store is null
            return this.$store.state.robots.parts || {
                heads: [],
                arms: [],
                torsos: [],
                bases: []
            };
        }
    }
};