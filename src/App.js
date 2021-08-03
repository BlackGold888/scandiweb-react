import Navbar from "./components/navbar/Navbar";
import React from "react";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProductsContainer from "./components/products/ProductsContainer";
import ProductDescription from "./components/products/ProductDescription";
import Bag from "./components/Bag/Bag";
import "./App.css"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: new ApolloClient({
                uri: 'http://localhost:4000/',
                cache: new InMemoryCache()
            }),
            currency: 'USD'
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar client={this.state.client} />
                    <Switch>
                        <Route path="/:category" exact render={(props) => <ProductsContainer {...props} client={this.state.client} />}>
                        </Route>
                        <Route path="/product/:id" exact render={(props) => <ProductDescription {...props} client={this.state.client}  />}>
                        </Route>
                        <Route path="/view/bag" exact>
                            <Bag />
                        </Route>
                        <Route path="/" exact>
                            <ProductsContainer client={this.state.client} />
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
