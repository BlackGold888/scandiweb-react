import React, {Component} from 'react';
import {AddItemToCart, RemoveItemFromCart, ResizeItemFromCart} from "../../actions";
import {connect} from "react-redux";
import "./Bag.css"
import CurrencySign from "../CurrencySign/CurrencySign";

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
        cart: props.cartStore,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart:(item)=> dispatch(AddItemToCart(item)),
        removeItemFromCart:(item)=> dispatch(RemoveItemFromCart(item)),
        resizeItemFromCart:(item, newSize)=> dispatch(ResizeItemFromCart(item, newSize)),
    }
}

class Bag extends Component {
    constructor(props) {
        super(props);
        this.state= {}
        this.renderProductPrice = this.renderProductPrice.bind(this);
        this.selectedSize = this.selectedSize.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.renderBagItems = this.renderBagItems.bind(this);
    }

    renderProductPrice(product){
        const price = product.prices.find(price => price.currency == this.props.currency);
        return price.amount;
    }

    addItem(product) {
        this.props.addItemToCart(product)
        this.forceUpdate();
        var event = new CustomEvent('myEvent', {});
        document.body.dispatchEvent(event);
    }

    removeItem(product) {
        this.props.removeItemFromCart(product);
        this.forceUpdate();
        var event = new CustomEvent('myEvent', {});
        document.body.dispatchEvent(event);
    }

    selectedSize(product, newSize){
        this.props.resizeItemFromCart(product, newSize);
        this.forceUpdate();
    }

    renderBagItems(){
        return (
            <div className="bag_container">
                <h3 className="cart_title"><b>Cart</b></h3>
                <ul className="bag_list">
                    {Object.keys(this.props.cart.items).map(key => {
                        let product = this.props.cart.items[key];
                        return (
                            <React.Fragment>
                                <hr className='horizontal_line'/>
                                <li className="bag_list_item">
                                    <div className='left_side'>
                                        <p className="product_brand">{product.brand}</p>
                                        <p className="product_name">{product.name}</p>
                                        <p className="product_price">{<CurrencySign/>}{ this.renderProductPrice(product) }</p>
                                        <div className="size_section">
                                            {product.attributes[0]?.items[0].value.includes('#') ?
                                                product.attributes[0].items.map(size => <button onClick={() => this.selectedSize(product, size)} key={size.id } style={{backgroundColor: size.value}} className={"color_button " + (product.selectedSize.value == size.value ? 'active_color_size' : '')}></button> ) :
                                                product.attributes[0].items.map(size => <button onClick={() => this.selectedSize(product, size)} key={size.id } className={"size_button " + (product.selectedSize.value == size.value ? 'active_button_size' : '')}>{size.value}</button> ) }
                                        </div>
                                    </div>
                                    <div className='right_side'>
                                        <div className="bag_counter_buttons">
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
                                        <div className="product_bag_image">
                                            <img src={product.gallery[0]} alt=""/>
                                        </div>
                                    </div>
                                </li>
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>
        );
    }

    render() {
        return this.renderBagItems();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
