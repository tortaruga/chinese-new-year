import { useState } from "react"
import SimplifiedCharacterBtn from "./SimplifiedCharacterBtn";

export default function YearInfo(props) {
    const [traditional, setTraditional] = useState(true);

    return (
        <div className="year-info">
            <h3>Year info</h3>
            <h5>(hover hanzi for pinyin translitteration)</h5>
            
            <p>Sign: <span title={props.signPinyin}>{props.sign} ({traditional ? props.traditional : props.simplified}) </span>
            {!props.isIdentical && <SimplifiedCharacterBtn setTraditional={setTraditional} traditional={traditional} /> }</p>
            <p>Heavenly Stem: <span title={props.stemPinyin}>{props.force} {props.english} ({props.hanzi})</span></p>
            <h4>{props.year} is the year of the {props.force} {props.english} {props.sign.toLowerCase()} ✨</h4>
        </div>
    )
}