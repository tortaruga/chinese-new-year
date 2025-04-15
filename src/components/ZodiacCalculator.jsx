import { useState } from "react"
import { getChineseZodiacByYear, getChineseZodiacByDate } from "../chinese-astronomy"
import { Link } from "react-router";
import SignInfo from "./SignInfo";
import InfoSummary from "./InfoSummary";

export default function ZodiacCalculator() {
    const [byYear, setByYear] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    const [formData, setFormData] = useState({
        gregorianYearZodiac: '',
        gregorianDateZodiac: '',
    })

    const [results, setResults] = useState({
        yearZodiacResult: null,
        dateZodiacResult: null,
    })

    function handleInputChange(e) {
        setShowDetails(false);
        const {name, value} = e.target;
        
        setResults({yearZodiacResult: null,
            dateZodiacResult: null,});

        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value,
            }
        })
    }

    function submitZodiacByYear(e) {
        e.preventDefault();
        const zodiac = getChineseZodiacByYear(formData.gregorianYearZodiac);
    
        setShowDetails(true);
        setResults(prevResults => {
            return {
                ...prevResults,
                yearZodiacResult: zodiac,
            }
        })
    }

    function submitZodiacByDate(e) {
        e.preventDefault();
        const [year, month, day] = formData.gregorianDateZodiac.split('-');
        
        const zodiac =getChineseZodiacByDate(year, month, day);
       
        setShowDetails(true);
       setResults(prevResults => {
           return {
            ...prevResults,
            dateZodiacResult: zodiac,
           }
       })  
    } 

    function selectMethod(method) {
        setShowDetails(false);
        method === 'year' ? setByYear(true) : setByYear(false)
    }

    return (
        <>
        <h1>Calculate Chinese Zodiac</h1>

        <div className="method-btns">
          <button className={byYear ? '' : 'unselected'} onClick={() => selectMethod('year')}>get zodiac by year</button>
          <button className={byYear ? 'unselected' : ''} onClick={() => selectMethod('date')}>get zodiac by date</button>
        </div>
        
        {byYear ? (
            <div className="zodiac-by-year">
        <form className="zodiac-form" onSubmit={submitZodiacByYear}>
            <label htmlFor="gregorianYearZodiac">Enter year:
            <input type="number" required name="gregorianYearZodiac" id="gregorianYearZodiac" value={formData.gregorianYearZodiac} onChange={handleInputChange} />
            </label>
            <button>get zodiac sign</button>
            {results.yearZodiacResult && <p className="result">The zodiac sign for this year is: <span>{results.yearZodiacResult?.sign} {results.yearZodiacResult?.emoji}</span></p> }
        
          </form>
         </div>
        ) : (
            <div className="zodiac-by-date">
            <form className="zodiac-form" onSubmit={submitZodiacByDate}>
                <label htmlFor="gregorianDateZodiac">Enter date:
                <input type="date" required name="gregorianDateZodiac" id="gregorianDateZodiac" value={formData.gregorianDateZodiac} onChange={handleInputChange} />
                </label>
                <button>get zodiac sign</button>
                {results.dateZodiacResult && <p className="result">The zodiac sign for this date is: <span>{results.dateZodiacResult?.sign} {results.dateZodiacResult?.emoji}</span></p> }
        
            </form>
        </div>
        )}  


           {showDetails && (byYear ? (
            <SignInfo sign={results.yearZodiacResult?.sign}
            signPinyin={results.yearZodiacResult?.pinyin}
            traditional={results.yearZodiacResult?.hanzi.traditional}
            simplified={results.yearZodiacResult?.hanzi.simplified}
            isIdentical={results.yearZodiacResult?.hanzi.is_identical}
            element={results.yearZodiacResult?.fixed_element} 
            force={results.yearZodiacResult?.yin_yang}
            branch={results.yearZodiacResult?.earthly_branch.hanzi}
            branchPinyin={results.yearZodiacResult?.earthly_branch.pinyin} />
           ) : (
            <SignInfo sign={results.dateZodiacResult?.sign}
            signPinyin={results.dateZodiacResult?.pinyin}
            traditional={results.dateZodiacResult?.hanzi.traditional}
            simplified={results.dateZodiacResult?.hanzi.simplified}
            isIdentical={results.dateZodiacResult?.hanzi.is_identical}
            element={results.dateZodiacResult?.fixed_element}
            force={results.dateZodiacResult?.yin_yang}
            branch={results.dateZodiacResult?.earthly_branch.hanzi}
            branchPinyin={results.dateZodiacResult?.earthly_branch.pinyin}/>
           ))}
                     
          <InfoSummary />

          <h3>See also:</h3>
          <div className="links">
            <Link to='/lunar-date-converter'><button>convert gregorian date into chinese date</button></Link>
            <Link to='/'><button>calculate chinese new year</button></Link>
        
          </div>
          
        </>
    )
}
