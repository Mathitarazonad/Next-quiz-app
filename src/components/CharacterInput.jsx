export default function CharacterInput({characters, inputs, index, completed, charClues, handleChange, handleKey, }) {
  return (
    <>
      <input minLength={1} maxLength={1} 
        disabled={completed ? true : false}
        ref={(element) => {inputs.current[index] = element}}
        style={{width: 50, height:50}} //Temporal styles
        value={characters[index]} 
        onChange={(e) => handleChange(e, index)}
        onKeyUp={(e) => handleKey(e, index)}
        className={charClues[index] === 1 ? 'single-input none' 
        : charClues[index] === 2 ? 'single-input in-word' 
        : charClues[index] === 3 ? 'single-input correct' 
        : 'single-input'}
      />
      <style jsx>{`
        .single-input.none {
          background-color: gray;
        }
        .single-input.in-word {
          background-color: yellow;
        }
        .single-input.correct {
          background-color: green;
        }
      `}
      </style>
    </>
  )
}
