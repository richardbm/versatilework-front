import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import CategoryInput from './CategoryInput';
import { required } from '../services/validations';
import TextField from './CustomTextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

function SupplyForm(props) {
    const { handleSubmit, pristine, submitting, title } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Typography type="headline" style={{margin:20}} component="h3">
                {title}
            </Typography>

            <Field
                name="title"
                type="text"
                placeholder="Title"
                component={TextField}
                validate={required}
            />
            <Field
                name="description"
                validate={required}
                type="text"
                placeholder="Description"
                component={TextField} />
            <CategoryInput/>
            <Button
                style={{margin:20}}
                raised
                type="submit"
                disabled={pristine || submitting}>
                Sent
            </Button>

        </form>
    )
}

SupplyForm = reduxForm({
    form: 'supplyForm'
})(SupplyForm);

export default SupplyForm;