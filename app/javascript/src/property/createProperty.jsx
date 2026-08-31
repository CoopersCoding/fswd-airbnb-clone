import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import {
  safeCredentials,
  handleErrors,
} from '@utils/fetchHelper';

class CreateProperty extends React.Component {
  state = {
    title: '',
    description: '',
    city: '',
    country: '',
    property_type: '',
    price_per_night: '',
    max_guests: '',
    bedrooms: '',
    beds: '',
    baths: '',
    image_url: '',
    loading: false,
    error: '',
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
    } = this.state;

    this.setState({
      loading: true,
      error: '',
    });

    fetch('/api/properties', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        property: {
          title,
          description,
          city,
          country,
          property_type,
          price_per_night,
          max_guests,
          bedrooms,
          beds,
          baths,
          image_url,
        },
      }),
    }))
      .then(handleErrors)
      .then((data) => {
        window.location.href = `/property/${data.property.id}`;
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          loading: false,
          error: 'Unable to create property. Please check the form and try again.',
        });
      });
  }

  render() {
    const {
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      loading,
      error,
    } = this.state;

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <h3 className="mb-0 text-danger">
                  Create a new property
                </h3>

                <p className="mb-4">
                  Fill out the form below to create a new property.
                </p>

                <form onSubmit={this.handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={city}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={country}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="property_type">
                      Property type
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="property_type"
                      name="property_type"
                      value={property_type}
                      onChange={this.handleInputChange}
                      placeholder="Entire apartment, private room, house..."
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="price_per_night">
                      Price per night
                    </label>

                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      id="price_per_night"
                      name="price_per_night"
                      value={price_per_night}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="max_guests">
                      Max guests
                    </label>

                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      id="max_guests"
                      name="max_guests"
                      value={max_guests}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="bedrooms">
                      Bedrooms
                    </label>

                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      id="bedrooms"
                      name="bedrooms"
                      value={bedrooms}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="beds">Beds</label>

                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      id="beds"
                      name="beds"
                      value={beds}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="baths">Baths</label>

                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      id="baths"
                      name="baths"
                      value={baths}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="image_url">
                      Property image URL
                    </label>

                    <input
                      type="url"
                      className="form-control"
                      id="image_url"
                      name="image_url"
                      value={image_url}
                      onChange={this.handleInputChange}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-danger btn-block btn-lg"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Property'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const div = document.body.appendChild(
    document.createElement('div'),
  );

  ReactDOM.render(
    <CreateProperty />,
    div,
  );
});