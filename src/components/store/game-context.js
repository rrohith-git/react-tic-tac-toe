import React from "react";

export const STEPS = {
    HOME: 'home',
    MODE: 'mode',
    AVATAR: 'avatar',
    GAME: 'game',
    WINNER: 'winner'
}

export const MODES = {
    SINGLE_PLAYER: '1p',
    MULTI_PLAYER: '2p'
}

export const PLAYER = {
    SINGLE: '1p',
    MULTI: '2p',
    CPU: 'cpu'
}


const GameContext = React.createContext({
    steps: {
        showhomeScreen: { id: STEPS.HOME, value: true },
        showSelectModeScreen: { id: STEPS.MODE, value: false },
        showChooseAvatarScreen: { id: STEPS.AVATAR, value: false },
        showGameboardScreen: { id: STEPS.GAME, value: false },
        showWinnerScreen: { id: STEPS.WINNER, value: false }
    },
    modes: {
        [MODES.SINGLE_PLAYER]: false,
        [MODES.MULTI_PLAYER]: false
    },
    avatarSelection: {
        [PLAYER.SINGLE]: '',
        [PLAYER.MULTI]: '',
        [PLAYER.CPU]: ''
    },
    switchToNextStep: (nextStepId) => { },
    setModes: (mode) => { },
    setAvatar: (player, avatar) => { },
    clearAll: () => { }
});

export default GameContext;