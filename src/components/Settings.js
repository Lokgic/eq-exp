import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import PlusIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import Button from 'material-ui/Button';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360 ,
    backgroundColor: theme.palette.background.paper,
    textTransform:'capitalize',
  },
});

const  SimpleList = (props)=> {
  const { classes,handleSettings} = props;
  return (
    <Paper>
    <div className={classes.root}>
      {
        ["left", "right"].map(d=>(
          <MenuList component="nav" key={`${d}_ml`}>
            <MenuItem>
              <ListItemText secondary={`${d} Distribution`}/>
            </MenuItem>
            <MenuItem>
              <ListItemText primary={`Mean: ${props[d].mu}`} />
              <ListItemIcon>
                <Button  variant="fab" color="primary" aria-label="mu-1-add" mini
                  onClick={()=>handleSettings({dist:d,p:"mu",direction:"plus"})}
                  ><PlusIcon/></Button>
              </ListItemIcon>
              <ListItemIcon>
                  <Button
                    onClick={()=>handleSettings({dist:d,p:"mu",direction:"minus"})}
                    variant="fab" color="secondary" aria-label="add" mini><MinusIcon/></Button>
              </ListItemIcon>
            </MenuItem>
            <MenuItem>
              <ListItemText primary={`Std.Dev: ${props[d].sd}`} />
              <ListItemIcon>
                  <Button

                    onClick={()=>handleSettings({dist:d,p:"sd",direction:"plus"})}
                    variant="fab" color="primary" aria-label="add" mini><PlusIcon/></Button>
              </ListItemIcon>
              <ListItemIcon>
                  <Button
                    onClick={()=>handleSettings({dist:d,p:"sd",direction:"minus"})}
                    variant="fab" color="secondary" aria-label="add" mini><MinusIcon/></Button>
              </ListItemIcon>
            </MenuItem>

          </MenuList>

        ))
      }
      <MenuList component="nav">

          <Divider />
        <MenuItem>
          <ListItemText primary={`Speed: `} />
          <ListItemIcon>
              <Button variant="fab" color="primary" aria-label="add" mini><PlusIcon/></Button>
          </ListItemIcon>
          <ListItemIcon>
              <Button variant="fab" color="secondary" aria-label="add" mini><MinusIcon/></Button>
          </ListItemIcon>
        </MenuItem>

      </MenuList>

    </div>
  </Paper>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
