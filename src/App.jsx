import { Route, Routes } from 'react-router';
import LunarDateConverter from './components/LunarDateConverter';
import NewYearCalculator from './components/NewYearCalculator';
import ZodiacCalculator from './components/ZodiacCalculator';

function App() {
    return (
      <div className='container'>
      <main>
      <Routes>
        <Route path='/' element={<NewYearCalculator />} />
        <Route path='/lunar-date-converter' element={<LunarDateConverter />} />
        <Route path='/zodiac-calculator' element={<ZodiacCalculator />} />
      </Routes>
      </main>

      <footer>
        <p>This project uses <a href="https://github.com/cosinekitty/astronomy" target='_blank'>astronomy-engine</a> and <a href="https://www.npmjs.com/package/chinese-lunar-calendar" target='_blank'>chinese-lunar-calendar</a>.
          If you're interestend in knowing more about how the calculators work check out <a href="https://github.com/tortaruga/chinese-new-year" target='_blank'>here</a>. </p>
          <p>coded by <a href="https://github.com/tortaruga" target='_blank'>tortaruga</a> ✨</p>
      </footer>
      
      </div>
    )
}

export default App
