import React, {Component} from 'react';
import {gql} from "@apollo/client";
import Product from "./Product";
import "./Product.css"

class ProductsContainer extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            currency: "USD"
        }
        this.getProducts = this.getProducts.bind(this);
        this.renderAllProducts = this.renderAllProducts.bind(this);
    }

    componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        let temp;
        temp = await this.props.client.query({
            query: gql`
                query {
                    category{
                    products{
                      id
                      gallery
                      name
                      category
                      inStock
                      prices{
                        currency
                        amount
                      }
                    }
                    }
                }
            `
        });

        this.setState(
            {
                products: temp.data
            }
        );
    }

    renderAllProducts() {
        const products = [];
        if (this.props.match != undefined) {
            this.state.products?.category.products.map(product => {
                if (product.category == this.props.match.params.category) {
                    products.push(product);
                }
            });
        } else {
            this.state.products?.category.products.map(product => {
                products.push(product);
            });
        }
        return products.map(product => <div key={product.id} className="col-3"><Product image={product.gallery[0]} title={product.name}
                                                                       prices={product.prices} id={product.id} inStock={product.inStock}/></div>)
    }

    render() {
        return (
            <div className="products_container">
                <div className="row">
                    {this.renderAllProducts()}
                </div>
            </div>
        );
    }
}

export default ProductsContainer;
