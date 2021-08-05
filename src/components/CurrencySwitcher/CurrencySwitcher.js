import React from "react";
import {InitCurrency, changeCurrency, CurrencySwitcherAction} from "../../actions";
import {connect} from "react-redux";
import {gql} from "@apollo/client";
import CurrencySign from "../CurrencySign/CurrencySign";
import "./CurrencySwitcher.css";

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
        currencySwitcherState: props.currencySwitcherReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        currencyChange:(name)=> dispatch(changeCurrency(name)),
        initCurrency:()=> dispatch(InitCurrency()),
        currencySwitcherAction:()=> dispatch(CurrencySwitcherAction()),
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
        this.renderArrow = this.renderArrow.bind(this);
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
        this.props.currencySwitcherAction();
    }

    renderCurrencyContextMenu() {
        if (!this.props.currencySwitcherState) {
            return null;
        }
        return (
            <div>
                <ul className="currencyContextMenu">
                    {this.state.currencies?.currencies.map(cur => <li key={cur} onClick={() => {this.props.currencyChange(cur)}}><span><CurrencySign currency={cur} /> {cur}</span></li>)}
                </ul>
            </div>
        )
    }

    renderArrow()
    {
        if (this.state.active) {
            return  <img src={process.env.PUBLIC_URL + '/img/arrowUP.png'} alt=""/>
        }
        return  <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt=""/>
    }

    renderSelector() {
        return (
            <div className="currencySelector" onClick={this.contextMenu}>
                {this.renderArrow()}
                {this.renderCurrencyContextMenu()}
            </div>
        )
    }

    render() {
        return this.renderSelector();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
