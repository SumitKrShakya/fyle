import logo from "./logo.svg";
import "./App.css";
import Left from "./components/Left";
import Right from "./components/Right";
import styled from "styled-components";

function App() {
  return (
    <StyledDiv className="App">
      <Left />
      <Right />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;



export default App;
