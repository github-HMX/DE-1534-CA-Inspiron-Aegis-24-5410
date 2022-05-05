import React,{useState} from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Avatars from "./Avatars";
import MenuBtn from './MenuBtn';
import Tooltip from '@material-ui/core/Tooltip';

// import RadioBtns from './RadioBtns';

// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
const ProductViewHeader={
  borderBottom: "1px solid #c7c7c7",
  minHeight:"42px"
}



const MenuPositions =(props)=>{
  
  const [open, setOpen] = React.useState(false);

  

  const handleOpen = () => {
    if(window.localStorage.getItem('laptop') == 'laptop180'){
      setOpen(true);
      // console.log('a')
    }
    else if(window.localStorage.getItem('laptop') == 'laptop360') {
      setOpen(false);
      // console.log('b')
    }
   
  };
  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 300);
  }

    return(
        <div className="Accordians" style={{display:"none"}}>
         <Tooltip id="tooltips" open={open}  onOpen={handleOpen} onClose={handleClose} title="Not available in selected product type"  placement="right" arrow>
         <Accordion title="" disabled={props.disply} style={{borderRadius:"0px"}} onChange={props.onChanged} expanded={props.expanded}>
        <AccordionSummary id="positionBtn" tabIndex="1"
          expandIcon={<ExpandMoreIcon />} style={ProductViewHeader}>
        <Typography id="positions1" className="accordion-headers AccordiansHeader" style={{fontWeight:"700"}}>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails tabIndex="1" aria-label="Tent"  id="tentBtn" onKeyPress={ props.onTentMode} onClick={props.onTentMode}>
        {/* <MenuBtn aria-hidden="true" submenu="Tent" submenu={window.finalLangues.tent}  source="./img/tent.png"/> */}
        <MenuBtn aria-hidden="true" submenu={window.finalLangues.tent}  source="./img/tent.png"/>

        </AccordionDetails>  
        <AccordionDetails tabIndex="1" aria-label="Theater"  id="theaterBtn" onKeyPress={props.onTheaterMode} onClick={props.onTheaterMode}>
        {/* <MenuBtn aria-hidden="true" submenu="Theater" submenu={window.finalLangues.theater} source="./img/theater.png"/> */}
        <MenuBtn aria-hidden="true" submenu={window.finalLangues.theater} source="./img/theater.png"/>

        </AccordionDetails>  
        <AccordionDetails tabIndex="1" aria-label="Tablet"  id="tabletBtn" onKeyPress={props.onTabletMode} onClick={props.onTabletMode}>
        {/* <MenuBtn aria-hidden="true" submenu="Tablet" submenu={window.finalLangues.tablet} source="./img/tablet.png"/> */}
        <MenuBtn aria-hidden="true" submenu={window.finalLangues.tablet} source="./img/tablet.png"/>

        </AccordionDetails>
      </Accordion>
      </Tooltip>
        </div>
    );
}

export default MenuPositions;