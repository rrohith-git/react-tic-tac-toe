import { useReducer } from "react";
import GameContext, { STEPS, MODES, PLAYER } from "./game-context";

const defaultGameContext = {
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
    }
};

const ACTIONS = {
    NEXT_STEP: 'next-step',
    SET_MODE: 'set-mode',
    SET_AVATAR: 'set-avatar',
    CLEAR_ALL: 'clear-all'
};

const gameReducer = (state, action) => {
    const currState = {...state};
    if (action.type === ACTIONS.NEXT_STEP) {
        const { steps } = currState;
        const nextStepId = action.value;
        Object.keys(steps).forEach(key => {
            if (steps[key].id === nextStepId) {
                steps[key].value = true;
            } else {
                steps[key].value = false;
            }
        });
        return { ...currState, steps };
    }
    if (action.type === ACTIONS.SET_MODE) {
        const { modes } = currState;
        const modeId = action.value;
        Object.keys(modes).forEach(key => {
            if (key === modeId) {
                modes[key] = true;
            }
        });
        return { ...currState, modes };
    }
    if (action.type === ACTIONS.SET_AVATAR) {
        const { avatarSelection } = currState;
        const value = action.value;
        Object.keys(avatarSelection).forEach(key => {
            if (key === value.player) {
                avatarSelection[key] = value.avatar;
            }
        });
        return { ...currState, avatarSelection };
    }
    if(action.type === ACTIONS.CLEAR_ALL){
        const newGameContext = {
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
            }
        };
        return newGameContext;
    }
    return defaultGameContext;
}

const GameProvider = props => {


    const [gameState, dispatchGameAction] = useReducer(gameReducer, defaultGameContext);


    const setNextStep = (nextStepId) => {
        dispatchGameAction({ type: ACTIONS.NEXT_STEP, value: nextStepId });
    };

    const updateModes = (mode) => {
        dispatchGameAction({ type: ACTIONS.SET_MODE, value: mode });
    };

    const updateAvatars = (player, avatar) => {
        dispatchGameAction({ type: ACTIONS.SET_AVATAR, value: { player, avatar } });
    };

    const clearAll = () => {
        dispatchGameAction({ type: ACTIONS.CLEAR_ALL });
    }

    const gameContext = {
        steps: gameState.steps,
        modes: gameState.modes,
        avatarSelection: gameState.avatarSelection,
        switchToNextStep: setNextStep,
        setModes: updateModes,
        setAvatar: updateAvatars,
        clearAll: clearAll
    };

    return (
        <GameContext.Provider value={gameContext}>
            {props.children}
        </GameContext.Provider>
    );
};

export default GameProvider;