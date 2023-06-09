// { Family } 폰트 종류 적용
// { Display, Headline, Title, Body, Lable } 폰트 사이즈 적용
// Color 변경 필요 시 따로 적용할 것.

import { StyleSheet } from "react-native";
import { BLACK } from "../colors";

export const Family = StyleSheet.create({
  KR_Regular: {
    fontFamily: 'NotoSansKR-Regular',
  },
  KR_Medium: {
    fontFamily: 'NotoSansKR-Medium',
  },
  KR_Bold: {
    fontFamily: 'NotoSansKR-Bold',
  },
  EN_Regular: {
    fontFamily: 'Roboto-Regular',
  },
  EN_Medium: {
    fontFamily: 'Roboto-Medium',
  },
  EN_Bold: {
    fontFamily: 'Roboto-Bold',
  },
})

export const Display = StyleSheet.create({
  Large: {
    color: BLACK,
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: 0,
  },
  Medium: {
    color: BLACK,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: 0,
  },
  Small: {
    color: BLACK,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: 0,
  },
})

export const Headline = StyleSheet.create({
  Large: {
    color: BLACK,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  Medium: {
    color: BLACK,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: 0,
  },
  Small: {
    color: BLACK,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0,
  },
})

export const Title = StyleSheet.create({
  Large: {
    color: BLACK,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
  },
  Medium: {
    color: BLACK,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  Small: {
    color: BLACK,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
})

export const Body = StyleSheet.create({
  Large: {
    color: BLACK,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  Medium: {
    color: BLACK,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  Small: {
    color: BLACK,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
})

export const Label = StyleSheet.create({
  Large: {
    color: BLACK,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  Medium: {
    color: BLACK,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  Small: {
    color: BLACK,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
})

