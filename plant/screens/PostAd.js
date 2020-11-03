import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Card, Badge, Block, Button, Text, Input } from "../components";
import { theme, mocks } from "../constants";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const PostAd = () => {
  const [postImage, setPostImage] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  //const [image2, setImage2] = useState(null);
  // const [image3, setImage3] = useState(null);
  // const [image4, setImage4] = useState(null);
  useEffect(() => {
    if (postImage) {
      console.log(postImage);
    }
    // fetch("http://192.168.0.105:3000/products", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    (async () => {
      // try {
      //   const result = await fetch("http://192.168.0.106:3000/user", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       email: "example@gmail.com",
      //       password: "qwert",
      //       username: "example",
      //     }),
      //   });

      //   const res = await result.json();
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }
      if (Constants.platform.android) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [postImage]);

  const post = async () => {
    const form1 = new FormData();
    const form2 = new FormData();
    const form3 = new FormData();
    const form4 = new FormData();

    form1.append("productImage", {
      uri: postImage.image1.uri,
      name: "image1.jpg",
      type: "image/jpeg",
    });
    form1.append("productName");
    form2.append("productImage", {
      uri: postImage.image2.uri,
      name: "image1.jpg",
      type: "image/jpeg",
    });
    form3.append("productImage", {
      uri: postImage.image3.uri,
      name: "image1.jpg",
      type: "image/jpeg",
    });
    form4.append("productImage", {
      uri: postImage.image4.uri,
      name: "image1.jpg",
      type: "image/jpeg",
    });

    const request = [fetch("http://192.168.0.107:3000/products")];
    //   let form = new FormData();
    //   form.append("image", {
    //     productImage: photo.uri,
    //     // name: `${object.name}image.jpg`,
    //     type: "image/jpeg",
    //   });
    //   try {
    //     const response = await fetch("http://192.168.0.107:3000/products", {
    //       method: "POST",
    //       body: form,
    //       header: {
    //         "Content-Type": "multipart/form-data;",
    //       },
    //     });

    //     const result = await response.json();
    //     console.log(result);
    //     const imageUrl = result.path;
    //     postImageInfo.push(imageUrl);
    //     let items = [...postImage];
    //     let item = items[photo];
    //     item.saved = true;
    //     items[photo] = item;
    //     setPostImage(items);
    //   } catch (error) {
    //     console.log("Error Occured");
    //     console.log(error);
    //   }
    // }

    // // Requst to create new Post

    // console.log(postImageInfo);
    // if (postImageInfo.length > 0) {
    //   try {
    //     const response = await fetch("http://192.168.0.107:3000/products", {
    //       method: "POST",
    //       header: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         userId: userId,
    //         postType: "MEDIA",
    //         postMedia: postImageInfo,
    //       }),
    //     });
    //     const result = await response.json();
    //     console.log(result);
    //     if (result.message === "ERROR_OCCURED") {
    //       throw "Error: Server side error while creating new post";
    //     }
    //     // props.navigation.goBack();
    //   } catch (error) {
    //     console.log("Error Occured While Creating New Post");
    //     console.log(error);
    //   }
    // }
  };

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPostImage({ ...postImage, image1: result.uri });
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPostImage({ ...postImage, image2: result.uri });
    }
  };

  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPostImage({ ...postImage, image3: result.uri });
    }
  };

  const pickImage4 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPostImage({ ...postImage, image4: result.uri });
    }
  };

  return (
    <Block color="white">
      <Block paddingTop={theme.sizes.padding * 3}>
        <ScrollView>
          <Block
            style={{
              padding: theme.sizes.base,
              paddingTop: theme.sizes.base,
            }}
          >
            <Text h3>Product name</Text>
            <Input></Input>

            <Text h3>Product Image</Text>
            <Block row space="between">
              <Button style={styles.Button} onPress={pickImage1}>
                {postImage.image1 ? (
                  <Image
                    source={{ uri: postImage.image1 }}
                    style={styles.image}
                  />
                ) : (
                  <Ionicons
                    style={{ left: 53 }}
                    name="ios-add-circle-outline"
                    size={80}
                    color="#C5CCD6"
                  />
                )}
              </Button>
              <Button style={styles.Button} onPress={pickImage2}>
                {postImage.image2 ? (
                  <Image
                    source={{ uri: postImage.image2 }}
                    style={styles.image}
                  />
                ) : (
                  <Ionicons
                    style={{ left: 53 }}
                    name="ios-add-circle-outline"
                    size={80}
                    color="#C5CCD6"
                  />
                )}
              </Button>
            </Block>
            <Block row space="between">
              <Button style={styles.Button} onPress={pickImage3}>
                {postImage.image3 ? (
                  <Image
                    source={{ uri: postImage.image3 }}
                    style={styles.image}
                  />
                ) : (
                  <Ionicons
                    style={{ left: 53 }}
                    name="ios-add-circle-outline"
                    size={80}
                    color="#C5CCD6"
                  />
                )}
              </Button>
              <Button style={styles.Button} onPress={pickImage4}>
                {postImage.image4 ? (
                  <Image
                    source={{ uri: postImage.image4 }}
                    style={styles.image}
                  />
                ) : (
                  <Ionicons
                    style={{ left: 53 }}
                    name="ios-add-circle-outline"
                    size={80}
                    color="#C5CCD6"
                  />
                )}
              </Button>
            </Block>

            <Text h3>MRP</Text>
            <Input></Input>

            <Text h3>Description</Text>
            <Input></Input>
            <Button gradient onPress={post}>
              <Text white center>
                Post
              </Text>
            </Button>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

export default PostAd;

const styles = StyleSheet.create({
  Button: {
    height: theme.sizes.base * 11,
    width: theme.sizes.base * 11,
    borderWidth: 1,
    borderColor: "#FFE358",
  },
  image: {
    borderRadius: theme.sizes.radius,
    width: theme.sizes.base * 11,
    height: theme.sizes.base * 11,
    justifyContent: "center",
    marginVertical: theme.sizes.padding / 3,
  },
});
