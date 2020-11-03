import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
  View,
} from "react-native";

// import { Block, Button, Text } from "../components";
// import { theme } from "../constants";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

function Welcome(props) {
  const scrollx = new Animated.Value(0);
  const { navigation } = props;
  const [state, setState] = useState({
    showTerms: false,
  });

  // const renderTermService = () => {
  //   return (
  //     <Modal animationType="slide" visible={state.showTerms}>
  //       <Block
  //         padding={[theme.sizes.padding * 2, theme.sizes.padding]}
  //         space="between"
  //       >
  //         <Text h2 light>
  //           Terms & Services
  //         </Text>
  //         <ScrollView>
  //           <Text caption gray height={18}>
  //             Often, the body paragraph demonstrates and develops your topic
  //             sentence through an ordered, logical progression of ideas. There
  //             are a number of useful techniques for expanding on topic sentences
  //             and developing your ideas in a paragraph. Illustration in a
  //             paragraph supports a general statement by means of examples,
  //             details, or relevant quotations (with your comments). In Harry’s
  //             world fate works not only through powers and objects such as
  //             prophecies, the Sorting Hat, wands, and the Goblet of Fire, but
  //             also through people. Repeatedly, other characters decide Harry’s
  //             future for him, depriving him of freedom and choice. For example,
  //             before his eleventh birthday, the Dursleys control Harry’s life,
  //             keeping from him knowledge of his past and understanding of his
  //             identity (Sorcerer’s 49). In Harry Potter and the Chamber of
  //             Secrets, Dobby repeatedly assumes control over events by
  //             intercepting Ron’s and Hermione’s letters during the summer; by
  //             sealing the barrier to Platform 93⁄4, causing Harry to miss the
  //             Hogwarts Express; and by sending a Bludger after Harry in a
  //             Quidditch match, breaking his wrist. Yet again, in Harry Potter
  //             and the Prisoner of Azkaban, many adults intercede while
  //             attempting to protect Harry from perceived danger, as Snape
  //             observes: “Everyone from the Minister of Magic downward has been
  //             trying to keep famous Harry Potter safe from Sirius Black” (284).
  //             All these characters, as enactors of fate, unknowingly drive Harry
  //             toward his destiny by attempting to control or to direct his life,
  //             while themselves controlled and directed by fate. —Julia Pond, “A
  //             Story of the Exceptional: Fate and Free Will in the Harry Potter
  //             Series” The definition paragraph does exactly what you would
  //             expect: it defines a term, often by drawing distinctions between
  //             the term and other related ones. The definition that you provide
  //             will often be specific to your subject area. Try to avoid
  //             perfunctory dictionary definitions that do not inform your
  //             analysis in a meaningful way. Our typology is built on three
  //             dimensions: internality, types of participants, and the degree of
  //             effective resistance. For our study, a civil war is any armed
  //             conflict that involves (a) military action internal to the
  //             metropole, (b) the active participation of the national
  //             government, and (c) effective resistance by both sides. With these
  //             criteria, we differentiate civil wars from other types of internal
  //             violent conflicts.
  //           </Text>
  //         </ScrollView>

  //         <Button gradient onPress={() => setState({ showTerms: false })}>
  //           <Text center white>
  //             I understand
  //           </Text>
  //         </Button>
  //       </Block>
  //     </Modal>
  //   );
  // };

  const renderIllustration = () => {
    const { illustrations } = props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraData={state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{
              width,
              height: height / 2,
              overflow: "visible",
            }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: scrollx } },
          },
        ])}
      />
    );
  };

  const renderSteps = () => {
    const { illustrations } = props;
    const stepPosition = Animated.divide(scrollx, width);
    return (
      <View style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`${item.id}`}
              style={[styles.steps, { opacity }]}
            ></Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {renderIllustration()}
        {renderSteps()}
      </View>
    </View>
  );
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") },
  ],
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: 40,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    backgroundColor: "grey",
  },
});

// import React, {useState} from 'react';
// import {
//   Animated,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import {FlatList, ScrollView} from 'react-native-gesture-handler';
// const {width, height} = Dimensions.get('window');

// export default function Splash(props) {
//   const {navigation} = props;
//   const scrollx = new Animated.Value(0);
//   const [state, setState] = useState({
//     showTerms: false,
//   });
//   const renderIllustration = () => {
//     const {illustrations} = props;
//     return (
//       <FlatList
//         horizontal
//         pagingEnabled
//         scrollEnabled
//         showsHorizontalScrollIndicator={false}
//         scrollEventThrottle
//         snapToAlignment="center"
//         data={illustrations}
//         extraData={state}
//         keyExtractor={(item, index) => `${item.id}`}
//         renderItem={({item}) => (
//           <Image
//             source={item.source}
//             style={{
//               flex: 1,
//               width: width,
//               height: height,
//               //overflow: 'visible',
//               position: 'relative',
//             }}
//           />
//         )}
//         // onScroll={Animated.event([
//         //   {
//         //     nativeEvent: { contentOffset: { x: scrollx } },
//         //   },
//         // ])}
//       />
//     );
//   };

//   const renderSteps = () => {
//     const {illustrations} = props;
//     const stepPosition = Animated.divide(scrollx, width);
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         style={styles.stepsContainer}>
//         {illustrations.map((item, index) => {
//           const opacity = stepPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [0.4, 1, 0.4],
//             extrapolate: 'clamp',
//           });
//           return (
//             <Animated.View
//               flex={false}
//               key={`${item.id}`}
//               style={[styles.steps, {opacity}]}
//             />
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       <StatusBar
//         barStyle="light-content"
//         translucent
//         backgroundColor="transparent"
//       />
//       {renderIllustration()}
//       {/* {renderSteps()} */}
//       <View style={{position: 'absolute'}}>
//         <View
//           style={{
//             justifyContent: 'space-between',
//             flexDirection: 'row',
//           }}></View>
//         <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
//           <View
//             style={{
//               backgroundColor: 'transparent',
//               borderWidth: 1,
//               borderColor: '#ffffff',
//               borderRadius: 8,
//               padding: 10,
//               paddingHorizontal: 20,
//               margin: 20,
//             }}>
//             <Text
//               style={{
//                 color: '#ffffff',
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//               }}>
//               Skip
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <Text>shiva</Text>
//         {/* {renderSteps()} */}
//       </View>
//     </View>
//   );
// }

// Splash.defaultProps = {
//   illustrations: [
//     {id: 1, source: require('../assets/splash2.png')},
//     {id: 2, source: require('../assets/splash2.png')},
//     {id: 3, source: require('../assets/splash2.png')},
//   ],
// };

// const styles = StyleSheet.create({
//   stepsContainer: {
//     position: 'absolute',
//     bottom: 40,
//     right: 0,
//     left: 0,
//   },
//   steps: {
//     color: 'gray',
//     width: 5,
//     height: 5,
//     borderRadius: 5,
//     marginHorizontal: 2.5,
//   },
// });

// import React, { useState } from "react";
// import { Animated, Dimensions, Image, StyleSheet, Modal } from "react-native";

// import { Block, Button, Text } from "../components";
// import { theme } from "../constants";
// import { FlatList, ScrollView } from "react-native-gesture-handler";

// const { width, height } = Dimensions.get("window");

// function Welcome(props) {
//   const scrollx = new Animated.Value(0);
//   const { navigation } = props;
//   const [state, setState] = useState({
//     showTerms: false,
//   });

//   const renderTermService = () => {
//     return (
//       <Modal animationType="slide" visible={state.showTerms}>
//         <Block
//           padding={[theme.sizes.padding * 2, theme.sizes.padding]}
//           space="between"
//         >
//           <Text h2 light>
//             Terms & Services
//           </Text>
//           <ScrollView>
//             <Text caption gray height={18}>
//               Often, the body paragraph demonstrates and develops your topic
//               sentence through an ordered, logical progression of ideas. There
//               are a number of useful techniques for expanding on topic sentences
//               and developing your ideas in a paragraph. Illustration in a
//               paragraph supports a general statement by means of examples,
//               details, or relevant quotations (with your comments). In Harry’s
//               world fate works not only through powers and objects such as
//               prophecies, the Sorting Hat, wands, and the Goblet of Fire, but
//               also through people. Repeatedly, other characters decide Harry’s
//               future for him, depriving him of freedom and choice. For example,
//               before his eleventh birthday, the Dursleys control Harry’s life,
//               keeping from him knowledge of his past and understanding of his
//               identity (Sorcerer’s 49). In Harry Potter and the Chamber of
//               Secrets, Dobby repeatedly assumes control over events by
//               intercepting Ron’s and Hermione’s letters during the summer; by
//               sealing the barrier to Platform 93⁄4, causing Harry to miss the
//               Hogwarts Express; and by sending a Bludger after Harry in a
//               Quidditch match, breaking his wrist. Yet again, in Harry Potter
//               and the Prisoner of Azkaban, many adults intercede while
//               attempting to protect Harry from perceived danger, as Snape
//               observes: “Everyone from the Minister of Magic downward has been
//               trying to keep famous Harry Potter safe from Sirius Black” (284).
//               All these characters, as enactors of fate, unknowingly drive Harry
//               toward his destiny by attempting to control or to direct his life,
//               while themselves controlled and directed by fate. —Julia Pond, “A
//               Story of the Exceptional: Fate and Free Will in the Harry Potter
//               Series” The definition paragraph does exactly what you would
//               expect: it defines a term, often by drawing distinctions between
//               the term and other related ones. The definition that you provide
//               will often be specific to your subject area. Try to avoid
//               perfunctory dictionary definitions that do not inform your
//               analysis in a meaningful way. Our typology is built on three
//               dimensions: internality, types of participants, and the degree of
//               effective resistance. For our study, a civil war is any armed
//               conflict that involves (a) military action internal to the
//               metropole, (b) the active participation of the national
//               government, and (c) effective resistance by both sides. With these
//               criteria, we differentiate civil wars from other types of internal
//               violent conflicts.
//             </Text>
//           </ScrollView>

//           <Button gradient onPress={() => setState({ showTerms: false })}>
//             <Text center white>
//               I understand
//             </Text>
//           </Button>
//         </Block>
//       </Modal>
//     );
//   };

//   const renderIllustration = () => {
//     const { illustrations } = props;
//     return (
//       <FlatList
//         horizontal
//         pagingEnabled
//         scrollEnabled
//         showsHorizontalScrollIndicator={false}
//         scrollEventThrottle
//         snapToAlignment="center"
//         data={illustrations}
//         extraData={state}
//         keyExtractor={(item, index) => `${item.id}`}
//         renderItem={({ item }) => (
//           <Image
//             source={item.source}
//             resizeMode="contain"
//             style={{
//               width,
//               height: height / 2,
//               overflow: "visible",
//             }}
//           />
//         )}
//         onScroll={Animated.event([
//           {
//             nativeEvent: { contentOffset: { x: scrollx } },
//           },
//         ])}
//       />
//     );
//   };

//   const renderSteps = () => {
//     const { illustrations } = props;
//     const stepPosition = Animated.divide(scrollx, width);
//     return (
//       <Block row center middle style={styles.stepsContainer}>
//         {illustrations.map((item, index) => {
//           const opacity = stepPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [0.4, 1, 0.4],
//             extrapolate: "clamp",
//           });
//           return (
//             <Block
//               animated
//               flex={false}
//               key={`${item.id}`}
//               color="gray"
//               style={[styles.steps, { opacity }]}
//             />
//           );
//         })}
//       </Block>
//     );
//   };
//   const a = "Greener";
//   return (
//     <Block color="white">
//       <Block center bottom flex={0.3}>
//         <Text h1 center bold>
//           Your Home.
//           <Text h1 primary>
//             Greener.
//           </Text>
//         </Text>
//         <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
//           Enjoy the experience.
//         </Text>
//       </Block>
//       <Block center middle>
//         {renderIllustration()}
//         {renderSteps()}
//       </Block>
//       <Block middle flex={0.3} margin={theme.sizes.padding * 2}>
//         <Button gradient onPress={() => navigation.navigate("Login")}>
//           <Text center semibold white>
//             Login
//           </Text>
//         </Button>
//         <Button shadow onPress={() => navigation.navigate("SignUp")}>
//           <Text center semibold>
//             Sign up
//           </Text>
//         </Button>
//         <Button onPress={() => setState({ showTerms: true })}>
//           <Text center caption gray>
//             Terms & Conditions
//           </Text>
//         </Button>
//       </Block>
//       {renderTermService()}
//     </Block>
//   );
// }

// Welcome.defaultProps = {
//   illustrations: [
//     { id: 1, source: require("../assets/images/illustration_1.png") },
//     { id: 2, source: require("../assets/images/illustration_2.png") },
//     { id: 3, source: require("../assets/images/illustration_3.png") },
//   ],
// };

// export default Welcome;

// const styles = StyleSheet.create({
//   stepsContainer: {
//     position: "absolute",
//     bottom: theme.sizes.base,
//     right: 0,
//     left: 0,
//   },
//   steps: {
//     width: 5,
//     height: 5,
//     borderRadius: 5,
//     marginHorizontal: 2.5,
//   },
// });
