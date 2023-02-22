import React, { useContext, useState } from 'react';
import styles from './AvatarSelection.module.css';
import GameContext, { MODES, PLAYER, STEPS } from './store/game-context';
import Button from './ui/Button';

const AVATARS = ['0x1F47B', '0x1F608', '0x1F929', '0x1F60D', '0x1F351', '0x1F680', '0x1f4a9', '0129409', '0x1F9A0', '0x1F496'];

const AvatarSelection = () => {

    const [avatars, setAvatars] = useState(AVATARS);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const gameCtx = useContext(GameContext);
    let playerMode;
    if (gameCtx.modes[MODES.SINGLE_PLAYER]) {
        playerMode = MODES.SINGLE_PLAYER;
    } else if (gameCtx.modes[MODES.MULTI_PLAYER]) {
        playerMode = MODES.MULTI_PLAYER;
    }
    
    const cpuSelectedAvatar = (playerMode === PLAYER.SINGLE && gameCtx.avatarSelection[PLAYER.SINGLE] !== '') ? avatars[Math.floor(Math.random() * avatars.length)] : '';
    const threePartIndex = Math.ceil(avatars.length / 3);
    const firstPart = avatars.slice(0, threePartIndex);
    const secondPart = avatars.slice(threePartIndex, threePartIndex * 2);
    const thirdPart = avatars.slice(threePartIndex * 2);

    const onAvatarSelection = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const onNextHandler = () => {
        gameCtx.setAvatar(gameCtx.avatarSelection[PLAYER.SINGLE] === '' ? PLAYER.SINGLE : (playerMode === PLAYER.MULTI) ? PLAYER.MULTI : PLAYER.CPU, cpuSelectedAvatar ? cpuSelectedAvatar : selectedAvatar);
        if (gameCtx.avatarSelection[PLAYER.SINGLE] !== '') {
            gameCtx.switchToNextStep(STEPS.GAME);
        }
        setAvatars(prevState => {
            return prevState.filter((prev) => prev !== selectedAvatar);
        });
        setSelectedAvatar('');
    };


    return (
        <div className={styles['avatar__Selection__container']}>
            {(gameCtx.avatarSelection[PLAYER.SINGLE] === '' || (playerMode === PLAYER.MULTI && gameCtx.avatarSelection[PLAYER.MULTI] === '')) && <>
                <h3>Player {gameCtx.avatarSelection[PLAYER.SINGLE] === '' ? 1 : 2}</h3>
                <div className={styles['avatar__container']}>
                    <h2>Choose an avatar</h2>
                    <div className={styles['avatars']}>
                        {firstPart.map((avatar, index) => (<span className={`${styles.avatar} ${avatar === selectedAvatar ? styles.selected : ''}`} key={index} onClick={() => onAvatarSelection(avatar)}>{String.fromCodePoint(avatar)}</span>))}
                    </div>
                    <div className={styles['avatars']}>
                        {secondPart.map((avatar, index) => (<span className={`${styles.avatar} ${avatar === selectedAvatar ? styles.selected : ''}`} key={index} onClick={() => onAvatarSelection(avatar)}>{String.fromCodePoint(avatar)}</span>))}
                    </div>
                    <div className={styles['avatars']}>
                        {thirdPart.map((avatar, index) => (<span className={`${styles.avatar} ${avatar === selectedAvatar ? styles.selected : ''}`} key={index} onClick={() => onAvatarSelection(avatar)}>{String.fromCodePoint(avatar)}</span>))}
                    </div>
                </div>
                <div className={styles['next__btn']}>
                    <Button id='next' type='button' name='Next' disabled={!selectedAvatar} onClick={onNextHandler} />
                </div>
            </>}
            {(playerMode === PLAYER.SINGLE && gameCtx.avatarSelection[PLAYER.SINGLE] !== '') && <>
                <div className={styles['avatar__container']}>
                    <h3>CPU</h3>
                    <span className={`${styles.avatar} ${styles.selected}`} onClick={() => gameCtx.avatarSelection[PLAYER.CPU] === '' && onAvatarSelection(cpuSelectedAvatar)} >
                        {String.fromCodePoint(cpuSelectedAvatar)}
                    </span>
                </div>
                <div className={styles['next__btn']}>
                    <Button id='next' type='button' name='Next' onClick={onNextHandler} />
                </div>
            </>}
        </div>
    );
};

export default AvatarSelection;