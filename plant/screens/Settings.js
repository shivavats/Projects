import React from "react";
import { StyleSheet, Image, Slider } from "react-native";
import { Divider, Block, Button, Text } from "../components";
import { theme, mocks } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

const Settings = (props) => {
  const { navigation } = props;
  const { profile } = mocks;
  return (
    <Block color="white">
      <Block
        space="between"
        flex={false}
        row
        center
        paddingHorizontal={theme.sizes.base * 2}
        paddingTop={theme.sizes.padding * 3}
      >
        <Text h1>Settings</Text>
        <Button>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <ScrollView>
        <Block paddingHorizontal={theme.sizes.base * 2} margin={[20, 0]}>
          <Block flex={false}>
            <Text gray2>Username</Text>
            <Block
              flex={false}
              row
              space="between"
              margin={[10, 0]}
              style={styles.imputRow}
            >
              <Text bold>example sharma</Text>

              <Text medium secondary>
                Edit
              </Text>
            </Block>
          </Block>
          <Block flex={false} margin={[10, 0]}>
            <Text gray2>Pincode</Text>
            <Block
              flex={false}
              row
              space="between"
              margin={[10, 0]}
              style={styles.imputRow}
            >
              <Text bold>example sharma</Text>

              <Text medium secondary>
                Edit
              </Text>
            </Block>
          </Block>
          <Block flex={false}>
            <Text gray2>E-mail</Text>
            <Block
              flex={false}
              row
              space="between"
              margin={[10, 0]}
              style={styles.imputRow}
            >
              <Text bold>example sharma</Text>

              <Text medium secondary>
                Edit
              </Text>
            </Block>
          </Block>
        </Block>
        <Divider />
        <Block style={styles.slider}>
          <Block>
            <Text gray>Budget</Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              minimumTrackTintColor={theme.colors.secondary}
              //value={state.budget}
              //onValueChange={(value) => setState({ budget: value })}
              //maximumTrackTintColor  ="rgba(157, 163, 180, 0.10)"
            />
            <Text caption gray2 right>
              Rs.1000
            </Text>
          </Block>
        </Block>
        <Block style={styles.slider}>
          <Block>
            <Text gray>Monthaly cap</Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              minimumTrackTintColor={theme.colors.secondary}
              //maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
            />
            <Text caption gray2 right>
              Rs.1000
            </Text>
          </Block>
        </Block>
        <Block middle flex={0.3} margin={theme.sizes.padding}>
          <Button gradient onPress={() => navigation.navigate("PostAd")}>
            <Text center semibold white>
              Post Ad
            </Text>
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Settings;

const styles = StyleSheet.create({
  avatar: {
    height: theme.sizes.base * 2.5,
    width: theme.sizes.base * 2.5,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  slider: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
});
