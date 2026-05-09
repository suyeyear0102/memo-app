const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const memoRoutes = require('./routes/memoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// 用本地 JSON 文件代替 MongoDB
const dataFilePath = path.join(__dirname, 'data.json');

// 如果 data.json 不存在，创建空数组
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, '[]', 'utf8');
}

// 把文件路径注入到每个请求中，让控制器能读写
app.use((req, res, next) => {
  req.dataFilePath = dataFilePath;
  next();
});

app.use('/api/memos', memoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});