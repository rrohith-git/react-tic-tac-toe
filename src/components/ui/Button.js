import styles from './Button.module.css'

const Button = (props) => {

    const { name, className } = props

    const classStyles = `${styles.btn} ${className}`

    return (
        <button {...props} className={classStyles}>{name}</button>
    )
};

export default Button;