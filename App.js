import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [roundsGuessed, setRoundsGuessed] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  const newGameHandler = () => {
    setRoundsGuessed(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const GameOverHandler = (numOfRounds) => {
    setRoundsGuessed(numOfRounds);
  };

  let content = <StartScreen onStartGame={startGameHandler} />;

  if (userNumber && roundsGuessed <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
    );
  } else if (roundsGuessed > 0) {
    content = (
      <GameOverScreen
        guessNumber={roundsGuessed}
        userNumber={userNumber}
        onRestart={newGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
