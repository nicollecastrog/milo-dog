import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  image: {
    resizeMode: "contain",
    flex: 1
  },
  dog: {
    aspectRatio: 1.82
  },
  home: {
    aspectRatio: 1
  }
});

export default styles;
