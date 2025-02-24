import { useEffect, useState, useMemo } from 'react'
import type { Guitar, CartItem, GuitarId } from '../types'
import axios from 'axios';
import useSWR from 'swr';

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const cartLocalStorage = localStorage.getItem('CART')
        return cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
    }

    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;
    
    const fetcher = () => axios.get('http://127.0.0.1:8000/api/guitars').then(res => res.data)
    const { data, error, isLoading } = useSWR('http://127.0.0.1:8000/api/guitars', fetcher)



    
    // const getGuitars = () => {                

    //     try {
    //         const {data} = await axios.get('http://127.0.0.1:8000/api/guitars');
    //         setData(data.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getGuitars()
    // }, [])

    useEffect(() => {
        localStorage.setItem('CART', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item : Guitar) {
        //findIndex retorna la posición del elemento, si no existe retorna -1
        const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

        //si es >= a 0 existe en el cart
        if(itemExists >= 0) {
            //salir si el item ha llegado a la cantidad maxima
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart);
        }else {
            //Guitar no contiene quantity... se castea a CartItem
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem]);
        }        
    }

    function removeItemToCart(id : GuitarId) {
        setCart( cart.filter(item => item.id !== id) );
    }
    
    function decreaseQuantity(id : GuitarId) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        });
        setCart(updatedCart);
    }

    function increaseQuantity(id : GuitarId) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        });
        setCart(updatedCart);
    }

    function emptyCart() {
        setCart([]);
    }

    //State derivado
    // const cartIsEmpty = () => cart.length === 0;
    // const cartTotal = cart.reduce( (total, item) => total + (item.price * item.quantity), 0 );
    
    //State derivado con useMemo
    const cartIsEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [cart] );
    
    return {
        cart,
        data,
        error,
        isLoading,
        addToCart,
        removeItemToCart,
        decreaseQuantity,
        increaseQuantity,
        emptyCart,
        cartIsEmpty,
        cartTotal
    }
}
