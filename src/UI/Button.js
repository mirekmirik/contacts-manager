const Button = (props) => {
    return (
        <button id={props.id} disabled={props.disabled} className={props.className} type={props.type || 'button'} onClick={props.onClick}>{props.children}</button>
    )
}


export default Button