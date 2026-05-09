<template>
  <!-- @submit.prevent 阻止表单默认提交行为，改为执行 submitForm -->
  <form @submit.prevent="submitForm" class="memo-form">
    
    <!-- 标题输入框 -->
    <div class="form-group">
      <input
        v-model="title"           
        type="text"
        placeholder="输入备忘录标题..."
        required                  
        class="form-input"
      />
    </div>
    
    <!-- 内容输入框（多行文本） -->
    <div class="form-group">
      <textarea
        v-model="content"         
        placeholder="输入备忘录内容（可选）..."
        rows="3"                  
        class="form-textarea"
      ></textarea>
    </div>
    
    <!-- 提交按钮 -->
    <button type="submit" class="submit-btn">添加备忘录</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';  // 引入 ref，创建响应式变量

// 定义组件可以触发的事件
const emit = defineEmits(['add-memo']);

// 响应式数据
const title = ref('');     // 标题，初始为空字符串
const content = ref('');   // 内容，初始为空字符串

// 表单提交逻辑
const submitForm = async () => {
  // 如果标题为空，直接返回，不提交
  if (!title.value.trim()) return;
  
  // 触发 add-memo 事件，把标题和内容传给父组件
  emit('add-memo', {
    title: title.value.trim(),    // trim() 去掉首尾空格
    content: content.value.trim()
  });
  
  // 提交后清空输入框
  title.value = '';
  content.value = '';
};
</script>

<style scoped>
.memo-form {
  background: #f8f9fa;      /* 浅灰背景 */
  padding: 1.5rem;
  border-radius: 8px;       /* 圆角 */
  margin-bottom: 2rem;
}

.form-input, .form-textarea {
  width: 100%;              /* 宽度占满 */
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;   /* 灰色边框 */
  border-radius: 4px;
  font-size: 1rem;
}

.form-textarea {
  resize: vertical;         /* 只允许纵向拉伸 */
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #27ae60;      /* 绿色背景 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;  /* 背景色变化动画 */
}

/* 鼠标悬停时颜色变深 */
.submit-btn:hover {
  background: #219a52;
}
</style>