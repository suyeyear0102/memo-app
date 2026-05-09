import axios from 'axios';  // 引入 axios，用来发 HTTP 请求

// 后端 API 地址
// import.meta.env.VITE_API_URL 是 Vite 的环境变量写法
// 如果没设置环境变量，就用本地的 localhost:3000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// 创建 axios 实例，统一配置
const api = axios.create({
  baseURL: API_URL,    // 所有请求的基础路径
  timeout: 5000        // 超时时间 5 秒，超时就报错
});

// 导出所有 API 方法
export const memoApi = {
  // 获取所有备忘录 → GET /api/memos
  getMemos() {
    return api.get('/memos');
  },
  
  // 创建备忘录 → POST /api/memos
  // data: { title: '标题', content: '内容' }
  createMemo(data) {
    return api.post('/memos', data);
  },
  
  // 更新备忘录 → PUT /api/memos/:id
  // data: { title: '新标题' } 或 { isCompleted: true }
  updateMemo(id, data) {
    return api.put(`/memos/${id}`, data);
  },
  
  // 删除备忘录 → DELETE /api/memos/:id
  deleteMemo(id) {
    return api.delete(`/memos/${id}`);
  },
  
  // 切换完成状态 → PATCH /api/memos/:id/toggle
  toggleComplete(id) {
    return api.patch(`/memos/${id}/toggle`);
  }
};