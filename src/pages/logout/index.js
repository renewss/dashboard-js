import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';

export default function Logout() {
    const cookies = new Cookies();

    useEffect(() => {
        cookies.remove('auth');
        window.location = '/login';
    });

    return <div></div>;
}
