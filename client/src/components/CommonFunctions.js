import React from 'react';

// export const formatResponse = (response) => {
//     const lines = response.split('\n');

//     return lines.map((line, index) => (
//         <React.Fragment key={index}>
//             {line}
//             <br />
//         </React.Fragment>
//     ));
// }

/// trying a new logic
export const formatResponse = (response) => {
    const paragraphs = response.split('\n').filter(paragraph => paragraph.trim() !== '');

    return paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ));
}