import React, {Component} from "react";
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        onItemLoaded = (data) => {
            this.setState({
                data,
                loading: false,
                error: false
            });
        };

        onError = (err) => {
            this.setState({
                error: true,
                loading: false
            });
        };

        componentDidMount() {
            const {person} = this.props;
            this.props.getData(person)
                .then(this.onItemLoaded)
                .catch(this.onError);
        };

        render() {
            const {data, loading, error} = this.state;

            if (!data) {
                return <Spinner />;
            }

            const hasData = !(loading || error);
            const errorMessage = error ? <ErrorIndicator /> : null;
            const spinner = loading ? <Spinner /> : null;
            const content = hasData ? <View {...this.props} data={data} /> : null;

            return (
                <ErrorBoundry>
                    <div className="with-data">
                        {errorMessage}
                        {spinner}
                        {content}  
                    </div>
                </ErrorBoundry>
            );
        }
    };
};

export default withData;
