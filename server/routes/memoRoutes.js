const express = require('express');
const router = express.Router();  // 创建路由对象

// 引入控制器（业务逻辑）
const memoController = require('../controllers/memoController');

// 定义路由规则：URL 路径 → 对应的处理函数

// GET /api/memos        → 获取所有备忘录
router.get('/', memoController.getAllMemos);

// POST /api/memos       → 创建新备忘录
router.post('/', memoController.createMemo);

// PUT /api/memos/:id    → 更新指定备忘录（:id 是动态参数，实际值比如 65a1b2c3）
router.put('/:id', memoController.updateMemo);

// DELETE /api/memos/:id → 删除指定备忘录
router.delete('/:id', memoController.deleteMemo);

// PATCH /api/memos/:id/toggle → 切换备忘录完成状态
// PUT 是全量更新，PATCH 是部分更新，这里只改一个字段所以用 PATCH
router.patch('/:id/toggle', memoController.toggleComplete);

// 导出路由，供 app.js 使用
module.exports = router;