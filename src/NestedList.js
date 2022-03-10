import React from "react";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import States from "./model_gl/config";


const styles = theme => ({
    root: {
        
        //SubTitle Color
        '& .MuiListSubheader-root.MuiListSubheader-colorPrimary': {
            color: '#e91e63'
         },

        width: "100%",
        //maxWidth: 360,
        background: theme.palette.background.paper,
        marginRight: '3vw',
        
    },
    
    nested: {
        paddingLeft: theme.spacing(4)
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "92%"
      },

});



class NestedList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: this.readStates(), json:{}, update:false, cameraName:[], cameraPos:[], sceneReady: false, currentSelection: null };
        //Get DIV react html element to access attributes
        this.divReact = document.getElementById('root');
    }
    

    readStates = () => {
       
        var myList = { list:[ {id:1, title:"States", items:[] }] }
        
        var tempObj = {}; 
        var tempItems = [];
        var tempId = 1;
        var hasGroup = false;
        var checkGroup = false;
        
        
        var configStates = States.states;
        var configGroups = States.displaylayers;
        
        //If Config.json is fetched
        if(this.state.update == true) {
            configStates = this.state.json.states ;
            configGroups = this.state.json.displaylayers;

            //Update Camera from Global Scene if the Scene exists
            if(this.state.sceneReady == true){
                
                /* window.scene.gotoPosInTime(this.state.json.positions.reset.pos[0],
                this.state.json.positions.reset.pos[1],
                this.state.json.positions.reset.pos[2],
                this.state.json.positions.reset.pos[3],
                this.state.json.positions.reset.pos[4], 0); */
            }
        }

        for(var i=0; i < configStates.length; i++){
            hasGroup = false;
            checkGroup = false;
            for(var j=0; j < configGroups.length; j++){
                //Check Groups on States
                let checkGroup = configStates[i].split(configGroups[j]+":");
                if(checkGroup.length > 1){
                    hasGroup = true;
                    //Check if group exists in the tempItems
                    if(tempItems.length > 0){
                        for(var k=0; k < tempItems.length; k++){
                            if(tempItems[k].name == configGroups[j]){
                                //Exist
                                checkGroup = true;
                            }
                        }
                        //Addind when already exists
                        if(checkGroup == true){
                            //console.log("THERE IS");
                            //Search for GroupName
                            for(var l=0; l < tempItems.length; l++) {
                                if(tempItems[l].name == configGroups[j]){
                                    //Get the number of SubIDs
                                    let subId = tempItems[l].subitems.length+1;
                                    tempObj = {id:subId, name:configStates[i]};
                                    tempItems[l].subitems.push(tempObj);
                                    tempObj = {};
                                }
                            }
                       
                        //Addind when does not exist
                        } else { 
                            //console.log("NOT");
                            tempObj.id = tempId;
                            tempObj.name = configGroups[j];
                            tempObj.subitems = [{id:1, name:configStates[i]}];
                            tempId += 1;
                            tempItems.push(tempObj);
                            tempObj = {};
                            }
        
                    } else {
                        //First Time to Add if tempArray is Empty
                        tempObj.id = tempId;
                        tempObj.name = configGroups[j];
                        tempObj.subitems = [{id:1, name:configStates[i]}];
                        tempId += 1;
                        tempItems.push(tempObj);
                        tempObj = {};
                    }
        
                } else {
                    //if it has no groups and in the last interation
                    if(hasGroup == false && (j == configGroups.length-1)){
                        tempObj.id = tempId;
                        tempObj.name = configStates[i];
                        tempId += 1;
                        tempItems.push(tempObj);
                        tempObj = {};
                    }
                }
                
            }
        }
        
        //Change names from SubGroups to work in the list
        for(var i=0; i <tempItems.length; i++) {
            if(tempItems[i].subitems != null){
                tempItems[i].name = "Grp_"+tempItems[i].name;
            }
        }

        //Final Result
        // myList.list[0].items = [...tempItems]; 
        
        //Adding Cameras if Scene is Updated
        if(this.state.update == true && this.divReact.getAttribute("data-camera") =='true' ) {
            
            myList.list.push({id:2, title:"Cameras", items:[]});
       
            let cameraName = Object.keys(this.state.json.positions);
            let cameraPos = Object.values(this.state.json.positions); 
            this.setState({cameraName: cameraName, cameraPos: cameraPos});
            
            //console.log(cameraPos[0].pos);

            for(var i=0; i<cameraName.length; i++){

                myList.list[1].items.push({id: (i+1), name:cameraName[i]})
            }

            
           
        }

        return myList;
        
        };//Finished Function ********************************************
    
         
    componentDidMount() {

       // window.addEventListener('window.scene._prepared', ()=>{console.log("Prepared") }, true );
        

        //Update Json
         const fetchJson = async () => {
           
        const response = await fetch('./model_gl/config.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        ).then((response) => response.json())
        .then((myJson)=> { this.setState({json: myJson, update:true}); this.setState({items: this.readStates()}); })
    }
        
        //Function waiting for Global Variables (Camera) 
        const waitForGlobal = async function(key, callback) {

            if (window[key]) {
                
                if(window[key]._prepared == true)
                    { callback(); }
                else { 
                    setTimeout(function() {
                    waitForGlobal(key, callback);
                  }, 100);}
            } else { 
                setTimeout(function() {
                waitForGlobal(key, callback);
              }, 100);} 

          };
           
          waitForGlobal("scene", fetchJson); 
    }

    state = {};
    

    handleClick = e => {

        this.setState({ [e]: !this.state[e] });
        let check = false;

        //Check if it is a Camera
        for(var c=0; c<this.state.cameraName.length; c++){
            if(e===this.state.cameraName[c]){
                check = true
                
                window.scene.gotoPosInTime(this.state.cameraPos[c].pos[0],
                    this.state.cameraPos[c].pos[1],
                    this.state.cameraPos[c].pos[2],
                    this.state.cameraPos[c].pos[3],
                    this.state.cameraPos[c].pos[4],0);
            }
        }

        //If it is not a Camera neither a Group
        if (check==false) {
            if(e.split("Grp_").length > 1){
               
             } else{ 

                //Apply State
                this.changeSelection(e);
                window.scene.groupApplyState(e);

                
             }
        }
        
    };

    handleClickSubItem = e => {
        console.log(e);
        this.changeSelection(e);
        window.scene.groupApplyState(e);
    };

    //Function to change Async(ly) the selection state
    changeSelection = async (e) => {
            await this.setState({currentSelection: e});
            console.log(this.state.currentSelection);
        }


    render() {

        //Get All NestedList (states) from Models
       // const items = this.state.items;

        const { classes } = this.props;

        return (
            <div>
               
                {this.state.items.list.map(list => {
                    return (
                        
                        <List
                            className={classes.root}
                            key={list.id}
                            // subheader={
                            //     <ListSubheader color={'primary'} className={classes.root}>{list.title}</ListSubheader>
                            // }
                        >
                            {list.items.map(item => {
                                return (
                                    <div key={item.id}>
                                        {item.subitems != null ? (
                                            <div key={item.id}>
                                                <ListItem
                                                    button
                                                    key={item.id}
                                                    onClick={this.handleClick.bind(
                                                        this,
                                                        item.name
                                                    )}
                                                    selected={this.state.currentSelection==item.name ? true : false}
                                                >
                                                    {this.state[item.name] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}

                                                    <ListItemText
                                                        primary={item.name}
                                                    />
                                                    
                                                </ListItem>
                                                <Collapse
                                                    key={list.items.id}
                                                    // component="li"
                                                    in={this.state[item.name]}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <List disablePadding>
                                                        {item.subitems.map(
                                                            sitem => {
                                                                return (
                                                                    <ListItem
                                                                        button
                                                                        key={
                                                                            sitem.id
                                                                        }
                                                                        className={
                                                                            classes.nested
                                                                        }
                                                                        onClick={this.handleClickSubItem.bind(
                                                                            this,
                                                                            sitem.name
                                                                        )}
                                                                        
                                                                        selected={this.state.currentSelection==sitem.name ? true : false}
                                                                        
                                                                    >
                                                                        <ListItemText
                                                                            key={
                                                                                sitem.id
                                                                            }
                                                                            primary={
                                                                                sitem.name
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                );
                                                            }
                                                        )}
                                                    </List>
                                                </Collapse>{" "}
                                            </div>
                                        ) : (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={this.handleClick.bind(
                                                    this,
                                                    item.name
                                                )}
                                            >
                                                <ListItemText
                                                    primary={item.name}
                                                />
                                            </ListItem>
                                        )}
                                    </div>
                                );
                            })}
                            {/* <Divider key={list.id} absolute /> */}
                        </List>
                    );
                })}
            </div>
        );
    }
}
NestedList.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NestedList);