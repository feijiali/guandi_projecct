let timer
export default {
    data() {
        return {
            flag: false
        }
    },
    methods: {
        throttle() {
            if(this.flag){
                return
            }
            this.flag = true;
             timer = setTimeout(() => {
                this.flag = false;
            }, 2000);
        }
    },
    beforeDestroy(){
        clearTimeout(timer)
    }
}
