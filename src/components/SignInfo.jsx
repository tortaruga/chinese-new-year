import SimplifiedCharacterBtn from "./SimplifiedCharacterBtn";
import { useState } from "react";

export default function SignInfo(props) {
    const [traditional, setTraditional] = useState(true);
    
    return (
        
        <div className="sign-info">
            <h3>Sign info</h3>
            <h5>(hover hanzi for pinyin translitteration)</h5>
           <p>sign: <span title={props.signPinyin}>{props.sign} ({traditional ? props.traditional : props.simplified}) </span>
                {!props.isIdentical && <SimplifiedCharacterBtn setTraditional={setTraditional} traditional={traditional} /> }
            </p>
           <p>element: <span>{props.element}</span></p>
           <p>force: <span>{props.force}</span></p>
           <p>earthly branch: <span title={props.branchPinyin}>{props.branch}</span></p>
        </div>
    )
}
