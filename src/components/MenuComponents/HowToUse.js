import React,{ useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp';
import Hidden from '@material-ui/core/Hidden';



const HowToUse = () => {
   let howtoUseD = false;
   // var howToUSeAnimation = document.getElementById('howToUSE').style.animationName
   const handleClick = () => {

      if (howtoUseD) {
         console.log("if.......")
         document.getElementById('howToUSE').style.opacity = "0";
         document.getElementById('howToUSE').style.marginTop = "-100%";
         // document.getElementById('howToUSE').style.visibility = "hidden";

         document.getElementById('howToUSE').style.animationName = "example";

         document.getElementsByClassName('HowToUseHeader')[0].style.backgroundColor = "#FFFFFF";
         document.getElementsByClassName('HowToUseHeader')[0].style.color = "#006BBD";
         document.getElementById('iconI').style.color = "#006BBD";
         howtoUseD = false;
      } else {
         console.log("else.......")

         document.getElementById('howToUSE').style.opacity = "1";
         document.getElementById('howToUSE').style.marginTop = "0%";
         // document.getElementById('howToUSE').style.visibility = "visible";

         document.getElementById('howToUSE').style.animationName = "example1";

         // document.getElementById('howToUSE').style.display = "block";
         document.getElementsByClassName('HowToUseHeader')[0].style.backgroundColor = "#0076CE";
         document.getElementsByClassName('HowToUseHeader')[0].style.color = "#FFFFFF";
         document.getElementById('iconI').style.color = "#FFFFFF";

         howtoUseD = true;
      }
   };

   const closeHandle = () => {
      document.getElementById('howToUSE').style.animationName = "example";
      document.getElementsByClassName('HowToUseHeader')[0].style.backgroundColor = "#FFFFFF";
      document.getElementsByClassName('HowToUseHeader')[0].style.color = "#006BBD";
      document.getElementById('iconI').style.color = "#006BBD";
      document.getElementById('howToUSE').style.opacity = "0";
      document.getElementById('howToUSE').style.marginTop = "-100%";

      howtoUseD = false;

   };
   //   useEffect(() => {
   //     document.getElementById('howToUSE').style.display = none;


   // }, []);
   const howToUseName = {
      position: 'absolute',
      left: '109px',
      top: '35px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '36px',
      display: 'flex',
      alignItems: 'center',
      color: '#000000',
      tabIndex: '-1'

   }
   const useImages = {
      position: 'fixed',

      height: '498px',
      width: '381px',
      top: '185px',
      border: '1px solid #EEEEEE',
      boxShadow: '0px 2px 2px rgb(0 43 85 / 8%), 0px 4px 4px rgb(0 43 85 / 8%), 0px 8px 8px rgb(0 43 85 / 8%), 0px 16px 16px rgb(0 43 85 / 8%), 0px 32px 32px rgb(0 43 85 / 8%)',
      borderRadius: '10px',
      background: '#FFFFFF',
      // display: 'none'
      opacity: 0,
      transition: "opacity 2s",
      // visibility: 'Hidden',
      tabIndex: '-1'

   }
   const howToUseImages = {
      position: 'absolute',
      left: '50%',
      top: '56%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '274px',
      tabIndex: '-1'

   }
   const UseImagesIpad = {
      position: 'fixed',
      left: '-351px',

      border: '1px solid #EEEEEE',
      boxShadow: '0px 2px 2px rgb(0 43 85 / 8%), 0px 4px 4px rgb(0 43 85 / 8%), 0px 8px 8px rgb(0 43 85 / 8%), 0px 16px 16px rgb(0 43 85 / 8%), 0px 32px 32px rgb(0 43 85 / 8%)',
      borderRadius: '10px',
      background: '#FFFFFF',
      opacity: 0,
      transition: "opacity 2s",
      display: 'flex',
      justifyContent: 'center'

   }
   const howToUseDiv = {
      width: '100%',
      textAlign: 'center',
      lineHeight: '75px',
      fontSize: '30px'
   }
   const useName1 = {
      position: 'absolute',
      width: '90px',
      height: '28px',
      left: '0',
      top: '30px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '36px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      color: '#000000'
   }
   const useName2 = {
      position: 'absolute',
      width: '90px',
      height: '28px',
      left: '0',
      top: '138px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '36px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      color: '#000000'
   }
   const useName3 = {
      position: 'absolute',
      width: '90px',
      height: '28px',
      left: '0',
      top: '240px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '36px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      color: '#000000'
   }
   const imgUse = {
      marginTop: '22px',
      marginLeft: '111px',
      height: '54px',
      width: '127px'
   }
   const closeUse = {
      position: 'absolute',
      right: '18px',
      top: '23px',
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
      transform: ' rotate(180deg)',
      position: 'relative',
      left: '0',
      top: '2px',
      color: '#006BBD',
      height: '22px',
      width: '22px'
   }

   return (
      <React.Fragment>



         {/* <Hidden only={['lg','xl','xs']}> */}
         <span variant="contained" tabIndex="1" className="tabIndexStyle" onKeyPress={handleClick} onClick={handleClick} className="HowToUseHeader"><ErrorOutlineSharpIcon id="iconI" style={iconStyle} /> <span style={usestyle}>{window.finalLangues.howToUseMenu}</span></span>
         {ReactDOM.createPortal(
            <div id="howToUSE" tabIndex="-1" style={UseImagesIpad} className="useImg">
               <span tabIndex="-1" style={howToUseName}>{window.finalLangues.howToUseMenu}:</span>
               <img tabIndex="-1" onClick={closeHandle} style={closeUse} id="closeBtn" alt="closeBtn" src="./img/closeIcon.png" />
               {/* <HighlightOffIcon onClick={closeHandle} style={closeUse}/> */}
               <div tabIndex="-1" style={howToUseImages}>
                  <div tabIndex="-1" style={howToUseDiv}><span style={useName1}>{window.finalLangues.move}</span><img style={imgUse} alt="Move by swiping with two fingers on touchscreen or by clicking the right mouse button" src="./img/move.svg" /></div>
                  <div tabIndex="-1" style={howToUseDiv}><span style={useName2}>{window.finalLangues.rotate} </span><img style={imgUse} alt="Rotate by making a circular motion with one finger on touchscreen or by clicking the left mouse button" src="./img/rotate.svg" /></div>
                  <div tabIndex="-1" style={howToUseDiv}><span style={useName3}>{window.finalLangues.zoom}</span><img style={imgUse} alt="Zoom by using two fingers to pinch and expand or by using the scroll wheel on the mouse" src="./img/zoom.svg" /></div>
               </div>
            </div>,
            document.getElementById('howTousePopupDesk')

         )}
         {/* </Hidden> */}
      </React.Fragment>
   )
}



export default HowToUse;

