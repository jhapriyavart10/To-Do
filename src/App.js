import React from 'react';
import './i18n';
import Todo from './Todo';
import LanguageSwitcher from './LanguageSwitcher';


function App() {
  return (
    <div>
      <LanguageSwitcher />
      <Todo />
    </div>
  );
}

export default App;
