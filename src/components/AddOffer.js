import React, { Component } from 'react';
import OfferForm from '../components/OfferForm';
import gql from 'graphql-tag';

import {
    graphql,
} from 'react-apollo';
import { history } from '../store/configureStore';

class AddOffer extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        let activityId = this.props.activity.id;
        this.props.offerActivityMutation({variables: {
                activityId: activityId,
                ...values
                }
             })
            .then(response => {
                history.push(`/activity`);
                window.location.reload();
            })
            .catch(() =>
                console.warn(`response not saved`)
            );
    }

    render () {

        return (
            <OfferForm onSubmit={this.handleSubmit}/>
        )
    }
}



const OFFER_ACTIVITY = gql`
    mutation OfferActivityMutation($description:String!,$activityId:Int!) {
        offerActivity(description:$description,activityId:$activityId) {
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
    OFFER_ACTIVITY,
    { name: 'offerActivityMutation' })
(AddOffer);
