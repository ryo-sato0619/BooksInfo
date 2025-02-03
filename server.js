const path = require('path'); //path モジュールを最初にインポート
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_ANON_KEY);

const express = require('express');
const cors = require('cors'); //CORSミドルウェアをインポート
const app = express();
const nodemailer = require('nodemailer');

//ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Nodemailerの設定
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  //環境変数を使用
        pass: process.env.EMAIL_PASS   //環境変数を使用
    }
});

//メール送信のエンドポイント
app.post('/send-email', (req, res) => {
    const { name, email, title, message } = req.body;
    //メールの内容を設定
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // 自分自身に送信
        subject: `${new Date().toLocaleDateString()} ${name}`,
        text: `
【お名前】
${name}

${email ? 
    `【メールアドレス】
${email}
` : ''}【書籍名】
${title}

【メッセージ】
${message}
        `
    };

    //メールを送信
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('メール送信エラー:', error);
            res.status(500).json({ status: 'error', message: 'メール送信エラー' });
        } else {
            console.log('メール送信成功:', info.response);
            res.status(200).json({ status: 'success', message: 'メール送信成功' });
        }
    });
});


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