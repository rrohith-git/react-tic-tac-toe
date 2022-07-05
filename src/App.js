import TicTacToe from './components/TicTacToe';
import GameProvider from './components/store/GameProvider';

function App() {
  return (
    <GameProvider>
      <TicTacToe />
    </GameProvider>
  );
}

export default App;
