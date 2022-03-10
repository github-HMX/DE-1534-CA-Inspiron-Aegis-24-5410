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
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
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
    margin: theme.spacing(2),
    borderRadius: "0.1em",
    textTransform: 'none',
    fontSize: '0.7em'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function FooterControl(props) {

  useEffect(()=>{
    
  },[]);
  
  
  const classes = useStyles();
  const [value, setValue] = React.useState(30);
  const [prevDeltaScene, setPrevDeltaScene] = React.useState(0);
  const [zoombarValue, setZoombarValue] = React.useState(0);
  
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleZoomChange = (e, newValue) => {


   
        if(e){ //console.log(e.target.value);
          window.scene._nav.NavChangeDolly(undefined, e.target.value/100);
          
        } else{
          

          window.scene._nav.NavChangeDolly(undefined, newValue/100);
       
          document.getElementById("sliderRange").value = newValue;
          

          //document.getElementById('sliderRange').setAttribute('aria-label', (newValue * 100)+ '%');
          }
          window.localStorage.removeItem('hotspot');
          var sliderValues = document.getElementById('sliderRange').value * 100;
          // document.getElementById('sliderRange').setAttribute('aria-label',  (parseInt(sliderValues)+'%'));
          document.getElementById('sliderRange').setAttribute('aria-label',  '');
          setTimeout(function(){
            document.getElementById('sliderRange').setAttribute('aria-label',  '%');
          },400)
          
       //   console.log('slidervalue',sliderValues )


     
  };

  const zoombar = {
    height: '40.01px',
    position: 'relative',
    float:'left',
    marginLeft:'35px',
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
  const threeButtons = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0.005em',
    backgroundColor: '#FFFFFF',
    height: '40.01px',
    width: '160px',
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
    height: '40.01px',
    width: '123px',
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
    height: '40.01px',
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
  const getData=()=>{
    fetch('./model_gl/config.json')
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        // console.log(myJson.positions);
        setCamData(myJson.positions);
      });
  }
  useEffect(()=>{
    getData();
    animationSwitch = window.localStorage.getItem('Animation');
    //window.localStorage.setItem('tent', false);
    //window.localStorage.setItem('tablet', false);
    //window.localStorage.setItem('theater', false);
    //window.localStorage.setItem('close', false);
    window.localStorage.setItem("position", "reset");
    document.getElementById('whiteBtn').classList.add('active');
  },[]);
  
  //For Animation Switch 
// console.log('animationSwitch anim', animationSwitch)

if(animationSwitch == 'on'){animTime = 1000}
else{animTime = 1}
// console.log('animTime', animTime)
  
  //new camera function
  const GotoPosInTimeNamedValue = (gotoposname, onComplete, onSample) => {
    // below code is updated in it.  
    // updated code ends here
    var opt = undefined, gp = camData[gotoposname];
      console.log(gp);
    //    console.log(gp)
    if (gp.fovy && window.scene.fovy != gp.fovy)
    opt = { fovy: gp.fovy };
  if (gp.pos.length > 5) {
    if (!opt)
        opt = {};
    opt.zang = gp.pos[5];
  }
  var animationSwitch = window.localStorage.getItem('Animation');
if(animationSwitch == 'off'){gp.time = 1}
else{
  gp.time = animTime;
}
// console.log('animationSwitch', animationSwitch);
// console.log('gp.time', gp.time);
    window.scene.gotoPosInTime(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, slowInOut, opt);
    // console.log(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, onSample, opt);
  }
  //end
  
  const slowInOut = (x) => {
    var a = 2.1;
    var x2 = 1.0 - x;
    var px = Math.pow(x, a);
    var px2 = Math.pow(x2, a);
    
    return px / (px + px2);
    }
  
  // const resetBacklitCloseImg = () =>{
  //     setOpenCloseOnOff(false);
  //     setOpenClose("./img/open.png");
  //     setBackliteOnOff(false);
  //     setBacklite("./img/Backlite_Off.svg");
  //     // window.scene.materialReplace('LED_Backlit_ON_env', 'LED_Backlit_OFF_env');
  //     window.scene.clearRefine();
  
  // }
 
   const posClicked1 = () => {
    window.scene.animPlayInTime("Screen_grp_timeline_01", 0, animTime);
    // window.scene.animPlayInTime("Screen_grp_timeline_01_A", 6.7, 0);
    // window.scene.animPlayInTime("Hinge_grp_timeline_01_A", 6.7, 0);
    // window.scene.animPlayInTime("Main_grp_timeline_01_A", 6.7, 0);
    // window.scene.animPlayInTime("Screen_grp_timeline_01_A", 8.31, 1000);
    // window.scene.animPlayInTime("Hinge_grp_timeline_01_A", 8.31, 1000);
    // window.scene.animPlayInTime("Main_grp_timeline_01_A", 8.31, 1000);
   }
  

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
      handleZoomChange(null, -1+(parseFloat(document.getElementById("sliderRange").value)))
      
  }

  const onZoomOut = (e) => {
    if(window.scene._nav.getZoomFactor() < 100)
      handleZoomChange(null, 1+(parseFloat(document.getElementById("sliderRange").value)))

  }
  

  const onLeft = () => {

    window.scene._nav.NavRotation([0,0], [2,0]);
    window.localStorage.removeItem('hotspot');

    window.scene.clearRefine();

    // alert("Rotate product left");
 // window.scene._nav._navYAng += 0.5;
  // console.log(count);
  // window.scene._nav._navYAng = count;
 // window.scene.clearRefine();
  

  }
  const onRight = () => {
    
    window.scene._nav.NavRotation([0,0], [-2,0]);
    window.localStorage.removeItem('hotspot');

    window.scene.clearRefine();

    // alert("Rotate product right");
    //count -= 0.1;
    // console.log(count);
    //window.scene._nav._navYAng -= 0.5;;
    //window.scene.clearRefine();
  }
  const rippleRef = React.useRef('null');
  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };
  const rippleRefs = React.useRef('null');

  const onRippleStarts = (e) => {
    rippleRefs.current.start(e);
  };
  const onRippleStops = (e) => {
    rippleRefs.current.stop(e);
  };
  return (
    <React.Fragment>
    {ReactDOM.createPortal(

    <div id='footerControls' className="footerControlsDesk">
      <Hidden only={['xs','sm','md']}>
      <div className = "threebtns">
        <div className="zoombarandRotateContainer">

        <Hidden only={['xs','sm','md']}>
          <div style={topbtns} >
            <Button aria-label="Rotate" id="rLeft" tabIndex="2" className={classes.newBtns} style={topBtnstyle} onClick={onLeft} title="left" variant="outlined" size="small" color="primary">
            <img alt="Rotate left" src="./img/diagonalLeftArrow.svg"/>
            </Button>
            <Button aria-label="Rotate" id="rRight" tabIndex="2" className={classes.newBtns} style={topBtnstyle} onClick={onRight} title="right" variant="outlined" size="small" color="primary">
            <img alt="Rotate right" src="./img/diagonalRightArrow.svg"/>
            </Button>
          </div>
      
          <div id="zoomSliderContainer" style={zoombar} >
            <img style={{height:'100%'}} alt="zoombar" src="./img/ZOOMBAR.svg"/>
            
            <Button tabIndex="2" style={{color:"#0076CE"}} type="button" onMouseDown={onRippleStart} onMouseUp={onRippleStop} aria-label="Clickable Zoom Out" role="button" id="zoomIn" onClick={onZoomIn}> <TouchRipple ref={rippleRef} center={false} /></Button>            
            <div id="zoomSlider"  aria-hidden="true">
            <div className="rangeslider"  aria-hidden="true">
            {/* <label> <input tabIndex="2" aria-hidden="true" type="range" min="0" max="1" step="0.01" class="myslider" onChange={handleZoomChange} id="sliderRange"/> */}
            <label> <input tabIndex="2" aria-hidden="true" type="range" min="0" max="100" step="1" className="myslider" onChange={handleZoomChange} id="sliderRange"/>
              </label>
            </div>
            </div>
            <Button tabIndex="2" style={{color:"#0076CE"}} type="button" onMouseDown={onRippleStarts} onMouseUp={onRippleStops} id="zoomOut" role="button" aria-label="Clickable Zoom In" onClick={onZoomOut}><TouchRipple ref={rippleRefs} center={false} /></Button>
          </div>
          </Hidden>
        </div>
        <div style={clearBoth}>
        <Hidden only='xs'>
        <Button tabIndex="2" aria-label="Previous view" id="previousView" style={threeButtons} variant="outlined" color="primary" onClick={props.onPrevious} className={classes.margin}>
        <img alt="Previous view" style={{height: '20px', width: '24px', paddingRight: '12px'}} src="./img/leftArrow.svg"/>{window.finalLangues.previousView}
        </Button>
        <Button tabIndex="2" style={threeButtons} variant="outlined" id="resetView" color="primary" onClick={props.onReset} className={classes.margin}>
        {window.finalLangues.resetView}
        </Button>
        <Button tabIndex="2" aria-label="Next view" style={threeButtons} id="nextView" variant="outlined" color="primary" onClick={props.onNext} expanded={props.expanded} className={classes.margin}>
        {window.finalLangues.nextView}<img alt="Next view" style={{height: '20px', width: '24px', paddingLeft: '12px'}} src="./img/rightArrow.svg"/>
        </Button>
        </Hidden>
        {/* <Hidden only={['sm','md','lg','xl']}>
        <Button style={mobthreeButtons} variant="outlined" color="primary" onClick={onPrevious} className={classes.margin}>
        <ArrowBackOutlinedIcon style={prev}/>Previous
        </Button>
        <Button style={mobthreeButtons} variant="outlined" color="primary" onClick={onResetMob} className={classes.margin}>
          Reset
        </Button>
        <Button style={mobthreeButtons} variant="outlined" color="primary" onClick={onNext} className={classes.margin}>
          Next  <ArrowForwardOutlinedIcon style={next}/>
        </Button>
        </Hidden> */}
        
        </div>
      </div>
      
      
      </Hidden>
    
    </div>, document.getElementById('footerControlDesk')
        )}
    </React.Fragment>

  );
}
