import styled from "@emotion/styled";
import Chat from "./components/Chat";

const AppTitle = styled.h1({
  fontSize: 30,
  fontWeight: 900,
  textAlign: "center",
  marginBottom: 40,
  color: "#212121",
});

const AppContainer = styled.div({
  display: "flex",
  width: "100%",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  background: "#f1f1f1",
});

const AppInner = styled.div({
  display: "inline-block",
});

const App: React.FC = () => (
  <AppContainer>
    <AppInner>
      <AppTitle>ChatChat</AppTitle>
      <Chat />
    </AppInner>
  </AppContainer>
);

export default App;
