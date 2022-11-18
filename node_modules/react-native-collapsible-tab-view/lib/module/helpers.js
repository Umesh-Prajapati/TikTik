import React from 'react';
import { FlatList, Platform, SectionList, I18nManager } from 'react-native';
import Animated, { scrollTo } from 'react-native-reanimated';

/** The time one frame takes at 60 fps (16 ms) */
export const ONE_FRAME_MS = 16;
/** check if app is in RTL mode or not */

export const {
  isRTL
} = I18nManager;
export const IS_IOS = Platform.OS === 'ios';
export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
export const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
export function scrollToImpl(ref, x, y, animated) {
  'worklet';

  if (!ref) return; // ensure we don't scroll on NaN

  if (!Number.isFinite(x) || !Number.isFinite(y)) return; //@ts-expect-error: reanimated typescript types do not accept FlatList for `scrollTo`, but it does work

  scrollTo(ref, x, y, animated);
}
export function makeRenderFunction(ComponentOrMemo) {
  return typeof ComponentOrMemo === 'function' ? ComponentOrMemo : ComponentOrMemo && typeof ComponentOrMemo === 'object' ? props => /*#__PURE__*/React.createElement(ComponentOrMemo, props) : undefined;
}
//# sourceMappingURL=helpers.js.map