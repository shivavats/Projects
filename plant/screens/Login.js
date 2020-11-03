import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Block, Button, Text, Input } from "../components";
import { theme } from "../constants";

const Login = (props) => {
  const { navigation } = props;

  const [text, setText] = useState({
    email: "example@gmail.com",
    password: "example",
    errors: [],
    loading: false,
  });
  const [data, setData] = useState();
  const { email, password, errors, loading } = text;

  const hasError = (key) => (errors.includes(key) ? styles.hasError : false);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.message == "AUTH_SUCCESSFUL") {
        navigation.navigate("Browse");
      } else {
        Alert.alert("ALert", "AUTH_FAILED", [{ text: "Continue" }], {
          cancelable: false,
        });
      }
    }
  }, [data]);

  // async function handleLogin() {
  //   // fetch(`http://192.168.0.107:3000/user/login/${text.email}`)
  //   //   .then((response) => response.json())
  //   //   .then((json) => setData(json))
  //   //   .catch((error) => console.error(error));

  //   // console.log(data);

  //   try {
  //     const result = await fetch("http://192.168.0.107:3000/user/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: text.email,
  //         password: text.password,
  //       }),
  //     });

  //     const res = await result.json();

  //     setData(res);
  //   } catch (err) {
  //     console.log(err);
  //   }

  // const errors = [];

  // setText({ ...text, loading: true });

  // if (text.email !== data.email) {
  //   errors.push("email");
  // }
  // if (password !== data.password) {
  //   errors.push("password");
  // }

  // if (errors.length) {
  //   setText({ ...text, errors, loading: false });
  // } else {
  //   setText({ ...text, errors: [], loading: false });
  //   navigation.navigate("Browse");
  // }

  // if (data.email != text.email) {
  //   Alert.alert("ALert", "incorrect email", [{ text: "Continue" }], {
  //     cancelable: false,
  //   });
  //   setData([]);
  // } else if (data.password != text.password) {
  //   Alert.alert("ALert", "incorrect password", [{ text: "Continue" }], {
  //     cancelable: false,
  //   });
  //   setData([]);
  // }
  // }

  const handleLogin = () => {
    const errors = [];

    setText({ ...text, loading: true });

    if (email !== "example@gmail.com") {
      errors.push("email");
    }
    if (password !== "example") {
      errors.push("password");
    }

    if (errors.length) {
      setText({ ...text, errors, loading: false });
    } else {
      setText({ ...text, errors: [], loading: false });
      navigation.navigate("Browse");
    }
  };
  return (
    <Block color="white">
      <Block middle margin={theme.sizes.padding}>
        <Input
          label="Email"
          error={hasError("email")}
          style={[styles.input, hasError("email")]}
          defaultValue={text.email}
          onChangeText={(input) => setText({ ...text, email: input })}
        />
        <Input
          secure
          label="password"
          error={hasError("password")}
          style={[styles.input, hasError("password")]}
          defaultValue={text.password}
          onChangeText={(input) => setText({ ...text, password: input })}
        />
        <Button gradient onPress={handleLogin}>
          <Text center white bold>
            Login
          </Text>
        </Button>
        <Button onPress={() => navigation.navigate("Forgot")}>
          <Text center gray caption style={{ textDecorationLine: "underline" }}>
            Forgot Password?
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasError: {
    borderBottomColor: theme.colors.accent,
  },
});
