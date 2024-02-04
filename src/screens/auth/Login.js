import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Fonts, IMAGES } from "../../themes/Themes";
import normalize from "../../utils/helpers/normalize";
import NewTextInput from "../../components/NewTextInput";
import Button from "../../components/Button";
import showErrorAlert from "../../utils/helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import { signinRequest } from "../../redux/reducer/AuthReducer";
import connectionrequest from "../../utils/helpers/NetInfo";
import Loader from "../../utils/helpers/Loader";
import { Snackbar } from "react-native-paper";
import i18n, { changeLanguage, t } from "i18next";

let status;
let status1;

function Login(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [correctphone, setcorrectphone] = useState(false);
  const [correctpassword, setcorrectpassword] = useState(false);
  const [emptyString, setemptyString] = useState(false);
  const [regexmatch, setregexmatch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState("en");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  useEffect(() => {

    async function changelange() {
      setTimeout(async () => {
        await i18n.changeLanguage("fr");
      }, 5000);
    }

    changelange();

  }, []);

  const next = () => {
    if (phone.length == 0) {
      setemptyString(true);
    } else if (!regex.test(phone)) {
      setregexmatch(true);
    } else if (password == "") {
      showErrorAlert(t("pleaseEnterPassword"));
      setregexmatch(false);
      setemptyString(false);
    } else {
      connectionrequest()
        .then(() => {
          dispatch(
            signinRequest({
              username: phone,
              password: password,
            }),
          );
        })
        .catch(err => {
          showErrorAlert(t("connectToInternet"));
        });
    }
  };
  const handleTextChange = newText => {
    setPhone(newText);

    if (newText !== "") {
      setemptyString(false);
    }
  };

  async function changeLanguageMode() {
    if (language === "fr") {
      setLanguage("en");
      await i18n.changeLanguage("en");
    } else {
      setLanguage("fr");
      await i18n.changeLanguage("fr");
    }
  }


  return (
    <>
      <Loader visible={AuthReducer.status == "Auth/signinRequest"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={"white"}
            translucent={true}
            barStyle={"dark-content"}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}>

            <View style={style.logoView}>
              <Image source={IMAGES.logo} style={style.logoStyle} />
            </View>
            <View>
              <TouchableOpacity onPress={changeLanguageMode}>
                <Text style={{ color: "black" }}>Change language mode</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  fontFamily: Fonts.PoppinsSemiBold,
                  fontSize: normalize(22),
                  marginLeft: normalize(25),
                  marginTop: normalize(20),
                }}>
                {t("welcomeBack")}{" "}
              </Text>
              <Text style={style.welcome}>
                {t("welcomeBackEnterDetails")}
              </Text>
              <Text style={style.email}>{t("emailBold")}</Text>
              <NewTextInput
                width={"85%"}
                textwidth={"100%"}
                borderRadius={normalize(5)}
                value={phone}
                onChange={handleTextChange}
                // backgroundColor={COLORS.backgroundPink}
                marginTop={normalize(2)}
                name={t("enterEmail")}
                keyboardType={"email-address"}
                placeholderTextColor={"#79747E"}
                textmarleft={normalize(12)}
                textInputHight={normalize(40)}
                borderColor={
                  emptyString
                    ? "red"
                    : regexmatch
                      ? "red"
                      : correctphone
                        ? "red"
                        : "#253274"
                }
                borderWidth={normalize(1)}
                fontFamily={Fonts.PoppinsMedium}
              />
              {emptyString ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: normalize(30),
                    marginTop: normalize(5),
                    alignItems: "center",
                  }}>
                  <Image
                    source={IMAGES.incorrect}
                    style={{ height: normalize(15), width: normalize(15) }}
                  />

                  <Text
                    style={{
                      color: "#CD4545",
                      fontSize: normalize(12),
                      fontFamily: Fonts.PoppinsRegular,
                      marginLeft: normalize(2),
                    }}>
                    {t("enterEmail")}
                  </Text>
                </View>
              ) : regexmatch ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: normalize(30),
                    marginTop: normalize(5),
                    alignItems: "center",
                  }}>
                  <Image
                    source={IMAGES.incorrect}
                    style={{ height: normalize(15), width: normalize(15) }}
                  />

                  <Text style={style.Invalidemail}>{t("invalidEmail")}</Text>
                </View>
              ) : null}

              <Text style={[style.email, { marginTop: normalize(10) }]}>
                {t("passwordBold")}
              </Text>
              <NewTextInput
                width={"85%"}
                borderColor={correctpassword ? "red" : "#253274"}
                borderWidth={normalize(1)}
                borderRadius={normalize(5)}
                value={password}
                imagemarleft={normalize(10)}
                onChange={txt => setpassword(txt)}
                isSecure={true}
                addisSucureBtn={true}
                textInputHight={normalize(40)}
                marginTop={normalize(2)}
                name={t("enterPassword")}
                textmarleft={normalize(10)}
                fontFamily={Fonts.PoppinsMedium}
                textwidth={normalize(200)}
                placeholderTextColor={"#79747E"}
              />
              {correctpassword ? (
                <View style={style.InView}>
                  <Image
                    source={IMAGES.incorrect}
                    style={{ height: normalize(15), width: normalize(15) }}
                  />

                  <Text style={style.passwordIncorrect}>
                    {t("passwordIncorrect")}
                  </Text>
                </View>
              ) : null}
              <Text
                style={style.forgotText}
                onPress={() => {
                  props.navigation.navigate("ForgotPassword");
                }}>
                {t("forgotPassword")}
              </Text>
              <Button
                alignSelf={"center"}
                marginTop={normalize(20)}
                backgroundColor={"black"}
                height={normalize(45)}
                width={"80%"}
                borderRadius={normalize(5)}
                textColor={"white"}
                fontSize={normalize(15)}
                title={t("login")}
                titlesingle={true}
                fontFamily={
                  Platform.OS == "ios"
                    ? Fonts.PoppinsSemiBold
                    : Fonts.PoppinsSemiBold
                }
                onPress={() => {
                  next();
                }}
              />

              <Text style={style.createAcc}>
                {t("createAnAccount")}{" "}
                <Text
                  style={style.SignUp}
                  onPress={() => {
                    props.navigation.navigate("SignUp");
                  }}>
                  {t("signUp")}
                </Text>
              </Text>
            </View>
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Undo",
                onPress: () => {
                },
              }}>
              {AuthReducer?.signinResponse?.response?.data?.errors?.[0]}
            </Snackbar>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default Login;
const style = StyleSheet.create({
  email: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: "#7C84AC",
    marginLeft: normalize(25),
    marginTop: normalize(35),
  },
  Invalidemail: {
    color: "#CD4545",
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(2),
  },
  logoView: {
    backgroundColor: "#F7F7F7",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(50),
  },
  welcome: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: "#7C84AC",
    marginLeft: normalize(25),
    marginTop: normalize(5),
  },
  forgotText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(13),
    color: "#253274",
    marginLeft: normalize(25),
    marginTop: normalize(10),
    textAlign: "right",
    marginRight: normalize(32),
  },
  passwordIncorrect: {
    color: "#CD4545",
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(2),
  },
  logoStyle: {
    width: normalize(200),
    height: normalize(200),
    resizeMode: "contain",
    backgroundColor: "#F7F7F7",
  },
  createAcc: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: "#7C84AC",
    marginLeft: normalize(25),
    marginTop: normalize(20),
    textAlign: "center",
  },
  SignUp: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: "#000000",
    marginTop: normalize(20),
    textDecorationLine: "underline",
  },
  InView: {
    flexDirection: "row",
    marginLeft: normalize(30),
    marginTop: normalize(5),
    alignItems: "center",
  },
  PasswordText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: "#7C84AC",
    marginLeft: normalize(25),
    marginTop: normalize(10),
  },
});
