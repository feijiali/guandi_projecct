import axios from "axios"
import { Loading } from 'element-ui';
import { Message, MessageBox } from "element-ui";
/**
 * 发票识别
 * @param {String} apiUrl 接口请求地址 ./type
 * @param {Object} data 数据
 * @param {String} token 百度智慧云token
 */
export function invoiceCheck(apiUrl, data, token) {
    let FD = new FormData()
    for (let key in data) {
        FD.append(key, data[key])
    }
    let loadingInstance = Loading.service({
        lock: true,
        customClass:'text-white',
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
        text: "正在识别发票"
    });
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${apiUrl}?access_token=${token}`,
            data: FD,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            loadingInstance.close();
            if (!res.data.words_result) {
                Message({
                    showClose: true,
                    message: "发票识别失败，您可以自己填写相关内容",
                    type: "error",
                });
                return
            }
            // resolve(res.data.words_result)
            MessageBox.confirm('发票成功识别成功， 是否填充识别的内容?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success',
            }).then(() => {
                resolve(res.data.words_result)
            }).catch(() => {

            });
        }).catch(error => {
            reject(error)
            loadingInstance.close();
            Message({
                showClose: true,
                message: "发票识别失败，您可以自己填写相关内容",
                type: "error",
            });
        })
    })
}
/**
 * 获取百度智慧云token
 * https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu
 */
let dev_url = 'https://dev.cninct.com/PMAI_AIP_DEV'
if (process.env.VUE_APP_MODE!='dev') {
    dev_url = 'https://build.cninct.com/PMAI_AIP'
}
export function authToken() {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${dev_url}/oauth/2.0/token?grant_type=client_credentials&client_id=EGKT9VOo7wTFKAfmmqUaUDAx&client_secret=BgiHLIiDMDVNC7BV8Cp6Orf278g0ZwDW`
        }).then(res => {
            resolve(res.data)
        }).catch(erroe => {
            reject(erroe)
        })
    })
}