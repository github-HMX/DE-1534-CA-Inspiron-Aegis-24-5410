import React from 'react';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import RadioBtns from './RadioBtns';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const border = {
  // borderRight: "1px solid #c7c7c7",
  background: "#fff"
}

const ProductViewHeader={
  borderBottom: "1px solid #c7c7c7",
  minHeight:"52px",
}
const MenuSelectProductType = (props)=>{

  
  
    

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

    return(
      
    <>
       <Accordion  style={{borderRadius:"0px", borderRight:"1px solid #c7c7c7", borderTop:"1px solid #c7c7c7", display: "none"}} onChange={props.onChanged} expanded={props.expanded}>
        <AccordionSummary id="selectProductBtn" tabIndex="1"
          expandIcon={<ExpandMoreIcon />} style={ProductViewHeader} >
        <Typography className="accordion-headers AccordiansHeader" style={{fontWeight:"700", margin:"0px 0px"}}>{props.name}</Typography>
        </AccordionSummary >

        <AccordionDetails id="selectProduct" style={border}>
        <RadioGroup className="Radio" name="gender1" value={props.value} >
        <FormControlLabel id="laptop2in1" style={{minwidth:"200px"}} aria-labelledby="" tabIndex="1" onKeyPress={props.onclickedtwo} onClick={props.onclickedtwo} value="2 in 1" control={<Radio  id='twoinoneRadio' color="primary"/>} label={window.finalLangues.laptop360} />
        <FormControlLabel id="laptop" style={{minwidth:"200px"}} tabIndex="1" onKeyPress={props.onclicked} onClick={props.onclicked} value="laptop" control={<Radio id="laptopRadio" color="primary"/>} label={window.finalLangues.laptop}  />
        </RadioGroup>
        </AccordionDetails>
        </Accordion>
    </>
    );
}
export default MenuSelectProductType;