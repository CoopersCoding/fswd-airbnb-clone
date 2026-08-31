import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

class MyTrips extends Component {
  state = {
    bookings: [],
    loading: true,
    error: '',
  }

  componentDidMount() {
    fetch('/api/bookings')
      .then(handleErrors)
      .then(data => {
        this.setState({
          bookings: data.bookings,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          loading: false,
          error: 'Unable to load your trips.',
        });
      });
  }

  render() {
    const {
      bookings,
      loading,
      error,
    } = this.state;

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-8 mx-auto my-4">
              <h2 className="text-danger mb-4">
                My Trips
              </h2>

              {loading && (
                <p>Loading trips...</p>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {!loading && !error && bookings.length === 0 && (
                <div className="border p-4">
                  <p className="mb-0">
                    You do not have any trips yet.
                  </p>
                </div>
              )}

              {bookings.map(booking => (
                <a
                  key={booking.id}
                  href={`/property/${booking.property.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card mb-4">
                    {booking.property.image_url && (
                      <img
                        src={booking.property.image_url}
                        className="card-img-top"
                        alt={booking.property.title}
                        style={{
                          height: '250px',
                          objectFit: 'cover',
                        }}
                      />
                    )}

                    <div className="card-body">
                      <h4 className="card-title">
                        {booking.property.title}
                      </h4>

                      <p className="text-secondary mb-2">
                        {booking.property.city}
                      </p>

                      <p className="mb-1">
                        <strong>Check in:</strong>{' '}
                        {booking.start_date}
                      </p>

                      <p className="mb-0">
                        <strong>Check out:</strong>{' '}
                        {booking.end_date}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
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
    document.body.appendChild(
      document.createElement('div'),
    ),
  );
});