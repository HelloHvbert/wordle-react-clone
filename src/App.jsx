import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { GameProvider } from "./GameContext";

function App() {
  return (
    <>
      <Header />
      <GameProvider>
        <Main />
      </GameProvider>
      <Footer />
    </>
  );
}

export default App;
