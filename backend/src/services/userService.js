import { userModel } from "../db/index.js";
import { CustomError } from "../middlewares/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 회원가입
const createUser = async (userInfo) => {
  const { userId, nickName, password } = userInfo;

  const user = await userModel.findByUserId(userId);
  if (user) {
    throw new CustomError(
      400,
      "이 아이디는 현재 사용중입니다. 다른 아이디를 입력해주세요."
    );
  }
  // 비밀번호 암호화
  const hashPassword = await bcrypt.hash(password, 10);

  const newUserInfo = {
    userId,
    nickName,
    password: hashPassword,
    provider: "local",
  };
  // db에 저장
  const createNewUser = await userModel.createUser(newUserInfo);

  return createNewUser;
};

// 로그인
const getUserToken = async (loginInfo, provider) => {
  const { userId, password } = loginInfo;

  const user = await userModel.findByUserId(userId);
  if (!user) {
    throw new CustomError(
      400,
      "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
    );
  }
  // 비밀번호 일치 여부 확인
  const correctPasswordHash = user.password;
  // 첫 번째는 프론트가 보내온 비밀번호, 두 번째는 db에 있던 암호화된 비밀번호
  const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

  if (!isPasswordCorrect) {
    throw new CustomError(
      400,
      "비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요."
    );
  }
  // 로그인 성공 => JWT 웹 토큰 생성
  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
  // 2개의 프로퍼티를 JWT 토큰에 담음
  const token = jwt.sign(
    {
      id: user.userId,
      nickName: user.nickName,
      objectId: user._id,
      provider: user.provider,
    },
    secretKey
  );

  return { token };
};
// 유저 조회
const getUser = async (userId) => {
  const user = await userModel.findById(userId);

  return user;
};
// 회원 정보 수정
const updateUser = async (userInfoRequired, toUpdate) => {
  const { userId } = userInfoRequired;

  let user = await userModel.findByUserId(userId);

  if (!user) {
    throw new CustomError(400, "사용자를 찾을 수 없습니다.");
  }

  // 업데이트 시작
  const { nickName, password } = toUpdate;

  if (nickName) {
    user.nickName = nickName;
  }
  // 비밀번호 수정할 떄, 해쉬화 필요
  if (password) {
    const newPasswordHash = await bcrypt.hash(password, 10);
    toUpdate.password = newPasswordHash;
  }
  // 업데이트 진행
  user = await userModel.updateUser({
    userId,
    update: toUpdate,
  });
  return user;
};

// 회원 삭제
const deleteUser = async (userId) => {
  const user = await userModel.deleteUser(userId);

  if (!user) {
    throw new CustomError(400, "사용자를 찾을 수 없습니다.");
  }
  return user;
};
// 비밀번호 재설정
const resetPassword = async (userId, nickName) => {
  const user = await userModel.findByUserId(userId);

  if (!user) {
    throw new CustomError(400, "해당하는 유저가 없습니다.");
  }

  if (user.nickName !== nickName) {
    throw new CustomError(400, "입력한 닉네임이 일치하지 않습니다.");
  }

  // 임시 비밀번호 생성
  const temporaryPassword = generateTemporaryPassword();
  const hashPassword = await bcrypt.hash(temporaryPassword, 10);

  // 비밀번호 업데이트
  user.password = hashPassword;
  await user.save();

  return temporaryPassword;
};

// 임시 비밀번호 생성 함수
const generateTemporaryPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let temporaryPassword = "";

  for (let i = 0; i < 8; i++) {
    temporaryPassword += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return temporaryPassword;
};
const userService = {
  createUser,
  getUserToken,
  getUser,
  updateUser,
  deleteUser,
  resetPassword,
};

export { userService };
