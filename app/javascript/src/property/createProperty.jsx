// createProperty.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

//this changed to class component so you can use componentDidMount
class CreateProperty extends React.Component {

  componentDidMount() {
      console.log("createProperty components mounted")
  }
  
  render() {
      return (
          <Layout>
              <div className="container">
                  <div className="row">
                      <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                          <div className="border p-4">
                              <p className="mb-0">Add Property</p>
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

