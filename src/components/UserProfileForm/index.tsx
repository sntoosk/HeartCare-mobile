import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";
import UserProfileFormProps from "../../props/UserProfileFormProps";
import { styles } from "./styles";
import { Checkbox } from "expo-checkbox";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const medicalConditions = ["Diabetes", "Hipertensão", "Asma", "Alergias"];

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  username,
  name,
  lastName,
  email,
  dob,
  bloodType,
  hasMedicalCondition,
  setUsername,
  setName,
  setLastName,
  setEmail,
  setDob,
  setBloodType,
  setHasMedicalCondition,
  handleSaveProfile,
  loading,
}) => {
  const { theme } = useTheme();

  const formatBirthdateInput = (inputValue: any) => {
    const formattedValue = inputValue
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1");
    return formattedValue;
  };

  return (
    <View
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <ScrollView>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Usuário :
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder="Digite seu usuário"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Nome :
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder="Digite seu Nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Sobrenome :
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder="Digite seu Sobrenome"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Data de Nascimento :
        </Text>
        <TextInput
          style={[styles.input, { color: theme.COLORS.TEXT }]}
          placeholder="Digite sua data de nascimento"
          onChangeText={(text) => setDob(formatBirthdateInput(text))}
          value={dob}
          keyboardType="numeric"
        />
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Tipo Sanguíneo :
        </Text>
        <View style={styles.checkboxContainer}>
          {bloodTypes.map((type) => (
            <View key={type}>
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {type}
              </Text>
              <Checkbox
                value={bloodType === type}
                onValueChange={(checked) =>
                  checked ? setBloodType(type) : setBloodType("")
                }
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Possui alguma Doença ou Incapacidade :
        </Text>
        <View style={styles.checkboxContainerDoc}>
          {medicalConditions.map((condition) => (
            <View key={condition}>
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {condition}
              </Text>
              <Checkbox
                value={hasMedicalCondition.includes(condition)}
                onValueChange={(checked) => {
                  if (checked) {
                    setHasMedicalCondition(
                      hasMedicalCondition
                        ? hasMedicalCondition + ", " + condition
                        : condition
                    );
                  } else {
                    setHasMedicalCondition(
                      hasMedicalCondition
                        .split(", ")
                        .filter((item) => item !== condition)
                        .join(", ")
                    );
                  }
                }}
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>
          Email :
        </Text>
        <TextInput
          style={[styles.input, { color: email.trim() ? "gray" : "black" }]}
          placeholder="Digite seu Email"
          value={email}
          pointerEvents={email.trim() ? "none" : "auto"}
          onChangeText={(text) => setEmail(text)}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleSaveProfile}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Salvar perfil
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileForm;
