import React, { useState, useRef, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('python', python);

interface CodeEditorProps {
    children?: string;  // Initial code in the editor
    hiddenCode?: string;  // Code to prepend that is not displayed in the editor
}

const CodeEditor: React.FC<CodeEditorProps> = ({ children, hiddenCode = '' }) => {
    const codeRef = useRef<HTMLElement>(null);
    const [code, setCode] = useState<string>(children || 'print("Hello, World!")');
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [output, setOutput] = useState<string>('');

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code]);

    const runCode = async () => {
        setIsRunning(true);
        // Prepend the hidden code (passed as a prop) to the user's code
        const fullCode = hiddenCode + (codeRef.current?.textContent || '');

        const requestBody = {
            lang: 'python',
            code: fullCode,
            input: ''
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-compile': 'rapidapi',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': 'b11f7a8442msh95b1f257e7039e1p1f3a51jsnb0b51c3fd65e',
                'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
            },
            body: JSON.stringify(requestBody)
        };

        try {
            const response = await fetch('https://code-compiler10.p.rapidapi.com/', options);
            const result = await response.json();
            console.log('Code execution result:', result);
            setOutput(result.output);
        } catch (error) {
            console.error('Failed to execute code:', error);
            setOutput(`Error: ${error}`);
        }
        setIsRunning(false);
    };

    return (
        <div className="code-wrapper">
            <div className="code-container" style={{
                backgroundColor: '#0d1117', borderRadius: '0.5rem', padding: '1rem 1.5rem', maxWidth: '100%'
            }}>
                <pre style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word', margin: '0'}}>
          <code
              ref={codeRef}
              contentEditable={true}
              className="language-python"
              style={{ outline: 'none', display: 'block' }}
              dangerouslySetInnerHTML={{ __html: code }}
          ></code>
        </pre>
                <button onClick={runCode} style={{
                    backgroundColor: '#4CAF50', color: 'white', padding: '5px 25px', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', marginLeft:'15px'
                }}>
                    {isRunning ? 'Running...' : 'Run'}
                </button>
                {output && (
                    <pre style={{
                        whiteSpace: 'pre-wrap', // allows text to wrap to the next line
                        wordBreak: 'break-all', // ensures long words do not overflow
                        backgroundColor: '#262626', // background color for contrast (optional)
                        color: 'white', // text color (optional)
                        padding: '10px', // padding inside the pre element (optional)
                        borderRadius: '5px', // rounded corners for the pre element (optional)
                        margin: '10px 0', // margin above and below the pre element (optional)
                        maxHeight: '150px', // maximum height before scrolling (optional)
                        overflowY: 'auto' // allow vertical scrolling (optional)
                    }}>
                    {output}
                </pre>
                )}
            </div>
        </div>
    );
};

export default CodeEditor;
