<template>
    <div class="address-manager">
      <h1>收货地址管理</h1>

      <!-- 显示已有地址列表 -->
      <div v-if="addresses.length">
        <h2>已有地址</h2>
        <ul>
          <li v-for="(address, index) in addresses" :key="index">
            <span>{{ address.form.name }}</span>
            <span>{{ address.form.phone }}</span>
            <span>{{ getAddressRegion(address.form.region) }}</span>
            <span>{{ address.form.detail }}</span>
            <button @click="editAddress(index)">编辑</button>
            <button @click="deleteAddress(index)">删除</button>
          </li>
        </ul>
      </div>

      <!-- 添加或编辑地址表单 -->
      <div>
        <h2 v-if="!editing">添加地址</h2>
        <h2 v-else>编辑地址</h2>
        <form @submit.prevent="saveAddress">
          <label for="name">姓名:</label>
          <input type="text" id="name" v-model="currentAddress.form.name" required><br>

          <label for="phone">电话:</label>
          <input type="text" id="phone" v-model="currentAddress.form.phone" required><br>

          <label for="region">地区:</label>
          <!-- 这里模拟地区选择，可以根据实际情况使用合适的地区选择组件 -->
          <select v-model="selectedRegion" @change="updateRegion">
            <option v-for="region in regions" :key="region.value" :value="region.value">{{ region.label }}</option>
          </select><br>

          <label for="detail">详细地址:</label>
          <input type="text" id="detail" v-model="currentAddress.form.detail" required><br>

          <button type="submit">{{ editing ? '保存' : '添加' }}</button>
        </form>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'addressPage',
  data () {
    return {
      addresses: [
        // 初始地址列表，可以是从后端获取的数据
        {
          form: {
            name: '张三',
            phone: '18912345678',
            region: [
              { value: 1, label: '北京' },
              { value: 2, label: '北京市' },
              { value: 3, label: '朝阳区' }
            ],
            detail: '天安门广场1号'
          }
        },
        {
          form: {
            name: '李四',
            phone: '18687654321',
            region: [
              { value: 4, label: '上海' },
              { value: 5, label: '上海市' },
              { value: 6, label: '浦东新区' }
            ],
            detail: '陆家嘴环路999号'
          }
        }
      ],
      currentAddress: {
        form: {
          name: '',
          phone: '',
          region: [],
          detail: ''
        }
      },
      editing: false,
      editingIndex: null,
      regions: [
        { value: 1, label: '北京' },
        { value: 2, label: '北京市' },
        { value: 3, label: '朝阳区' },
        { value: 4, label: '上海' },
        { value: 5, label: '上海市' },
        { value: 6, label: '浦东新区' }
        // 这里可以添加更多地区选项
      ],
      selectedRegion: []
    }
  },
  methods: {
    editAddress (index) {
      this.editing = true
      this.editingIndex = index
      this.currentAddress = { form: { ...this.addresses[index].form } }
      this.selectedRegion = this.currentAddress.form.region.map(region => region.value)
    },
    deleteAddress (index) {
      this.addresses.splice(index, 1)
    },
    saveAddress () {
      if (this.editing) {
        // 编辑地址
        this.addresses.splice(this.editingIndex, 1, this.currentAddress)
      } else {
        // 添加地址
        this.addresses.push(this.currentAddress)
      }
      // 重置表单和状态
      this.currentAddress = { form: { name: '', phone: '', region: [], detail: '' } }
      this.editing = false
      this.editingIndex = null
      this.selectedRegion = []
    },
    getAddressRegion (regionArr) {
      return regionArr.map(region => region.label).join(', ')
    },
    updateRegion () {
      this.currentAddress.form.region = this.regions.filter(region => this.selectedRegion.includes(region.value))
    }
  }
}
</script>

  <style>
  /* 样式可以根据需求自行调整 */
  .address-manager {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }

  button {
    margin-left: 10px;
  }
  </style>
