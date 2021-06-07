import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import { Ionicons } from "@expo/vector-icons";

const randomNumberGenerator = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return randomNumberGenerator(min, max, exclude);
  } else {
    return randomNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText style={styles.textColor}>
      Guess #{listLength - itemData.index}
    </BodyText>
    <BodyText style={styles.textColor}>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  initialGuess = randomNumberGenerator(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeigth, setAvailableDeviceHeigth] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeigth(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  // console.log('heigth', availableDeviceHeigth)
  // console.log('width', availableDeviceWidth)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert(`Don't cheat!`, `This isn't correct!`, [
        { text: "Sorry!", style: "Cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextGuess = randomNumberGenerator(
      currentLow.current + 1,
      currentHigh.current - 1,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextGuess.toString(),
      ...curPastGuesses,
    ]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeigth < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent's Guess</BodyText>
        <View style={styles.controls}>
          <Ionicons.Button
            name="chevron-down"
            iconStyle={{ marginRight: 0 }}
            backgroundColor="red"
            color="white"
            size={36}
            onPress={() => nextGuessHandler("lower")}
          />
          <NumberContainer>{currentGuess}</NumberContainer>
          <Ionicons.Button
            name="chevron-up"
            iconStyle={{ marginRight: 0, borderRadius: 50 }}
            backgroundColor="green"
            color="white"
            size={36}
            onPress={() => nextGuessHandler("greater")}
          />
        </View>
        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list} >
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={(itemData) =>
              renderListItem(pastGuesses.length, itemData)
            }
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  let listIndex = pastGuesses.index

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Ionicons.Button
          name="chevron-down"
          iconStyle={{ marginRight: 0 }}
          backgroundColor="red"
          color="white"
          size={36}
          onPress={() => nextGuessHandler("lower")}
        />
        <Ionicons.Button
          name="chevron-up"
          iconStyle={{ marginRight: 0, borderRadius: 50 }}
          backgroundColor="green"
          color="white"
          size={36}
          onPress={() => nextGuessHandler("greater")}
        />
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list} >
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={(itemData) =>
            renderListItem(pastGuesses.length, itemData)
          }
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
  listItem: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    // backgroundColor: (listNumber % 2 === 0) ? 'purple' : 'blue',
    // backgroundColor: "purple",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  textColor: {
    color: "white",
  },
});

export default GameScreen;
