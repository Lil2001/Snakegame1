import React, {Component} from "react";
 class Section extends Component{
     constructor(props){
         super(props)
     }
     render(){
         return(
             <section className={this.props.className}>{this.props.children}</section>
         )
     }
 }
 export default Section