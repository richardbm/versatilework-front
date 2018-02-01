import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import CategoryInput from './CategoryInput';
import { required } from '../services/validations';

function SupplyForm(props) {
    const { handleSubmit, pristine, submitting } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="title"
                type="text"
                component="input"
                validate={required}
            />
            <Field
                name="description"
                validate={required}
                type="text"
                component="input" />
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <CategoryInput/>

        </form>
    )
}

SupplyForm = reduxForm({
    form: 'supplyForm'
})(SupplyForm);

export default SupplyForm;