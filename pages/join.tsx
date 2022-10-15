import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Join: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form id="join-form" action="/api/auth/join" method="post">
          <fieldset>
            <div className="input-group">
              <label>
                이메일
                <input id="join-email" type="email" name="email" />
              </label>
            </div>
            <div className="inputGroup">
              <label>
                닉네임
                <input id="join-username" type="text" name="username" />
              </label>
            </div>
            <div className="inputGroup">
              <label>
                비밀번호
                <input id="join-password" type="password" name="password" />
              </label>
            </div>
            <button id="join-btn" type="submit">
              회원가입
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default Join;
