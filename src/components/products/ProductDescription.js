import React, {Component} from 'react';
import {gql} from "@apollo/client";
import "./Product.css"
import {AddItemToCart} from "../../actions";
import {connect} from "react-redux";
import CurrencySign from "../CurrencySign/CurrencySign";

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
        cart: props.cartStore
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart:(item)=> dispatch(AddItemToCart(item)),
    }
}

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
                selectedSize: null,
        }
        this.getProduct = this.getProduct.bind(this);
        this.renderMainImage = this.renderMainImage.bind(this);
        this.renderPrice = this.renderPrice.bind(this);
        this.renderSizeList = this.renderSizeList.bind(this);
        this.addItem = this.addItem.bind(this);
        this.selectedSize = this.selectedSize.bind(this);
        this.renderProductDescription = this.renderProductDescription.bind(this);
    }

    componentDidMount() {
        this.getProduct();
    }

    async getProduct() {
        let temp;
        let productId = this.props.match.params.id;
        temp = await this.props.client.query({
            query: gql`
                query {
                  product(id: "${productId}"){
                    id
                    gallery
                    name
                    brand
                    category
                    description
                    prices{
                      currency
                      amount
                    }
                    attributes{
                    items{
                      displayValue
                      value
                      id
                    }
                  }
                  }
                }
            `
        });
        this.setState(
            {
                product: temp.data.product,
                selectedImage: temp.data.product.gallery[0],
                selectedSize: temp.data.product?.attributes[0].items[0]
            }
        );
    }



    renderMainImage(image)
    {
        this.setState(
            {
                selectedImage: image
            }
        );
    }

    renderPrice(){
        if (this.state.product == undefined) return;
        let currency = this.state.product?.prices.find(price => {
            if (price.currency == this.props.currency) {
                return price;
            }
        });

        if (currency == undefined) {
            currency = this.state.product?.prices[0];
        }
        return <p className="price">{ currency.amount } <CurrencySign currency={currency.currency} /></p>;
    }

    selectedSize(size){
        this.setState({
            selectedSize: size
        })
    }

    renderSizeList()
    {
        if (!this.state.product?.attributes[0]) {
            return '';
        }

        return (
            <div className="size_section">
                <p className="size_title"><b>SIZE:</b></p>
                {this.state.product?.attributes[0]?.items[0].value.includes('#') ?
                    this.state.product?.attributes[0]?.items.map(size => <button onClick={() => this.selectedSize(size)} key={size.id } style={{backgroundColor: size.value}}
                                                                                 className={"color_button " + (this.state.selectedSize.id == size.id ? "active_color_size" : "")}></button> ) :
                    this.state.product?.attributes[0]?.items.map(size => <button onClick={() => this.selectedSize(size)} key={size.id }
                                                                                 className={"size_button " + (this.state.selectedSize.id == size.id ? "active_button_size" : "")}>{size.value}</button> ) }
            </div>
        );
    }

    addItem(){
        if (!this.state.product) {
            return ""
        }
        let temp = Object.assign({}, this.state.product)
        temp.selectedSize = this.state.selectedSize ?? this.state.product.attributes[0].items[0];
        this.props.addItemToCart(temp);
        var event = new CustomEvent('myEvent', {});
        document.body.dispatchEvent(event);
    }

    renderProductDescription() {
        return (
            <div id="PDP">
                <div className="row">
                    <div className="col-1 md">
                        {this.state.product?.gallery.map(image => <img key={image} onClick={() => this.renderMainImage(image)} className="img-slider" src={image} alt=""/>)}
                    </div>
                    <div className="col-6">
                        <img id="mainImage" className="main_img" src={this.state.selectedImage} alt=""/>
                    </div>
                    <div className="col-1 sm">
                        {this.state.product?.gallery.map(image => <img key={image} onClick={() => this.renderMainImage(image)} className="img-slider" src={image} alt=""/>)}
                    </div>
                    <div className="col-3 product_info">
                        <p className="product_title">{this.state.product?.brand}</p>
                        <p className="product_name">{this.state.product?.name}</p>
                        {this.renderSizeList()}
                        <div className="price_section">
                            <p className="price_title">PRICE:</p>
                            {this.renderPrice()}
                        </div>
                        <button className="add_cart_button" onClick={this.addItem}>ADD TO CART</button>
                        <div className="product_desc" dangerouslySetInnerHTML={{ __html: this.state.product?.description }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        return this.renderProductDescription()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
