const InfoKey = 'hm_shopping_info'
// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(InfoKey)
  return result
    ? JSON.parse(result)
    : {
        token: '',
        userId: ''
      }
}
// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(InfoKey, JSON.stringify(info))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(InfoKey)
}
// 搜索里历史本地存储
const HISTORY_KEY = 'hm_history_list'
// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
