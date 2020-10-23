import React from 'react';
import logoPng from '../../img/logo.png';

function LogoBusiness(props) {
    const {width,height} = props;
    return <div>
           <img src={logoPng} alt="Logo" width={width} height={height}/>
    </div>
}

export default LogoBusiness;