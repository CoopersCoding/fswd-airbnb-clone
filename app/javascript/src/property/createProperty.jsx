// createProperty.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

class CreateProperty extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch('/properties', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <h3 className="mb-0 text-danger">Create a new property</h3>
                <p className="mb-0">Fill out the form below to create a new property</p>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" name="city" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" name="country" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="property_type">Property type</label>
                    <input type="text" className="form-control" id="property_type" name="property_type" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price_per_night">Price Per Night</label>
                    <input type="text" className="form-control" id="price_per_night" name="price_per_night" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="max_guests">Max Guests</label>
                    <input type="text" className="form-control" id="max_guests" name="max_guests" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <input type="text" className="form-control" id="bedrrooms" name="bedrooms" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="baths">Baths</label>
                    <input type="text" className="form-control" id="baths" name="baths" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pictures">Pictures</label>
                    <input type="file" className="form-control" id="pictures" name="pictures" required />
                  </div>


                  <br />
                  <button type="submit" className="btn btn-danger btn-block btn-lg">Create</button>
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
  try {
    const div = document.body.appendChild(document.createElement('div'));
    ReactDOM.render(
      <CreateProperty />,
      div,
    );
  } catch (e) {
    handleErrors(e);
  }
});

