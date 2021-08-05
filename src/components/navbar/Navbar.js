import React from "react";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {gql} from "@apollo/client";
import Cart from "../cart/Cart";
import CurrencySign from "../CurrencySign/CurrencySign";
import {connect} from "react-redux";
import './Navbar.css'

const mapStateToProps = (props) => {
    return {
        currency: props.currency,
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.getCategories = this.getCategories.bind(this);
        this.renderNavigationLinks = this.renderNavigationLinks.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);
        this.renderNavbarCenterIcon = this.renderNavbarCenterIcon.bind(this);
    }

    getCategories = async () => {
        const temp = await this.props.client.query({
            query: gql`
               query {
                  categories{
                    name
                  }
                }
            `
        })
        this.setState(
            {
                categories: temp.data
            }
        );
    }

    componentDidMount() {
        this.getCategories();
    }

    renderNavigationLinks() {
        let temp = <NavLink activeClassName={"navbar_link_active"} key="home" to={`/home`}>Home</NavLink>;

        let links = this.state.categories?.categories.map(category =>
            <NavLink
                key={category.name}
                to={`/${category.name}`}
                activeClassName={"navbar_link_active"}>
                {category.name}
            </NavLink>)
        console.log(links)
        return [temp, ...links ?? []];
    }

    renderNavbarCenterIcon(){
        return (
            <div className="icon">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <path
                            d="M34.0222 28.6646C34.0494 28.983 33.8009 29.2566 33.4846 29.2566
                            H7.46924C7.15373 29.2566 6.90553 28.9843 6.93156 28.6665
                            L8.7959 5.91227C8.8191 5.62962 9.05287 5.41211 9.33372 5.41211
                            H31.5426C31.8226 5.41211 32.0561 5.62853 32.0801 5.91036
                            L34.0222 28.6646Z"
                            fill="#1DCF65"/>
                        <path
                            d="M36.0988 34.6014C36.1313 34.9985 35.8211 35.339 35.4268 35.339
                            H5.59438C5.2009 35.339 4.89092 35.0002 4.92208 34.6037
                            L7.06376 7.34718C7.09168 6.9927 7.38426 6.71973 7.73606 6.71973
                            H33.1958C33.5468 6.71973 33.8391 6.99161 33.868 7.34499
                            L36.0988 34.6014Z"
                            fill="url(#paint0_linear)"/>
                        <path
                            d="M19.9232 26.6953C16.0402 26.6953 12.8813 22.8631 12.8813 18.1528C12.8813
                             17.9075 13.0782 17.7085 13.3211 17.7085C13.564 17.7085 13.7608 17.9073 13.7608
                              18.1528C13.7608 22.3732 16.5253 25.8067 19.9234 25.8067C23.3214 25.8067
                               26.0859 22.3732 26.0859 18.1528C26.0859 17.9075 26.2827 17.7085 26.5257
                                17.7085C26.7686 17.7085 26.9654 17.9073 26.9654 18.1528C26.9653
                                 22.8631 23.8062 26.6953 19.9232 26.6953Z"
                            fill="white"/>
                        <path
                            d="M24.2581 18.0337C24.1456 18.0337 24.0331 17.9904 23.9471 17.9036C23.7754
                             17.7301 23.7754 17.4488 23.9471 17.2753L26.226 14.9729C26.3084 14.8897
                              26.4203 14.8428 26.5369 14.8428C26.6536 14.8428 26.7654 14.8895 26.8479
                               14.9729L29.1045 17.2529C29.2762 17.4264 29.2762 17.7077 29.1045
                                17.8812C28.9327 18.0546 28.6543 18.0547 28.4826 17.8812L26.5368
                                 15.9155L24.569 17.9036C24.4831 17.9904 24.3706 18.0337 24.2581 18.0337Z"
                            fill="white"/>
                    </g>
                    <defs>
                        <linearGradient
                            id="paint0_linear"
                            x1="29.8733"
                            y1="31.3337"
                            x2="11.5132"
                            y2="9.9008"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#52D67A"/>
                            <stop offset="1" stopColor="#5AEE87"/>
                        </linearGradient>
                        <clipPath id="clip0">
                            <rect width="31.16" height="30.176" fill="white"
                                  transform="translate(4.91992 5.41211)"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        )
    }

    renderNavbar() {
        return (
            <nav id="navbar">
                <div className="navbar_links">
                    {this.renderNavigationLinks()}
                </div>
                {this.renderNavbarCenterIcon()}
                <div className="currency_cart">
                        <span className="navbar_CurrencySign">
                            <CurrencySign currency={this.props.currency}/>
                        </span>
                    <CurrencySwitcher client={this.props.client}/>
                    <Cart/>
                </div>
            </nav>
        )
    }

    render() {
        return (
            <div className="container">
                {this.renderNavbar()}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navbar);
