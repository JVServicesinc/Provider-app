import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts, IMAGES } from "../../themes/Themes";
import normalize from "../../utils/helpers/normalize";
import NewTextInput from "../../components/NewTextInput";
import Button from "../../components/Button";
import ImageCropPicker, { ImagePicker } from "react-native-image-crop-picker";
import Header from "../../components/Header";
import showErrorAlert from "../../utils/helpers/Toast";
import {
  AdharDetailsRequest,
  GetAdharDetailsRequest,
} from "../../redux/reducer/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import connectionrequest from "../../utils/helpers/NetInfo";
import Loader from "../../utils/helpers/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "i18next";

let status;

function SignUp3(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [adharno, setadharno] = useState("");
  const [selectedprofilePhoto, setselectedprofilePhoto] = useState(null);
  const [selectedprofilePhoto1, setselectedprofilePhoto1] = useState(null);
  const [bordercolor1, setbordercolor1] = useState("#79747E");
  const [Acclength, setAcclength] = useState(false);

  function cameraUpload() {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      title: t("selectImage"),
      storageOptions: {
        skipBackup: true,
      },
    })
      .then(image => {
        let arr = image.path.split("/");
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === "android"
              ? image.path
              : image.path.replace("file://", ""),
        };

        setselectedprofilePhoto(imageObj);
      })
      .catch(err => {
        if (err?.code == "E_NO_CAMERA_PERMISSION") {
          Alert.alert(t("cameraPermissionDenied"), t("goToSetting"), [
            {
              text: t("cancel"),
            },
            {
              text: t("ok"),
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]);
        } else {
        }
      });
  }

  function cameraUpload1() {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      title: t("selectImage"),
      storageOptions: {
        skipBackup: true,
      },
    })
      .then(image => {
        let arr = image.path.split("/");
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === "android"
              ? image.path
              : image.path.replace("file://", ""),
        };

        setselectedprofilePhoto1(imageObj);
      })
      .catch(err => {
        if (err?.code == "E_NO_CAMERA_PERMISSION") {
          Alert.alert(t("cameraPermissionDenied"), t("goToSetting"), [
            {
              text: t("cancel"),
            },
            {
              text: t("ok"),
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]);
        } else {
        }
      });
  }

  const next = () => {
    if (adharno == "") {
      setbordercolor1("red");
    } else if (adharno.length < 12) {
      setbordercolor1("red");
      setAcclength(true);
    } else {
      let formData = new FormData();
      formData.append("aadhar_number", adharno);
      formData.append("front_picture", selectedprofilePhoto);
      formData.append("back_picture", selectedprofilePhoto1);
      connectionrequest()
        .then(() => {
          dispatch(AdharDetailsRequest(formData));
        })
        .catch(err => {
          showErrorAlert(t("connectToInternet"));
        });
    }
  };

  const handleAccNumber = newText1 => {
    setadharno(newText1);
    if (newText1.length === 0) {
      setbordercolor1("red");
    } else if (newText1.length < 12) {
      setbordercolor1("red");
      setAcclength(true);
    } else {
      setbordercolor1("#79747E");
      setAcclength(false); // Reset Acclength to true when the length is within the valid range
    }
  };

  if (status == "" || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case "Auth/AdharDetailsRequest":
        status = AuthReducer.status;
        break;

      case "Auth/AdharDetailsSuccess":
        status = AuthReducer.status;
        props.navigation.navigate("PanDetail");
        break;
      case "Auth/AdharDetailsFailure":
        status = AuthReducer.status;

        break;
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetAdharDetailsRequest());
    }, []),
  );

  useEffect(() => {
    setadharno(AuthReducer?.GetAdharDetailsRes?.data?.document_number);
    setselectedprofilePhoto({
      name: "12345.jpg",
      type: "image/jpeg",
      uri: AuthReducer?.GetAdharDetailsRes?.data?.document_front_photo,
    });
    setselectedprofilePhoto1({
      name: "12346.jpg",
      type: "image/jpeg",
      uri: AuthReducer?.GetAdharDetailsRes?.data?.document_back_photo,
    });
  }, [AuthReducer?.GetAdharDetailsRes]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader
        visible={
          AuthReducer.status == "Auth/AdharDetailsRequest" ||
          AuthReducer.status == "Auth/GetAdharDetailsRequest"
        }
      />
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={"#dbdbdb"}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={"space-between"}
        backmargintop={Platform.OS == "android" ? normalize(20) : normalize(20)}
        text
        textRight={normalize(25)}
        title={"JEveux"}
        textcolor={"black"}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(25)}
        textAlign={"center"}
        RightImage
        textmartop={Platform.OS == "android" ? normalize(20) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.navigate("SignUp2");
        }}
        marginBottom={normalize(10)}
      />
      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled>
          <NewTextInput
            width={"93%"}
            textwidth={"100%"}
            borderRadius={normalize(10)}
            value={adharno}
            onChange={handleAccNumber}
            marginTop={normalize(30)}
            name={t("aadharNumber")}
            placeholderTextColor={"#79747E"}
            borderColor={Acclength ? "red" : bordercolor1}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            keyboardType={"number-pad"}
            textInputHight={normalize(40)}
            maxLength={12}
            textmarleft={Platform.OS == "ios" ? normalize(10) : normalize(5)}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <TouchableOpacity
              style={styles.TochView}
              onPress={() => {
                cameraUpload();
              }}>
              <Image
                source={
                  selectedprofilePhoto
                    ? { uri: selectedprofilePhoto.uri }
                    :
                    IMAGES.addpic
                }
                style={{
                  height: selectedprofilePhoto ? normalize(130) : normalize(45),
                  width: selectedprofilePhoto ? normalize(120) : normalize(45),
                  borderRadius: normalize(10),
                }}
              />
              {selectedprofilePhoto ? null : (
                <Text style={styles.TouchText}>{t("frontPicture")}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TochView}
              onPress={() => {
                cameraUpload1();
              }}>
              <Image
                source={
                  selectedprofilePhoto1
                    ? { uri: selectedprofilePhoto1.uri }
                    : IMAGES.addpic
                }
                style={{
                  height: selectedprofilePhoto1
                    ? normalize(130)
                    : normalize(45),
                  width: selectedprofilePhoto1 ? normalize(120) : normalize(45),
                  borderRadius: normalize(10),
                }}
              />
              {selectedprofilePhoto1 ? null : (
                <Text style={styles.TouchText}>{t("backPicture")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Button
        alignSelf={"center"}
        marginTop={normalize(40)}
        marginBottom={normalize(30)}
        backgroundColor={"black"}
        height={normalize(40)}
        width={"90%"}
        borderRadius={normalize(10)}
        textColor={"white"}
        fontSize={normalize(15)}
        title={t("next1")}
        titlesingle={true}
        fontFamily={
          Platform.OS == "ios" ? Fonts.PoppinsSemiBold : Fonts.PoppinsSemiBold
        }
        onPress={() => {
          next();
        }}
      />
    </SafeAreaView>
  );
}

export default SignUp3;
const styles = StyleSheet.create({
  TochView: {
    borderStyle: "dashed",
    width: "43%",
    borderWidth: normalize(1),
    borderRadius: normalize(20),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: normalize(15),
    height: normalize(150),
    // paddingVertical: normalize(40),
    marginHorizontal: normalize(10),
  },
  TouchText: {
    color: "#A0A0A0",
    fontSize: normalize(14),
    fontFamily: Fonts.PoppinsRegular,
    marginTop: normalize(10),
  },
  AddImage: {
    height: normalize(45),
    width: normalize(45),
  },
  ErrorText: {
    color: "red",
    textAlign: "center",
    fontSize: normalize(15),
    fontFamily: Fonts.PoppinsMedium,
  },
});
