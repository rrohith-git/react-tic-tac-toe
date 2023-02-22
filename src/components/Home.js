import React, { useContext } from 'react';
import styles from './Home.module.css';
import GameContext, { STEPS } from './store/game-context';
import Button from './ui/Button';

const Home = () => {

    const gameCtx = useContext(GameContext);
    return (
        <div className={styles['home__container']}>
            <h2>WELCOME</h2>
            <Button id='home' className={styles['btn_position']} type='button' onClick={() => gameCtx.switchToNextStep(STEPS.MODE)} name='Start Game' />
        </div>
    );
};

export default Home;