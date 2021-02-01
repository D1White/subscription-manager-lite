import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';

import "./information.scss";
import store from '../../store/store';
import { Diagram, SVGSprites } from './../../components';

const Information = observer(() => {
  const [theme, setTheme] = useState(true);
  const [profit, setProfit] = useState(150);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('theme', 'light');
    }else {
      document.documentElement.setAttribute('theme', 'dark');
    }
  }, [theme])

  const themeSwitch = () => {
    setTheme(!theme);
  }

  const editProfit = () => {
    const inputProfit = prompt('Enter profit', '');
    if (inputProfit) {
      if (!/^\d+\.?\d*$/gm.test(inputProfit) || parseFloat(inputProfit) < 1 || parseFloat(inputProfit) > 10000) {
        alert('⚠ Incorrect value!');
      } else {
        setProfit(parseFloat(inputProfit));
      }
    }
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
        <div className='inf__main'>
          <div className='inf__block'>
            <span className='inf__text-m'>Your Profit</span>
            <div className='inf__profit-block' onClick={editProfit}>
              <span className='inf__text-l'>{profit}</span>
              <button type='button' className='inf__profit-block__btn'>
                <SVGSprites name='edit-icon' />
              </button>
            </div>
            <span className='inf__text-s'>USD/month</span>
          </div>
          <hr className='inf__line' />
          <div className='inf__block'>
            <span className='inf__text-m'>Subscription</span>
            <span className='inf__text-l'>{store.subscPrice}</span>
            <span className='inf__text-s'>USD/month</span>
          </div>
        </div>
        <Diagram profit={profit} subscr={store.subscPrice} />
      </div>
    </div>
  );
});

export default Information;
