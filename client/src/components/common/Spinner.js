import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <tbody>
      <tr>
        <td>
          <div>
            <img
              src={spinner}
              style={{ width: '200px', margin: 'auto', display: 'block' }}
              alt="Loading..."
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
};
