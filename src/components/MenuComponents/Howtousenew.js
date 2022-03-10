import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp';
import Hidden from '@material-ui/core/Hidden';
import { Translate } from '@material-ui/icons';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const Howtousenew = () => {


      const handleClick = () => {
        document.getElementById('howToUSE').style.display = "block";
        document.getElementById('howTousePopup').style.display = "block";
        document.getElementsByClassName('HowToUseHeader')[0].style.backgroundColor = "#0076CE";
        document.getElementsByClassName('HowToUseHeader')[0].style.color = "#FFFFFF";
        document.getElementById('iconI').style.color = "#FFFFFF";
        document.getElementById('howToUSE').style.zIndex = "2";
        document.getElementById('howTousePopup').style.zIndex = "2";


      };
      const exploreClick = () => {
        document.getElementById('howToUSE').style.display = "none";
        document.getElementById('howTousePopup').style.display = "none";
        document.getElementsByClassName('HowToUseHeader')[0].style.backgroundColor = "#FFFFFF";
        document.getElementsByClassName('HowToUseHeader')[0].style.color = "#006BBD";
        document.getElementById('iconI').style.color = "#006BBD";
        document.getElementById('howToUSE').style.zIndex = "-1";
        document.getElementById('howTousePopup').style.zIndex = "-1";

      };
   
      const howTouse = {
        display: 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100%',
        backgroundColor: 'white'
      }
      const mobHowToUseMain = {
        display: 'none',
        position: 'fixed',
        top: '0',
        height: '100vh',
        width: '100%',
        backgroundColor: 'white',
        zIndex: '2'
      }
      const mainDiv = {
          display: 'flex',
          position: 'absolute',
          left: '51%',
          top: '40%',
          transform: 'translate(-50%,-40%)',
          
      }
      const allThreeDiv = {
        textAlign: 'center',
        margin: '0px 40px 0 20px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '20px',
        lineHeight: '36px'
      }
      const mobAllthreeDiv = {
        textAlign: 'center',
        margin: '23px 0px 33px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '36px',
        width: '350px'
      }
      
      const mobAllthreeDivs = {
        textAlign: 'center',
        margin: '57px 0px 33px 0px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '36px',
        width: '350px'
      }
const exploreButtton = {
   
  position: 'absolute',
  left: '50%',
  top: '225px',
  transform: 'translate(-50%, 100%)',
cursor:'pointer',
  height: '44px',
  width: '513px',
  background: '#0076CE',
  borderRadius: '2px',
  alignItems: 'center',
  textAlign: 'center',
 
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '36px',
  color: '#FFFFFF',
  border: '0'
    
}
const mobExploreButtton = {
        position: 'absolute',
        left: '50%',
        top: '425px',
        transform: 'translate(-50%, 100%)',
      cursor:'pointer',
        height: '54px',
        width: '253px',
        background: '#0076CE',
        borderRadius: '2px',
        alignItems: 'center',
        textAlign: 'center',
       
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '36px',
        color: '#FFFFFF',
        border: '0'

}
const howToUseText = {
        position: 'absolute',
        left: '50%',
        top: '-40px',
        transform: 'translate(-50%, 100%)',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '38px',
        lineHeight: '56px',
        color: '#000000'
}
const mobHowToUseText = {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 100%)',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '40px',
        lineHeight: '56px',
        color: '#000000',
        width: '300px'
}
const closeUseMob =  {
  position: 'absolute',
  right: '-2px',
  top: '-84px',
  color: '#CCCCCC',
  height: '32px',
  width: '32px',
  cursor: 'pointer'
}
     const usestyle = {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '16px',
      position: 'relative',
      left: '17px',
      top: '-4px'
      }
      const iconStyle = {
        transform:' rotate(180deg)',
        position: 'relative',
        left: '-2px',
        top: '2px',
        color: '#006BBD',
        height: '22px',
        width: '22px'
      }
      const mobHowToUse = {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%,-40%)',
      }
    return(
      <React.Fragment>
         <Hidden only={['md','lg','xl']}>
       <span variant="contained" onClick={handleClick} className="HowToUseHeader"><ErrorOutlineSharpIcon id="iconI" style={iconStyle} /> <span style={usestyle}>{window.finalLangues.howToUseMenu}</span></span>
       </Hidden>

      {ReactDOM.createPortal(

        <div>

       <Hidden only={['xs','md','xl','lg']}>
       <span variant="contained" onClick={handleClick} className="HowToUseHeader"><ErrorOutlineSharpIcon id="iconI" style={iconStyle} /> <span style={usestyle}>{window.finalLangues.howToUseMenu}</span></span>
        <div id="howToUSE" style={howTouse}>
        <img onClick={exploreClick} className="closeUseMob" tabIndex="-1" alt="closeBtn" src="./img/closeIcon.svg"/>

          <span style={howToUseText}>{window.finalLangues.howToUseMenu}:</span>

        <div style={mainDiv}>
            <div style={allThreeDiv}>Move<br></br><img style={{marginTop: '20px', height: '66px', width: '130px'}} alt="moveDesk" src="./img/move.svg"/></div>
            <div style={allThreeDiv}>Rotate<br></br><img style={{marginTop: '20px', height: '66px', width: '130px'}} alt="rotateDesk" src="./img/rotate.svg"/></div>
            <div style={allThreeDiv}>Zoom<br></br><img style={{marginTop: '20px', height: '66px', width: '130px'}} alt="zoomDesk" src="./img/zoom.svg"/></div>
        </div>
        <button style={exploreButtton} onClick={exploreClick}>Return to 3D View  <img style={{height: '24px', width: '24px',  position: 'relative', top: '6px', left: '12px'}} alt="arrowDesk" src="./img/arrowIcon.png"/></button>

        </div>
        </Hidden>
        
         <Hidden only={['sm','md','lg','xl']}>
         <div id="howToUSE" style={mobHowToUseMain} className='mobHowToUse'>
         
         <div style={mobHowToUse}>
         <img onClick={exploreClick} className="closeUseMob" tabIndex="-1" alt="closeBtn" src="./img/closeIcon.svg"/>

         <span style={mobHowToUseText} id="mobHowToUseText">{window.finalLangues.howToUseMenu}:</span>
         <div style={mobAllthreeDivs}><span style={{position: 'relative', top: '-28px'}}>{window.finalLangues.move}</span><img style={{marginLeft: '62px', height: '76px', width: '166px'}} alt="moves" src="./img/move.svg"/></div>
         <div style={mobAllthreeDiv}><span style={{position: 'relative', top: '-28px'}}>{window.finalLangues.rotate}</span><img style={{marginLeft: '62px', height: '76px', width: '166px'}} alt="rotates" src="./img/rotate.svg"/></div>
         <div style={mobAllthreeDiv}><span style={{position: 'relative', top: '-28px'}}>{window.finalLangues.zoom}</span><img style={{marginLeft: '62px', height: '76px', width: '166px'}} alt="zommss" src="./img/zoom.svg"/></div>
         <button style={mobExploreButtton} onClick={exploreClick}>Return to 3D View  <img style={{height: '24px', width: '24px', position: 'relative', top: '6px', left: '12px'}} alt="arrow" src="./img/arrowIcon.png"/></button>
         </div>
         {/* <button style={mobExploreButtton} onClick={exploreClick}>Return to 3D View  <ArrowForwardIcon style={{color: '#FFFFFF'}}/></button> */}
         
         </div>
         </Hidden> 
       
      </div>, document.getElementById('howTousePopup')
      )}
    </React.Fragment>

    )
}



export default Howtousenew;

