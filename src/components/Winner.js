import styles from './Winner.module.css';
import Button from './ui/Button';
import { useContext } from 'react';
import GameContext, { STEPS } from './store/game-context';

const Winner = ({ avatar, isWinner }) => {

    const gameCtx = useContext(GameContext);
    return (
        <div className={styles['winner__container']}>
            {isWinner ? <h2>Winner is {String.fromCodePoint(avatar)}</h2> :<h2>No Winner</h2> }
            <div className={styles['btn__wrapper']} >
                <Button id='playAgain' type='button' onClick={() => { gameCtx.clearAll(); gameCtx.switchToNextStep(STEPS.MODE) }} name='Play Again' />
                <Button id='quit' type='button' onClick={() => { gameCtx.clearAll()}} name='Quit' />
            </div>
        </div>
    )
};

export default Winner;