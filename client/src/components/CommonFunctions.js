import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';


export const formatResponse = (response) => {
    const parseLatex = (text) => {
        const regexpr = /\\(\[|\()([^\\]+?)\\(\]|\))/g;   // code to math both inline and block formula expressions
        const parts = [];
        let lastIndex = 0;

        text.replace(regexpr, (match, startDelimiter, math, endDelimiter, offset) => {
            if (offset > lastIndex) {   // code to add the previous text
                parts.push(<span key={lastIndex}>{text.slice(lastIndex, offset)}</span>);
            }

            if (startDelimiter === '[' && endDelimiter === ']') {   // code to add the LaTex expression
                parts.push(<BlockMath key={offset}>{math}</BlockMath>);
            } else if (startDelimiter === '(' && endDelimiter === ')') {
                parts.push(<InlineMath key={offset}>{math}</InlineMath>);
            }
            lastIndex = offset + match.length;
        });

        if (lastIndex < text.length) {   // code to add the remaining text after LaTex expression
            parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
        }

        return parts;
    };

    return response.split('\n').map((line, index) => {   // returns the response in the appropriately styled format
        return <p key={index}>{parseLatex(line)}</p>;
    });
}




// export const formatResponse = (response) => {
//     const lines = response.split('\n');

//     return lines.map((line, index) => {
//         if (line.trim().startsWith('\\[') && line.trim().endsWith('\\]')) {   // code to split the markers and render as block math
//             const math = line.trim().slice(2, -2);   // code to remove '\\[' and '\\]'  --> note the brackets
//             return <BlockMath key={index}>{math}</BlockMath>;
//         } else if (line.trim().startsWith('\\(') && line.trim().endsWith('\\)')) {   // code to split the markers and render as inline math
//             const math = line.trim().slice(2, -2);   // code to remove '\\(' and '\\)'  --> note the parentheses instead of brackets
//             return <InlineMath key={index}>{math}</InlineMath>;
//         } else {
//             return <p key={index}>{line}</p>;
//         }
//     });
// }


///////original
// export const formatResponse = (response) => {
//     const lines = response.split('\n');

//     return lines.map((line, index) => (
//         <React.Fragment key={index}>
//             {line}
//             <br />
//         </React.Fragment>
//     ));
// }
