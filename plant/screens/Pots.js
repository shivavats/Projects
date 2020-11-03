import React, { useState } from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";
import { Card, Badge, Block, Divider, Button, Text } from "../components";
import { theme, mocks } from "../constants";
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

const Plants = (props) => {
  const { navigation } = props;
  const scrollx = new Animated.Value(0);
  const { PotsList } = mocks;
  const [state, setState] = useState({
    showTerms: false,
  });
  const ProductList = () => {
    navigation.navigate("Product");
  };
  const renderIllustration = () => {
    return (
      <ScrollView>
        <Block flex={false} row space="between" style={styles.categories}>
          {PotsList.map((category) => (
            <TouchableOpacity key={category.id}>
              <Block style={styles.category}>
                <Image source={category.uri} style={styles.image} />

                <Text accent>{category.title}</Text>
                <Text gray bold caption>
                  {category.mrp}
                </Text>
                <Text gray bold caption>
                  {category.mrp}
                </Text>
              </Block>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    );
  };
  return (
    <Block color="white">
      <Block flex={0.1}></Block>
      <Block flex={0.1} style={{ marginHorizontal: theme.sizes.base - 10 }}>
        <Text center style={{ paddingTop: theme.sizes.base }} h3>
          Results of plants
        </Text>
      </Block>
      <Block>{renderIllustration()}</Block>
    </Block>
  );
};

export default Plants;

const styles = StyleSheet.create({
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: width - theme.sizes.padding * 2.4 - theme.sizes.base - 136,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 0.9,

    marginBottom: theme.sizes.base,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base - 10,
  },
  image: {
    height: 200,
    width: 200,
  },
  card: {},
});
