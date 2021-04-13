import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";

import store from "../../store/store";
import "./subscription.scss";
import "../../scss/transition.scss";
import { SVGSprites } from "../index";

const Subscription = observer(({ service, price, date, color, index }) => {
  const element = useRef();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    }
  }, [rendered]);

  const removeSubscr = () => {
    element.current.classList.add("delete");
    setTimeout(() => {
      store.removeSubscr(index);
    }, 500);
  };

  return (
    <div className='table__subscr' ref={element}>
      <div className='table__logo'>
        <span style={{ color: color }}>{service[0]}</span>
        <div className='bg' style={{ backgroundColor: color }} />
      </div>
      <span className='table__text'>{service}</span>
      <span className='table__text price'>{`$ ${price}`}</span>
      <span className='table__text date'>
        {date}
        <small>th</small>
      </span>
      <div className='table__actions'>
        <button type='button' className='table__btn edit'>
          <SVGSprites name='edit-icon' />
        </button>
        <button
          type='button'
          className='table__btn delete'
          onClick={removeSubscr}
        >
          <SVGSprites name='delete-icon' />
        </button>
      </div>
    </div>
  );
});

export default Subscription;
