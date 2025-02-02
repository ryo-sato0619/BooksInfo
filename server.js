const path = require('path'); //path モジュールを最初にインポート
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_ANON_KEY);

const express = require('express');
const cors = require('cors'); //CORSミドルウェアをインポート
const app = express();

//CORSを有効にする
app.use(cors());

//環境変数を使用してSupabaseクライアントを設定
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

//静的ファイルを提供（ルートディレクトリから）
app.use(express.static(path.join(__dirname)));

app.get('/config', (req, res) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    res.json({ supabaseUrl, supabaseKey });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
