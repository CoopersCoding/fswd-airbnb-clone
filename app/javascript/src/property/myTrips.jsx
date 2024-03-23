import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

class MyTrips extends Component {

    componentDidMount() {
        fetch('/api/bookings')
            .then(response => response.json())
            .then(data => this.setState({ bookings: data }))
    }
    
    render() {
        const { bookings } = this.state || { bookings: [] };
        return (
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                            <div className="border p-4">
                                <h3 className="mb-0 text-danger">My Trips</h3>
                                <ul>
                                    {bookings.map(booking => (
                                        <li key={booking.id}>
                                            {booking.property.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                            <div className="border p-4">
                                <p className="mb-0">Success!</p>
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

