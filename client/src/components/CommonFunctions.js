import React from 'react';

export const formatResponse = (response) => {
    const lines = response.split('\n');

    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
}

