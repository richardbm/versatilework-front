import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import Replay from 'material-ui-icons/Replay';
import CategoryIconComponent from "./CategoryIcon";
import TypeActivityIcon from "../elements/TypeActivityIcon";
import Loader from './Loader';
import { Link } from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    },
    gridList: {
        maxWidth: 700,
        height: "100%",
    },
});

function TitlebarGridList(props) {

    const {classes} = props;


    return (
        <div className={classes.container}>
            <GridList
                style={{width: "100%"}}
                cellHeight={180}
                className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{height: '52px'}}>
                    <Subheader
                        component="div">
                        <IconButton
                            onClick={props.loadNewEntries}
                            style={{position: "absolute", right: 0, top: 0}}>
                            <Replay/>
                        </IconButton>
                    </Subheader>
                </GridListTile>
                    {props.data.loading === false ? props.data.activity.map(obj => (
                            <GridListTile
                                component={Link} to={`/activity/${obj.id}`}
                                style={{
                                     backgroundColor: "rgba(231,238,210,0.5)",
                                   // backgroundColor: "rgba(0,0,0,0.5)",
                                }}
                                key={obj.id}>


                                {obj.firstImage ?
                                    <img src={obj.firstImage} alt={obj.title}/>
                                    :
                                    <CategoryIconComponent
                                        style={{
                                            fontSize: "500px",
                                            position: "relative",
                                            width: "100%",
                                            height: "100%",
                                            verticalAlign: "middle",
                                            color: obj.category.iconColor
                                        }}
                                        icon={obj.category.icon}
                                        color={obj.category.iconColor}/>

                                }

                                <TypeActivityIcon typeActivity={obj.typeActivity}/>

                                {obj.firstImage ?
                                    <IconButton
                                        style={{
                                            position: "absolute",
                                            left: "-4px",
                                            top: "44px",
                                            height: "20px"

                                        }}>
                                        <CategoryIconComponent icon={obj.category.icon}
                                                               color="rgba(0, 0, 0, 0.8)"/>
                                    </IconButton>
                                    : <div></div>
                                }
                                <GridListTileBar
                                    style={{
                                         height: "35px",
                                         background: "rgba(24, 62, 49, 0.6)"
                                        // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                                        // 'rgba(0,0,0,0) 100%, rgba(0,0,0,3) 70%)',


                                        //backgroundColor: obj.typeActivity === DEMAND ?
                                        //    "rgba(0,89,150,0.8)" : "rgba(0,150,61,0.8)"

                                    }}
                                    title={<span style={{lineHeight: "32px", fontSize: "1.1em"}}>{obj.title}</span>}
                                    //subtitle={<Moment fromNow date={obj.date}/> }
                                />
                            </GridListTile>
                        )) :
                        <Loader/>

                    }
                    <div style={{height: "50px"}}>

                    </div>
            </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);