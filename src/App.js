import { makeStyles } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Button from '@material-ui/core/Button';
import React,{ useState,useEffect } from 'react';
import Drawer from "@material-ui/core/Drawer";
import NestedList from './NestedList';

import MainMenu from "./components/MenuComponents/MainMenu";
import "./App.css";
import Hidden from '@material-ui/core/Hidden';
import Header from './components/Header';
import CloseIcon from '@material-ui/icons/Close';
// import BoxTest from './components/breakpoints';
// import { ThemeProvider } from '@material-ui/core/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
var ipad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && (navigator.userAgent.indexOf("iPhone") == -1);
var ipadPortrait = !(ipad && window.innerHeight > window.innerWidth);
var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15");


const statebtns = {
   border: "1px solid #c7c7c7",
   borderRadius: "0px",
   right: "0",
   width: "100%",
   height: '56px',
   marginLeft: "0px",
   borderLeft: "0px",
   borderRight: "0px",
   position: "absolute",
   bottom: "0px",
   marginBottom: '0px',
   backgroundColor: 'white',
   border: '1px solid #B6B6B6'
}

// const CloseBtn={
//   borderLeft: "none",
//   borderRight: "none",
//   borderRadius: "0",
//   position: "fixed",
//   background: "#fff",
//   width: "100%",
//   zIndex: "1",
// }

const useStyles = makeStyles((theme) => ({
   button: {
      margin: theme.spacing(1),
   },

   drawerPaper: {
      width: 'auto',
      minWidth: '140px',
      maxWidth: '35vw',
      overflow: 'visible',
      top: '9%'
      //background: "#c7addd"

   },

   root: {
      width: 'auto',
      /*     '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          }, */
      //marginRight: '5vh',
      //maxWidth: 360,
      //backgroundColor: theme.palette.background.paper,
   },

   nested: {
      paddingLeft: theme.spacing(4),
   },

   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },

   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));


function App() {

   const classes = useStyles();

   //States for opening Drawer
   const [state,setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });

   const [burgerBtnVisible,setBurgerBtnVisible] = useState(true);

   //Open Drawer
   const toggleDrawer = (anchor,open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {

         return;
      }


      //Open Drawer states
      setState({ ...state,[anchor]: open });
   };
   const mobCloseDrawer = () => {
      // var currentHotspot = window.localStorage.getItem('hotspot');
      // alert(currentHotspot)
      setState({ ...state,["bottom"]: false });
      setTimeout(() => {
         document.getElementById("footerControMob").style.display = "block";
         document.getElementById("infinityrt-canvas").style.marginTop = "0px";
         document.getElementById("calloutcanvas").style.marginTop = "0px";

      },270)

      // toggleDrawer("bottom", false)
   }
   const mobOpenDrawer = () => {
      // var currentHotspot = window.localStorage.getItem('hotspot');
      // alert(currentHotspot)
      setState({ ...state,["bottom"]: true });
      document.getElementById("infinityrt-canvas").style.marginTop = "-150px";
      document.getElementById("calloutcanvas").style.marginTop = "-150px";

      document.getElementById("footerControMob").style.display = "none";
      // toggleDrawer("bottom", false)
   }

   const menuMobLandscapOpen = () => {
      setState({ ...state,["left"]: true });
      setBurgerBtnVisible(false);
      // toggleDrawer("left", true)
      if (ipad) {
         document.getElementById('footerControMob').style.zIndex = 2;
      } else if (mob) {
         document.getElementById('footerControMob').style.zIndex = 0;
         // document.getElementById("infinityrt-canvas").style.marginTop = "0px";
         // document.getElementById("calloutcanvas").style.marginTop = "0px";

      }
   }
   const menuMobLandscapClose = () => {
      setState({ ...state,["left"]: false });
      setBurgerBtnVisible(true);
      // if(ipad){
      // document.getElementById('footerControMob').style.zIndex = 2;}else if(mob){
      document.getElementById('footerControMob').style.zIndex = 2;
      // document.getElementById("infinityrt-canvas").style.marginTop = "0px";
      // document.getElementById("calloutcanvas").style.marginTop = "0px";
      // }
      // toggleDrawer("left", false)
   }
   const [orientationPotrait,setOrientation] = useState(true);
   window.checkOrientationStatus = (orientationStatus) => {
      // alert(window.screen.orientation.type);
      setOrientation(orientationStatus);
   }
   useEffect((event) => {
      if (window.innerHeight > window.innerWidth) {
         // setBurgerBtnVisible(false);
      }

      // alert('Counter in useEffect'+prevCounter);
      // alert('Counter in useEffect'+counter);

   },[])
   useEffect((event) => {
      ipadPortrait = !(ipad && window.innerHeight > window.innerWidth);
      // alert(orientationPotrait);
   })
   const [getLangTranscript,setgetLangTranscript] = useState(false);
   window.checkgetLangTranscript = (getLangTranscript) => {
      // alert(window.screen.orientation.type);
      setgetLangTranscript(getLangTranscript);
   }
   let closeBtnVisibilityOpen = burgerBtnVisible && window.innerWidth > window.innerHeight;
   let closeBtnVisibilityClose = !burgerBtnVisible && window.innerWidth > window.innerHeight;
   let dektopCloseBtnVisibilityOpen = burgerBtnVisible
   let dektopCloseBtnVisibilityClose = !burgerBtnVisible
   return (
      <>
         <Header />


         <div id="menubar" className={classes.root}>
            {/* Desktop start no open btn */}
            <Hidden only="xs">

               <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ display: "none" }}
                  className={classes.button}
                  startIcon={<DehazeIcon />}
                  disableElevation
                  onClick={toggleDrawer("left",true)}
               >
                  States Desktop
               </Button>
            </Hidden>
            {/* desktop end */}

            {/* Ipad with open btn */}

            {(ipad != null || mob != false) && <Hidden only={['xs','lg','xl']}>
               {window.innerWidth < window.innerHeight && <Button variant="outlined" color="primary" size="large" className="openCloseBtn" style={{ display: orientationPotrait == true ? "block" : "none",maxWidth: '62px;' }} startIcon={<DehazeIcon />} disableElevation onClick={menuMobLandscapOpen}> </Button>}
               {closeBtnVisibilityOpen && <Button id="forTest1" variant="outlined" color="primary" size="large" className="openCloseBtn" style={{ display: orientationPotrait == true ? "block" : "none",maxWidth: '62px;' }} startIcon={<DehazeIcon />} disableElevation onClick={menuMobLandscapOpen}> </Button>}

               {(ipad != null || mob != false) && <div className="openCloseBar" style={{}}></div>}

               {closeBtnVisibilityClose && <Button id="forTest2" variant="outlined" color="primary" size="large" className="openCloseBtn closeBtnMobLAndscap" style={{ display: orientationPotrait == true ? "block" : "none",maxWidth: '62px;' }} startIcon={<CloseIcon />} onClick={menuMobLandscapClose} > </Button>}
            </Hidden>}

            {/* Ipad end */}

            {/* Mobile Start */}
            <Hidden only={['sm','md','lg','xl']}>

               <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  id="forTest3"
                  endIcon={<img src="./img/menu.svg" alt="menu" style={{ marginLeft: '190px',width: '23px',height: '21px' }} />}
                  disableElevation
                  onClick={mobOpenDrawer}
                  style={statebtns}
                  only='xs'
               >
                  <span>
                     {getLangTranscript && window.finalLangues.mainmenu}
                  </span>
               </Button>
            </Hidden>
            {/* mobile end */}

            {/* for close mode */}
            <div id='leftPan'
               tabIndex={0}
            >
               {/* for ipadPro start */}
               <Hidden only={['xs','sm','md']}>
                  {ipadPortrait && orientationPotrait == true &&
                     <Drawer id="LeftMenuWrapper" anchor={"left"} open={true} variant="persistent" style={{ border: "none" }} onClose={toggleDrawer("left",false)} classes={{ paper: classes.drawerPaper }}>
                        <NestedList />
                        {/* <Guide /> */}
                        {getLangTranscript && <MainMenu />}
                     </Drawer>
                  }
               </Hidden>
               {/* ipadPro End */}
               <Hidden only={['xs','sm']}>
                  {(ipad == null || (window.innerWidth > window.innerHeight && orientationPotrait == false)) &&
                     <Drawer id="LeftMenuWrapper" anchor={"left"} open={true} variant="persistent" style={{ border: "none" }} onClose={toggleDrawer("left",false)} classes={{ paper: classes.drawerPaper }}>
                        <NestedList />
                        {getLangTranscript && <MainMenu />}
                     </Drawer>
                  }
               </Hidden>
               {/* ipad start */}
               <Hidden only={['xs','lg','xl']}>

                  <Drawer anchor={"left"} open={state["left"]} variant="persistent" onClose={toggleDrawer("left",false)} classes={{ paper: classes.drawerPaper }}>

                     <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        className="closeBtn"
                        startIcon={<CloseIcon style={{ marginLeft: '4px' }} />}
                        onClick={toggleDrawer("left",false)}

                     >

                     </Button>


                     <NestedList />
                     {getLangTranscript && <MainMenu />}
                  </Drawer>
               </Hidden>
               {/* ipadEnd */}
               {ipad == null && <Hidden only={['xs','md','lg','xl']}>
                  <div id="ipadNavForDesktop">
                     {/* <div style={{width:'200px', height:"50px", background:"blue", float:"right"}}>for ipad resolution but only for desktop </div> */}

                     {dektopCloseBtnVisibilityOpen && <Button id="onlyForDesktopResizeOpen" variant="outlined" color="primary" size="large" className="openCloseBtn" style={{ maxWidth: '62px;' }} startIcon={<DehazeIcon />} disableElevation onClick={menuMobLandscapOpen}> </Button>}
                     {/* {closeBtnVisibilityOpen && <Button variant="outlined" color="primary" size="large" className="openCloseBtn" style={{ maxWidth:'62px;'}}  startIcon={<DehazeIcon />} disableElevation onClick={menuMobLandscapOpen}> </Button>} */}



                     {dektopCloseBtnVisibilityClose && <Button id="onlyForDesktopResizeClose" variant="outlined" color="primary" size="large" className="openCloseBtn closeBtnMobLAndscap" style={{ maxWidth: '62px;' }} startIcon={<CloseIcon />} onClick={menuMobLandscapClose} > </Button>}
                     <div className="openCloseBar" style={{}}></div>
                  </div>
               </Hidden>}
               {/* mobile start */}
               <Hidden only={['sm','md','lg','xl']}>
                  {/* <div style={{width:'200px', height:"50px", background:"red", float:"right"}}>Mobile</div> */}
                  <Drawer only='xs' style={{ width: "100%",maxWidth: "105vw",overflowY: "auto",overflowX: 'hidden',width: 'auto',minWidth: '140px',maxWidth: '35vw',}} anchor={"bottom"} open={state["bottom"]} variant="persistent" onClose={toggleDrawer("bottom",false)}>
                     <NestedList />
                     {getLangTranscript && <MainMenu toggleDrawerAction={mobCloseDrawer} />}

                  </Drawer>
               </Hidden>
               {/* mobile end */}
            </div>

         </div>

      </>
   );

}

export default App;