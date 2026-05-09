<template>
  <!-- 
    动态 class：
    - memo-item 固定有
    - completed 只有当 memo.isCompleted 为 true 时才加上
  -->
  <div :class="['memo-item', { completed: memo.isCompleted }]">
    
    <!-- 左侧内容区 -->
    <div class="memo-content">
      <div class="memo-header">
        <!-- 复选框，勾选/取消勾选触发 toggle-complete 事件 -->
        <input
          type="checkbox"
          :checked="memo.isCompleted"
          @change="$emit('toggle-complete')"
          class="memo-checkbox"
        />
        <!-- 
          标题，动态 class：
          - line-through 表示删除线样式
          只有当已完成时才加上
        -->
        <h3 :class="{ 'line-through': memo.isCompleted }">{{ memo.title }}</h3>
      </div>
      
      <!-- 内容文本，只有有内容时才显示 -->
      <p v-if="memo.content" class="memo-text">{{ memo.content }}</p>
      
      <!-- 创建时间，格式化后显示 -->
      <small class="memo-time">{{ formatDate(memo.createdAt) }}</small>
    </div>
    
    <!-- 右侧操作区 -->
    <div class="memo-actions">
      <!-- 删除按钮，点击触发 delete-memo 事件 -->
      <button @click="$emit('delete-memo')" class="btn-delete" title="删除">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
// 定义接收的属性
const props = defineProps({
  memo: {
    type: Object,     // 类型是对象
    required: true    // 必传
  }
});

// 定义可触发的事件
defineEmits(['delete-memo', 'toggle-complete']);

// 格式化日期的函数，把 ISO 时间转成中文格式
const formatDate = (date) => {
  // toLocaleString('zh-CN') 输出格式：2024/1/15 14:30:00
  return new Date(date).toLocaleString('zh-CN');
};
</script>

<style scoped>
.memo-item {
  display: flex;
  justify-content: space-between;  /* 左右两端对齐 */
  align-items: flex-start;         /* 顶部对齐 */
  background: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: 1px solid #e1e8ed;
  transition: all 0.3s;            /* 所有属性变化都有过渡动画 */
}

/* 鼠标悬停时出现阴影 */
.memo-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 已完成状态：降低透明度 + 灰背景 */
.memo-item.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.memo-content {
  flex: 1;  /* 占满剩余空间 */
}

.memo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;  /* 复选框和标题之间的间距 */
}

.memo-checkbox {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

/* 删除线样式 */
.line-through {
  text-decoration: line-through;
  color: #999;
}

.memo-text {
  margin: 0.5rem 0;
  color: #666;
}

.memo-time {
  color: #999;
  font-size: 0.8rem;
}

.memo-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-delete {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;         /* 默认半透明 */
  transition: opacity 0.3s;
}

/* 悬停时完全不透明 */
.btn-delete:hover {
  opacity: 1;
}
</style>