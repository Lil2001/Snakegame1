import React from 'react';
import classes from "../UI/Global.module.css"
function SnakeFood (props) {

  const style = {
    left: `${props.value[0]}%`,
    top: `${props.value[1]}%`
  }

  return (
    <div className={classes.snakeFood} style={style}></div>
  )
}
export default SnakeFood