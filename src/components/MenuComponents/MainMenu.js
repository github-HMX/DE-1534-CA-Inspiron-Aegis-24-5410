import React,{ useState,useEffect } from 'react';
import MenuSelectProductType from './MenuSelectProduct';
import MenuProductView from './MenuProductView';
import MenuPositions from './MenuPosition';
import AnimationBtn from './AnimationBtn';
import MenuFeatures from './MenuFeatures';
import MenuColors from './MenuColors';
import Howtousenew from './Howtousenew';
import HowToUse from './HowToUse';
import FooterControl from './FooterControl';
import FooterControlMob from './FooterControlMob';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

// import MenuBtn from './MenuBtn';
// import { MicNone } from '@material-ui/icons';
var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15");
var mobPortrait = (mob && window.innerHeight > window.innerWidth);
var moblandscap = (mob && window.innerWidth > window.innerHeight);
var isipad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && (navigator.userAgent.indexOf("iPhone") == -1);

export const userContext = React.createContext();
var prevCounter = 0;
var nextClicked = false;
var prevClicked = false;
var buttonSeq = ['onResetMode','onWebCamClick','onFrontClick','onTopClick','onRightClick','onLeftClick'];
var buttonSeq180 = ['onResetMode','onWebCamClick','onFrontClick','onTopClick','onRightClick','onLeftClick'];
var selectedButton = 'onResetMode';

var position = {
   'currentPos': 'reset',
   'close': 0,
   'nintyDegree': 1.04167,
   'reset': 2.08333,
   'top': 1.583,
   'tent': 3.125,
   'theatre': 4.1667,
   'tablet': 5.208,
}

const MainMenu = (props) => {
   const [expandedPanel,setExpandedPanel] = useState(false);
   const [displayed,setDisplayed] = useState(false);
   const [hidden,setHidden] = useState(true);
   const [laptop360FrontImg,setLaptop360FrontImg] = useState("./img/front360.png");
   const [laptop360TopImg,setLaptop360TopImg] = useState("./img/top360.png");
   const [laptop360LeftImg,setLaptop360LefttImg] = useState("./img/360_left.png");
   const [laptop360RightImg,setLaptop360RightImg] = useState("./img/360_right.png");
   const [counter,setCounter] = useState(0);

   //   const [orientationPotrait, setOrientation] = useState(true);
   //   window.checkOrientationStatus = (orientationStatus) => 
   //   {
   //   //  alert(window.screen.orientation.type);
   //     setOrientation(orientationStatus);
   //  }

   const handleAccordionChange = (panel) => (event,isExpanded) => {
      console.log({ event,isExpanded });
      //setExpandedPanel(isExpanded ? panel  : false );
      if (isExpanded) {
         setExpandedPanel(panel);
         //console.log("shubham");
      } else {
         //  console.log("Pawar");
         setExpandedPanel(false)
      };
      // resetBacklitCloseImg();

   };
   const [camData,setCamData] = useState("");
   var animationSwitch = window.localStorage.getItem('Animation');
   var animTime = 1;
   var animTimes = 1;

   const getData = () => {
      fetch('./model_gl/config.json')
         .then(function (response) {
            return response.json();
         })
         .then(function (myJson) {
            // console.log(myJson.positions);
            setCamData(myJson.positions);
         });
   }
   useEffect(() => {
      getData();
      animationSwitch = window.localStorage.getItem('Animation');
      moblandscap = (mob && window.innerWidth > window.innerHeight);

      window.localStorage.setItem("position","reset");
      document.querySelector('#blackBtn').classList.add('Mui-disabled');
      // document.querySelector('#blackBtn').style.pointerEvents = 'none';
      document.getElementById('whiteBtn').classList.add('select');
   },[]);

   useEffect((event) => {
      if (event) {
         if (event.keyCode === 13) {
            this.click();
         }
      }
   },[])


   //For Animation Switch 
   // console.log('animationSwitch anim', animationSwitch)

   if (animationSwitch == 'on') { animTime = 1000; animTimes = 2000 }
   else { animTime = 1; animTimes = 1 }
   // console.log('animTime', animTime)

   //new camera function
   const GotoPosInTimeNamedValue = (gotoposname,onComplete,onSample) => {
      // below code is updated in it.  
      // updated code ends here

      var opt = undefined,gp = camData[gotoposname];

      //    console.log(gp)
      if (gp.fovy && window.scene.fovy != gp.fovy)
         opt = { fovy: gp.fovy };
      if (gp.pos.length > 5) {
         if (!opt)
            opt = {};
         opt.zang = gp.pos[5];
      }
      // console.log('animationSwitch', animationSwitch)
      if (animationSwitch == 'off') {
         gp.time = 1
         // console.log('animationSwitch iffff', gp.time)
      }
      else {
         gp.time = animTime;
         // console.log('animationSwitch elseeee', gp.time)
      }
      console.log('animationSwitch',animationSwitch);
      console.log('gp.time',gp.time);
      window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4],gp.time,onComplete,slowInOut,opt);
      // console.log(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, onSample, opt);
   }
   //end
   const slowInOut = (x) => {
      var a = 2.1;
      var x2 = 1.0 - x;
      var px = Math.pow(x,a);
      var px2 = Math.pow(x2,a);

      return px / (px + px2);
   }


   const resetBacklitCloseImg = () => {
      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");

      // window.scene.materialReplace('LED_Backlit_ON_env', 'LED_Backlit_OFF_env');
      window.scene.clearRefine();

   }
   const resetTimeline1 = (revers90Degree = true) => {
      //window.scene.instanceSet("GP_Close_360", "visible", false);
      //window.scene.instanceSet("GP_Stand", "visible", false);
      //window.scene.instanceSet("GP_Tent", "visible", false);
      //window.scene.instanceSet("GP_Tablet", "visible", false);
      if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
      if (window.scene.animIsPlaying('Screen_grp_timeline_01_A')) window.scene.getAnim("Screen_grp_timeline_01_A").stop();
      if (window.scene.animIsPlaying('Hinge_grp_timeline_01_A')) window.scene.getAnim("Hinge_grp_timeline_01_A").stop();
      if (window.scene.animIsPlaying('Main_grp_timeline_01_A')) window.scene.getAnim("Main_grp_timeline_01_A").stop();

      if (revers90Degree) {
         // window.scene.animPlayInTime("Screen_90_degree", 0, 0);
         // window.scene.animPlayInTime("Screen_90_to_close180", 0, 0);
         // window.scene.animPlayInTime("Screen_90_to_close360", 0, 0);
      }
      window.scene.animPlayInTime("Screen_grp_timeline_01_A",0,0);
      window.scene.animPlayInTime("Hinge_grp_timeline_01_A",0,0);
      window.scene.animPlayInTime("Main_grp_timeline_01_A",0,0);
      window.scene.clearRefine();
   }
   const resetTimeline2 = (revers90Degree = true) => {
      //window.scene.instanceSet("GP_Close_360", "visible", false);
      //window.scene.instanceSet("GP_Stand", "visible", false);
      //window.scene.instanceSet("GP_Tent", "visible", false);
      //window.scene.instanceSet("GP_Tablet", "visible", false);
      if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
      if (window.scene.animIsPlaying('Screen_grp_timeline_02_A')) window.scene.getAnim("Screen_grp_timeline_02_A").stop();
      if (window.scene.animIsPlaying('Hinge_grp_timeline_02_A')) window.scene.getAnim("Hinge_grp_timeline_02_A").stop();
      if (window.scene.animIsPlaying('Main_grp_timeline_02_A')) window.scene.getAnim("Main_grp_timeline_02_A").stop();
      if (revers90Degree) {
         // window.scene.animPlayInTime('Screen_90_degree', 0, 0);
         // window.scene.animPlayInTime('Screen_90_degree_180', 0, 0);

      }
      window.scene.animPlayInTime("Screen_grp_timeline_02_A",0,0);
      window.scene.animPlayInTime("Hinge_grp_timeline_02_A",0,0);
      window.scene.animPlayInTime("Main_grp_timeline_02_A",0,0);
      window.scene.clearRefine();
   }
   const resetTimeline3 = (revers90Degree = true) => {
      //window.scene.instanceSet("GP_Close_360", "visible", false);
      //window.scene.instanceSet("GP_Stand", "visible", false);
      //window.scene.instanceSet("GP_Tent", "visible", false);
      //window.scene.instanceSet("GP_Tablet", "visible", false);
      if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
      if (window.scene.animIsPlaying('Screen_grp_timeline_03_A')) window.scene.getAnim("Screen_grp_timeline_03_A").stop();
      if (window.scene.animIsPlaying('Hinge_grp_timeline_03_A')) window.scene.getAnim("Hinge_grp_timeline_03_A").stop();
      if (window.scene.animIsPlaying('Main_grp_timeline_03_A')) window.scene.getAnim("Main_grp_timeline_03_A").stop();
      if (revers90Degree) {
         // window.scene.animPlayInTime('Screen_90_degree', 0, 0);
         // window.scene.animPlayInTime('Screen_90_degree_180', 0, 0);

      }
      window.scene.animPlayInTime("Screen_grp_timeline_03_A",0,0);
      window.scene.animPlayInTime("Hinge_grp_timeline_03_A",0,0);
      window.scene.animPlayInTime("Main_grp_timeline_03_A",0,0);
      window.scene.clearRefine();
   }
   const resetTimeline4 = (revers90Degree = true) => {
      //window.scene.instanceSet("GP_Close_360", "visible", false);
      //window.scene.instanceSet("GP_Stand", "visible", false);
      //window.scene.instanceSet("GP_Tent", "visible", false);
      //window.scene.instanceSet("GP_Tablet", "visible", false);
      if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
      if (window.scene.animIsPlaying('Main_grp_timeline_04_A')) window.scene.getAnim("Main_grp_timeline_04_A").stop();
      if (window.scene.animIsPlaying('Hinge_grp_timeline_04_A')) window.scene.getAnim("Hinge_grp_timeline_04_A").stop();
      if (window.scene.animIsPlaying('Screen_grp_timeline_04_A')) window.scene.getAnim("Screen_grp_timeline_04_A").stop();
      if (revers90Degree) {
         // window.scene.animPlayInTime('Screen_90_degree', 0, 0);
         // window.scene.animPlayInTime('Screen_90_degree_180', 0, 0);

      }
      window.scene.animPlayInTime("Main_grp_timeline_04_A",0,0);
      window.scene.animPlayInTime("Hinge_grp_timeline_04_A",0,0);
      window.scene.animPlayInTime("Screen_grp_timeline_04_A",0,0);
      window.scene.clearRefine();
   }
   const posClicked1 = () => {
      window.localStorage.removeItem('hotspot');
      window.localStorage.removeItem('color');
      window.scene.animPlayInTime("Screen_grp_timeline_01",0,animTime);

   }


   //MenuSelectProduct
   const [laptop360,setlaptop360] = useState(true);

   const [laptop180,setlaptop180] = useState(false);

   const laptopClick = (event) => {

      setlaptop180(true);
      setlaptop360(false);
      console.log(laptop180);
      setCounter(0);
      selectedButton = 'onResetMode';
      setValue(event.target.value);
      setDisplayed(true);
      // setExpandedPanel(false);
      setHidden(false);
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');

      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('laptop').setAttribute('aria-label','laptop radio butoon selected');
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");
      window.scene.groupApplyState("screenfill_180");

      setLaptop360FrontImg("./img/front180White.png");
      setLaptop360TopImg("./img/top180White.png");
      setLaptop360LefttImg("./img/180_white_left.png");
      setLaptop360RightImg("./img/180_white_right.png");
      resetBacklitCloseImg();

      window.localStorage.setItem("position","reset");
      window.localStorage.setItem("laptop","laptop180");
      window.localStorage.removeItem('color');

      var radiobtn1 = document.getElementById('twoinoneRadio');
      radiobtn1.checked = false;
      var radioSelector1 = document.querySelector('#twoinoneRadio')
      var nextSibling1 = radioSelector1.nextElementSibling;
      var selectSVG1 = nextSibling1.lastChild;
      selectSVG1.style.transform = 'scale(0)'
      // nextSibling1.classList.remove('PrivateRadioButtonIcon-checked-16')
      var radiobtn2 = document.getElementById('laptopRadio');
      radiobtn2.checked = true;
      var radioSelector2 = document.querySelector('#laptopRadio')
      var nextSibling2 = radioSelector2.nextElementSibling;
      var selectSVG2 = nextSibling2.lastChild;
      selectSVG2.style.transform = 'scale(1)'
      // nextSibling2.classList.add('PrivateRadioButtonIcon-checked-16')
      document.getElementById("laptopRadio").tabIndex = 1;

      window.localStorage.removeItem('hotspot');
      document.getElementById('whiteBtn').classList.add('select');
      document.getElementById('whiteBtn').classList.add('active');

      // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      //  alreadySelected.classList.remove('active');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('whiteBtn').classList.add('active');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.select');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('select');
      }
      window.RT_RecordEvent("Product Type","Laptop",window.config.name);
      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      // document.getElementById("tentBtn").setAttribute("tabindex", "-1");
      // document.getElementById("theaterBtn").setAttribute("tabindex", "-1");
      // document.getElementById("tabletBtn").setAttribute("tabindex", "-1");

      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");

      document.getElementById("tentBtn").setAttribute("tabindex","-1");
      document.getElementById("theaterBtn").setAttribute("tabindex","-1");
      document.getElementById("tabletBtn").setAttribute("tabindex","-1");

      //  document.getElementById('laptop2in1').classList.remove('select');
      document.getElementById('laptop').classList.add('active');
      document.getElementById('laptop2in1').classList.remove('active');
      document.getElementById('laptop2in1').classList.remove('select');

      GotoPosInTimeNamedValue('Render_Cam_F01_FL',function () {

         window.scene.groupApplyState("Silver_180");
         window.scene.groupApplyState("screenfill_180");
      });

      // document.querySelector('#blackBtn').classList.add('Btnsubmenus');
      document.querySelector('#blackBtn').classList.remove('Mui-disabled');
      // document.querySelector('#blackBtn').style.pointerEvents = 'auto';
      document.querySelector('#blackBtn').style.pointerEvents = "auto";
      // document.querySelector('#blackBtn').setAttribute = ("onclick");
      // document.querySelector('#menucolor').setAttribute = ("onBlackBtnClick");


      document.querySelector('#tentBtn').classList.add('Mui-disabled');
      document.querySelector('#tentBtn').style.pointerEvents = 'none';
      // document.querySelector('#tentBtn').setAttribute("tabindex", "-1");

      document.querySelector('#theaterBtn').classList.add('Mui-disabled');
      document.querySelector('#theaterBtn').style.pointerEvents = 'none';
      // document.querySelector('#theaterBtn').setAttribute("tabindex", "-1");

      document.querySelector('#tabletBtn').classList.add('Mui-disabled');
      document.querySelector('#tabletBtn').style.pointerEvents = 'none';
      // document.querySelector('#tabletBtn').setAttribute("tabindex", "-1");
      document.getElementById("blackBtn").setAttribute("tabindex","1");

      // document.getElementById("tentBtn1").setAttribute("tabindex", "-1");
      // document.getElementById("theaterBtn1").setAttribute("tabindex", "-1");
      // document.getElementById("tabletBtn1").setAttribute("tabindex", "-1");

      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      } else {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      }


   }

   const [value,setValue] = useState('2 in 1');

   const select2in1Click = (event) => {
      setlaptop360(true);
      setlaptop180(false);
      console.log(laptop360);
      selectedButton = 'onResetMode';
      setValue(event.target.value);
      setDisplayed(false);
      setHidden(true);
      // setExpandedPanel(false);
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('laptop2in1').setAttribute('aria-label','2in1 radio butoon selected');
      var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
      if (alreadySelecte != null) {
         alreadySelecte.classList.remove('select');
      }

      // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      // if(alreadySelected != null){
      //   alreadySelected.classList.remove('active');
      // }
      document.getElementById('laptop2in1').classList.add('active');
      document.getElementById('laptop2in1').classList.add('select');
      document.getElementById('whiteBtn').classList.add('select');
      document.getElementById('whiteBtn').classList.add('active');
      document.getElementById('laptop').classList.remove('active');
      document.getElementById('laptop').classList.remove('select');
      document.getElementById("tentBtn").setAttribute("tabindex","1");
      document.getElementById("theaterBtn").setAttribute("tabindex","1");
      document.getElementById("tabletBtn").setAttribute("tabindex","1");

      // document.getElementById("blackBtn").setAttribute("tabindex", "-1");

      window.localStorage.removeItem('hotspot');
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("GP_open");
      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screenfill_360");
      window.scene.groupApplyState("dynamic_reset");

      window.localStorage.setItem("laptop","laptop360");
      window.localStorage.removeItem('hotspot');

      var radiobtn1 = document.getElementById('laptopRadio');
      radiobtn1.checked = false;
      var radioSelector1 = document.querySelector('#laptopRadio')
      var nextSibling1 = radioSelector1.nextElementSibling;
      var selectSVG1 = nextSibling1.lastChild;
      selectSVG1.style.transform = 'scale(0)'
      var radiobtn2 = document.getElementById('twoinoneRadio');
      radiobtn2.checked = true;
      var radioSelector2 = document.querySelector('#twoinoneRadio')
      var nextSibling2 = radioSelector2.nextElementSibling;
      var selectSVG2 = nextSibling2.lastChild;
      selectSVG2.style.transform = 'scale(1)'

      window.localStorage.removeItem('color');
      document.getElementById("twoinoneRadio").tabIndex = 1;


      window.RT_RecordEvent("Product Type","2 in 1",window.config.name);
      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");


      setLaptop360FrontImg("./img/front360.png");
      setLaptop360TopImg("./img/top360.png");
      setLaptop360LefttImg("./img/360_left.png");
      setLaptop360RightImg("./img/360_right.png");

      resetBacklitCloseImg();

      GotoPosInTimeNamedValue('Render_Cam_F01_FL',function () {
         window.scene.groupApplyState("Silver");

      });
      document.querySelector('#blackBtn').classList.add('Mui-disabled');
      document.querySelector('#blackBtn').style.pointerEvents = "auto";
      // document.querySelector('#blackBtns').classList.remove('Btnsubmenus');

      // document.querySelector('#blackBtn').removeAttribute = ("onclick");

      // document.querySelector('#menucolor').removeAttribute = ("onBlackBtnClick");


      document.querySelector('#tentBtn').classList.remove('Mui-disabled');
      document.querySelector('#tentBtn').style.pointerEvents = 'auto';
      // document.querySelector('#tentBtn').setAttribute("tabindex", "1");

      document.querySelector('#theaterBtn').classList.remove('Mui-disabled');
      document.querySelector('#theaterBtn').style.pointerEvents = 'auto';
      // document.querySelector('#theaterBtn').setAttribute("tabindex", "1");

      document.querySelector('#tabletBtn').classList.remove('Mui-disabled');
      document.querySelector('#tabletBtn').style.pointerEvents = 'auto';
      // document.querySelector('#tabletBtn').setAttribute("tabindex", "1");
      document.getElementById("blackBtn").setAttribute("tabindex","1");

      // document.getElementById("tentBtn1").setAttribute("tabindex", "1");
      // document.getElementById("theaterBtn1").setAttribute("tabindex", "1");
      // document.getElementById("tabletBtn1").setAttribute("tabindex", "1");

      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      } else {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      }

   }

   //MenuProductView

   const onWebCamClick = (isNextPrevious) => {

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      console.log("Webcam");
      reverseAll();
      //   var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      //    alreadySelected.classList.remove('active');
      // document.getElementById('frontBtn').classList.add('active');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('webCamBtn').classList.add('active');
      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("GP_open");
      var currentPosName = position.currentPos;


      selectedButton = 'onWebCamClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','WebCam view');

         document.getElementById('nextView').setAttribute('aria-label','WebCam view');
      }
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }


      window.localStorage.removeItem('hotspot');

      window.scene.clearRefine();
      resetBacklitCloseImg();

      window.scene.groupApplyState("Backlit_OFF");

      window.scene.groupApplyState("dynamic_reset");

      GotoPosInTimeNamedValue('Render_Cam_F02_F',function () {
         window.localStorage.setItem('hotspot','front')

         if (isNextPrevious != true) {
            // alert("isNextPrevious");
            window.document.getElementById("hotspot1demo").focus();
         }
      })
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","1");
         document.getElementById("hotspot12").setAttribute("tabindex","1");
         document.getElementById("hotspot13").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         console.log("Theater")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      }
      else {
         console.log("else")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }

      window.RT_RecordEvent("Product Type","WebCam",window.config.name);
      window.scene.clearRefine();
      position.currentPos = 'nintyDegree';

   }


   // const onFrontClick = (isNextPrevious) => {

   //    //Update ZoomBar
   //    var slider = document.getElementById("sliderRange");

   //    if (slider != null) {
   //       document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
   //       setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
   //    }
   //    console.log("Front");
   //    reverseAll();
   //    window.scene.groupApplyState("mouse_on");
   //    window.scene.groupApplyState("keyboard_on");
   //    //   var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    //    alreadySelected.classList.remove('active');
   //    // document.getElementById('frontBtn').classList.add('active');

   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }
   //    document.getElementById('frontBtn').classList.add('active');
   //    window.localStorage.setItem("position","reset");
   //    window.scene.groupApplyState("screen_180");
   //    window.scene.groupApplyState("GP_open");
   //    var currentPosName = position.currentPos;


   //    selectedButton = 'onFrontClick';
   //    if (!(mob || isipad)) {
   //       document.getElementById('previousView').setAttribute('aria-label','Front view');

   //       document.getElementById('nextView').setAttribute('aria-label','Front view');
   //    }
   //    if (laptop180) {
   //       window.scene.groupApplyState("screenfill_180");
   //    } else {
   //       window.scene.groupApplyState("screenfill_360");
   //    }


   //    window.localStorage.removeItem('hotspot');

   //    window.scene.clearRefine();
   //    resetBacklitCloseImg();

   //    window.scene.groupApplyState("Backlit_OFF");

   //    window.scene.groupApplyState("dynamic_reset");

   //    GotoPosInTimeNamedValue('Render_Cam_F02_F',function () {
   //       window.scene.animPlayInTime("Windsor_KM5221W",0.0833333);

   //       if (isNextPrevious != true) {
   //          // alert("isNextPrevious");
   //          window.document.getElementById("hotspot1demo").focus();
   //       }
   //    })
   //    if (!(window.isipad || window.mob)) {
   //       document.getElementById("hotspot1").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot2").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot3").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot4").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot5").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot6").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot7").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot8").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot9").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot10").setAttribute("tabindex","-1");

   //       document.getElementById("hotspot11").setAttribute("tabindex","1");
   //       document.getElementById("hotspot12").setAttribute("tabindex","1");
   //       document.getElementById("hotspot13").setAttribute("tabindex","1");
   //       document.getElementById("rLeft").setAttribute("tabindex","0");
   //       document.getElementById("rRight").setAttribute("tabindex","0");
   //       document.getElementById("zoomOut").setAttribute("tabindex","0");
   //       document.getElementById("sliderRange").setAttribute("tabindex","0");
   //       document.getElementById("zoomIn").setAttribute("tabindex","0");
   //       document.getElementById("previousView").setAttribute("tabindex","0");
   //       document.getElementById("resetView").setAttribute("tabindex","0");
   //       document.getElementById("nextView").setAttribute("tabindex","0");

   //    }
   //    if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
   //    if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
   //       console.log("Theater")
   //       window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //       window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //    }
   //    else {
   //       console.log("else")
   //       window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
   //       window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
   //    }

   //    window.RT_RecordEvent("Product Type","Front",window.config.name);
   //    window.scene.clearRefine();
   //    position.currentPos = 'nintyDegree';

   // }

   const onFrontClick = (isNextPrevious) => {
      //Update ZoomBar
         console.log("Front");
      reverseAll();
      window.scene.groupApplyState("mouse_on");
      window.scene.groupApplyState("keyboard_on");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      selectedButton = 'onFrontClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','front view');

         document.getElementById('nextView').setAttribute('aria-label','front view');
      }
      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('frontBtn').classList.add('active');


      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");
      window.localStorage.removeItem('hotspot');
      var slider = document.getElementById("sliderRange");

      resetBacklitCloseImg();

      window.scene.groupApplyState("Backlit_OFF");

      GotoPosInTimeNamedValue('Render_Cam_F02_F',function () {
               window.scene.animPlayInTime("Windsor_KM5221W",0.0833333);
        // window.localStorage.setItem('hotspot','right')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }


      });
      // window.document.getElementById("hotspot11").focus();
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","1");
         document.getElementById("hotspot6").setAttribute("tabindex","1");
         document.getElementById("hotspot7").setAttribute("tabindex","1");
         document.getElementById("hotspot8").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      var currentPosName = position.currentPos;
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         console.log("Theater")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      }
      else {
         console.log("else")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }
      window.scene.clearRefine();
      position.currentPos = 'nintyDegree';

      window.RT_RecordEvent("Product Type","Front",window.config.name);
      window.scene.clearRefine();
   }

   const onRightClick = (isNextPrevious) => {
      //Update ZoomBar
      console.log("Right");
      reverseAll();

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      selectedButton = 'onRightClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','right view');

         document.getElementById('nextView').setAttribute('aria-label','right view');
      }
      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('rightBtn').classList.add('active');


      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");
      window.localStorage.removeItem('hotspot');
      var slider = document.getElementById("sliderRange");

      resetBacklitCloseImg();

      window.scene.groupApplyState("Backlit_OFF");

      GotoPosInTimeNamedValue('Render_Cam_F05_R',function () {
         window.scene.groupApplyState("keyboard_on");
         window.scene.animPlayInTime("Windsor_KM5221W",0.2083333);
        // window.localStorage.setItem('hotspot','right')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }


      });
      // window.document.getElementById("hotspot11").focus();
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","1");
         document.getElementById("hotspot6").setAttribute("tabindex","1");
         document.getElementById("hotspot7").setAttribute("tabindex","1");
         document.getElementById("hotspot8").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      var currentPosName = position.currentPos;
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         console.log("Theater")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      }
      else {
         console.log("else")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }
      window.scene.clearRefine();
      position.currentPos = 'nintyDegree';

      window.RT_RecordEvent("Product Type","Right",window.config.name);
      window.scene.clearRefine();
   }

   const onLeftClick = (isNextPrevious) => {
      //Update ZoomBar
      console.log("Left");
      reverseAll();
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      console.log("left")
      selectedButton = 'onLeftClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','left view');

         document.getElementById('nextView').setAttribute('aria-label','left view');
      }
      window.localStorage.removeItem('hotspot');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }


      document.getElementById('leftBtn').classList.add('active');
      window.localStorage.setItem("position","reset");
      (window.localStorage.getItem("hotspot","right"))
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");

      window.scene.groupApplyState("Backlit_OFF");

      GotoPosInTimeNamedValue('Render_Cam_F04_L',function () {
         //window.localStorage.setItem('hotspot','left')
         window.scene.groupApplyState("keyboard_on");
         window.scene.animPlayInTime("Windsor_KM5221W",0.1666667);
         
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }


      });
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","1");
         document.getElementById("hotspot2").setAttribute("tabindex","1");
         document.getElementById("hotspot3").setAttribute("tabindex","1");
         document.getElementById("hotspot4").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      var currentPosName = position.currentPos;
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         console.log("Theater")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      }
      else {
         console.log("else")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }
      position.currentPos = 'nintyDegree';

      window.RT_RecordEvent("Product Type","Left",window.config.name);
      window.scene.clearRefine();
   }
   const onTopClick = (isNextPrevious) => {
      //Update ZoomBar

      console.log("Back");
      reverseAll();

      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'onTopClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Top view');

         document.getElementById('nextView').setAttribute('aria-label','Top view');
      }
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }

      window.localStorage.removeItem('hotspot');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }


      document.getElementById('topBtn').classList.add('active');
      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");

      resetBacklitCloseImg();

      window.scene.groupApplyState("Backlit_OFF");

      GotoPosInTimeNamedValue('Render_Cam_F02_Rear',function () {

         window.localStorage.setItem('hotspot','top')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }

      });
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","1");
         document.getElementById("hotspot10").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      var currentPosName = position.currentPos;
      if (position.top == position[currentPosName]) { position.currentPos = 'top'; return; }
      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         console.log("Theater")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      }
      else {
         console.log("else")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }

      position.currentPos = 'top';

      window.RT_RecordEvent("Product Type","Top",window.config.name);
      window.scene.clearRefine();
   }

   //MenuFeatureView

   const [openCloseOnOff,setOpenCloseOnOff] = useState(false);
   const [backlit,setBacklite] = useState("./img/Backlite_Off.svg");
   const [opneClose,setOpenClose] = useState("./img/Lid_open.svg");
   const [backliteOnOff,setBackliteOnOff] = useState(false);


   const openCloseClick = () => {
      console.log(position.close,position.currentPos)
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      selectedButton = 'openCloseClick';


      var fromPos = window.localStorage.getItem('hotspot')
      window.localStorage.removeItem('hotspot');
      window.localStorage.setItem('closeMode','on');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('openCloseBtn').classList.add('active');
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      setBackliteOnOff(false);
      window.scene.groupApplyState("Backlit_OFF");

      console.log(backliteOnOff);
      setBacklite("./img/Backlite_Off.svg");


      if (openCloseOnOff) {

         document.getElementById('openCloseBtn').setAttribute('aria-label','');
         document.getElementById('openCloseLid').innerHTML = 'Open Lid';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Open Lid');

            document.getElementById('nextView').setAttribute('aria-label','Open Lid');


         }
         setOpenCloseOnOff(false);
         console.log("open");
         setOpenClose("./img/Lid_open.svg");


         window.scene.groupApplyState("dynamic_reset");
         GotoPosInTimeNamedValue('Render_Cam_F01_FL',function () {



         });

         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);

         window.RT_RecordEvent("Features","Open Lid",window.config.name);
         window.scene.clearRefine();
         position.currentPos = 'reset';
      } else {

         document.getElementById('openCloseBtn').setAttribute('aria-label','');
         document.getElementById('openCloseLid').innerHTML = 'Close Lid';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Close Lid');

            document.getElementById('nextView').setAttribute('aria-label','Close Lid');
         }
         setOpenCloseOnOff(true);
         console.log("close");
         setBackliteOnOff(false);
         setOpenClose("./img/Lid_close.svg");


         window.scene.groupApplyState("dynamic_reset");
         GotoPosInTimeNamedValue('Close_Cam_F158_Close',function () {


         });

         var currentPosName = position.currentPos;
         if (position.close == position[currentPosName]) { position.currentPos = 'close'; return; }
         if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
            console.log("Theater")
            window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
            window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         }
         else {
            console.log("else")
            window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],0);

            window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         }

         window.RT_RecordEvent("Features","Close Lid",window.config.name);
         window.scene.clearRefine();
         position.currentPos = 'close';
      }


   }
   let backliteVar = document.getElementById('backlitBtn');

   const backliteClick = () => {

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'backliteClick';


      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('backlitBtn').classList.add('active');

      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("dynamic_reset");

      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");

      resetBacklitCloseImg();

      GotoPosInTimeNamedValue('Render_Cam_F02_Rear',function () {

         window.localStorage.setItem('hotspot','backlit');

         window.scene.clearRefine();
      })

      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");

      if (backliteOnOff) {

         console.log("off");
         setBackliteOnOff(false);
         // backliteVar.setAttribute.ariaLabel = "Close dialog";
         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('backlitOnnOff').innerHTML = 'Backlit off';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit off');
            document.getElementById('nextView').setAttribute('aria-label','Backlit off');
         }
         GotoPosInTimeNamedValue('Render_Cam_F02_Rear',function () { })

         window.scene.groupApplyState("Backlit_OFF");
         // window.scene.clearRefine();
         // document.getElementById('backlitOff').style.display="none";
         // document.getElementById('backlitOn').style.display="block";
         // window.document.getElementById('backlitOff').src="./img/Backlite_Off.svg";
         window.RT_RecordEvent("Features","Backlite Off",window.config.name);

      } else {
         // backliteVar.setAttribute.ariaLabel = "Backlit on";
         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('backlitOnnOff').innerHTML = 'Backlit on';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit on');
            document.getElementById('nextView').setAttribute('aria-label','Backlit on');
         }
         setBackliteOnOff(true);
         console.log("on");
         setBacklite("./img/Backlite_On.svg");
         GotoPosInTimeNamedValue('Render_Cam_F02_Rear',function () {
         })
         window.scene.groupApplyState("Backlit_ON");
         // document.getElementById('backlitOn').style.display="none";
         // document.getElementById('backlitOff').style.display="block";
         // window.document.getElementById('backlitOn').src="./img/Backlite_On.svg";
         window.RT_RecordEvent("Features","Backlite On",window.config.name);
         window.scene.clearRefine();

      }
      var currentPosName = position.currentPos;
      if (position.top == position[currentPosName]) { position.currentPos = 'top'; return; }
      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         console.log("Theater")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      }
      else {
         console.log("else")
         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);

         window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }
      window.scene.clearRefine();
      position.currentPos = 'top';
   }

   //menucolor

   const color1Click = () => {
      reverseAll();
      console.log("color1");
      window.scene.groupApplyState("Ascent_Solid");
      var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
      if (alreadySelecte != null) {
         alreadySelecte.classList.remove('select');
      }

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('whiteBtn').classList.add('select');
      document.getElementById('whiteBtn').classList.add('active');


      window.localStorage.setItem("position","reset");

      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");
      setLaptop360FrontImg("./img/front180White.png");
      setLaptop360TopImg("./img/top180White.png");
      setLaptop360LefttImg("./img/180_white_left.png");
      setLaptop360RightImg("./img/180_white_right.png");
      window.scene.groupApplyState("screenfill_180");
      window.localStorage.setItem("color","laptopSilver");
      setPort4Click(false);
      if (window.localStorage.getItem('laptop') == 'laptop360') {
         // console.log('a')
         window.scene.groupApplyState("Silver");

      }
      else if (window.localStorage.getItem('laptop') == 'laptop180') {
         // console.log('b')
         window.scene.groupApplyState("Silver_180");
         window.scene.groupApplyState("screenfill_180");

      }
      window.localStorage.setItem("silver",true);
      window.RT_RecordEvent("Color","Aluminium",window.config.name);
      window.scene.clearRefine();



   }

   const color2Click = () => {
      reverseAll();
      console.log("color2");
      window.scene.groupApplyState("Pearl_White");
      window.localStorage.setItem("position","reset");
      window.localStorage.setItem("color","laptopBlack");
      window.localStorage.removeItem('closeMode')


      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");
      setLaptop360FrontImg("./img/front180Black.png");
      setLaptop360TopImg("./img/top180Black.png");
      setLaptop360LefttImg("./img/180_black_left.png");
      setLaptop360RightImg("./img/180_black_right.png");
      window.scene.groupApplyState("screenfill_180");
      setPort2Click(false);
      setPort1Click(false);
      setPort3Click(false);
      setPort4Click(false);

      window.localStorage.setItem("Carbon_Fibre",true);
      if (window.localStorage.getItem('laptop') == 'laptop360') {
         // console.log('a')
         //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         // alreadySelecte.classList.remove('select');

         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         if (alreadySelecte != null) {
            alreadySelecte.classList.remove('select');
         }

         var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
         if (alreadySelected != null) {
            alreadySelected.classList.remove('active');
         }
         document.getElementById('blackBtn').classList.add('select');
         document.getElementById('blackBtn').classList.add('active');
         window.scene.groupApplyState("Silver");

      }
      else if (window.localStorage.getItem('laptop') == 'laptop180') {
         // console.log('b')
         //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         // alreadySelecte.classList.remove('select');

         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         if (alreadySelecte != null) {
            alreadySelecte.classList.remove('select');
         }

         var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
         if (alreadySelected != null) {
            alreadySelected.classList.remove('active');
         }
         document.getElementById('blackBtn').classList.add('select');
         document.getElementById('blackBtn').classList.add('active');
         window.scene.groupApplyState("Carbon_Black");
         window.scene.groupApplyState("screenfill_180");

      }
      window.RT_RecordEvent("Color","Carbon Fiber",window.config.name);
      window.scene.clearRefine();
   }
   //Menu Position

   const [port1Click,setPort1Click] = useState(false);
   const [port2Click,setPort2Click] = useState(false);
   const [port3Click,setPort3Click] = useState(false);
   const [port4Click,setPort4Click] = useState(false);
   const [port5Click,setPort5Click] = useState(true);

   const [nextClick,setNextClick] = useState(false);
   const [prevClick,setPrevClick] = useState(false);

   const TentModeClick = () => {
      console.log(position.tent,position.currentPos)

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('tentBtn').classList.add('active');
      window.scene.groupApplyState("screen_360");

      selectedButton = 'TentModeClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Tent Mode');

         document.getElementById('nextView').setAttribute('aria-label','Tent Mode');
      }
      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");
      window.localStorage.removeItem('hotspot');
      GotoPosInTimeNamedValue('Tent_Cam_F53_Tent',function () {
         window.scene.groupApplyState("GP_tent");
      });

      var currentPosName = position.currentPos;
      if (position.tent == position[currentPosName]) { position.currentPos = 'tent'; return; }
      window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.tent,animTime,undefined,undefined,undefined,true,position[currentPosName],4);
      window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.tent,animTime,undefined,undefined,undefined,true,position[currentPosName],4);

      window.RT_RecordEvent("Positions","Tent",window.config.name);
      window.scene.clearRefine();
      position.currentPos = 'tent';

   }

   const TheaterModeClick = () => {
      console.log(position.theatre,position.currentPos)

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('theaterBtn').classList.add('active');
      window.scene.groupApplyState("screen_180");

      window.localStorage.removeItem('closeMode')
      selectedButton = 'TheaterModeClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Theater Mode');

         document.getElementById('nextView').setAttribute('aria-label','Theater Mode');
      }
      window.scene.groupApplyState("Backlit_OFF");
      window.scene.groupApplyState("all_GP_off");
      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");

      window.localStorage.removeItem('hotspot');
      GotoPosInTimeNamedValue('Render_Cam_F100_Stand');

      var currentPosName = position.currentPos;
      if (position.theatre == position[currentPosName]) { position.currentPos = 'theatre'; return; }
      window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.theatre,animTime,undefined,undefined,undefined,true,position[currentPosName],9);
      window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.theatre,animTime,undefined,undefined,undefined,true,position[currentPosName],4);

      window.RT_RecordEvent("Positions","Theatre",window.config.name);
      window.scene.clearRefine();
      position.currentPos = 'theatre';

   }
   const TabletModeClick = () => {
      console.log(position.tent,position.currentPos)

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }


      document.getElementById('tabletBtn').classList.add('active');
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("all_GP_off");

      selectedButton = 'TabletModeClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Tablet Mode');

         document.getElementById('nextView').setAttribute('aria-label','Tablet Mode');
      }
      window.scene.groupApplyState("Backlit_OFF");
      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");

      window.localStorage.removeItem('hotspot');
      GotoPosInTimeNamedValue('Close_Cam_F158_Close1');

      var currentPosName = position.currentPos;
      if (position.tablet == position[currentPosName]) { position.currentPos = 'tablet'; return; }
      window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.tablet,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.tablet,animTime,undefined,undefined,undefined,true,position[currentPosName],10);

      window.RT_RecordEvent("Positions","Tablet",window.config.name);
      window.scene.clearRefine();
      position.currentPos = 'tablet';
   }

   const reverseAll = () =>{
      window.scene.groupApplyState("mouse_off");
      window.scene.groupApplyState("keyboard_off");
   }
   const resetMode = () => {
      selectedButton = 'onResetMode';
      GotoPosInTimeNamedValue('Render_Cam_F01_FL',function () { })
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Reset Mode');

         document.getElementById('nextView').setAttribute('aria-label','Reset Mode');
      }
   }
   const onResetMode = () => {
      //Update ZoomBar
      console.log(position.tent,position.currentPos)

      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      //   alreadySelected.classList.remove('active');

      // document.getElementById('whiteBtn').classList.add('active');


      window.scene.groupApplyState("screen_180");
      // window.scene.groupApplyState("GP_open");
      // window.scene.groupApplyState("dynamic_reset");
      window.localStorage.removeItem('color');
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      // selectedButton = 'onResetMode';

      if (selectedButton == 'onWebCamClick') {
         onWebCamClick();
         // GotoPosInTimeNamedValue('Tent_Cam_F53_Tent',function () {
         //    window.scene.groupApplyState("GP_tent");
         // });
      }
      // else if (selectedButton == 'TheaterModeClick') {
      //    TheaterModeClick();
      //    GotoPosInTimeNamedValue('Render_Cam_F100_Stand');

      // }
      // else if (selectedButton == 'TabletModeClick') {
      //    GotoPosInTimeNamedValue('Close_Cam_F158_Close1');
      //    TabletModeClick();
      // }
      else if (selectedButton == 'onFrontClick') {
         console.log("front onreset")
         // GotoPosInTimeNamedValue('Render_Cam_F02_F',function () {

         // });
         onFrontClick();
      }
      else if (selectedButton == 'onTopClick') {
         console.log("top onreset")

         GotoPosInTimeNamedValue('Render_Cam_F02_Rear',function () { });
         onTopClick();
      }
      else if (selectedButton == 'onRightClick') {
         onRightClick();
         // GotoPosInTimeNamedValue('Render_Cam_F05_R',function () {
         //    window.localStorage.setItem('hotspot','right')

         // })

      }
      else if (selectedButton == 'onLeftClick') {
         onLeftClick();
         // GotoPosInTimeNamedValue('Render_Cam_F04_L',function () {
         //    window.localStorage.setItem('hotspot','left')

         // })
      }
      else if (selectedButton == 'openCloseClick') {
         if (openCloseOnOff) {
            // setOpenCloseOnOff(false);
            //   setOpenClose("./img/Lid_open.svg");
            //   window.scene.groupApplyState("dynamic_reset");

            GotoPosInTimeNamedValue('Close_Cam_F158_Close',function () {

            });


         } else {
            // setOpenCloseOnOff(true);
            //   setOpenClose("./img/Lid_close.svg");
            // window.scene.groupApplyState("dynamic_reset");
            GotoPosInTimeNamedValue('Render_Cam_F01_FL',function () {

            });
         }

      }
      else if (selectedButton == 'backliteClick') {
         //   if (backliteOnOff) {

         //     // console.log("off");
         //     // setBackliteOnOff(false);
         //     GotoPosInTimeNamedValue('Render_Cam_F02_Rear', function(){})

         //     // window.scene.groupApplyState("Backlit_OFF");
         //     window.scene.clearRefine();
         //     // setBacklite("./img/Backlite_Off.svg");
         // } else {

         // setBackliteOnOff(true);
         // console.log("on");
         // setBacklite("./img/Backlite_On.svg");
         GotoPosInTimeNamedValue('Render_Cam_F02_Rear',function () {
         })
         // window.scene.groupApplyState("Backlit_ON");
         window.scene.clearRefine();

         // }


      } else if (selectedButton == 'onResetMode') {
         resetMode()
         GotoPosInTimeNamedValue('Render_Cam_F01_FL',function () { })
      }

      // selectedButton = 'onResetMode';
      // setExpandedPanel(false);


      // resetBacklitCloseImg();
      // window.localStorage.removeItem('closeMode');
      // window.scene.groupApplyState("Backlit_OFF");
      // window.localStorage.removeItem('hotspot');
      // GotoPosInTimeNamedValue('Render_Cam_F01_FL');

      // GotoPosInTimeNamedValue('Render_Cam_F01_FL', function(){
      if (window.localStorage.getItem("Carbon_Fibre") == true) {
         window.scene.groupApplyState("Carbon_Fibre_180A");
         window.scene.groupApplyState("Screen_Fill_180_ON");
      } else if (window.localStorage.getItem("silver") == true) {
         window.scene.groupApplyState("Silver");
         window.scene.groupApplyState("Screen_Fill_180_Silver_ON");
      }

      window.scene.clearRefine();
      // });
      // var currentPosName = position.currentPos;

      //   if(position.reset == position[currentPosName]) {position.currentPos = 'reset';return;}

      //   if(position.currentPos == 'theatre' || position.currentPos == 'tablet'){
      //     console.log("Theater")
      //     window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1", position.reset, animTime, undefined, undefined, undefined, true,  position[currentPosName], 10);
      //     window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2", position.reset, animTime, undefined, undefined, undefined, true,  position[currentPosName], 10);
      //   } else {

      //   window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1", position.reset, animTime, undefined, undefined, undefined, true,  position[currentPosName], 0);
      //   window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2", position.reset, animTime, undefined, undefined, undefined, true,  position[currentPosName], 0);
      //   }
      //   window.scene.clearRefine();
      //   position.currentPos = 'reset';


   }

   const onPreviousMode = () => {

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      // alert(selectedButton)
      if (laptop180) {
         var prevButton;
         var selectedButtonIndex = buttonSeq180.findIndex(element => element === selectedButton)
         if (selectedButton == 'onWebCamClick' || selectedButton == 'onResetMode') {
            prevButton = 'onLeftClick';
         } else {
            prevButton = buttonSeq180[selectedButtonIndex - 1];
         }
      }
      else {
         var prevButton;
         var selectedButtonIndex = buttonSeq.findIndex(element => element === selectedButton)
         if (selectedButton == 'onWebCamClick' || selectedButton == 'onResetMode') {
            prevButton = 'onLeftClick';
         } else {
            prevButton = buttonSeq[selectedButtonIndex - 1];
         }
      }
      // alert(buttonSeq[selectedButtonIndex+1])


      if (prevButton == 'onWebCamClick') onWebCamClick(true);
      else if (prevButton == 'onFrontClick') onFrontClick(true);
      else if (prevButton == 'onTopClick') onTopClick(true);
      else if (prevButton == 'onRightClick') onRightClick(true);
      else if (prevButton == 'onLeftClick') {
         onLeftClick(true);
         setExpandedPanel("panel1");

      }
      return false;

   }


   const onNextMode = () => {

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      if (laptop180) {

         var nextButton;
         var selectedButtonIndex = buttonSeq180.findIndex(element => element === selectedButton)
         if (selectedButton == 'onLeftClick') {
            nextButton = 'onWebCamClick';
         } else {
            nextButton = buttonSeq180[selectedButtonIndex + 1];
         }
      }
      else {
         var nextButton;
         var selectedButtonIndex = buttonSeq.findIndex(element => element === selectedButton)
         if (selectedButton == 'onLeftClick') {
            nextButton = 'onWebCamClick';
         } else {
            nextButton = buttonSeq[selectedButtonIndex + 1];
         }
      }
      // alert(laptop180)


      if (nextButton == 'onWebCamClick') {
         setExpandedPanel("panel1");
         onWebCamClick(true);
      }
      else if (nextButton == 'onFrontClick') onFrontClick(true);
      else if (nextButton == 'onTopClick') onTopClick(true);
      else if (nextButton == 'onRightClick') onRightClick(true);
      else if (nextButton == 'onLeftClick') onLeftClick(true);
   }

   const [animValue,setAnimValue] = useState("On");

   const [animValue1,setAnimValue1] = useState("On");

   useEffect(() => {
      console.log('useeffect working');
      window.localStorage.setItem('Animation','on');
      setAnimValue("On");
      document.getElementById("animSwitchValue").checked = true;
      document.getElementsByClassName('onOff')[0].style.left = "-17px";
      document.getElementById("animSwitchValue1").setAttribute('aria-label','Animation On')
      // document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked On');

      setAnimValue1("On");
      document.getElementById("animSwitchValue1").checked = true;
      document.getElementsByClassName('onOff1')[0].style.left = "-17px";

   },[]);


   const setAnimationSwitch = (e) => {
      console.log(e)
      // displayName(e);
      const isChecked = document.getElementById("animSwitchValue").checked;

      if (isChecked == true) {
         //document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation Off');
         document.getElementById("animSwitchValue").checked = false;
         setAnimValue("Off");
         document.getElementsByClassName('onOff')[0].style.left = "9px";
         window.localStorage.setItem('Animation','off');
         window.RT_RecordEvent("Animations","Off",window.config.name);

         // alert("Animation On");

      } else {
         // document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation On')
         document.getElementById("animSwitchValue").checked = true;

         setAnimValue("On");
         window.localStorage.setItem('Animation','on');
         document.getElementsByClassName('onOff')[0].style.left = "-17px";
         // alert("Animation Off");
         window.RT_RecordEvent("Animations","On",window.config.name);
      }
   }
   const displayName = (e) => {
      console.log(e)
      const isChecked = document.getElementById("animSwitchValue").checked;

      if (isChecked == true) {
         setAnimValue("On");
         window.localStorage.setItem('Animation','on');
         document.getElementsByClassName('onOff')[0].style.left = "-17px";
         document.getElementById('animSwitchValue').setAttribute('aria-label','clickable checkbox checked On');
         // alert("Animation On");

      } else {
         setAnimValue("Off");
         document.getElementsByClassName('onOff')[0].style.left = "9px";
         window.localStorage.setItem('Animation','off');
         document.getElementById('animSwitchValue').setAttribute('aria-label','clickable checkbox checked Off');
         // alert("Animation Off");

      }

   }

   const setAnimationSwitch1 = (e) => {
      console.log(e)
      // displayName(e);
      const isChecked = document.getElementById("animSwitchValue1").checked;

      if (isChecked == true) {
         //document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation Off');
         document.getElementById("animSwitchValue1").checked = false;
         setAnimValue1("Off");
         // keyboardOff();
         document.getElementsByClassName('onOff1')[0].style.left = "9px";
         // window.localStorage.setItem('Animation1','off');
         window.animationSwitchVal = 'off';
         window.animationSwitchGlobal = 'off';


      } else {
         // document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation On')
         document.getElementById("animSwitchValue1").checked = true;

         setAnimValue1("On");
         window.animationSwitchVal = 'on';
         // keyboardOn();
         // window.localStorage.setItem('Animation1','on');
         window.animationSwitchGlobal = 'on';
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";

      }


   }
   var animStopped = true;
   const displayName1 = (e) => {
      if (animStopped == false) {
         return;
         animStopped = false;
      }
      console.log(e)
      const isChecked = document.getElementById("animSwitchValue1").checked;

      if (isChecked == true) {
         setAnimValue1("On");
         // keyboardOn();
         // window.localStorage.setItem('Animation1','on');
         window.animation1SwitchGlobal = 'on';
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";
         document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked On');
         window.animationSwitchVal = 'on';

         if (mob) {
            document.getElementById('footerControls').removeAttribute('style');
            document.getElementById('footerControMob').style.display = 'block';
         }
         else if (isipad) {
            console.log('portrait');
            document.getElementById('footerControMob').style.display = 'block';
            document.getElementById('footerControls').style.display = 'block';
         }
         else {
            console.log("show");

            document.getElementById('footerControls').style.transition = "bottom 0.2s linear";
            document.getElementById('footerControls').style.bottom = "20px";
            /*  document.getElementById('footerControMob').style.transition = "bottom 0.2s linear";
             document.getElementById('footerControMob').style.bottom = "20px"; */

            document.getElementById('footerControls').style.visibility = "";
            document.getElementById('footerControIpad').style.visibility = "";
            //document.getElementById('footerControMob').style.visibility = "";

         }


      } else {
         setAnimValue1("Off");
         // keyboardOff();
         document.getElementsByClassName('onOff1')[0].style.left = "9px";
         // window.localStorage.setItem('Animation1','off');
         window.animation1SwitchGlobal = 'off';

         document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked Off');

         if (mob) {
            document.getElementById('footerControls').removeAttribute('style');
            document.getElementById('footerControMob').style.display = 'none';
         } else if (isipad) {
            console.log('landscape');
            document.getElementById('footerControMob').style.display = 'none';
            document.getElementById('footerControls').style.display = 'none';
         }
         else {
            console.log("hide");
            //document.getElementById('footerControls').style.transition = "bottom 0.2s linear";
            document.getElementById('footerControls').style.bottom = "-112px";
            /*  document.getElementById('footerControMob').style.transition = "bottom 0.24s linear";
             document.getElementById('footerControMob').style.bottom = "-49px"; */
            setTimeout(function () {

               document.getElementById('footerControls').style.visibility = "hidden";
               document.getElementById('footerControIpad').style.visibility = "hidden";

               //document.getElementById('footerControMob').style.visibility = "hidden";

               animStopped = true;
            },200);
         }

      }

   }


   return (
      <>
         {/* <Hidden only={["xs",'sm']}> */}
         {!mob && <HowToUse />}
         {/* </Hidden> */}
         <Hidden only={['sm','md','lg','xl']}>

            <Button style={{ position: 'fixed',backgroundColor: '#F0F0F0',width: '100%',height: '56px',paddingTop: '15px',paddingBottom: '15px',zIndex: '1',border: '1px solid #E1E1E1',borderLeft: "none",borderRight: "none",borderRadius: "0",margin: "-1px 0px 0px 0px" }}
               variant="outlined"
               color="primary"
               // className={classes.button}
               endIcon={<img src="./img/cross.svg" alt="cross" style={{ marginLeft: '207px',height: '23px' }} />}
               onClick={props.toggleDrawerAction}
            >
               Main Menu
            </Button>
            <Howtousenew />

         </Hidden >
         <Hidden only={['md','lg','xl','xs']}>
            {moblandscap && <Howtousenew />}
         </Hidden>

         <Hidden only={["xs"]}>
            <FooterControl name="reset and next previous" onReset={onResetMode} onPrevious={onPreviousMode} onNext={onNextMode} />
         </Hidden>
         <Hidden only={['lg','xl']}>
            <FooterControlMob onResetMob={onResetMode} onPreviousMob={onPreviousMode} onNextMob={onNextMode} onResetIpad={onResetMode} onNextIpad={onNextMode} onPreviousIpad={onPreviousMode} />
         </Hidden>
         <MenuSelectProductType tabIndex="1" name={window.finalLangues.selectproduct_text} onclicked={laptopClick} onclickedtwo={select2in1Click} value={value} expanded={expandedPanel === 'panel5'} onChanged={handleAccordionChange('panel5')} />
         {/* <userContext.Provider value=""> */}
         <MenuColors name={window.finalLangues.colors} tabIndex="1" onWhiteBtnClick={color1Click} onBlackBtnClick={color2Click} expanded={expandedPanel === 'panel4'} onChanged={handleAccordionChange('panel4')} />
         {/* </userContext.Provider> */}
         <MenuPositions name={window.finalLangues.position} tabIndex="1" onTentMode={TentModeClick} onTheaterMode={TheaterModeClick} onTabletMode={TabletModeClick} expanded={expandedPanel === 'panel2'} onChanged={handleAccordionChange('panel2')} />
         <MenuProductView tabIndex="1" onWebCamBtnClick={onWebCamClick} onFrontBtnClick={onFrontClick} onTopBtnClick={onTopClick} onLeftBtnClick={onLeftClick} onRightBtnClick={onRightClick} imgfront={laptop360FrontImg} imgtop={laptop360TopImg} imgleft={laptop360LeftImg} imgright={laptop360RightImg} name={window.finalLangues.productview} expanded={expandedPanel === 'panel1'} onChanged={handleAccordionChange('panel1')} />

         <MenuFeatures name={window.finalLangues.feature} tabIndex="1" tobechange={opneClose} tobeChanged={backlit} openClosedClicked={openCloseClick} onOffBackliteClicked={backliteClick} expanded={expandedPanel === 'panel3'} onChanged={handleAccordionChange('panel3')} />

         <AnimationBtn onchange={displayName} forKeypress={setAnimationSwitch} value={animValue} onchange1={displayName1} forKeypress1={setAnimationSwitch1} value1={animValue1} />

      </>
   );
}

export default MainMenu;