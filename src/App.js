import './App.scss';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
}); // позволяет раскрашивать цвета в коде и добавлять тег br

const renderer = new marked.Renderer();
renderer.link = function (href, _, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};


function App() {
  const firstText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

### Coded by [TheLastDance](https://github.com/TheLastDance)
`;
  const local = localStorage.text;
  const [text, setText] = useState(firstText);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);


  function putInStorage() {
    localStorage.setItem("text", text);
    setText(localStorage.text)
  }

  function clear() {
    setText(firstText)
    localStorage.clear();
  }

  useEffect(() => {
    if (local !== undefined) {
      setText(localStorage.text);
    }
  }, [local])

  return (
    <div className="App">
      <div style={toggle2 ? { display: 'none' } : {}} className='editor-div'>
        <div className='editor-menu'><h3>Editor</h3><div className='toggle' onClick={() => setToggle(prev => !prev)}>{!toggle ? <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16 }} fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 19 16"><path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18 }} fill="currentColor" className="bi bi-arrows-angle-contract" viewBox="0 0 19 16"><path fillRule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z" /></svg>}</div></div>
        <textarea style={!toggle ? { minHeight: 300, resize: 'vertical', height: 'fit-content' } : { minHeight: 700, resize: 'none' }} name="editor" value={text} id="editor" cols="100" rows="10" onChange={(e) => setText(e.target.value)}></textarea>
        <div className='buttons-div'>
          <button onClick={putInStorage}>Save</button>
          <button onClick={clear}>Cheatsheet & clear</button>
        </div>
      </div>
      <div className='preview-div'>
        <div className='preview-menu'><h3>Previewer</h3><div className='toggle' onClick={() => setToggle2(prev => !prev)}>{!toggle2 ? <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16 }} fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 19 16"><path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 18 }} fill="currentColor" className="bi bi-arrows-angle-contract" viewBox="0 0 19 16"><path fillRule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z" /></svg>}</div></div>
        <div id='preview' className='Code language-javascript' language='javascript' style={!toggle2 ? { height: 346, width: 700 } : { height: 700, width: 1100 }} dangerouslySetInnerHTML={{ __html: marked.parse(text, { renderer: renderer }) }}></div>
      </div >
    </div >

  );
}

export default App;
