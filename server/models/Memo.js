const mongoose = require('mongoose');  // 引入 mongoose

// 定义备忘录的数据结构（Schema = 表结构）
const memoSchema = new mongoose.Schema({
  // 标题字段
  title: {
    type: String,        // 类型是字符串
    required: true,      // 必填，不能为空
    trim: true           // 自动去除首尾空格
  },
  // 内容字段
  content: {
    type: String,        // 类型是字符串
    default: ''          // 默认值是空字符串
  },
  // 是否已完成
  isCompleted: {
    type: Boolean,       // 类型是布尔值（true/false）
    default: false       // 默认未完成
  },
  // 创建时间
  createdAt: {
    type: Date,          // 类型是日期
    default: Date.now    // 默认值是当前时间
  },
  // 更新时间
  updatedAt: {
    type: Date,          // 类型是日期
    default: Date.now    // 默认值是当前时间
  }
});

// 保存前自动更新 updatedAt 字段
memoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();  // 每次保存时，更新时间改为当前时间
  next();                       // 继续执行保存操作
});

// 创建并导出模型（'Memo' 对应数据库中的 memos 集合）
module.exports = mongoose.model('Memo', memoSchema);