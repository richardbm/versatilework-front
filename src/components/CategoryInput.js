import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import {
    graphql,
} from 'react-apollo';
import { required } from '../services/validations';


class CategoryInput extends Component {

    render () {
        let { loading, category } = this.props;

        if (loading) {
            return (
                <Field
                    name="category"
                    validate={required}
                    type="select"
                    component="select" >
                    <option>Select</option>
                </Field>
            )
        }
        return (
            <Field
                name="categoryId"
                validate={required}
                component="select" >
                <option key={0}>Select</option>

                {category.map(obj =>
                    <option key={obj.id} value={obj.id}>{obj.name} </option>
                )}
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