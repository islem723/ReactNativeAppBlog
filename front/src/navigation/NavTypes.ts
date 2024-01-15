import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthRoutesParamList = {
  LoginPage: undefined;
  ForgotPassword: undefined;
  RegisterPage: undefined;
};

export type HomeRoutesParamList = {
  Articles: undefined;
  BookmarksScreen: undefined;
};

export type RoutesParamList = {
  AuthRoute: NavigatorScreenParams<AuthRoutesParamList>;
  HomeRoute: NavigatorScreenParams<HomeRoutesParamList>;
  AddArticleScreen: undefined;
};
