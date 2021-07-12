<template>
    <div id="lease-device-code" class="code-info-wrapper">
        <header class="d-flex align-items-center ">
            <img class="logo" src="@/assets/images/guandi/icon_nav_logo.png" alt="" />
            <p class="font-32 font-weight-bolder">冠迪建设智慧管理云平台</p>
        </header>
        <section class="content bg-secondary position-relative">
            <div class="code shadow bg-white rounded-1 position-absolute">
                <img
                    style="width:200px;height:200px"
                    class="ml-1 mt-1"
                    :src="data.equipment_lease_standing_book_qrcode"
                />
                <canvas id="canvas" style="display:none"></canvas>
                <p class="text-center code-text">扫码识别设备信息</p>
            </div>
            <div class="text-wrapper">
                <p v-for="(info, index) of infoMap" :key="index">
                    <span>{{ info.label }}</span> <span>{{ data[info.key] }}</span>
                </p>
            </div>
            <div class="button-wrapper position-absolute d-flex justify-content-center">
                <n-button
                    class="mt-1 ml-08"
                    btnText="保存图片"
                    @buttonClick="handleSave"
                    :width="'150px'"
                    colorBtn="blue"
                >
                    <template v-slot:button-slot>
                        <i class="iconfont btn-btn_list_download mr-1"></i>
                    </template>
                </n-button>
                <n-button
                    class="mt-1 ml-08"
                    btnText="关闭"
                    :width="'150px'"
                    colorBtn="grey"
                    @buttonClick="handleClose"
                ></n-button>
            </div>
        </section>
    </div>
</template>
<script>
import { codeInfoMixin } from '@/mixins/device.js'

export default {
    mixins: [codeInfoMixin],
    data() {
        return {
            fileName: '租赁设备信息',
            id: '#lease-device-code',
            infoMap: [
                { label: '工程项目：', key: 'organ' },
                { label: '设备名称：', key: 'equipment_lease_standing_book_name' },
                { label: '自编编号：', key: 'equipment_lease_standing_book_no' },
                { label: '出租公司：', key: 'equipment_lease_standing_book_lease' }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.code-info-wrapper {
    margin: 0 -20px -20px -20px;
    .logo {
        width: 59px;
        height: 28px;
        margin-right: 16px;
    }
    .content {
        min-height: 234px;
        border-radius: 8px;
        margin-top: 208px;
        padding-top: 90px;
        .shadow {
            box-shadow: 0px 5px 20px 0px rgba(203, 208, 220, 0.5);
        }
        .code {
            width: 220px;
            height: 258px;
            top: -200px;
            left: 50%;
            z-index: 300;
            transform: translateX(-50%);
            .code-text {
                color: #8e95a7;
                height: 30px;
                line-height: 30px;
                letter-spacing: 2px;
            }
        }
        .text-wrapper {
            margin: 0 16px;
            p {
                margin-bottom: 16px;
                height: 20px;
                line-height: 20px;
                span {
                    font-size: 20px;
                }
            }
        }
        .button-wrapper {
            left: 0;
            right: 0;
            bottom: -120px;
        }
    }
}
</style>
