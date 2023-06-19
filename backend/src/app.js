import cors from "cors";
import express from "express";
//설명서 : Router import 할 때, 줄바꿈으로 추가해주세요.
import { userRouter, letterRouter, authRouter } from "./routers/index.js";
import { errorHandler } from "./middlewares/index.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
// cors, json, form (MiddleWare)
// 기본 미들웨어는 아래 3가지만 사용하며, 추가로 필요할 경우 app.js를 건드는 일이므로 백엔드 회의후에 추가합니다.
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://kdt-sw-4-team14.elicecoding.com",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api 라우팅
// 설명서 : 라우터를 제작할 경우 밑에서부터 "한줄씩"
// app.use("/api", 본인이 제작한 라우터이름 )
// 으로 추가해주세요. 모든 백엔드 url은 /api로 시작해서 구분을 줍니다.
app.use("/api", userRouter);
app.use("/api", letterRouter);
app.use("/api", authRouter);

//아래 코드들은 no touch
app.use((req, res, next) => {
  res.status(404).send("404 NOT FOUND ^^;;");
});
app.use(errorHandler);
export { app };
