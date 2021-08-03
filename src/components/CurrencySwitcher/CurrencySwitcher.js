import React from "react";
import "./CurrencySwitcher.css";
import {InitCurrency, changeCurrency} from "../../actions";
import {connect} from "react-redux";
import {gql} from "@apollo/client";
import CurrencySign from "../CurrencySign/CurrencySign";

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        currencyChange:(name)=> dispatch(changeCurrency(name)),
        initCurrency:()=> dispatch(InitCurrency()),
    }
}

class CurrencySwitcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
        this.contextMenu = this.contextMenu.bind(this);
        this.renderCurrencyContextMenu = this.renderCurrencyContextMenu.bind(this);
        this.getCurrencies = this.getCurrencies.bind(this);
    }

    getCurrencies = async () => {
        const temp = await this.props.client.query({
            query: gql`
               query {
                 currencies
                }
            `
        })
        this.setState(
            {
                currencies: temp.data
            }
        );
    }

    componentDidMount() {
        this.props.initCurrency();
        this.getCurrencies();
    }

    contextMenu() {
        this.setState({
            active: !this.state.active
        });
    }

    renderCurrencyContextMenu() {
        if (!this.state.active) {
            return null;
        }
        return (
            <div>
                <ul className="currencyContextMenu">
                    {this.state.currencies?.currencies.map(cur => <li key={cur} onClick={() => {this.props.currencyChange(cur)}}><a href="#"><CurrencySign currency={cur} /> {cur}</a></li>)}
                </ul>
            </div>
        )
    }

    renderSelector() {
        const arrowUpPath = "M156 21.5 L159 18.5L162 21.5";
        const arrowDownPath = "M156 21.5 L159 24.5L162 21.5";
        return (
            <div className="currencySelector" onClick={this.contextMenu}>
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt=""/>
                {this.renderCurrencyContextMenu()}
            </div>
        )
    }

    render() {
        return this.renderSelector();
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
