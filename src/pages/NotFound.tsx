import { Button } from 'antd';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FunctionComponent= () => {
  return (
    <div style={{height: "100vh"}} className='md:px-32 px-10 pb-5 pt-24 bg-slate-400 h-full'>
        <div className='flex flex-col justify-center text-center h-full'>
            <div className='text-bold text-2xl text-white'>Not Found</div>
            <Link to='home' className='my-3'>
                <Button>Acceuil</Button>
            </Link>
        </div>
    </div>
  )
}

export default NotFound