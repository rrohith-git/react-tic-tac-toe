import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { calculateWinner, cpuIndex } from '../utlis';
import styles from './GameBoard.module.css';
import GameContext, { MODES, PLAYER, STEPS } from './store/game-context';

GameBoard.propTypes = {
    setWinner: PropTypes.func.isRequired
};

const GameBoard = ({ setWinner }) => {

    const gameCtx = useContext(GameContext);
    const singlePlayerMode = gameCtx.modes[MODES.SINGLE_PLAYER];
    const [square, setSquare] = useState(Array(9).fill(null));
    const [is1pNext, setIs1pNext] = useState(true);

    const onUpdateSquare = useCallback((id) => {
        const currSquare = [...square];
        if (!currSquare[id] && !calculateWinner(square)) {
            currSquare[id] = is1pNext ? gameCtx.avatarSelection[PLAYER.SINGLE] : gameCtx.avatarSelection[PLAYER.MULTI] || gameCtx.avatarSelection[PLAYER.CPU];
            setSquare(currSquare);
            setWinner(is1pNext ? gameCtx.avatarSelection[PLAYER.SINGLE] : gameCtx.avatarSelection[PLAYER.MULTI] || gameCtx.avatarSelection[PLAYER.CPU], true);
            setIs1pNext(prevState => !prevState);
        }
    }, [setWinner, setIs1pNext, setSquare, gameCtx.avatarSelection, is1pNext, square]);

    useEffect(() => {
        const winner = calculateWinner(square);
        if (winner) {
            gameCtx.switchToNextStep(STEPS.WINNER);
        }
        if (square.every(cell => cell !== null)) {
            gameCtx.switchToNextStep(STEPS.WINNER);
            setWinner(undefined, false);
        }
        if (!is1pNext && singlePlayerMode && !square.every(cell => cell !== null)) {
            const cpuId = cpuIndex(square);
            if (cpuId) {
                setTimeout(() => onUpdateSquare(cpuId), 500);
            }
        }
    }, [square, gameCtx, setWinner, is1pNext, singlePlayerMode, onUpdateSquare]);


    return (
        <div className={styles['game-wrapper']}>
            <div className={styles['row-wrapper']}>
                <div >
                    <button className={`${styles['btn-first-row']} ${styles['border-left']} ${styles['border-top']}`} onClick={() => onUpdateSquare(0)}>{String.fromCodePoint(square[0])}</button>
                    <button className={`${styles['btn-second-row']} ${styles['border-top']}`} onClick={() => onUpdateSquare(1)}>{String.fromCodePoint(square[1])}</button>
                    <button className={`${styles['btn-third-row']} ${styles['border-right']} ${styles['border-top']}`} onClick={() => onUpdateSquare(2)}>{String.fromCodePoint(square[2])}</button>
                </div>
                <div >
                    <button className={`${styles['btn-first-row']} ${styles['border-left']}`} onClick={() => onUpdateSquare(3)}>{String.fromCodePoint(square[3])}</button>
                    <button className={styles['btn-second-row']} onClick={() => onUpdateSquare(4)}>{String.fromCodePoint(square[4])}</button>
                    <button className={`${styles['btn-third-row']} ${styles['border-right']}`} onClick={() => onUpdateSquare(5)}>{String.fromCodePoint(square[5])}</button>
                </div>
                <div>
                    <button className={`${styles['btn-first-row']} ${styles['border-left']} ${styles['border-bottom']}`} onClick={() => onUpdateSquare(6)}>{String.fromCodePoint(square[6])}</button>
                    <button className={`${styles['btn-second-row']} ${styles['border-bottom']}`} onClick={() => onUpdateSquare(7)}>{String.fromCodePoint(square[7])}</button>
                    <button className={`${styles['btn-third-row']} ${styles['border-right']} ${styles['border-bottom']}`} onClick={() => onUpdateSquare(8)}>{String.fromCodePoint(square[8])}</button>
                </div>
            </div>
            <div className={styles['player-display']}>
                <span className={`${styles['player-display']} ${is1pNext ? styles.curr : ''}`}>Player 1 {String.fromCodePoint(gameCtx.avatarSelection[PLAYER.SINGLE])}</span>
                <span className={`${styles['player-display']} ${!is1pNext ? styles.curr : ''}`}>{gameCtx.modes[PLAYER.MULTI] ? 'Player 2 ' + String.fromCodePoint(gameCtx.avatarSelection[PLAYER.MULTI]) : 'CPU ' + String.fromCodePoint(gameCtx.avatarSelection[PLAYER.CPU])}</span>
            </div>
        </div>
    );
};

export default GameBoard;