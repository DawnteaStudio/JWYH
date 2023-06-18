import { Router } from "express";
import axios from "axios";
import { userModel } from "../db/index.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.body;

    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.CLIENT_URI,
      grant_type: "authorization_code",
    });

    const accessToken = data.access_token;

    const { data: userData } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = {
      userId: userData.email,
      nickName: userData.name,
    };

    let existingUser = await userModel.findByUserId(user.userId);

    if (existingUser) {
      // 이미 존재하는 사용자인 경우 provider 필드 업데이트
      existingUser.provider = "google";
      await existingUser.save();
    } else {
      // 새로운 사용자인 경우 생성
      existingUser = await userModel.createUser({
        ...user,
        provider: "google",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser.userId,
        nickName: existingUser.nickName,
        objectId: existingUser._id,
        provider: existingUser.provider,
      },
      process.env.JWT_SECRET_KEY
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occured" });
  }
});

export { authRouter };
