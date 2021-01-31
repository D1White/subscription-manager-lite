import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { HexColorPicker } from "react-colorful";
import { observer } from "mobx-react-lite";

import store from '../../store/store'
import { SVGSprites } from '../index';

import "./inputs.scss";
import "react-colorful/dist/index.css";

const Inputs = observer(({ cancelInput }) => {
  const colorPicker = useRef();

  const [color, setColor] = useState("#eeeeee");
  const [isOpen, toggleOpen] = useState(false);
  const [service, setService] = useState(null);
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);
  const [warning, setWarning] = useState({
    service: false,
    price: false,
    date: false,
  });

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (service) {
      if (service.length < 1 || service.length > 25) {
        setWarning({
          ...warning,
          service: true,
        });
      } else {
        setWarning({
          ...warning,
          service: false,
        });
      }
    }
  }, [service]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (price) {
      if (
        !/^\d+\.?\d*$/gm.test(price) ||
        parseFloat(price) < 1 ||
        parseFloat(price) > 10000
      ) {
        setWarning({
          ...warning,
          price: true,
        });
      } else {
        setWarning({
          ...warning,
          price: false,
        });
      }
    }
  }, [price]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (date) {
      if (!/^\d+$/gm.test(date) || parseInt(date) < 1 || parseInt(date) > 31) {
        setWarning({
          ...warning,
          date: true,
        });
      } else {
        setWarning({
          ...warning,
          date: false,
        });
      }
    }
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   console.log(warning);
  // }, [warning]);

  const debounced = useDebouncedCallback(
    (value, type) => {
      switch (type) {
        case "service":
          setService(value);
          break;
        case "price":
          setPrice(value);
          break;
        case "date":
          setDate(value);
          break;
        case "color":
          setColor(value);
          break;
        default:
          break;
      }
    },
    500,
    { maxWait: 2000 }
  );

  const pickerSwitcher = () => {
    toggleOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(colorPicker.current)) {
      toggleOpen(false);
    }
  };

  const Submit = () => {
    if (service && price && date) {
      if (warning.service || warning.price || warning.date) {
        return;
      }else {
        store.addSubscr({
          service: service,
          price: parseFloat(price),
          date: parseInt(date),
          color: color
        });
        cancelInput();
      }
    }else {
      alert('⚠ Not all fields are filled!')
    }
  }

  return (
    <div className='table__form'>
      <div className='table__picker' ref={colorPicker}>
        <div
          className='table__picker-block'
          onClick={pickerSwitcher}
          style={{ backgroundColor: color }}
        >
          {!isOpen && (
            <SVGSprites
              name='color_lens-icon'
              title='color picker'
              className={`table__picker-ico ${parseInt(color.slice(1), 16) < 8388607 && 'light'}`}
            />
          )}
        </div>
        {isOpen && (
          <div className='popover'>
            <HexColorPicker
              color={color}
              onChange={(e) => debounced.callback(e, "color")}
            />
          </div>
        )}
      </div>

      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className={`table__input service ${warning.service && "error"}`}
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "service")}
          />
          {warning.service && (
            <div className='table__error'>
              <SVGSprites name='warning-icon' title='warning' className='table__error-ico' />
              Error
            </div>
          )}
        </div>
      </div>
      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className={`table__input price ${warning.price && "error"}`}
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "price")}
          />
          {warning.price && (
            <div className='table__error'>
              <SVGSprites name='warning-icon' title='warning' className='table__error-ico' />
              Error
            </div>
          )}
        </div>
      </div>
      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className={`table__input date ${warning.date && "error"}`}
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "date")}
          />
          {warning.date && (
            <div className='table__error'>
              <SVGSprites name='warning-icon' title='warning' className='table__error-ico' />
              Error
            </div>
          )}
        </div>
      </div>

      <div className='table__form__actions' >
        <button type='submit' className='table__form__btn submit' onClick={Submit} >
          <SVGSprites name='check-icon' />
        </button>
        <button type='reset' className='table__form__btn reset' onClick={cancelInput} >
          <SVGSprites name='cancel-icon' />
        </button>
      </div>
    </div>
  );
});

export default Inputs;
