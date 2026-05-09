<template>
  <div class="container">
    <header class="header">
      <h1>📝 我的备忘录</h1>
    </header>

    <MemoForm @add-memo="handleAddMemo" />

    <div v-if="store.loading">加载中...</div>
    <div v-else-if="store.error">{{ store.error }}</div>

    <MemoList
      v-else
      :memos="store.memos"
      @delete-memo="handleDeleteMemo"
      @toggle-complete="handleToggleComplete"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMemoStore } from '../stores/memoStore'
import MemoForm from '../components/MemoForm.vue'
import MemoList from '../components/MemoList.vue'

const store = useMemoStore()
onMounted(() => store.fetchMemos())

const handleAddMemo = (data) => store.addMemo(data)
const handleDeleteMemo = (id) => store.deleteMemo(id)
const handleToggleComplete = (id) => store.toggleComplete(id)
</script>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 2rem; }
.header { text-align: center; margin-bottom: 2rem; }
</style>