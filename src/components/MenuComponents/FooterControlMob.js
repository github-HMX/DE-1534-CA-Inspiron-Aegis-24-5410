import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Hidden from '@material-ui/core/Hidden';
// import Grid from '@material-ui/core/Grid';

import Slider from '@material-ui/core/Slider';
// import States from "./model_gl/config";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 170,
      },
  newBtns: {
    borderRadius: "0.1em",
  },

  
  margin: {
    // margin: theme.spacing(2),
    // borderRadius: "0.1em",
    // textTransform: 'none',
    // fontSize: '0.7em'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function FooterControlMob(props) {

  useEffect(()=>{
  
  },[]);
  var prevCounter = 0;
var nextClicked = false;
var prevClicked = false;

    const classes = useStyles();
  const [value, setValue] = React.useState(30);
  const [prevDeltaScene, setPrevDeltaScene] = React.useState(0);
  const [zoombarValue, setZoombarValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleZoomChange = (e, newValue) => {
    
        
    
    if(e){ //console.log(e.target.value);
          
      window.scene._nav.NavChangeDolly(undefined, e.target.value);

    } else{

      window.scene._nav.NavChangeDolly(undefined, newValue);
      document.getElementById("sliderRange").value = newValue;

      }
      window.localStorage.removeItem('hotspot');
  

/*     //console.log('newValue', newValue)
    if(newValue == undefined) newValue = e.target.value;
    setZoombarValue(newValue);
    console.log('zoombarValue', zoombarValue)
    onUpdateZoombar(); */
  };

  const zoombar = {
    height: '47px',
    position: 'relative',
    float:'left',
    marginLeft:'4px',
    // left: '48%',
    // bottom: '226px',
    
  }

  const topbtns = {
    position: 'relative',
    // bottom: '149px',
    // marginLeft: '13.5%',
    // marginBottom: '21px',
    border: '1px solid CCCCCC',
    float:'left',
  }
  const mobthreeButtonsIpad = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.005em',
    backgroundColor: '#FFFFFF',
    height: '47px',
    width: '143px',
    margin: '21px 19px 20px 19px',
    border: '2px solid #CCCCCC'
  }
  const mobthreeButtons = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.005em',
    backgroundColor: '#FFFFFF',
    height: '48px',
    width: '118px',
    margin: '5px',
    border: '2px solid #CCCCCC'
  }
  const topLeft = {
    transform: 'rotate(270deg)',
    fontSize: '1.5em'
  }
  const topRight = {
    fontSize: '1.5em'
  }
  const prev = {
    marginRight: '12px',
    fontSize: '1.8em'
  }
  const next = {
    marginLeft: '12px',
    fontSize: '1.8em'
  }
  const topBtnstyle = {
    height: '47px',
    width: '62px',
    marginLeft: '8.5px',
    marginRight: '8.5px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #CCCCCC'
  }
  const clearBoth = {
    clear: 'both'
  }
  //only for mob
  const [camData, setCamData] = useState("");
  var animationSwitch = window.localStorage.getItem('Animation');
  var animTime = 1;
  
  useEffect(()=>{
    // getData();
    // animationSwitch = window.localStorage.getItem('Animation');
    //window.localStorage.setItem('tent', false);
    //window.localStorage.setItem('tablet', false);
    //window.localStorage.setItem('theater', false);
    //window.localStorage.setItem('close', false);
    // window.localStorage.setItem("position", "reset");
    // document.getElementById('whiteBtn').classList.add('active');
  },[]);

  //For Animation Switch 
console.log('animationSwitch anim', animationSwitch)

// if(animationSwitch == 'on'){animTime = 1000}
// else{animTime = 1}
// console.log('animTime', animTime)
  
  
  //new camera function
//   const GotoPosInTimeNamedValue = (gotoposname, onComplete, onSample) => {
//     // below code is updated in it.  
//     // updated code ends here
//     var opt = undefined, gp = camData[gotoposname];
//       console.log(gp);
//     //    console.log(gp)
//     if (gp.fovy && window.scene.fovy != gp.fovy)
//     opt = { fovy: gp.fovy };
//   if (gp.pos.length > 5) {
//     if (!opt)
//         opt = {};
//     opt.zang = gp.pos[5];
//   }
//   var animationSwitch = window.localStorage.getItem('Animation');
// if(animationSwitch == 'off'){gp.time = 1}
// else{
//   gp.time = animTime;
// }
// console.log('animationSwitch', animationSwitch);
// console.log('gp.time', gp.time);
//     window.scene.gotoPosInTime(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, slowInOut, opt);
//     // console.log(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, onSample, opt);
//   }
  //end
  
  const slowInOut = (x) => {
    var a = 3.1;
    var x2 = 1.0 - x;
    var px = Math.pow(x, a);
    var px2 = Math.pow(x2, a);
    
    return px / (px + px2);
    }
  
  // const resetBacklitCloseImg = () =>{
  //     setOpenCloseOnOff(false);
  //     setOpenClose("./img/Lid_open.svg");
  //     setBackliteOnOff(false);
  //     setBacklite("./img/Backlite_Off.svg");
  //     // window.scene.materialReplace('LED_Backlit_ON_env', 'LED_Backlit_OFF_env');
  //     window.scene.clearRefine();
  
  // }
 
  


if(animationSwitch == 'on'){animTime = 1000}
else{animTime = 1}
// console.log('animTime', animTime)
  
  
  const onUpdateZoombar = (e) => {
    // console.log(e.target.value);
    var s = window.scene;
    var deltaScene = 0;
    console.log('onUpdateZoombar', zoombarValue)
    deltaScene =  zoombarValue;
    // var delta = (-e.detail * 10.0);
    setPrevDeltaScene(deltaScene);
    // prevDeltaScene = deltaScene;
    if(prevDeltaScene-deltaScene > 0) {
      console.log(deltaScene)
      if (s._nav.NavChangeDolly(deltaScene))
                s.clearRefine();
    } else{
      console.log(-deltaScene)
      if (s._nav.NavChangeDolly(-deltaScene))
                s.clearRefine();
    }
    document.getElementById('sliderRange').value = zoombarValue;
    // console.log(prevDeltaScene)
    // console.log(deltaScene)
    
  }
  
  const onZoomIn = (e) => {
    if(window.scene._nav.getZoomFactor() > 0)
      handleZoomChange(null, -0.1+(parseFloat(document.getElementById("sliderRange").value)))
  }

  const onZoomOut = (e) => {
    if(window.scene._nav.getZoomFactor() < 1)
      handleZoomChange(null, 0.1+(parseFloat(document.getElementById("sliderRange").value)))
  }
  
  let count = 1;
  const onLeft = () => {
    // alert("Rotate product left");
  window.scene._nav._navYAng += 0.5;
  // console.log(count);
  // window.scene._nav._navYAng = count;
  window.scene.clearRefine();
  

  }
  const onRight = () => {
    // alert("Rotate product right");
    count -= 0.1;
    // console.log(count);
    window.scene._nav._navYAng -= 0.5;;
    window.scene.clearRefine();
  }
  return (
    <React.Fragment>

    {ReactDOM.createPortal(
    <div id='footerControls'>
    {/* <Hidden only={['sm','md','lg','xl']}>  */}

      <div className = "threebtns">
      <div className="zoombarandRotateContainer">
     

      <Hidden only={['xs','lg','xl']}>
          <div style={topbtns}>
            <Button className={classes.newBtns} id="rLeft" className="tabIndexStyle" style={topBtnstyle} onClick={onLeft} title="left" variant="outlined" size="small" color="primary">
            <img alt="diagonalarrowleft" src="./img/diagonalLeftArrow.svg"/>
            </Button>
            <Button className={classes.newBtns} id="rRight" className="tabIndexStyle" style={topBtnstyle} onClick={onRight} title="right" variant="outlined" size="small" color="primary">
            <img alt="arrowright" src="./img/diagonalRightArrow.svg"/>
            </Button>
          </div>
      
          <div id="zoomSliderContainer" style={zoombar} >
            <img style={{height:'100%'}} alt="zoombar" src="./img/ZOOMBAR.svg"/>
            
            <div id="zoomIn" onClick={onZoomIn}></div>
            <div id="zoomSlider" className="tabIndexStyle">
            <div className="rangeslider">
            <label>  <input type="range" min="0" max="1" step="0.01" className="myslider" onChange={handleZoomChange} id="sliderRange"/>
              </label>
            </div>
            </div>
            <div id="zoomOut" onClick={onZoomOut}></div>
          </div>
          </Hidden> 
          </div>
       
        <div className="mainDiv" style={clearBoth}>
        <Hidden only={['xs','lg','xl']}>
        <Button className="mobthreeButtonsIpad" id="previousView" variant="outlined" color="primary" onClick={props.onPreviousIpad}>
        <img style={{height: '20px', width: '24px', paddingRight: '12px'}} alt="arrowleftMob" src="./img/leftArrow.svg"/>Previous
        </Button>
        <Button className="mobthreeButtonsIpad" id="resetView" variant="outlined" color="primary" onClick={props.onResetIpad}>
        {window.finalLangues.resetView}
        </Button>
        <Button className="mobthreeButtonsIpad" id="nextView" variant="outlined" color="primary" onClick={props.onNextIpad}>
          Next  <img style={{height: '20px', width: '24px', paddingLeft: '12px'}} alt="arrowrightMob" src="./img/rightArrow.svg"/>
        </Button>
        </Hidden> 
    
        
        <Hidden only={['sm','md','lg','xl']}>
        <Button style={mobthreeButtons} id="previousView" variant="outlined" color="primary" onClick={props.onPreviousMob} className={classes.margin}>
        <img style={{height: '20px', width: '24px', paddingRight: '12px'}} alt="arrowleftMob" src="./img/leftArrow.svg"/>Previous
        </Button>
        <Button style={mobthreeButtons} id="resetView"  variant="outlined" color="primary" onClick={props.onResetMob} className={classes.margin}>
          Reset
        </Button>
        <Button style={mobthreeButtons} id="nextView" variant="outlined" color="primary" onClick={props.onNextMob} className={classes.margin}>
          Next  <img style={{height: '20px', width: '24px', paddingLeft: '12px'}} alt="arrowrightMob" src="./img/rightArrow.svg"/>
        </Button>
        </Hidden> 
        </div>
      </div>
      
    </div>, document.getElementById('footerControMob')
        )}

  
  </React.Fragment>


  )
}