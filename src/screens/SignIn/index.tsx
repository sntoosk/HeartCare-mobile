import React, { useState } from "react";
import { View, Text } from "react-native";
import LoginForm from "../components/SignInForm";
import ResetPasswordForm from "../components/ResetPassword";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { enviarRecuperacaoSenha } from "../../api/PasswordRecovery";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function SignIn() {
  const { signIn, isLoading } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = () => {
    signIn({ email, password });
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await enviarRecuperacaoSenha(resetEmail);
      setLoading(false);
      alert("Email de recuperação enviado com sucesso");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleForgotPassword = () => {
    setShowResetPassword(true);
  };

  const handleBackToLogin = () => {
    setShowResetPassword(false);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>
          {showResetPassword ? "" : "Bem-vindo(a)"}
        </Text>
      </Animatable.View>

      {showResetPassword ? (
        <ResetPasswordForm
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          handleResetPassword={handleResetPassword}
          loading={loading}
          handleBackToLogin={handleBackToLogin}
        />
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isPasswordVisible={isPasswordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
          handleLogin={handleLogin}
          loading={isLoading}
          handleForgotPassword={handleForgotPassword}
        />
      )}
    </View>
  );
}

export default SignIn;
