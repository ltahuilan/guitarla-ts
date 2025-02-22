import { useCart } from './assets/hooks/useCart.ts'
import Guitar from './assets/components/Guitar'
import Header from './assets/components/Header.tsx'
import Spinner from './assets/components/Spinner.tsx'

function App() {

    //hook personalizado
    const {cart, data, error, isLoading, addToCart, removeItemToCart, decreaseQuantity, increaseQuantity, emptyCart, cartIsEmpty, cartTotal} = useCart();
    
    return (
        <>
            <Header
                cart = {cart}
                removeItemToCart = {removeItemToCart}
                decreaseQuantity = {decreaseQuantity}
                increaseQuantity = {increaseQuantity}
                emptyCart = {emptyCart}
                cartIsEmpty = {cartIsEmpty}
                cartTotal = {cartTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                {isLoading && <Spinner/>}

                <div className="row mt-5">
                    {data && data.data.map( (guitar) => (
                        <Guitar
                            key={`guitar-${guitar.id}`}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
