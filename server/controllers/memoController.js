const fs = require('fs');

// 读数据
const readMemos = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// 写数据
const writeMemos = (filePath, memos) => {
  fs.writeFileSync(filePath, JSON.stringify(memos, null, 2), 'utf8');
};

// 生成唯一 ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

// 获取所有备忘录
exports.getAllMemos = (req, res) => {
  try {
    const memos = readMemos(req.dataFilePath);
    memos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, data: memos, count: memos.length });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取备忘录失败', error: error.message });
  }
};

// 创建备忘录
exports.createMemo = (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: '标题不能为空' });
    }
    const memos = readMemos(req.dataFilePath);
    const newMemo = {
      _id: generateId(),
      title: title.trim(),
      content: content ? content.trim() : '',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    memos.push(newMemo);
    writeMemos(req.dataFilePath, memos);
    res.status(201).json({ success: true, data: newMemo });
  } catch (error) {
    res.status(400).json({ success: false, message: '创建备忘录失败', error: error.message });
  }
};

// 更新备忘录
exports.updateMemo = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const memos = readMemos(req.dataFilePath);
    const index = memos.findIndex(m => m._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: '备忘录不存在' });
    }
    // 不允许更新 _id
    delete updateData._id;
    memos[index] = { ...memos[index], ...updateData, updatedAt: new Date().toISOString() };
    writeMemos(req.dataFilePath, memos);
    res.json({ success: true, data: memos[index] });
  } catch (error) {
    res.status(400).json({ success: false, message: '更新备忘录失败', error: error.message });
  }
};

// 删除备忘录
exports.deleteMemo = (req, res) => {
  try {
    const { id } = req.params;
    let memos = readMemos(req.dataFilePath);
    const index = memos.findIndex(m => m._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: '备忘录不存在' });
    }
    memos.splice(index, 1);
    writeMemos(req.dataFilePath, memos);
    res.json({ success: true, message: '备忘录已删除' });
  } catch (error) {
    res.status(400).json({ success: false, message: '删除备忘录失败', error: error.message });
  }
};

// 切换完成状态
exports.toggleComplete = (req, res) => {
  try {
    const { id } = req.params;
    const memos = readMemos(req.dataFilePath);
    const index = memos.findIndex(m => m._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: '备忘录不存在' });
    }
    memos[index].isCompleted = !memos[index].isCompleted;
    memos[index].updatedAt = new Date().toISOString();
    writeMemos(req.dataFilePath, memos);
    res.json({ success: true, data: memos[index] });
  } catch (error) {
    res.status(400).json({ success: false, message: '切换状态失败', error: error.message });
  }
};