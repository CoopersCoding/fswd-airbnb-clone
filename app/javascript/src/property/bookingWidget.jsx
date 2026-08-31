import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import 'react-dates/lib/css/_datepicker.css';

class BookingWidget extends React.Component {
  state = {
    authenticated: false,
    existingBookings: [],
    startDate: null,
    endDate: null,
    focusedInput: null,
    loading: false,
    error: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        });
      });

    this.getPropertyBookings();
  }

  getPropertyBookings = () => {
    fetch(`/api/properties/${this.props.property_id}/bookings`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          existingBookings: data.bookings,
        });
      });
  }

  submitBooking = (event) => {
    event.preventDefault();

    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      this.setState({ error: 'Please choose your dates.' });
      return;
    }

    this.setState({ loading: true, error: false });

    fetch('/api/bookings', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        booking: {
          property_id: this.props.property_id,
          start_date: startDate.format('MMM DD YYYY'),
          end_date: endDate.format('MMM DD YYYY'),
        }
      })
    }))
      .then(handleErrors)
      .then(response => {
        return this.initiateStripeCheckout(response.booking.id);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: 'Unable to create booking. Please try different dates.',
        });
      });
  }

  initiateStripeCheckout = (bookingId) => {
    return fetch(
      `/api/charges?booking_id=${bookingId}&cancel_url=${window.location.pathname}`,
      safeCredentials({
        method: 'POST',
      }),
    )
      .then(handleErrors)
      .then(response => {
        if (!response.charge || !response.charge.checkout_url) {
          throw new Error('Stripe checkout URL was not returned.');
        }

        window.location.href = response.charge.checkout_url;
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: 'Unable to open Stripe checkout.',
        });
      });
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  }

  isDayBlocked = day => (
    this.state.existingBookings.filter(
      booking => day.isBetween(
        booking.start_date,
        booking.end_date,
        null,
        '[)',
      )
    ).length > 0
  )

  render() {
    const {
      authenticated,
      startDate,
      endDate,
      focusedInput,
      loading,
      error,
    } = this.state;

    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please{' '}
          <a href={`/login?redirect_url=${window.location.pathname}`}>
            log in
          </a>{' '}
          to make a booking.
        </div>
      );
    }

    const { price_per_night } = this.props;

    let days;

    if (startDate && endDate) {
      days = endDate.diff(startDate, 'days');
    }

    return (
      <div className="border p-4 mb-4">
        <form onSubmit={this.submitBooking}>
          <h5>
            ${price_per_night} <small>per night</small>
          </h5>

          <hr />

          <div style={{ marginBottom: focusedInput ? '400px' : '2rem' }}>
            <DateRangePicker
              startDate={startDate}
              startDateId="start_date"
              endDate={endDate}
              endDateId="end_date"
              onDatesChange={this.onDatesChange}
              focusedInput={focusedInput}
              onFocusChange={this.onFocusChange}
              isDayBlocked={this.isDayBlocked}
              numberOfMonths={1}
            />
          </div>

          {days > 0 && (
            <div className="d-flex justify-content-between">
              <p>Total</p>
              <p>${(price_per_night * days).toLocaleString()}</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-large btn-danger btn-block"
            disabled={loading || !startDate || !endDate}
          >
            {loading ? 'Opening checkout...' : 'Book'}
          </button>
        </form>
      </div>
    );
  }
}

export default BookingWidget;