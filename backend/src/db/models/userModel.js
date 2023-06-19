import { User } from "../schemas/index.js";

const userModel = {
  // 회원 전체 조회
  findAll: async () => {
    const users = await User.find({});

    return users;
  },
  // 아이디 기반 회원 조회
  findByUserId: async (userId) => {
    const user = await User.findOne({ userId });

    return user;
  },
  // _id 기반 회원 조회
  findById: async (_id) => {
    const user = await User.findOne({ _id });

    return user;
  },
  // 회원 생성
  createUser: async (userInfo) => {
    const user = await User.create(userInfo);

    return user;
  },
  // 회원정보 수정
  updateUser: async ({ userId, update }) => {
    const filter = { userId };
    const option = { returnOriginal: false };

    const updateUser = await User.findOneAndUpdate(filter, update, option);
    return updateUser;
  },
  // 회원 삭제
  deleteUser: async (userId) => {
    const user = await User.findOneAndDelete({ userId });

    return user;
  },
};

export default userModel;
