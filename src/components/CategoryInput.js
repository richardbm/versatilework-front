import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import {
    graphql,
} from 'react-apollo';
import { required } from '../services/validations';
import SelectField from './CustomSelectField';


class CategoryInput extends Component {

    render () {
        let { loading, category } = this.props;
        return (
            <Field
                name="categoryId"
                validate={required}
                category={category}
                component={SelectField} >
            </Field>
        )
    }
}

const categoryListQuery = gql`
    query categoryListQuery {
        category {
            id
            name
        }
    }
`;


const queryOptions = {

    options:  {
        fetchPolicy: 'network-only',
    },
    props: ({ data: { loading, category } }) => ({
        loading, category
    }),
};


export default graphql(categoryListQuery, queryOptions)(CategoryInput);