import React from "react"
import Avatar from '@material-ui/core/Avatar';
const Avatarss={
  marginLeft:"18px",
  width: "22px",
  height: "22px" 

}
const Avatars = (props) => {
    return(
        <span aria-label="Dell Technologies" className="AccordianImg">
          <Avatar style={Avatarss} alt="Dell Technologies" variant="square" src={props.img}  />
        </span>
    )

}

export default Avatars;