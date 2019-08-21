import React, { Component } from "react";
import Layout from './components/Layout/Layout';
import BurgerBuilder from "./containers/BurguerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch} from "react-router-dom";
//import { Orders } from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'

//NOTE: Debido al import default de la clase, el import debe hacerse sin los curlybraces.
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path="/auth" exact component={Auth}/>
          </Switch>
          
        </Layout>
      </div>
    );
  }
}

export default App;
