import React from 'react';
// import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import RadioBtns from './RadioBtns';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const border = {
  borderRight: "1px solid #c7c7c7",
  background: "#fff"
}

const MenuSelectProductType = (props)=>{

  
  
    

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

    return(
      
    <>
        <span className="RadioHeader" style={{}}>{props.name}</span>
        <AccordionDetails style={border}>
        <RadioGroup className="Radio" aria-label="gender" name="gender1" value={props.value} >
        <FormControlLabel tabIndex="1" onKeyPress={props.onclickedtwo} onClick={props.onclickedtwo} value="2 in 1" control={<Radio color="primary"/>} label="2 in 1" />
        <FormControlLabel tabIndex="1" onKeyPress={props.onclicked} onClick={props.onclicked} value="Laptop" control={<Radio color="primary"/>} label="Laptop" />
        </RadioGroup>
        </AccordionDetails>
        {/* onClick={laptopClick} */}
    </>
    );
}
export default MenuSelectProductType;