import { StyleSheet } from "react-native";

export const Comp_GlobalStyle = StyleSheet.create({
  container: {

  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: `rgb(246,246,246)`,
  },
  icon: {
    width: 20,
    height: 21,
  },
  input: {
    padding: 13,
    flex: 1,
    borderRadius: 10,
  },
  titleName: {
    color: `rgb(89,88,89)`,
    fontSize: 16,
    fontWeight: '500',
    marginStart: 13,
    paddingBottom: 9,
    paddingTop: 18,
  },
});

export const AuthS_GS = StyleSheet.create({
  container: {
    marginTop: '16%',
    marginBottom: '10%'
  },

  title: {
    fontSize: 24,
    color: `rgb(89,88,89)`,
  },

  semiTitle: {
    fontSize: 16,
    color: `rgb(171,169,169)`,
    marginTop: 8,
  },
  background: {
    height: 200,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
  },
});