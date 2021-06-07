import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";

const GameOverScreen = (props) => {
  let imageContainerStyle = styles.imageContainer;

  if (useWindowDimensions().height < 500) {
    imageContainerStyle = styles.imageContainerSmall;
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText style={styles.resultText}>Success!</TitleText>
        <View style={imageContainerStyle}>
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.guessNumber}</Text> guesses to
            find your number:{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <Button
          title="Restart"
          onPress={props.onRestart}
          color={colors.secondary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainerSmall: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderRadius: Dimensions.get("window").width * 0.3,
    borderWidth: 2,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    // width: 300,
    // height: 300,
    borderRadius: Dimensions.get("window").width * 0.7,
    // borderRadius: 150,
    borderWidth: 2,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20,
    // marginVertical: 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginBottom: Dimensions.get("window").height / 60,
    // marginBottom: 15,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 600 ? 16 : 20,
    marginTop: 10,
    // fontSize: 20,
  },
});

export default GameOverScreen;
