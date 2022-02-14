import React, { useState, useCallback } from 'react';
import Checkbox from './Checkbox';

const languageList = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "arabic", label: "Arabic" }
];
const hobbiesList = [
  { value: "music", label: "Music" },
  { value: "gaming", label: "Gaming" },
  { value: "blogging", label: "Blogging" },
  { value: "reading", label: "Reading" }
];

function App() {

  const [form, setForm] = useState({
    lang: ['english'],
    hobbies: []
  });

  const onValidate = (value, name) => {
    setError(prev => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value }
    }));
  }

  const [error, setError] = useState({
    lang: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate
    },
    hobbies: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate
    }
  });

  const onHandleChange = useCallback((value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach(x => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && (Array.isArray(form[x]) ? !form[x].length : !form[x])) {
        isInvalid = true;
        onValidate(true, x);
      }
    });
    return !isInvalid;
  }

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error('Invalid Form!');
      return false;
    }

    console.log('Data:', form);
  }

  return (
    <div className="app">
      <div className='mb-3'><strong>Validate a Checkbox list in React - <a href="https://www.cluemediator.com" target="_blank" rel="noreferrer noopener">Clue Mediator</a></strong></div>
      <div className='form'>
        <Checkbox
          name="lang"
          title="Language"
          value={form.lang}
          options={languageList}
          onChangeFunc={onHandleChange}
          {...error.lang}
        />
        <Checkbox
          name="hobbies"
          title="Hobbies"
          isVertical={true}
          value={form.hobbies}
          options={hobbiesList}
          onChangeFunc={onHandleChange}
          {...error.hobbies}
        />
        <button
          className='btn btn-primary btn-sm mt-2'
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;