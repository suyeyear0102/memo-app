const Memo = require('../models/Memo');

// 获取所有备忘录
exports.getAllMemos = async (req, res) => {
  try {
    const memos = await Memo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: memos, count: memos.length });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取备忘录失败', error: error.message });
  }
};

// 创建备忘录
exports.createMemo = async (req, res) => {
  try {
    const { title, content } = req.body;
    const memo = await Memo.create({ title, content });
    res.status(201).json({ success: true, data: memo });
  } catch (error) {
    res.status(400).json({ success: false, message: '创建备忘录失败', error: error.message });
  }
};

// 更新备忘录
exports.updateMemo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const memo = await Memo.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!memo) return res.status(404).json({ success: false, message: '备忘录不存在' });
    res.json({ success: true, data: memo });
  } catch (error) {
    res.status(400).json({ success: false, message: '更新备忘录失败', error: error.message });
  }
};

// 删除备忘录
exports.deleteMemo = async (req, res) => {
  try {
    const { id } = req.params;
    const memo = await Memo.findByIdAndDelete(id);
    if (!memo) return res.status(404).json({ success: false, message: '备忘录不存在' });
    res.json({ success: true, message: '备忘录已删除' });
  } catch (error) {
    res.status(400).json({ success: false, message: '删除备忘录失败', error: error.message });
  }
};

// 切换完成状态
exports.toggleComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const memo = await Memo.findById(id);
    if (!memo) return res.status(404).json({ success: false, message: '备忘录不存在' });
    memo.isCompleted = !memo.isCompleted;
    await memo.save();
    res.json({ success: true, data: memo });
  } catch (error) {
    res.status(400).json({ success: false, message: '切换状态失败', error: error.message });
  }
};