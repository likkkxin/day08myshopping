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
