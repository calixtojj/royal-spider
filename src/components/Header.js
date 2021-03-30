import React from 'react';
import _ from 'lodash';

import {classNames, withPrefix, Link, toStyleObj} from '../utils';
import Picture from './Picture';

export default class Header extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let site = _.get(this.props, 'site', null);
        let is_white_header = _.get(page, 'frontmatter.white_header', null) || false;
        let is_logo_light = false;
        if ((is_white_header || (_.get(page, 'frontmatter.template', null) === 'product'))) {
             is_logo_light = true;
        }
        return (
            <React.Fragment>
                <header className="header">
                    <nav className={classNames('nav', {'nav--light': is_white_header, 'nav--dark': is_white_header !== true})}>
                        <div className="nav__logo"{...((is_logo_light && _.get(site, 'siteMetadata.logo_light', null)) ? ({"data-original": withPrefix(_.get(site, 'siteMetadata.logo_light', null))}) : null)}{...(_.get(site, 'siteMetadata.logo_dark', null) ? ({"data-dark": withPrefix(_.get(site, 'siteMetadata.logo_dark', null))}) : null)}>
                            <Link to={withPrefix('/')}>
                                {is_logo_light ? (
                                    <Picture {...this.props} image={_.get(site, 'siteMetadata.logo_light', null)} cssClass={'nav__logo-image'} alt={'Site logo'} />
                                ) : 
                                    <Picture {...this.props} image={_.get(site, 'siteMetadata.logo_dark', null)} cssClass={'nav__logo-image'} alt={'Site logo'} />
                                }
                            </Link>
                        </div>
                        <ul className="nav__menu">
                            {_.map(_.get(site, 'siteMetadata.main_menu', null), (item, item_idx) => {
                                let section = _.get(page, 'frontmatter.section', null) || _.get(page, 'frontmatter.title', null);
                                let isActive = (_.get(item, 'title', null) === section) ? (true) : false;
                                return (<React.Fragment key={item_idx + '.1'}>
                                    <li key={item_idx} className="nav__menu-item">
                                        <Link to={withPrefix(_.get(item, 'url', null))} className={classNames('nav__menu-item-link', {'nav__menu-item-link--active': isActive})}>
                                            {_.get(item, 'title', null)}
                                        </Link>
                                    </li>
                                </React.Fragment>)
                            })}
                        </ul>
                        <div className="nav__right">
                            
                            <button className="hamburger button button--transparent">
                                <svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1c0-0.552 0.448-1 1-1h22c0.552 0 1 0.448 1 1s-0.448 1-1 1h-22c-0.552 0-1-0.448-1-1zM0 8c0-0.552 0.448-1 1-1h12c0.552 0 1 0.448 1 1s-0.448 1-1 1h-12c-0.552 0-1-0.448-1-1zM1 14.001c-0.552 0-1 0.448-1 1s0.448 1 1 1h15c0.552 0 1-0.448 1-1s-0.448-1-1-1h-15z" />
                                </svg>
                            </button>
                            <div className="hamburger__content"{...(_.get(site, 'siteMetadata.hamburger_background_image', null) ? ({style: toStyleObj('background-image: url(\'' + withPrefix(_.get(site, 'siteMetadata.hamburger_background_image', null)) + '\')')}) : null)}>
                                <div className="hamburger__options">
                                    
                                    <div className="">
                                        <span className="snipcart-items-count" /> products | <span className="snipcart-total-price" />
                                    </div>
                                </div>
                                
                                <ul className="hamburger__nav">
                                    {_.map(_.get(site, 'siteMetadata.main_menu', null), (item, item_idx) => {
                                        let section = _.get(page, 'frontmatter.section', null) || _.get(page, 'frontmatter.title', null);
                                        let isActive = (_.get(item, 'title', null) === section) ? (true) : false;
                                        return (<React.Fragment key={item_idx + '.1'}>
                                            <li key={item_idx} className="hamburger__nav-item">
                                                <Link to={withPrefix(_.get(item, 'url', null))} className={classNames('hamburger__nav-link', {'hamburger__nav-link--active': isActive})}>
                                                    {_.get(item, 'title', null)}
                                                </Link>
                                            </li>
                                        </React.Fragment>)
                                    })}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        );
    }
}
