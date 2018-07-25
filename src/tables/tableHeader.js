import React from 'react';


const tableHeader = () =>{
    return(
        <div>
            <table>
                <thead>
                    <tr>
                    <th > Sensor-Name </th>
                    <th > Sensor-Value </th>
                    <th > Sensor-Units </th>
                    <th > Threshold </th>
                    <th > view</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
export default tableHeader;