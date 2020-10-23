import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

export function SkeletonLoader(){
    return (
        <div>
           
              <Skeleton />
              <Skeleton width="100%" />
           
        </div>
    );
}

export default SkeletonLoader;