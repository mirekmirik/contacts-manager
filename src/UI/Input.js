import React from "react"

const Input = (props) => {
    return (
      <React.Fragment>
        <label className={props.className}>{props.children}
          <input
            type={props.type}
            placeholder={props.placeholder}
            className={props.className}
            value={props.value}
            onChange={props.onChange}
          ></input>
        </label>
      </React.Fragment>
    );
}



export default Input