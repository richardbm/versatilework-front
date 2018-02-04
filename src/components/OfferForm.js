import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../services/validations';
import TextField from './CustomTextField';
import Button from 'material-ui/Button';

function OfferForm(props) {
    const { handleSubmit, pristine, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="description"
                validate={required}
                type="text"
                placeholder="Response"
                component={TextField} />
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

OfferForm = reduxForm({
    form: 'offerForm'
})(OfferForm);

export default OfferForm;