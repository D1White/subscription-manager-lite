import { useState } from "react";
import "./information.scss";

import { Diagram } from './../../components';

import light_theme from "../../assets/icons/light_theme.svg";
import dark_theme from "../../assets/icons/dark_theme.svg";
// import edit_ico from "../../assets/icons/edit.svg";

function Information() {
  const [theme, setTheme] = useState(true);

  const themeSwitch = () => {
    setTheme(!theme);
  }

  return (
    <div className='inf'>
      <div className='inf__container'>
        <div className='inf__header'>
          <div className='inf__user'>
            <img
              src='https://www.meme-arsenal.com/memes/7f7ac55cae30a63e926193968f5c4915.jpg'
              alt='user avatar'
            />
            <span>User</span>
          </div>
          <button type='button' className='inf__theme-btn' onClick={themeSwitch}>
            <img src={theme ? light_theme : dark_theme} alt='theme switcher' />
          </button>
        </div>
        <div className='inf_main'>
          <div className='inf__block'>
            <span className='inf__text-m'>Your Profit</span>
            <div className='inf__profit-block'>
              <span className='inf__text-l'>1 209.59</span>
              <button type='button' className='inf__profit-block__btn'></button>
            </div>
            <span className='inf__text-s'>USD/month</span>
          </div>
          <hr className='inf__line' />
          <div className='inf__block'>
            <span className='inf__text-m'>Subscription</span>
            <span className='inf__text-l'>35.86</span>
            <span className='inf__text-s'>USD/month</span>
          </div>
        </div>
        <Diagram profit={500} subscr={35.86} />
      </div>
    </div>
  );
}

export default Information;
