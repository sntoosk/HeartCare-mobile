import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { StackTypes } from '../../routes/NavigationStack';
import { logar } from '../../components/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackTypes>();

  const handleLogin = () => {
    setLoading(true); // Ativa o indicador de loading

    logar(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setLoading(false); // Desativa o indicador de loading
        navigation.navigate('Principal'); // Navega para a próxima tela
      })
      .catch((error) => {
        setLoading(false); // Em caso de erro, desativa o indicador de loading
        alert(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu Email"
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
          <Text style={styles.togglePasswordButtonText}>
            {isPasswordVisible ? 'Ocultar Senha' : 'Mostrar Senha'}
          </Text>
        </TouchableOpacity>

        {/* Botão de Acessar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('Cadastrar')}
          >
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Login;
