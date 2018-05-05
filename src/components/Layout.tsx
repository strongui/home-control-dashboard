import * as React from "react";
import Footer from './footer/Footer';
import Header from './header/Header';
import Wrapper from './content/Wrapper';

class Layout extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <div className="content-wrapper">
          <Wrapper />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
