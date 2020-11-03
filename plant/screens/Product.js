import React, { useState } from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";
import { Block, Button, Text } from "../components";
import { theme, mocks } from "../constants";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const Product = () => {
  const scrollx = new Animated.Value(0);
  const { plants } = mocks;
  const [state, setState] = useState({
    showTerms: false,
  });

  const renderIllustration = () => {
    return (
      <Block>
        {plants.map((plantData) => (
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle
            snapToAlignment="center"
            data={plantData.uriArr}
            extraData={state}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item }) => (
              <Image
                source={item.source}
                resizeMode="contain"
                style={{
                  width,
                  height: height / 2,
                  //overflow: "visible",
                }}
              />
            )}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { x: scrollx } },
              },
            ])}
          />
        ))}
      </Block>
    );
  };

  const renderSteps = () => {
    const stepPosition = Animated.divide(scrollx, width);
    return (
      <Block color="accent" flex={false}>
        {plants.map((plantData) => (
          <Block row center middle style={styles.stepsContainer}>
            {plantData.uriArr.map((item, index) => {
              const opacity = stepPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.4, 1, 0.4],
                extrapolate: "clamp",
              });
              return (
                <Block
                  animated
                  flex={false}
                  key={`${item.id}`}
                  color="gray"
                  style={[styles.steps, { opacity }]}
                />
              );
            })}
          </Block>
        ))}
      </Block>
    );
  };
  return (
    <Block color="white">
      <Block paddingTop={theme.sizes.padding * 3}>
        <ScrollView>
          {plants.map((plantData) => (
            <Block>
              <Text center h2 style={{ paddingBottom: theme.sizes.padding }}>
                {plantData.title}
              </Text>
              {renderIllustration()}
              {renderSteps()}
              <Block row style={{ paddingTop: 24, paddingLeft: 24 }}>
                <Text h1 bold accent>
                  ₹{plantData.mrp}
                </Text>
              </Block>
            </Block>
          ))}
          <Block middle flex={0.3} margin={theme.sizes.padding}>
            <Button gradient>
              <Text center semibold white>
                Buy now
              </Text>
            </Button>
            <Button shadow>
              <Text center semibold>
                Add to Cart
              </Text>
            </Button>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};
export default Product;
const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
