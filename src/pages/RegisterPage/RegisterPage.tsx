import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../app/routes/routes";
import styles from "./styles.module.css";
import { registerUser } from "../../core/auth/layer";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    registerUser({ email: "vova", password: "vova" }).then(() =>
      navigate(RoutesEnum.Home)
    );
  };

  return (
    <div className={styles.page}>
      <h1>RegisterPage</h1>
      <button onClick={handleRegisterClick}>Зарегаться</button>
      <Link to={RoutesEnum.Login}>To login</Link>
    </div>
  );
};
