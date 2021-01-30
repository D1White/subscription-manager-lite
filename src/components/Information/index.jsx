import { useState } from "react";
import "./information.scss";

import { Diagram, SVGSprites } from './../../components';

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
              src='https://i.ibb.co/6DsnTyG/avatar.png'
              alt='user avatar'
            />
            <span>User</span>
          </div>
          <button type='button' className='inf__theme-btn' onClick={themeSwitch}>
            <SVGSprites name={theme ? 'light_theme-icon' : 'dark_theme-icon'} title='theme switcher'/>
          </button>
        </div>
        <div className='inf_main'>
          <div className='inf__block'>
            <span className='inf__text-m'>Your Profit</span>
            <div className='inf__profit-block'>
              <span className='inf__text-l'>1 209.59</span>
              <button type='button' className='inf__profit-block__btn'>
                <SVGSprites name='edit-icon' />
              </button>
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
