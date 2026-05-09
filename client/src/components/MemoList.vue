<template>
  <div class="memo-list">
    <!-- 
      v-for 循环渲染每个备忘录
      :key 必须有唯一值，用 _id（MongoDB 自动生成的）
      :memo 把每个备忘录数据传给子组件
    -->
    <MemoItem
      v-for="memo in memos"
      :key="memo._id"
      :memo="memo"
      @delete-memo="$emit('delete-memo', memo._id)"       
      @toggle-complete="$emit('toggle-complete', memo._id)" 
      @update-memo="(data) => $emit('update-memo', memo._id, data)" 
    />
  </div>
</template>

<script setup>
import MemoItem from './MemoItem.vue';  // 引入单个备忘录组件

// 定义接收的属性
defineProps({
  memos: {
    type: Array,       // 类型是数组
    required: true     // 必传
  }
});

// 定义可以触发的三个事件（转发给父组件）
defineEmits(['delete-memo', 'toggle-complete', 'update-memo']);
</script>