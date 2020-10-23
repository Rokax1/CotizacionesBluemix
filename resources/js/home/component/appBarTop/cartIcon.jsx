import { Badge, IconButton, Zoom } from '@material-ui/core';
import React, { useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function CartIconComponent(){
    
    const count = useSelector(store => store.cart.products.length);

    return (
        
            <IconButton color="inherit"
            component={NavLink}
            to="/cart">
                    
                        <Badge badgeContent={count} color="secondary">
                            <Zoom in={true}>
                                <ShoppingCartIcon  />
                            </Zoom>
                        </Badge>
                    
                    
            </IconButton>
    );
}