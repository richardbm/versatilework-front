import React from 'react';
import TextField from 'material-ui/TextField';


class CustomTextField extends React.Component {

    render() {
        const {input: {value, onChange}, placeholder} = this.props;
        return (
            <TextField
                style={{
                    margin: 20,
                    width: "80%",
                }}
                multiline={true}
                placeholder={placeholder}
                onChange={onChange}
                value={value}/>
        )
    }
}

export default CustomTextField;