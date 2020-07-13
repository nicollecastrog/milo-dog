import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// TODO: convert react-native-web flow types
// (https://github.com/necolas/react-native-web/tree/master/packages/react-native-web/src/types)
// to typescript and use here (instead of "any") so that web-specific styles
// (like "display: block" below) are supported

const webStyles: any = {
  imageWrapper: {
    display: "block",
    width: "100%",
    height: "auto"
  },
  image: {
    width: "100%",
    display: "block",
    resizeMode: "contain"
  },
  dog: {
    // screen's paddingHorizontal is 20 => TODO: component shouldn't need to know this
    height: (width - 40) / 1.82 // aspectRatio: 1.82
  },
  home: {
    height: width // aspectRatio: 1
  }
};

const styles = StyleSheet.create(webStyles);

export default styles;
