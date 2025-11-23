const express = require('express');
const cors = require('cors');

// Sequelize 모델 불러오기
const db = require('./models');
const { User } = require('./models');

const app = express();
const PORT = 8080;

// 미들웨어 설정
app.use(cors()); // 프론트엔드와의 통신 허용
app.use(express.json()); // JSON 데이터 파싱

// DB 연결 및 테이블 생성
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ 데이터베이스 연결 성공!');
  })
  .catch((err) => {
    console.error('❌ DB 연결 에러:', err);
  });

// 로그인 API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email }});

    if(!user) {
      return res.status(401).json({ message: "가입되지 않은 이메일 입니다."});
    }

    if (user.password === password) {
      res.status(200).json({
        message: "로그인 성공",
        token: `sample_token_${user.id}`,
        user: { name: user.name, email: user.email }
      });
    } else {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러 발생' });
  }
});

// 회원가입 API
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    console.log('회원가입  성공:', newUser.toJSON());
    res.status(201).json({ message: "회원가입 성공", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러 발생 " });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});