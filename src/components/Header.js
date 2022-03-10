import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatars from "./MenuComponents/Avatars";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Hidden from '@material-ui/core/Hidden';


const headerBackground={
  background: 'transparent'
}

const Header =()=>{

  const closeWindow = () => {
    // alert("Close window");
  }

    return(
        <div aria-labelledby="Dell Technologies" className="maniHeader">
        <Grid style={{paddingTop: '20px'}} container spacing={3}>
        <Grid item xs={3} aria-label="Dell Technologies" className="tabIndexStyle">
          {/* <div aria-label="Dell Technologies" id="headerName" tabIndex="1"style={{padding:"5px"}}>
          <Paper style={headerBackground}><p className="dellLogo"><Avatars className="headerLogo"  img="./img/DellTech_Logo_Prm_Blue_rgb.svg" alt=""/></p></Paper>
        </div> */}
        </Grid>
        {/* <Grid item xs={7} md={6}>
        <Hidden only={['sm','md']}>
          <Paper tabIndex="1" id="productName" className="tabIndexStyle" align={"center"} style={{border:'0', padding: '7px', backgroundColor: 'transparent', marginLeft:'32%'}}><p className="ProductName">Latitude 7410 Chromebook Enterprise</p></Paper>
        </Hidden>
          <Hidden only={['xs','lg','xl']}>
            <Paper  className="tabIndexStyle" align={"center"} style={{border:'0', padding: '7px', backgroundColor: 'transparent', marginLeft:'22%'}}><p className="ProductName">Latitude 7410 Chromebook Enterprise</p></Paper>
          </Hidden>
        </Grid> */}
        <Grid item xs={9} md={9}>
        <Hidden only='xs'>
          <Paper align={"right"} style={headerBackground}>
              {/* <p className="closeIcon"><HighlightOffIcon onClick={closeWindow} style={{marginRight:'55px',cursor: "pointer", color: '#000000', height: '32px',float:'right', width: '32px'}}/></p> */}
              <p className="tabIndexStyle" className="closeIcon"><img id='closeIcon'  tabIndex="1" src="./img/closeIcon.png" alt="closeHeader" onClick={closeWindow} /></p>
          </Paper>
          </Hidden>
          <Hidden only={['sm','md','lg','xl']}>
          <Paper align={"right"} style={headerBackground}>
              <p className="closeIcon"><img src="./img/mobClose.png" id="closeBtnImg" alt="mobcloseheader" onClick={closeWindow} style={{marginRight:'25px',cursor: "pointer", color: '#767676', height: '32px', width: '32px'}}/></p>
          </Paper>
          </Hidden>
        </Grid>
        </Grid>
        </div>
    );
}

export default Header;