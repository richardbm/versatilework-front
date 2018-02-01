import React from 'react';
import DetailActivity from '../components/DetailActivity';


class DetailActivityView extends React.Component {

    constructor(props){
        super(props);
    }


    render() {
        let { match } = this.props;

        return (
            <DetailActivity match={{ params: { id: match.params.id }, url: 'activity' }}/>
        );
    }
}

export default DetailActivityView;