export default {
	data() {
		return {
			isScroll: false
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.isScrollFun()
		})

	},
	methods: {
		// 判断本页面是否出现了滚动条，如果有则让提交按钮跟随内容走，如果没有，则将提交按钮定位到右下角
		isScrollFun(val) {			
			this.$nextTick(() => {
				const scrollbox = $('.form-box>.el-scrollbar__wrap').height();
				const scrollboxInner = $('.el-form-box').height();
				if (scrollbox <scrollboxInner) { //说明出现了滚动条
					this.isScroll = true;
				}else{
					this.isScroll = false;
				}
			})
		},
	}
}
