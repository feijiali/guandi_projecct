import Vue from 'vue';

Vue.directive('selectHideScroll', {
	bind(el, binding, vnode, oldVnode) {
		const SELECTWRAP_DOM = el.querySelector('.el-scrollbar__wrap');		
		SELECTWRAP_DOM.addEventListener('scroll', function() {
			let sign = 50;
			if (this.scrollTop >= sign) {
				binding.value();
			}
		});
	}
})
