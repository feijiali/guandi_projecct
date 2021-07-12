<template>
    <vuescroll ref="scroll" :ops="ops" @handle-scroll="handleScroll">
        <slot></slot>
    </vuescroll>
</template>

<script>
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
/**
 * 详细配置
 * vuescroll
 */
export default {
    props: {
        keepShow: {
            type: Boolean,
            default: false
        }
    },
    components: {
        vuescroll
    },
    data() {
        return {
            ops: {
                vuescroll: {
                    mode: 'native',
                    sizeStrategy: 'percent'
                },
                scrollPanel: {},
                rail: {
                    background: 'transparent',
                    keepShow: this.keepShow
                },
                bar: {
                    background: '#D1D4E2',
                    opacity: 0.7,
                    size: '10px',
                    keepShow: this.keepShow
                }
            }
        }
    },
    methods: {
        handleScroll(vertical, horizontal) {
            if (vertical.process == 1) {
                this.$emit('handleload')
            }
        }
    }
}
</script>

<style></style>
