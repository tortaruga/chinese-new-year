import * as lunarCalendar from 'chinese-lunar-calendar'; 
import { useState } from 'react';
import { Link } from 'react-router';
import ChineseCalendarInfo from './ChineseCalendarInfo';

export default function LunarDateConverter() {

    const [gregorianDate, setGregorianDate] = useState({
        month: null,
        day: null,
        year: null,
    });

    const [convertedDate, setConvertedDate] = useState(null);

    function handleInputChange(e) {
        setConvertedDate(null);
        const date = e.target.value;

        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);

        setGregorianDate(prevDate => {
            return {
                ...prevDate,
                year: year,
                month: month,
                day: day

            }
        });
    }

    function submit(e) {
        e.preventDefault();
        setConvertedDate(lunarCalendar.getLunar(gregorianDate.year, gregorianDate.month, gregorianDate.day));
    }

    return (
        <>
        <h1>Gregorian-Chinese Date Converter</h1>
          <form onSubmit={submit}>
            <label htmlFor="gregorianDate"> Enter gregorian date: 
               <input type="date" required name="gregorianDate" id="gregorianDate" onChange={handleInputChange} />
            </label>
            <p className='note'>Note: please insert a year between 1901 and 2100</p>
            <button>convert to lunar date</button>
          {convertedDate && <p className='result'>{`${gregorianDate.day}-${gregorianDate.month}-${gregorianDate.year} corresponds to:`} <span>{`day ${convertedDate.lunarDate} of month ${convertedDate.lunarMonth}`}</span> in the chinese calendar.</p>}

          </form>

          <ChineseCalendarInfo />

          <h3>See also:</h3>
          <div className="links">
           <Link to='/zodiac-calculator'><button>calculate chinese zodiac</button></Link>
           <Link to='/'><button>calculate chinese new year</button></Link>
          </div>
          
        </>
    )

}