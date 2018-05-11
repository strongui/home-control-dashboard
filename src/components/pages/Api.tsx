import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Api extends React.Component<{}, {}> {
  render() {
    const sampleData = {
      coolingCompressorOn: false,
      fanOn: false,
      heatingCompressorOn: false,
      heatingElementOn: false,
      mainFloorTemp: 19.6,
      outsideHumidity: 39,
      outsideTemp: 11.8,
    };

    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/api">API</Link>
          </li>
          <li className="breadcrumb-item active">How to use</li>
        </ol>
        <article>
          <div className="card">
            <div className="card-body">
              <h1>Synopsis</h1>
              <hr />
              <p>React based SPA to manage various smart components of the house.</p>
              <h2>Motivation</h2>
              <hr />
              <p>Converting a simple JSON server home status response into an interactive app.</p>
              <pre>{JSON.stringify(sampleData, null, 2)}</pre>
              <h2>To Do</h2>
              <hr />
              <ul>
                <li>Define server API</li>
                <li>Consume server API</li>
                <li>Authentication</li>
                <li>Two Factor</li>
              </ul>
              <pre>{JSON.stringify(sampleData, null, 2)}</pre>
              <h2>Build WIth</h2>
              <hr />
              <ul>
                <li>React</li>
                <li>Bootstrap 4</li>
                <li>Fontawesome</li>
                <li>Owfont</li>
                <li>Openweathermap</li>
              </ul>
              <h3>Authors</h3>
              <ul>
                <li>
                  <strong>Amir Karamuja</strong>
                </li>
              </ul>
              <hr />
              <h3>License</h3>
              <p>
                This project is licensed under the MIT License - see the LICENSE.md file for details
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
