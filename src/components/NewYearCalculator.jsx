import { useState } from 'react';
import { findLunarNewYear, getChineseZodiacByYear, getHeavenlyStem } from '../chinese-astronomy';
import { Link } from 'react-router';
import YearInfo from './YearInfo';
import InfoSummary from './InfoSummary';

export default function NewYearCalculator() {
      const [gregorianYear, setGregorianYear] = useState(null);
      const [result, setResult] = useState(null);
      const [zodiac, setZodiac] = useState(null);
      const [heavenlyStem, setHeavenlyStem] = useState(null);
      
      
    function handleInputChange(e) {
      setResult(null);
      setGregorianYear(e.target.value);
    }
    
    function submit(e) {
      e.preventDefault();
    
      findLunarNewYear(gregorianYear);
      const months = ['January', 'February'];
      setZodiac(getChineseZodiacByYear(gregorianYear)); 
      setHeavenlyStem(getHeavenlyStem(gregorianYear));
      setResult(`${findLunarNewYear(gregorianYear).getDate()} ${months[findLunarNewYear(gregorianYear).getMonth()]} ${findLunarNewYear(gregorianYear).getFullYear()}`)
    } 
    
      return (
        <div className='new-year-calculator'>
          <h1>Chinese New Year Calculator 🏮</h1> 
          <form className='new-year-form' onSubmit={submit}>
            <label htmlFor="gregorianYear">Enter gregorian (western) year: 
            <input type="number" required  name="gregorianYear" id="gregorianYear" onChange={handleInputChange} />
            </label>
            
            <button>calculate new year</button>
          {result && <p className='result'>The Chinese New Year is: <span>{result}</span>.</p>}

          </form>
    
          {result && (<YearInfo year={gregorianYear} 
                sign={zodiac?.sign} 
                traditional={zodiac?.hanzi.traditional}
                simplified={zodiac?.hanzi.simplified} 
                force={heavenlyStem?.yin_yang} 
                english={heavenlyStem?.english}
                hanzi={heavenlyStem?.hanzi}
                stemPinyin={heavenlyStem?.pinyin}
                signPinyin={zodiac?.pinyin}
                isIdentical={zodiac?.hanzi.is_identical} />)}

          <InfoSummary />
          
          <h3>See also:</h3>
          <div className="links">
            <Link to='/lunar-date-converter'><button>convert gregorian date into chinese date</button></Link>
            <Link to='/zodiac-calculator'><button>calculate chinese zodiac</button></Link>
          </div> 
        </div>
      )
}


// sign traditional simplified force english hanzi year