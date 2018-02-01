import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
//import CategoryInput from './CategoryInput';
import { required } from '../services/validations';
import { DEMAND } from '../constants/constExplorer';
import SupplyForm from '../components/SupplyForm';
import gql from 'graphql-tag';
import TextField from '../elements/TextField';

import {
    graphql,
} from 'react-apollo';

class AddResponseView extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        let activityId = this.props.match.params.id;
        console.log(activityId);
        this.props.responseActivityMutation({variables: {
                activityId: activityId,
                ...values
                }
             })
            .then(response => {
                console.log(response);
            })
            .catch(() =>
                console.warn(`demand not saved`)
            );
    }

    render () {

        return (
            <SupplyForm onSubmit={this.handleSubmit}/>
        )
    }
}



const RESPONSE_ACTIVITY = gql`
    mutation ResponseActivityMutation($description:String!,$activityId:Int!) {
        responseActivity(description:$description,activityId:$activityId) {
            id
            description
            activity {
                id
            }
            owner {
                id
                firstName
                lastName
                phone
            }
        }
    }
`;

export default graphql(
    RESPONSE_ACTIVITY,
    { name: 'responseActivityMutation' })
(AddResponseView);
