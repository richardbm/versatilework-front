import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
//import CategoryInput from './CategoryInput';
import { required } from '../services/validations';
import { DEMAND } from '../constants/constExplorer';
import SupplyForm from '../components/SupplyForm';
import gql from 'graphql-tag';
import { history } from '../store/configureStore';
import {
    graphql,
} from 'react-apollo';

class DemandFormView extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.createDemandMutation({variables: {
                typeActivity: DEMAND,
                ...values
                }
             })
            .then(response => {
                history.push(`/#/activity/${response.data.createActivity.id}`)
                window.location.reload();
            })
            .catch(() =>
                console.warn(`demand not saved`)
            );
    }

    render () {
        return (
            <SupplyForm
                title="Publish Supply"
                onSubmit={this.handleSubmit}/>        )
    }
}



const CREATE_DEMAND= gql`
    mutation CreateDemandMutation($title:String!,$description:String!,$categoryId:Int!,$typeActivity:String!) {
        createActivity(title:$title,description:$description,categoryId:$categoryId,typeActivity:$typeActivity) {
            id
            title
            description
            category {
                id
                name
            }
            typeActivity
        }
    }
`;

export default graphql(
    CREATE_DEMAND,
    { name: 'createDemandMutation' })
(DemandFormView);
