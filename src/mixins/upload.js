/*
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2020-10-20 10:10:00
 */
export default {
    data() {
        return {
            picList: [], //图片
            fileList: [] //文件
        }
    },
    methods: {
        fileChange(file, fileList, name, type) {
            var fileArr = fileList
            if (type == 'video') {
                // 如果是视频，则转换地址
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].raw) {
                        fileArr[i].url = URL.createObjectURL(fileList[i].raw)
                    }
                }
                this[name] = fileArr
            } else {
                this[name] = fileArr
            }
        },
        fileRemove(file, fileList, name) {
            this[name] = fileList
        },
        //文件超过时触发
        handleExceed(file, fileList, num, type) {
            debugger
            this.$tip({
                isTip: true,
                message: `不能超过${num}个`
            })
        },
        deleteFile(fileList, ind) {
            fileList.splice(ind, 1)
        }
    }
}
