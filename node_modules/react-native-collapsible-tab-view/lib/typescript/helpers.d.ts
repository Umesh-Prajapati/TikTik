import React from 'react';
import Animated from 'react-native-reanimated';
import { Ref, RefComponent } from './types';
/** The time one frame takes at 60 fps (16 ms) */
export declare const ONE_FRAME_MS = 16;
/** check if app is in RTL mode or not */
export declare const isRTL: boolean;
export declare const IS_IOS: boolean;
export declare const AnimatedFlatList: React.ComponentClass<Animated.AnimateProps<import("react-native").FlatListProps<unknown>>, any>;
export declare const AnimatedSectionList: React.ComponentClass<Animated.AnimateProps<import("react-native").SectionListProps<unknown>>, any>;
export declare function scrollToImpl<T extends RefComponent>(ref: Ref<T> | undefined, x: number, y: number, animated: boolean): void;
export declare function makeRenderFunction<T>(ComponentOrMemo: ((props: T) => React.ReactElement) | React.MemoExoticComponent<(props: T) => React.ReactElement> | undefined | null): React.MemoExoticComponent<(props: T) => React.ReactElement> | ((props: T) => React.ReactElement) | ((props: any) => JSX.Element) | undefined;
