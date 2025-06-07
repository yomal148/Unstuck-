export type RootStackParamList = {
  LandingPage: undefined;
  Login: undefined;
  Thought: {user: { email: string; number: string; name: string } };
  History: { thoughts: { text: string; category: string }[] };
};