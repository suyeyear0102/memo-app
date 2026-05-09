import { defineStore } from 'pinia';  // 引入 Pinia
import { ref } from 'vue';            // 引入 ref，声明响应式数据
import { memoApi } from '../api/memoApi';  // 引入 API 方法

// 定义并导出一个名为 'memo' 的 store
export const useMemoStore = defineStore('memo', () => {
  // ===== 状态（数据） =====
  const memos = ref([]);        // 备忘录列表，初始是空数组
  const loading = ref(false);   // 加载状态，true 表示正在请求中
  const error = ref(null);      // 错误信息，初始为 null 表示无错误

  // ===== 操作（方法） =====
  
  // 获取所有备忘录
  async function fetchMemos() {
    loading.value = true;       // 开始加载，显示 loading
    error.value = null;         // 清空之前的错误
    
    try {
      const response = await memoApi.getMemos();  // 调用 API
      memos.value = response.data.data;            // 把返回的数据存到 memos
    } catch (err) {
      error.value = '获取备忘录失败';  // 存错误信息
      console.error(err);              // 打印详细错误到控制台
    } finally {
      loading.value = false;  // 不管成功失败，结束加载
    }
  }

  // 添加备忘录
  async function addMemo(memoData) {
    loading.value = true;
    try {
      const response = await memoApi.createMemo(memoData);
      // 把新创建的备忘录插到列表最前面（因为最新的在前）
      memos.value.unshift(response.data.data);
      return response.data.data;
    } catch (err) {
      error.value = '添加备忘录失败';
      throw err;  // 抛出错误，让调用方也能捕获
    } finally {
      loading.value = false;
    }
  }

  // 更新备忘录
  async function updateMemo(id, memoData) {
    try {
      const response = await memoApi.updateMemo(id, memoData);
      // 找到列表中对应的备忘录并替换
      const index = memos.value.findIndex(m => m._id === id);
      if (index !== -1) {
        memos.value[index] = response.data.data;
      }
    } catch (err) {
      error.value = '更新备忘录失败';
      throw err;
    }
  }

  // 删除备忘录
  async function deleteMemo(id) {
    try {
      await memoApi.deleteMemo(id);
      // 从列表中过滤掉被删除的那条
      memos.value = memos.value.filter(m => m._id !== id);
    } catch (err) {
      error.value = '删除备忘录失败';
      throw err;
    }
  }

  // 切换完成状态
  async function toggleComplete(id) {
    try {
      const response = await memoApi.toggleComplete(id);
      // 找到对应备忘录并替换为更新后的数据
      const index = memos.value.findIndex(m => m._id === id);
      if (index !== -1) {
        memos.value[index] = response.data.data;
      }
    } catch (err) {
      error.value = '切换状态失败';
      throw err;
    }
  }

  // 导出所有状态和方法，供组件使用
  return {
    memos,
    loading,
    error,
    fetchMemos,
    addMemo,
    updateMemo,
    deleteMemo,
    toggleComplete
  };
});