import React, { Component } from 'react';
import ResponseForm from '../components/ResponseForm';
import gql from 'graphql-tag';

import {
    graphql,
} from 'react-apollo';
import { history } from '../store/configureStore';

class AddResponse extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        let activityId = this.props.activity.id;
        this.props.responseActivityMutation({variables: {
                activityId: activityId,
                ...values
                }
             })
            .then(response => {
                window.location.reload();
            })
            .catch(() =>
                console.warn(`response not saved`)
            );
    }

    render () {

        return (
            <ResponseForm onSubmit={this.handleSubmit}/>
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
(AddResponse);
