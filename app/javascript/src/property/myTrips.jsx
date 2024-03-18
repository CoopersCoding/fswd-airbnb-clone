import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

//this changed to class component so you can use componentDidMount
class MyTrips extends React.Component {

    componentDidMount() {
        console.log("myTrips components mounted")
    }
    
    render() {
        return (
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                            <div className="border p-4">
                                <p className="mb-0">My Trips</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <MyTrips />,
        document.body.appendChild(document.createElement('div')),
    );
});
