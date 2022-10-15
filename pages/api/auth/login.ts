// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { dbConnect } from "../../../utils";

interface UserInfo {
  email: string;
  password: string;
  username: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email, password },
    method,
    cookies,
  } = req;

  if (method === "POST") {
    try {
      await dbConnect();

      if (!email || !password) {
        res.status(401).send({
          error: "사용자 아이디 또는 패스워드가 전달되지 않았습니다.",
        });
        return;
      }

      const user = await User.findOne<UserInfo>({ email, password });

      // 401 Unauthorized
      if (!user) {
        res.status(401).send({ error: "등록되지 않은 사용자입니다." });
        return;
      }

      const accessToken = jwt.sign({ email }, "secret", {
        expiresIn: "1m",
      });

      res.setHeader("Set-Cookie", [
        cookie.serialize("accessToken", accessToken, {
          path: "/",
          httpOnly: true,
        }),
      ]);

      res.status(200).send({ email, username: user.username });
    } catch (err) {
      res.status(500).json("서버 에러");
    }
  }
};

export default handler;
