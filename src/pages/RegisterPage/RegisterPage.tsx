import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../app/routes/routes";
import styles from "./styles.module.css";
import { registerUser } from "../../core/auth/layer";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";

import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { IUserRegisterData } from "../../core/auth/types";

interface IUserRegisterFromData extends IUserRegisterData {
  password2: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [formData, setFormData] = useState<IUserRegisterFromData>({
    email: "",
    password: "",
    password2: "",
  });

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.password2 ||
    formData.password !== formData.password2;

  const handleRegisterClick = async () => {
    if (isButtonDisabled) return;
    registerUser({ email: formData.email, password: formData.password })
      .then(() => navigate(RoutesEnum.Home))
      .finally(() => setIsBtnLoading(false));
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (!(name in formData)) return;
    setFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <Container size={420} my={40}>
        <Title ta="center" className={styles.title}>
          {t("common.welcome")}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {t("common.haveAccountAlready")}{" "}
          <Anchor to={RoutesEnum.Login} size="sm" component={Link}>
            {t("common.Login")}
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            name="email"
            onChange={handleDataChange}
            placeholder="you@mantine.dev"
            value={formData.email}
            required
          />
          <PasswordInput
            label={t("common.Password")}
            placeholder={t("common.YourPassword")}
            name="password"
            value={formData.password}
            onChange={handleDataChange}
            required
            mt="md"
          />
          <PasswordInput
            label={t("common.ConfirmThePassword")}
            placeholder={t("common.YourPassword")}
            name="password2"
            value={formData.password2}
            onChange={handleDataChange}
            required
            mt="md"
          />

          <Button
            fullWidth
            mt="xl"
            onClick={handleRegisterClick}
            loading={isBtnLoading}
            disabled={isButtonDisabled}
          >
            {t("common.Register")}
          </Button>
        </Paper>
      </Container>
    </div>
  );
};
