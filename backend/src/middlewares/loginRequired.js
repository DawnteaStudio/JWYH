import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
  // 요청 헤더에서 jwt 토큰 추출

  const userToken = req.headers["authorization"]?.split(" ")[1];

  // 토큰은 jwt 문자열, "null" 문자열 또는 undefined 일 수 있음
  // 토큰이 null 인 경우, 로그인이 필요한 서비스의 접근 제한

  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청, token 없음");

    res.status(403).json({
      result: "잘못된 접근입니다.",
      reason: "로그인 한 사용자만 이용할 수 있습니다.",
    });

    return;
  }
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const { userId } = jwtDecoded;
    req.surrentUserId = userId;

    next();
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우, 토큰이 정상적으로 decode 안되었을 경우임
    res.status(403).json({
      result: "잘못된 접근입니다.",
      reason: "정상적인 토큰이 아닙니다.",
    });
    return;
  }
};

export { loginRequired };
