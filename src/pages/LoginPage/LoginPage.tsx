import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../app/routes/routes";
import styles from "./styles.module.css";
import { loginUser } from "../../core/auth/layer";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
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
import { IUserLoginData } from "../../core/auth/types";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [formData, setFormData] = useState<IUserLoginData>({
    email: "",
    password: "",
  });

  const isButtonDisabled = !formData.email || !formData.password;

  const handleLoginClick = async () => {
    if (isButtonDisabled) return;
    setIsBtnLoading(true);
    loginUser(formData)
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
          {t("common.welcomeBack")}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {t("common.noAccountYet")}{" "}
          <Anchor to={RoutesEnum.Register} size="sm" component={Link}>
            {t("common.createAccount")}
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
          <Button
            fullWidth
            mt="xl"
            onClick={handleLoginClick}
            loading={isBtnLoading}
            disabled={isButtonDisabled}
            color={"var(--clr-primary)"}
          >
            {t("common.Login")}
          </Button>
        </Paper>
      </Container>
    </div>
  );
};
