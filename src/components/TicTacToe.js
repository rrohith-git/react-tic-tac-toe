import { useContext } from 'react';
import styles from './TicTacToe.module.css';
import Header from './Header';
import Footer from './Footer';
import SelectMode from './SelectMode';
import Home from './Home';
import AvatarSelection from './AvatarSelection';
import GameBoard from './GameBoard';
import GameContext from './store/game-context';
import Winner from './Winner';

let winner = '';
let isWinner = false;
const TicTacToe = () => {

    const { steps } = useContext(GameContext);

    return (
        <div className={styles['main_container']}>
            <div className={styles.container}>
                <Header />
                <div className={styles['game__container']}>
                    {steps.showhomeScreen.value && <Home />}
                    {steps.showSelectModeScreen.value && <SelectMode />}
                    {steps.showChooseAvatarScreen.value && <AvatarSelection />}
                    {steps.showGameboardScreen.value && <GameBoard setWinner={(avatar, isWin) =>{winner = avatar; isWinner = isWin}} />}
                    {steps.showWinnerScreen.value && <Winner avatar={winner} isWinner={isWinner} />}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default TicTacToe