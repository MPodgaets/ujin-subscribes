import React, {Component} from "react";
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import './with-detail-data.css';

const withDetailData = (View, itemId) => {
    return class extends Component {
        state = {
            data: null,
            blob: null,
            loading: true,
            error: false
        };

        onItemLoaded = (data) => {
            this.setState({
                data,
                blob: this.props.getBlob(data),
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
    
        updateItem() {
            const {person} = this.props;
            if (!itemId || !person) {
                return;
            } 
            this.props.getData(itemId, person)
                .then(this.onItemLoaded)
                .catch(this.onError);  
        };
    
        componentDidMount() {
            this.updateItem();
        };

        componentDidUpdate(prevProps) {
            if (itemId !== prevProps.itemId) {
                this.updateItem();
            };
        };
        //работает при нажатии на галочку включить
        toggleSubscribe = (e) => {
             this.setState(({data}) => {
                const {on, ...rest} = data;
                const dataNew = {on: !on, ...rest};
                return {data: dataNew}
            }); 
        };

        render() {
            const {data, blob, loading, error} = this.state;
 
            const {person, paySubscribe, saveSubscribe} = this.props;

            if (!data) {
                return <span>Select an element from a list</span>
            };

            const hasData = !(loading || error);
            const errorMessage = error ? <ErrorIndicator /> : null;
            const spinner = loading ? <Spinner /> : null;
            const dataRecord =  {
                data: data, 
                onChangeRecord: this.toggleSubscribe
            };
            const detailsChildren = React.Children.map(this.props.children, (child, idx) => {
                return React.cloneElement(child, {dataRecord});
            });

            const content = hasData ? <View {...this.props} data={data} blob={blob} 
                                        detailsChildren={detailsChildren}/> : null;

            //Кнопка оплатить становиться видимой при включении подписки
            const labelPay ='Оплатить'; 
            const btnPaySubscribe = (<button className="btn-pay"
                                        onClick={() => {paySubscribe(person, itemId);
                                            this.updateItem();}}>
                                        {labelPay}
                                    </button>);   

            const {on, paid} = data;
            const visiblePaySubscribe = on && !paid ? btnPaySubscribe : null; 

            const labelSave = 'Записать';
            const btnSaveSubscribe = (<button className="btn-save"
                                        onClick={() => {saveSubscribe(person, data);
                                            this.updateItem();}}>
                                            {labelSave}
                                     </button>); 
            //Если подписка включена и оплачена, то она уже записана
            const visibleSaveSubscribe = on && paid ? null : btnSaveSubscribe;
            //"item-details card"
            return (
                <ErrorBoundry>
                    <div className="with-detail-data">
                        {errorMessage}
                        {spinner}
                        {content}  
                        {visiblePaySubscribe}
                        {visibleSaveSubscribe}
                    </div>
                </ErrorBoundry>        
            );
        }
    }
};

export default withDetailData;