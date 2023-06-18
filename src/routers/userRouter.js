import { Router } from "express";
import { userController } from "../controllers/index.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const userRouter = Router();

//get,post,put,delete 의 경우를 작성해주시고 콜백함수는 controller를 통해 실행합니다.
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.patch("/mypage/:userId", loginRequired, userController.updateUser);
userRouter.delete("/mypage/:userId", loginRequired, userController.deleteUser);
userRouter.post("/reset", userController.resetPassword);

export { userRouter };
