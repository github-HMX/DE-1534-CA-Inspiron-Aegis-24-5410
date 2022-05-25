import React,{ useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import MenuBtn from './MenuBtn';
import MenuCircleBtnBacklite from './MenuCircleBtnBacklite';
// import MenuCircleBtn from './MenuCircleBtn';
import MenuCircleBtnOpenClose from './MenuCircleBtnOpenClose';
import Tooltip from '@material-ui/core/Tooltip';


// import RadioBtns from './RadioBtns';
const ProductViewHeader = {
   borderBottom: "1px solid #c7c7c7",
   minHeight: "42px"
}
const openclose = {
   width: "36px",
   height: "36px !important"
}
const Btn = {
   borderRadius: "0px",
   background: 'transparent',
   border: 'none',
   boxShadow: 'none',
   marginLeft: '10px',
   color: '#000',
   textTransform: 'capitalize',
   marginRight: "25px"
}
const BtnIcon = {
   borderRadius: "0px",
   background: 'transparent',
   width: '36px',
   height: '36px'
}
const MenuFeatures = (props) => {

   // const [backlit, setBacklite] = useState("./img/Backlite_Off.svg");
   // const [opneClose, setOpenClose] = useState("./img/open.png");


   return (
      <div className="Accordians" >
         <Accordion style={{ borderRadius: "0px",borderBottom: '1px solid #CCCCCC' }} onChange={props.onChanged} expanded={props.expanded}>
            <AccordionSummary tabIndex="1" id="feature"
               expandIcon={<ExpandMoreIcon />} style={ProductViewHeader}>
               <Typography id="featuress" className="accordion-headers AccordiansHeader" style={{ fontWeight: "700" }}>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails tabIndex="1" id="openCloseBtn" onKeyPress={props.openClosedClicked} onClick={props.openClosedClicked}>
               <MenuCircleBtnOpenClose source={props.imgfront1} className="openclose" submenu={window.finalLangues.molded} />
            </AccordionDetails>



            <AccordionDetails tabIndex="1" id="backlitBtn" onKeyPress={props.onOffBackliteClicked} onClick={props.onOffBackliteClicked}>
               <MenuCircleBtnBacklite source={props.imgfront2} className="backlit" submenu={window.finalLangues.fabric} />


               {/* <Button className="Btnsubmenu"
         style={Btn}
        variant="contained"
        color="secondary"
        id="backlitOn"
        startIcon={<Avatar style={BtnIcon}  src="./img/Backlite_Off.svg"/>}
      >
        <span>
        Backlit Keyboard
        </span>
      </Button>
      
      <Button className="Btnsubmenus"
         style={Btn}
        variant="contained"
        color="secondary"
        id="backlitOff"
        startIcon={<Avatar style={BtnIcon}  src="./img/Backlite_On.svg"/>}
      >
        <span>
        Backlit Keyboard
        </span>
      </Button> */}
            </AccordionDetails>

         </Accordion>
      </div>
   );
}

export default MenuFeatures;
