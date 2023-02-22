import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles['main_header']}>
            <h1>TIC-TAC-TOE</h1>
        </header>
    );
};

export default Header;