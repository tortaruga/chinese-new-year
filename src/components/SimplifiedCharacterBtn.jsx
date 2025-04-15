export default function SimplifiedCharacterBtn(props) {
    return(
        <button onClick={() => props.setTraditional(prevState => !prevState)}>{props.traditional ? 'simplified' : 'traditional'}</button>
    )
}