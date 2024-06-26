import { StyleSheet, Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const styles = StyleSheet.create({
  contain: {
    marginTop: isAndroid ? 0 : 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: isAndroid ? 0 : 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  text: {
    color: "#fff",
    letterSpacing: 2,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: isAndroid ? 10 : 5,
  },
});
