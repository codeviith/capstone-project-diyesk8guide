import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export const formatResponse = (response) => {
    const lines = response.split('\n');

    return lines.map((line, index) => {
        if (line.trim().startsWith('\\[') && line.trim().endsWith('\\]')) {   // code to split the markers and render as block math
            const math = line.trim().slice(2, -2);   // code to remove '\\[' and '\\]'  --> note the brackets
            return <BlockMath key={index}>{math}</BlockMath>;
        } else if (line.trim().startsWith('\\(') && line.trim().endsWith('\\)')) {   // code to split the markers and render as inline math
            const math = line.trim().slice(2, -2);   // code to remove '\\(' and '\\)'  --> note the parentheses instead of brackets
            return <InlineMath key={index}>{math}</InlineMath>;
        } else {
            return <p key={index}>{line}</p>;
        }
    });
}


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
