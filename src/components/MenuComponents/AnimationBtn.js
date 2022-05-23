import React,{ useState,useEffect } from "react"
import Switch from '@material-ui/core/Switch';
import Hidden from '@material-ui/core/Hidden';

const Animationbtns = {

   textAlign: "center",marginTop: "30px",position: "relative",margin: "30px 0px 14px 51px"


}

const AnimationbtnsMob = {
   textAlign: "center",marginTop: "25px",position: "relative",marginBottom: "14px"

}
const Animationbtns1 = {

   textAlign: "center",position: "relative",marginBottom: "14px",marginRight: "6px"


}

const AnimationBtn = (props) => {

   // const [value, setValue] = useState("Off");

   // window.localStorage.setItem('Animation', 'on');
   useEffect(() => {
      // window.localStorage.setItem('Animation', 'on');
      // document.getElementById("switchValue").checked = 'true';

      // // setValue("On");
      // document.getElementsByClassName('onOff')[0].style.left = "-17px";

   },[]);




   return (
      <>

         <div id="animation" style={Animationbtns}>
            <span > {window.finalLangues.animations}: </span>
            {/* <Switch id="switchValue" onChange={displayName} name="checkedA" color="primary"/><span className = 'onOff'>{value}</span> */}
            <label className="switch" tabIndex="1" id="animswtich" onKeyPress={props.forKeypress} >
               <input tabIndex="-1" className="tabIndexStyle" name='animationOnOff' id="animSwitchValue" onChange={props.onchange} type="checkbox" />
               <span className="tabIndexStyle slider round" ></span>
               <span className="onOff"></span>
            </label>
         </div>
         {
            <div id="animation1" style={Animationbtns1} >
               <span>{window.finalLangues.onScreenControls}: </span>
               {/* <Switch id="switchValue" onChange={displayName} name="checkedA" color="primary"/><span className = 'onOff'>{value}</span> */}
               <label class="switch" tabIndex="1" id="animswtich1" onKeyPress={props.forKeypress1} >
                  <input tabIndex="-1" className="tabIndexStyle" name='keyboadrControlsOnOff' id="animSwitchValue1" onChange={props.onchange1} type="checkbox" />
                  <span className="tabIndexStyle" class="slider round" ></span>
                  <span className="onOff1"></span>
               </label>
            </div>
         }

      </>
   )
}

export default AnimationBtn;