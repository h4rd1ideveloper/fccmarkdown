import React, { useEffect, useState } from 'react';
import marked from 'marked';
import hljs from 'highlight.js'


const placeholder = 
`# Welcome to my React Markdown Previewer!

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

There's also [links](https://www.freecodecamp.com), and
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


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

const projectName = "markdown-previewer-Yan-Santos-Policarpo";
localStorage.setItem('Yan-Santos-Policarpo_project', 'Markdown Previewer ');



export default () => {

  const [content, setContent] = useState({ content:placeholder })

  const handleChange = (event) => {
    setContent({ content: event.target.value })
  }
  // INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
  }
  const rawMarkup = () => {
    marked.setOptions({
      renderer: renderer,
      breaks: true,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })
    let rawMarkup = marked(content.content, { sanitize: true })
    //console.log(rawMarkup)
    return {
      __html: rawMarkup.toString()
    }
  }
  useEffect(() => {
    rawMarkup();
  }, [])
  return (
    <div className="container">
      <h1>Markdown Parser</h1>
      <div className="row">
        <div className="form-group col-12 col-md-6" id="input">
          <label>Markdown</label>
          <textarea className="form-control" rows="5" id="editor" defaultValue={content.content} onChange={handleChange}></textarea>
        </div>
        <div className="form-group col-12 col-md-6" id="output">
          <label>Output</label>
          <div id="preview" dangerouslySetInnerHTML={rawMarkup()}></div>
        </div>
      </div>
    </div>
  )

}

