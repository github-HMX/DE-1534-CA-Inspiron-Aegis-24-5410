import { useState,useContext } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import MenuCircleBtn from './MenuCircleBtn';
import { userContext } from './MainMenu';
import Tooltip from '@material-ui/core/Tooltip';

// import RadioBtns from './RadioBtns';
const ProductViewHeader={
  borderBottom: "1px solid #c7c7c7",
  minHeight:"52px"
}
const Btn={
  borderRadius:"0px", 
  background:'transparent', 
  border:'none', 
  boxShadow:'none',
  marginLeft:'10px',
  color:'#000',
  textTransform:'capitalize',
  marginRight: "25px"
}
//  const Btn:hover {
//   font-weight: bold;
//   background-color: #d2dde4;
// }
const BtnIcon={
  borderRadius:"0px", 
  background:'transparent',
  width:'36px',
  height:'36px'
}

const MenuColors =(props)=>{
  const user = useContext(userContext);

const [laptop180, setScreen180] = useState(true);
const [laptop360, setScreen360] = useState(true);
const [whiteColor, setWhiteColor] = useState(true);
const [balckColor, setBlackColor] = useState(true);
// let laptop360 = false;
// let laptop180 = false;
const color1Click = () => {
  
      // if(laptop360){
      //   console.log("360white");
      //   setScreen360(true);
      //   setScreen180(false);
      //   window.scene.groupApplyState("Silver");

      // }else if(laptop180){        
        // console.log("180white");

        // setScreen360(false);
        // setScreen180(true);
        window.scene.groupApplyState("Silver");
        window.scene.groupApplyState("Screen_Fill_180_Silver_ON");
        window.scene.clearRefine();

      // }
    

  }
  
  const color2Click = () => {
    // if(laptop360){
      // console.log("360black");

      //     setScreen360(true);
      //     setScreen180(false);
      //       window.scene.groupApplyState("Silver");
      //   }else if(laptop180){
          // setScreen360(false);
          // setScreen180(true);
          // console.log("180black");
          window.scene.groupApplyState("Carbon_Fibre_180A");
          window.scene.groupApplyState("Screen_Fill_180_ON");
          window.scene.clearRefine()
        // }  

    }

    const [open1, setOpen1] = useState(false);

    const handleOpen1 = () => {
      if(window.localStorage.getItem('laptop') == 'laptop360'){
        setOpen1(false);
        // console.log('a')
      }
      else if(window.localStorage.getItem('laptop') == 'laptop180') {
        setOpen1(false);
        // console.log('b')
      }
     
    };
    const handleClose1 = () => {
      setTimeout(() => {
        setOpen1(false);
      }, 300);
    }

    return(
        <div className="Accordians">
         <Accordion style={{borderRadius:"0px"}} disabled={props.hides} onChange={props.onChanged} expanded={props.expanded}>
        <AccordionSummary id="colorBtn" tabIndex="1"
          expandIcon={<ExpandMoreIcon />} style={ProductViewHeader}>
        <Typography id="colors1" className="accordion-headers AccordiansHeader" style={{fontWeight:"700"}}>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails tabIndex="1" id="whiteBtn" onKeyPress={props.onWhiteBtnClick} onClick={props.onWhiteBtnClick} >
        <MenuCircleBtn submenu="Ascent Solid" source="./img/clr_2.png"/>

        </AccordionDetails>
        <Tooltip open={open1}  onOpen={handleOpen1} onClose={handleClose1} title="Not available in selected product type" placement="right" arrow>
  
        <AccordionDetails tabIndex="-1" id="blackBtn" onKeyPress={props.onBlackBtnClick} onClick={props.onBlackBtnClick}>
         <MenuCircleBtn submenu="Pearl White" source="./img/clr_1.png"/>
         {/* <div className="menubtn">
         <Button className="Btnsubmenu"
         style={Btn}
        variant="contained"
        color="secondary"
        startIcon={<Avatar style={BtnIcon}  src="./img/clr_2.png" />}
      >
        Black Carbon Fiber
      </Button>
        </div> */}
        
        </AccordionDetails>  
       </Tooltip>
      </Accordion>
        </div>
    );
}

export default MenuColors;