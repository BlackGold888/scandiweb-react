import React, {Component} from 'react';
import {connect} from "react-redux";
import CurrencySign from "../CurrencySign/CurrencySign";
import {AddItemToCart, RemoveItemFromCart, ResizeItemFromCart} from "../../actions";
import {Link} from "react-router-dom";
import "./Cart.css"

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
        cart: props.cartStore,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (item) => dispatch(AddItemToCart(item)),
        removeItemFromCart: (item) => dispatch(RemoveItemFromCart(item)),
        resizeItemFromCart: (item, newSize) => dispatch(ResizeItemFromCart(item, newSize)),
    }
}

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
        this.renderCartItems = this.renderCartItems.bind(this);
        this.setActiveContextMenu = this.setActiveContextMenu.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.selectedSize = this.selectedSize.bind(this);
    }

    addItem(product) {
        this.props.addItemToCart(product)
        this.forceUpdate();
    }

    removeItem(product) {
        this.props.removeItemFromCart(product);
        this.forceUpdate();
    }

    getTotal() {
        let total = 0;
        Object.keys(this.props.cart.items).filter(key => {
            let product = this.props.cart.items[key];
            let price = product.prices.find(price => price.currency === this.props.currency);
            total += price.amount * product.counter;
            return total;
        })
        return total.toFixed(2);
    }

    selectedSize(product, newSize){
        this.props.resizeItemFromCart(product, newSize);
        this.forceUpdate();
    }

    renderCartItems() {

        if (!this.state.active) {
            return "";
        }
        if (Object.keys(this.props.cart).length) {
            return (
                <div className="cart_items">
                    <div className="cart_items_container">
                        <ul className="cart_items_list">
                            <li className="cart_items_list_title"><b>My Bag,</b> {this.props.cart.length} items</li>
                            {
                                Object.keys(this.props.cart.items).map(key => {
                                    let product = this.props.cart.items[key];
                                    return (
                                        <li className="cart_list_item" key={product.id + product.selectedSize.value}>
                                            <div className="row product_box">
                                                <div className="col-6">
                                                    <p className='product_cart_brand'>{product.brand}</p>
                                                    <p className='product_cart_name'>{product.name}</p>
                                                    <p className="product_cart_price">
                                                        {product.prices.map(price => {
                                                            if (price.currency === this.props.currency) {
                                                                return (
                                                                    <React.Fragment key={price.currency}>
                                                                        <CurrencySign currency={price.currency}/>
                                                                        {price.amount}
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                            return '';
                                                        })}
                                                    </p>
                                                    <div className="size_section">
                                                        {product.attributes[0]?.items[0].value.includes('#') ?
                                                            product.attributes[0].items.map(size => <button onClick={() => this.selectedSize(product, size)} key={size.id } style={{backgroundColor: size.value}} className={"color_button " + (product.selectedSize.value === size.value ? 'active_color_size' : '')}></button> ) :
                                                            product.attributes[0].items.map(size => <button onClick={() => this.selectedSize(product, size)} key={size.id } className={"size_button " + (product.selectedSize.value === size.value ? 'active_button_size' : '')}>{size.value}</button> ) }
                                                    </div>
                                                </div>
                                                <div className="col-6 cart_product">
                                                    <div className="counter">
                                                        <button onClick={() => {
                                                            this.addItem(product)
                                                        }} className="counter_increment">+
                                                        </button>
                                                        {product.counter}
                                                        <button onClick={() => {
                                                            this.removeItem(product)
                                                        }} className="counter_decrement">-
                                                        </button>
                                                    </div>
                                                    <div className="product_cart_image">
                                                        <img src={product.gallery[0]} alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="total_box">
                            <div className="total_title">
                                Total
                            </div>
                            <div className="total_amount">
                                <CurrencySign currency={this.props.currency}/>
                                {this.getTotal()}
                            </div>
                        </div>
                        <div className="checkout_view_bag_button">
                            <Link to={`/view/bag`}>
                                <button onClick={() => {
                                    this.setState({active: false})
                                }} className="viewBag">VIEW BAG
                                </button>
                            </Link>
                            <button className="checkout">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    setActiveContextMenu() {
        this.setState({
            active: !this.state.active
        });

    }

    render() {
        return (
            <div className="cart_box_navbar">
                <div className="cart_items_count">
                    <span>{this.props.cart.itemsCount}</span>
                </div>
                <img onClick={this.setActiveContextMenu} className="navbar_cart_icon"
                     src={process.env.PUBLIC_URL + '/img/cart_navbar.png'} alt=""/>
                {this.renderCartItems()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
