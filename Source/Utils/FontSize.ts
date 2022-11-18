import React from "react";
import { Dimensions, Platform, StatusBar } from "react-native";

const { height: D_HEIGHT, width: D_WIDTH } = (() => {
    const { width, height } = Dimensions.get('window');
    if (width === 0 && height === 0) { return Dimensions.get('screen'); }
    return { width, height };
  })();
  
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896;
  
  const DEFAULT_LNG = "en";
  
  const IS_IPHONE_X = (() => {
    if (Platform.OS === 'web') { return false; }
    return (
      (Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
          (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
      (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
    );
  })();

function FontS(fontSize: number, standardScreenHeight = Dimensions.get('window').height) {
    const { height, width } = Dimensions.get("window");
    const standardLength = width > height ? width : height;
    const androidH = StatusBar.currentHeight || 10;
    const offset = width > height ? 0 : Platform.OS === "ios" ? 78 : -androidH;

    const deviceHeight =
        IS_IPHONE_X || Platform.OS === "android"
            ? standardLength - offset
            : standardLength;

    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
};

export { FontS }