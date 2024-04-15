import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';


export const formatResponse = (response) => {
    const regex = /\\\[(.*?)\\\]|\\\((.*?)\\\)/g;
    const elements = [];
    let lastEnd = 0;


    const renderText = (text, key) => {   // code to handle text and potential lists
        return text.split('\n').map((line, index) => (
            // if (line.match(/^(\*|-|\+)\s/)) {   // code to check for unorganized list markers, i.e. -, *, bullet points, etc.
            //     return <li key={`li-${key}-${index}`}>{line.replace(/^(\*|-|\+)\s/, '')}</li>;
            // }

            // code for line processing with line breaks
            <React.Fragment key={`line-${key}-${index}`}>
                {line}
                {(index < text.split('\n').length - 1) ? <br /> : ''}
            </React.Fragment>
        ));
    };

    response.replace(regex, (match, blockLatex, inlineLatex, offset) => {   // code to handle formula expressions
        if (offset > lastEnd) {   // code to handle regular text
            elements.push(...renderText(response.substring(lastEnd, offset), lastEnd));
        }

        if (blockLatex !== undefined) {   // code to handle block formulas
            elements.push(<BlockMath key={`block-${offset}`}>{blockLatex}</BlockMath>);
        } else if (inlineLatex !== undefined) {   // code to handle inline formulas
            elements.push(<InlineMath key={`inline-${offset}`}>{inlineLatex}</InlineMath>);
        }

        lastEnd = offset + match.length;
    });

    if (lastEnd < response.length) {   // code to handle any remaining texts if there are still any
        elements.push(...renderText(response.substring(lastEnd), lastEnd));
    }

    return <div>{elements}</div>;
}
















//////////works with formulas block and inline, but lists still getting messed up///////////
// export const formatResponse = (response) => {
//     const regex = /\\\[(.*?)\\\]|\\\((.*?)\\\)/g;
//     const elements = [];
//     let lastEnd = 0;

//     const renderText = (text, key) => {   // code to handle text and potential lists
//         const lines = text.split('\n').map((line, index) => {
//             if (line.match(/^(\*|-|\+)\s/)) {   // code to check for unorganized list markers, i.e. -, *, bullet points, etc.
//                 return <li key={`ul-${key}-${index}`}>{line.replace(/^(\*|-|\+)\s/, '')}</li>;
//             }
//             return <span key={`span-${key}-${index}`}>{line}<br/></span>;
//         });

//         if (lines.some(line => line.type === 'li')) {   // code to wrap the items in an unordered list if the line is a list item.
//             return <ul key={`list-${key}`}>{lines}</ul>;
//         }
//         return lines;
//     };

//     response.replace(regex, (match, blockLatex, inlineLatex, offset) => {   // code to handle formula expressions
//         if (offset > lastEnd) {   // code to handle regular text
//             elements.push(renderText(response.substring(lastEnd, offset), lastEnd));
//         }

//         if (blockLatex !== undefined) {   // code to handle block formulas
//             elements.push(<BlockMath key={`block-${offset}`}>{blockLatex}</BlockMath>);
//         } else if (inlineLatex !== undefined) {   // code to handle inline formulas
//             elements.push(<InlineMath key={`inline-${offset}`}>{inlineLatex}</InlineMath>);
//         }

//         lastEnd = offset + match.length;
//     });

//     if (lastEnd < response.length) {   // code to handle any remaining texts if there are still any
//         elements.push(renderText(response.substring(lastEnd), lastEnd));
//     }

//     return <div>{elements}</div>;
// }






/////////works now for both formula block and inline formula, but list detection is all over the place//////////
// export const formatResponse = (response) => {
//     const regex = /\\\[(.*?)\\\]|\\\((.*?)\\\)/g;
//     const elements = [];
//     let lastEnd = 0;

//     const renderText = (text, key) => {   // code to handle text and potential lists
//         const lines = text.split('\n').map((line, index) => {
//             if (line.match(/^\d+\.\s/)) {
//                 return <li key={`ol-${key}-${index}`}>{line.replace(/^\d+\.\s/, '')}</li>;
//             } else if (line.match(/^-\s/)) {
//                 return <li key={`ul-${key}-${index}`}>{line.replace(/^-+\s/, '')}</li>;
//             }
//             return <span key={`span-${key}-${index}`}>{line}<br/></span>;
//         });

//         if (lines.some(line => line.type === 'li')) {
//             return <ul key={`list-${key}`}>{lines}</ul>;
//         }
//         return lines;
//     };

//     response.replace(regex, (match, blockLatex, inlineLatex, offset) => {   // code to handle formula expressions
//         if (offset > lastEnd) {
//             elements.push(renderText(response.substring(lastEnd, offset), lastEnd));
//         }

//         if (blockLatex !== undefined) {
//             elements.push(<BlockMath key={`block-${offset}`}>{blockLatex}</BlockMath>);
//         } else if (inlineLatex !== undefined) {
//             elements.push(<InlineMath key={`inline-${offset}`}>{inlineLatex}</InlineMath>);
//         }

//         lastEnd = offset + match.length;
//     });

//     if (lastEnd < response.length) {
//         elements.push(renderText(response.substring(lastEnd), lastEnd));
//     }

//     return <div>{elements}</div>;
// }





//////works but issue with lists//////
// export const formatResponse = (response) => {
//     const regex = /\\\[(.*?)\\\]|\\\((.*?)\\\)/g;
//     const elements = [];

//     let lastEnd = 0;

//     response.replace(regex, (match, blockLatex, inlineLatex, offset) => {
//         if (offset > lastEnd) {
//             elements.push(<span key={lastEnd}>{response.substring(lastEnd, offset)}</span>);
//         }

//         if (blockLatex !== undefined) {
//             elements.push(<BlockMath key={offset}>{blockLatex}</BlockMath>);
//         } else if (inlineLatex !== undefined) {
//             elements.push(<InlineMath key={offset}>{inlineLatex}</InlineMath>);
//         }

//         lastEnd = offset + match.length;
//     });

//     if (lastEnd < response.length) {
//         elements.push(<span key={lastEnd}>{response.substring(lastEnd)}</span>);
//     }

//     return elements;
// }





/////////works but inline formula not working///////
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
// const lines = response.split('\n');

// return lines.map((line, index) => (
//     <React.Fragment key={index}>
//         {line}
//         <br />
//     </React.Fragment>
// ));
// }
