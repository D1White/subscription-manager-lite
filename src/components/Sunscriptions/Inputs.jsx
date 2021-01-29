import { useState, useEffect, useRef } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { HexColorPicker } from 'react-colorful';

import "./inputs.scss";
import "react-colorful/dist/index.css";
import color_picker from "../../assets/icons/color_lens.svg";
import warning_ico from "../../assets/icons/warning.svg";

function Inputs() {
  const colorPicker = useRef();

  const [color, setColor] = useState('#eeeeee');
  const [isOpen, toggleOpen] = useState(false);
  const [service, setService] = useState(null);
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    }
  }, [])

  useEffect(() => {
    console.log(service, price, date, color, isOpen);
  }, [service, price, date, color, isOpen]);

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
  }

  const handleOutsideClick = (event) => { 
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(colorPicker.current)) {
      toggleOpen(false);
    }
  };

  return (
    <div className='table__form'>
      <div className='table__picker' ref={colorPicker} >
        <div className='table__picker-block' onClick={pickerSwitcher} style={{backgroundColor: color}}>
          {!isOpen && <img src={color_picker} alt='color picker' />}
        </div>
        { isOpen && (
          <div className="popover" >
            <HexColorPicker color={color} onChange={(e) => debounced.callback(e, "color")} />
          </div>
        )}
      </div>

      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className='table__input service'
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "service")}
          />
          <div className='table__error'>
            <img src={warning_ico} alt='error' />
            Error
          </div>
        </div>
      </div>
      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className='table__input price'
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "price")}
          />
          <div className='table__error'>
            <img src={warning_ico} alt='error' />
            Error
          </div>
        </div>
      </div>
      <div className='table__inputs-block'>
        <div className='table__inputs-form'>
          <input
            type='text'
            className='table__input date'
            autoComplete='off'
            onChange={(e) => debounced.callback(e.target.value, "date")}
          />
          <div className='table__error'>
            <img src={warning_ico} alt='error' />
            Error
          </div>
        </div>
      </div>

      <div className='table__form__actions'>
        <button type='submit' className='table__form__btn submit' />
        <button type='reset' className='table__form__btn reset' />
      </div>
    </div>
  );
}

export default Inputs;
