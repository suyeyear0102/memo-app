const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const memoRoutes = require('./routes/memoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// 连接 MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ 数据库连接成功'))
  .catch(err => console.error('❌ 数据库连接失败:', err));

app.use('/api/memos', memoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});