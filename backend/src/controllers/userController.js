//controller의 모든 메소드는 next(err)을 해주세요!!
import is from "@sindresorhus/is";
import { CustomError } from "../middlewares/index.js";
import { userService } from "../services/index.js";

export const userController = {
  async registerUser(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new CustomError(
          400,
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const nickName = req.body.nickName;
      const userId = req.body.userId;
      const password = req.body.password;

      const newUser = await userService.createUser({
        nickName,
        userId,
        password,
        provider: "local",
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new CustomError(
          400,
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const userId = req.body.userId;
      const password = req.body.password;

      const userToken = await userService.getUserToken({ userId, password });

      res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  },

  // 유저 정보 조회
  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.params.userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  // 유저 정보 수정
  async updateUser(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new CustomError(
          400,
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const userId = req.params.userId;
      // body data로 부터 수정할 정보 추출
      const { password, nickName, currentPassword } = req.body;

      const userInfoRequired = { userId };

      const toUpdate = {
        ...(password && { password }),
        ...(nickName && { nickName }),
      };
      console.log(toUpdate, currentPassword);
      // 사용자 정보를 업데이트함
      const updatedUserInfo = await userService.updateUser(
        userInfoRequired,
        toUpdate
      );
      // 업데이트 이후 유저 정보 프론트에 보냄
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  },

  // 회원 탈퇴
  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.params.userId);

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  // 비밀번호 수정
  async resetPassword(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new CustomError(
          400,
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const userId = req.body.userId;
      const nickName = req.body.nickName;

      const temporaryPassword = await userService.resetPassword(
        userId,
        nickName
      );

      res.status(200).json({ temporaryPassword });
    } catch (error) {
      next(error);
    }
  },
};
