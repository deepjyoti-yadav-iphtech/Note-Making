import React, { useRef, useState } from 'react'

const Table = () => {
  const [inputValues, setInputValues] = useState({});
  const [inputSets, setInputSets] = useState([0]);
  const inputRefs = {
    foo: useRef(null),
    bar: useRef(null),
  };

  const handleChange = (key, value) => {
    setInputValues({
      ...inputValues,
      [key]: value,
    });
  };

  const handleKeyPress = (key, e, index) => {
    if (e.key === "Enter") {
      const nextInputKey = key === "foo" ? "bar" : "foo";

      // If the current input is the last one, add a new set of input boxes
      if (index === inputSets.length - 1) {
        setInputSets((prevSets) => [...prevSets, prevSets.length]);
      }

      // Focus on the next input field
      const nextIndex = (index + 1) % inputSets.length;
      inputRefs[nextInputKey][nextIndex].current?.focus();
    }
  };

  return (
    <form className='mb-2'>
      {inputSets.map((setIndex) => (
        <div key={setIndex} className=''>
          <input
            id={`foo-${setIndex}`}
            onChange={(e) => handleChange("foo", e.target.value)}
            onKeyDown={(e) => handleKeyPress("foo", e, setIndex)}
            ref={(el) => (inputRefs.foo[setIndex] = el)}
          />
          <input
            id={`bar-${setIndex}`}
            onChange={(e) => handleChange("bar", e.target.value)}
            onKeyDown={(e) => handleKeyPress("bar", e, setIndex)}
            ref={(el) => (inputRefs.bar[setIndex] = el)}
          />
        </div>
      ))}
    </form>
  );
};


export default Table