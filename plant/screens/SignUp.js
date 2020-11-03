import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { Block, Button, Text, Input } from "../components";
import { theme } from "../constants";

const Login = (props) => {
  const { navigation } = props;

  const [text, setText] = useState({
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
  });
  const [data, setData] = useState();
  const { email, password, errors, loading } = text;

  const hasError = (key) => (errors.includes(key) ? styles.hasError : false);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.message == "This Email Already Exists") {
        Alert.alert(
          "ALert",
          "This Email Already Exists",
          [{ text: "Continue" }],
          {
            cancelable: false,
          }
        );
      } else if (data.message == "User Created Successfully") {
        Alert.alert(
          "ALert",
          "User Created Successfully",
          [{ text: "Continue", onPress: () => navigation.navigate("Browse") }],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("ALert", "Something Wrong!", [{ text: "Continue" }], {
          cancelable: false,
        });
      }
    }
  }, [data]);

  async function handleSignUp() {
    try {
      const result = await fetch("http://192.168.0.107:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: text.email,
          password: text.password,
          username: text.username,
        }),
      });

      const res = await result.json();
      setData(res);
      console.log(res);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  // if (data.message == "Post") {
  //   Alert.alert(
  //     "ALert",
  //     data.createdUser.email,
  //     [{ text: "Continue", onPress: () => navigation.navigate("Browse") }],
  //     {
  //       cancelable: false,
  //     }
  //   );
  //   setData([]);
  // } else if (data.message == "email exist") {
  //   Alert.alert("ALert", "email exist", [{ text: "Continue" }], {
  //     cancelable: false,
  //   });
  //   setData([]);
  // }

  // const handleSignUp = () => {
  //   const errors = [];

  //   setText({ ...text, loading: true });

  //   if (email !== "example@gmail.com") {
  //     errors.push("email");
  //   }
  //   if (password !== "example") {
  //     errors.push("password");
  //   }

  //   if (errors.length) {
  //     setText({ ...text, errors, loading: false });
  //   } else {
  //     setText({ ...text, errors: [], loading: false });
  //     Alert.alert(
  //       "Success!",
  //       "Your account has been created",
  //       [{ text: "Continue", onPress: () => navigation.navigate("Browse") }],
  //       { cancelable: false }
  //     );
  //   }
  // };
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
          label="Username"
          style={styles.input}
          defaultValue={text.username}
          onChangeText={(input) => setText({ ...text, username: input })}
        />
        <Input
          secure
          label="password"
          error={hasError("password")}
          style={[styles.input, hasError("password")]}
          defaultValue={text.password}
          onChangeText={(input) => setText({ ...text, password: input })}
        />
        <Input
          secure
          label="Confirm  password"
          error={hasError("password")}
          style={[styles.input, hasError("password")]}
          defaultValue={text.password}
          onChangeText={(input) => setText({ ...text, password: input })}
        />
        <Button gradient onPress={() => handleSignUp()}>
          <Text center white bold>
            SignUp
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
