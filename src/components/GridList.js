import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Replay from 'material-ui-icons/Replay';
import CategoryIconComponent from "./CategoryIcon";
import { DEMAND } from '../constants/constExplorer';
import  Moment  from 'react-moment';

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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function TitlebarGridList(props) {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <Subheader component="div">December
                        <IconButton
                            onClick={props.loadMoreEntries}
                            style={{position: "absolute", right: 0, top: 0}}>
                            <Replay  />
                        </IconButton>
                    </Subheader>
                </GridListTile>
                {props.data.loading === false ? props.data.activity.map(obj => (
                    <GridListTile
                        style={{
                            backgroundColor: obj.category.backgroundColor
                        }}
                        key={obj.id} cols={props.tab == 'ALL' ? 1 : 2}
                        rows={props.tab == 'ALL' ? 1 : 2}>

                        { obj.firstImage ?
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
                                color={obj.category.iconColor} />
                        }
                        <GridListTileBar
                            style={obj.typeActivity === DEMAND ? {
                                    backgroundColor: "rgba(0,150,136,0.8)"
                                }
                                : {
                                    backgroundColor: "rgba(255,64,129,0.8)"
                                }
                            }
                            title={<strong>{obj.title}</strong>}
                            subtitle={<strong><Moment fromNow date={obj.date}/> </strong>}
                            actionIcon={
                                <IconButton>
                                    <CategoryIconComponent icon={obj.category.icon} color="rgba(255, 255, 255, 0.54)" />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                )) :
                    <p>Loading</p>

                }
            </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);