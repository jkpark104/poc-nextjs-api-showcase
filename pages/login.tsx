import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form id="login-form" action="/api/auth/login" method="post">
          <fieldset>
            <div className="input-group">
              <label>
                이메일
                <input id="login-email" type="email" name="email" />
              </label>
            </div>
            <div className="inputGroup">
              <label>
                비밀번호
                <input id="login-password" type="password" name="password" />
              </label>
            </div>
            <button id="login-btn" type="submit">
              로그인
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default Login;
