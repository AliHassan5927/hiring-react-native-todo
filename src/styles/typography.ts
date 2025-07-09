import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fontFamily } from '../assets/fonts';

export const typography = StyleSheet.create({
  heading: {
    fontSize: 30,
    paddingTop: 27,
    paddingHorizontal: 20,
    color: colors.textPrimary,
    fontFamily: fontFamily.TtBold,
  },
  body: {
    fontSize: 18,
    fontFamily: fontFamily.DmRegular,
    color: colors.textPrimary,
    flex: 1,
  },
  strikethrough: {
    fontSize: 18,
    fontFamily: fontFamily.DmRegular,
    color: colors.border,
    textDecorationLine: 'line-through',
    flex: 1,
  },
  emptyText: {
    fontSize: 22,
    fontFamily: fontFamily.DmMedium,
    color: colors.placeholder,
  },
});
