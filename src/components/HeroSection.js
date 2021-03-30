import React from 'react';
import _ from 'lodash';

import {toStyleObj, withPrefix, markdownify, Link, classNames} from '../utils';

export default class HeroSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let bg_img_opacity_pct = _.get(section, 'background_image_opacity', null) || 100;
        let bg_img_opacity = bg_img_opacity_pct * 0.01;
        return (
            <section className="hero bg-color" data-id={_.get(section, 'section_id', null)}>
                {_.get(section, 'background_image', null) && (
                <div className="hero__bg-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'background_image', null)) + '\'); opacity: ' + bg_img_opacity + ';')}/>
                )}
                <div className="hero__title">
                    <script type="text/javascript">
                        var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;,
  this.el = el;,
  this.loopNum = 0;,
  this.period = parseInt(period, 10) || 2000;,
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
                    </script>
                    
                    Energia solar é <span
     class="txt-rotate"
     data-period="2000"
     data-rotate='[ "economia.", "sustentável.", "J7 Energia."]'></span></div>
                <div className="hero__links link-group">
                  {_.map(_.get(section, 'actions', null), (action, action_idx) => {
                      let action_style = _.get(action, 'style', null) || 'primary';
                      return (
                        <Link key={action_idx} to={withPrefix(_.get(action, 'url', null))} className={classNames('link', {'link--filled': action_style === 'primary', 'link--borderless': action_style === 'link'})}>
                          {_.get(action, 'title', null)}
                          {_.get(action, 'arrow', null) && (
                          <svg width="26" height="14" viewBox="0 0 26 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.682 6.079h-22.682v1.712h22.814l-4.574 4.528 1.194 1.182 6.566-6.5-6.566-6.5-1.194 1.182 4.442 4.397z" />
                          </svg>
                          )}
                        </Link>
                      )
                  })}
                </div>
            </section>
        );
    }
}
