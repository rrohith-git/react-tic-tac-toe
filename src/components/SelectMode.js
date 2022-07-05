import { useContext } from 'react';
import styles from './SelectMode.module.css';
import GameContext, { STEPS } from './store/game-context';
import Button from './ui/Button';

const SelectMode = (props) => {

    const gameCtx = useContext(GameContext);

    const onClickHandler = (event) => {
        const btnId = event.target.id
        gameCtx.setModes(btnId)
        gameCtx.switchToNextStep(STEPS.AVATAR)
    };

    return (
        <div className={styles['mode__container']}>
            <h3>Select Mode</h3>
            <div className={styles['btn__wrapper']} >
                <Button id='1p' type='button' name='Single Player' onClick={onClickHandler} />
                <Button id='2p' type='button' name='Multi Player' onClick={onClickHandler} />
            </div>
        </div>
    )
};

export default SelectMode;