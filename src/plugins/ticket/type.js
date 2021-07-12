// 百度智慧云请求地址公告部分
const prefix = 'https://aip.baidubce.com/rest/2.0/ocr/v1/'
// https://aip.baidubce.com/
// https://dev.cninct.com/PMAI_AIP_DEV/

/**
 * 增值税发票
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/nk3h7xy2t
 */
export const VAT_INVOICE = `${prefix}vat_invoice`
/**
 * 定额发票
 * https://ai.baidu.com/ai-doc/OCR/lk3h7y4ev
 */
export const QUOTA_INVOICE = `${prefix}quota_invoice`
/**
 * 通用机打发票
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/Pk3h7y06q
 */
export const INVOICE = `${prefix}invoice`
/**
 * 火车票识别
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/Ok3h7y35u
 */
export const TRAIN_TICKET = `${prefix}train_ticket`
/**
 * 出租车票识别
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/Zk3h7xxnn
 */
export const TAXI_RECEIPT = `${prefix}taxi_receipt`
/**
 * 行程单识别
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/Qk3h7xzro
 */
export const AIR_TICKET = `${prefix}air_ticket`
/**
 * 汽车票识别
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/Kkblx01ww
 */
export const BUS_TICKET = `${prefix}bus_ticket`
/**
 * 通行费发票识别
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/1kbpyx8js
 */
export const TOLL_INVOICE = `${prefix}toll_invoice`
/**
 * 通用票据识别
 * 接口描述: https://ai.baidu.com/ai-doc/OCR/6k3h7y11b
 */
export const RECEIPT = `${prefix}receipt`