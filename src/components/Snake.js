import React from "react";
import classes from "../UI/Global.module.css"

function Snake (props){
  return (
    <div>
      {props.snakeDots.map((dot, index) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return (
          <div className={classes.snake} key={index} style={style}></div>
        )
      })}
    </div>
  )
}
export default Snake