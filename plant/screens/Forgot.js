import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Block, Button, Text, Input } from "../components";
import { theme } from "../constants";
const Forgot = (props) => {
  const { navigation } = props;
  const [text, setText] = useState({
    email: "example@gmail.com",
    errors: [],
  });
  const { email, errors } = text;
  const handleForgot = () => {
    const errors = [];

    if (email !== "example@gmail.com") {
      errors.push("email");
    }
    if (errors.length) {
      Alert.alert(
        "Error!",
        "Please check your email address.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Password sent!",
        "Please check your email.",
        [
          {
            text: "Cancel",

            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <Block color="white">
      <Block middle padding={theme.sizes.padding}>
        <Input
          label="Email"
          defaultValue={text.email}
          onChangeText={(input) => setText({ ...text, email: input })}
        />
        <Button gradient onPress={() => handleForgot()}>
          <Text center white bold>
            Change password
          </Text>
        </Button>
        <Button onPress={() => navigation.navigate("Login")}>
          <Text center gray caption style={{ textDecorationLine: "underline" }}>
            Back to login
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Forgot;

const styles = StyleSheet.create({});
