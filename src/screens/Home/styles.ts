import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
  },
  buttonAcessar: {
    borderRadius: 10,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    position: "absolute",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
