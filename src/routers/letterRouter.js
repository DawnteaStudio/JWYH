import { Router } from "express";
import { letterController } from '../controllers/index.js';
import { loginRequired } from "../middlewares/loginRequired.js";

const letterRouter = Router();

//get,post,put,delete 의 경우를 작성해주시고 콜백함수는 controller를 통해 실행합니다.
letterRouter.get('/main/:userId', letterController.getNotOpenedLetters);
letterRouter.get("/main/:userId/:index",loginRequired, letterController.getLetterNotOpenedByIndex);
// letterRouter.get('/main/box/:userId', letterController.getLettersByYearMonth);
letterRouter.get('/box/:userId',loginRequired, letterController.getLettersByYearMonth);
letterRouter.get('/box/:userId/:year/:month',loginRequired, letterController.getLettersListByYearMonth);
letterRouter.get('/letter/:userId/:index',loginRequired, letterController.getLetterByIndex);
letterRouter.get('/nickName/:_id', letterController.getNickName);
letterRouter.post('/letters/send/:_id', letterController.createLetter);
letterRouter.delete('/letter/:userId/:index',loginRequired, letterController.deleteLetter);


export { letterRouter };
