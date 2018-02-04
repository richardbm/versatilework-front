import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    formControl: {
        margin: 20,
        minWidth: "80%",
    }
});

class CustomSelectField extends React.Component {

    render() {
        const { classes } = this.props;
        let {input: {value, onChange}, category} = this.props;
        if (!category) {
            category = []
        }
        console.log(category);

        return (
            <FormControl className={classes.formControl}>
                <InputLabel>Category</InputLabel>
                <Select
                    onChange={onChange}
                    value={value}>
                    {category.map(obj =>
                        <MenuItem key={obj.id} value={obj.id}>{obj.name} </MenuItem>
                    )}
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(CustomSelectField);