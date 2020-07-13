import React from "react";
import { Image, ImageSourcePropType, ImageStyle, View } from "react-native";

import styles from "./styles";

type ImageName = "dog" | "home";

type ImageSource = { [key in ImageName]: ImageSourcePropType };

const imageSource: ImageSource = {
  dog: require("./images/dog/dog.png"),
  home: require("./images/home/home.png")
};

interface Props {
  imageName: ImageName;
  style?: ImageStyle;
}

const FullWidthImage = ({ imageName, style }: Props) => (
  <View style={styles.imageWrapper}>
    <Image
      source={imageSource[imageName]}
      style={[styles.image, styles[imageName], style]}
    />
  </View>
);

export default FullWidthImage;
