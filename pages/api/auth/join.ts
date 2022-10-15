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
    body: { email, password, username },
    method,
  } = req;

  if (method === "POST") {
    try {
      await dbConnect();

      if (!email || !password || !username) {
        res.status(401).send({
          error:
            "사용자 아이디, 패스워드 또는 사용자 이름이 전달되지 않았습니다.",
        });
        return;
      }

      const user = await User.findOne<UserInfo>({ email, password });

      // 401 Unauthorized
      if (user) {
        res.status(401).send({ error: "이미 등록된 사용자입니다." });
        return;
      }

      await User.create({ email, password, username });

      const accessToken = jwt.sign({ email }, "secret", {
        expiresIn: "1m",
      });

      const refreshToken = jwt.sign({ email }, "secret", {
        expiresIn: "10m",
      });

      res.setHeader("Set-Cookie", [
        cookie.serialize("accessToken", accessToken, {
          path: "/",
          httpOnly: true,
        }),
        cookie.serialize("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
        }),
      ]);

      res.redirect("/login");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
