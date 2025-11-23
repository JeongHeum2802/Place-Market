const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8080;

// 미들웨어 설정
app.use(cors()); // 프론트엔드와의 통신 허용
app.use(express.json()); // JSON 데이터 파싱

// 데이터 저장 파일 경로
const DB_PATH = path.join(__dirname, 'users.json');

// 로그인 API
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 파일 읽어서 JSON 파싱
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const users = JSON.parse(data);

    // 이메일이 일치하는 유저 찾기
    const user = users.find(u => u.email === email);

    // 일치하는 email이 없음
    if (!user) {
      return res.status(401).json({ message: '가입되지 않은 이메일 입니다.'});
    }

    if (user.password === password) {
      // 성공
      res.status(200).json({
        message: '로그인 성공',
        token: `sample_token_${user.id}`,
      });
    } else {
      res.status(401).json({ message: '비밀번호가 일치하지 않습니다.'});
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '서버 에러 발생' }); 
  }
});

// 회원가입 API
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // 유효성 검사
  if (!name || !email || !password) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    let users = [];

    // users.json 을 객체로 변환
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      users = JSON.parse(data);
    }

    // 중복 이메일 확인
    const existingUser = users.find(user => user.email === email);
    if(existingUser) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    // 파일 쓰기
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));

    console.log('회원가입 :', newUser);
    res.status(201).json({ message: '회원가입 성공', user: newUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러 발생' });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});