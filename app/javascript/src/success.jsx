import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';


class Success extends Component {
    componentDidMount() {
        console.log("success components mounted")
    }

  render() {
    return (
      <Layout>
        <div className="container">
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
      <Success />,
      document.body.appendChild(document.createElement('div')),
    )
  })

