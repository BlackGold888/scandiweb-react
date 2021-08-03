import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import CurrencySign from "../CurrencySign/CurrencySign";

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderPrice = this.renderPrice.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
        this.renderProductInfo = this.renderProductInfo.bind(this);
    }

    renderPrice() {
        let currency = this.props.prices.find(price => price.currency == this.props.currency);
        if (currency == undefined) currency = this.props.prices[0];
        return <p>{currency.amount} <CurrencySign currency={currency.currency}/></p>;
    }

    renderProductInfo() {
        return (
            <React.Fragment>
                <img className="product_image" src={this.props.image} alt=""/>
                <img className="product_cart_icon" src="./img/cart.png" alt=""/>
                <p className="product_card_title">{this.props.title}</p>
                <span className="product_card_price">{this.renderPrice()}</span>
            </React.Fragment>
        )
    }


    renderProduct() {
        return (
            <div id="product" className="product_card">
                {this.props.inStock ? <Link to={`/product/${this.props.id}`}>
                        {this.renderProductInfo()}

                        {/*<img className="product_image" src={this.props.image} alt=""/>*/}
                        {/*<img className="product_cart_icon" src="./img/cart.png" alt=""/>*/}
                        {/*<p className="product_card_title">{this.props.title}</p>*/}
                        {/*<span className="product_card_price">{this.renderPrice()}</span>*/}
                    </Link> :
                    <div className="inStock_box">
                        <p className="inStock">OUT OF STOCK</p>
                        {this.renderProductInfo()}
                        {/*<img className="product_image" src={this.props.image} alt=""/>*/}
                        {/*<img className="product_cart_icon" src="./img/cart.png" alt=""/>*/}
                        {/*<p className="product_card_title">{this.props.title}</p>*/}
                        {/*<span className="product_card_price">{this.renderPrice()}</span>*/}
                    </div>
                }
            </div>
        );
    }

    render() {
        return this.renderProduct()
    }
}

export default connect(mapStateToProps)(Product);
