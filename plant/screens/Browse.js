import React, { useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Card, Badge, Block, Button, Text } from "../components";
import { theme, mocks } from "../constants";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const Browse = (props) => {
  const { navigation } = props;
  const { profile, categories } = mocks;
  const tabs = ["Products ", "Inspiration ", "Shop "];
  const [state, setState] = useState({
    active: "Products ",
  });
  const rendertabs = (tab) => {
    const { active } = state;
    const isActive = active === tab;
    return (
      <TouchableOpacity
        key={`${tab}`}
        onPress={() => setState({ active: tab })}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text title medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  const ProductList = (key) => {
    if (key == 1) {
      navigation.navigate("Plants");
    } else if (key == 2) {
      navigation.navigate("Seeds");
    } else if (key == 3) {
      navigation.navigate("Flowers");
    } else if (key == 4) {
      navigation.navigate("Sprayers");
    } else if (key == 5) {
      navigation.navigate("Pots");
    } else if (key == 6) {
      navigation.navigate("Fertilizers");
    }
  };

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
        <Text h1>Browse</Text>
        <Button onPress={() => navigation.navigate("Settings")}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>

      <Block flex={false} row space="between" style={styles.tabs}>
        {tabs.map((tabs) => rendertabs(tabs))}
      </Block>

      <ScrollView style={{ paddingVertical: theme.sizes.base * 2 }}>
        <Block flex={false} row space="between" style={styles.categories}>
          {categories.map((category) => {
            const id = category.id;
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => ProductList(id)}
              >
                <Card center style={styles.category}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41,216,143,0.20)"
                  >
                    <Image source={category.image} />
                  </Badge>
                  <Text>{category.name}</Text>
                  <Text gray caption>
                    {category.count}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Browse;

const styles = StyleSheet.create({
  avatar: {
    height: theme.sizes.base * 2.5,
    width: theme.sizes.base * 2.5,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    //marginRight: theme.sizes.base,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
  },
});
