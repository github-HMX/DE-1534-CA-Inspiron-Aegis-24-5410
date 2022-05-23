import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Avatars from './Avatars';
import MenuBtn from './MenuBtn';
// import RadioBtns from './RadioBtns';
const ProductViewHeader = {
   borderBottom: "1px solid #c7c7c7",
   minHeight: "52px"
}
const AccordianIcons = {
   width: "36px",
   height: "25px !important",
   marginLeft: '24px'
}

const MenuProductView = (props) => {





   return (
      <div className="Accordians">
         <Accordion style={{ borderRadius: "0px" }} onChange={props.onChanged} expanded={props.expanded}>
            <AccordionSummary id="productViewBtn" tabIndex="1"
               expandIcon={<ExpandMoreIcon />} style={ProductViewHeader} >
               <Typography id="productviewass" className="accordion-headers AccordiansHeader" style={{ fontWeight: "700",margin: "0px 0px" }}>{props.name}</Typography>
            </AccordionSummary >
            <AccordionDetails tabIndex="1" aria-label="WebCam" id="webCamBtn" onKeyPress={props.onwebCamClick} onClick={props.onWebCamBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Webcam" source={props.imgWebCam} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Front" id="frontBtn" onKeyPress={props.onFrontBtnClick} onClick={props.onFrontBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Front" submenu={window.finalLangues.front} source={props.imgfront} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Top" id="topBtn" onKeyPress={props.onTopBtnClick} onClick={props.onTopBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Back" submenu={window.finalLangues.back} source={props.imgtop} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Left" id="rightBtn" onKeyPress={props.onRightBtnClick} onClick={props.onRightBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Right" submenu={window.finalLangues.left} source={props.imgright} />

            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Right" id="leftBtn" onKeyPress={props.onLeftBtnClick} onClick={props.onLeftBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Left" submenu={window.finalLangues.right} source={props.imgleft} />
            </AccordionDetails>

         </Accordion>
      </div>
   );
}

export default MenuProductView;