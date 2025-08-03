import React, { useState } from 'react'
import Data from '../../../../data.json'
import Cart from '../../assets/icon-add-to-cart.svg'
import Illustration from '../../assets/illustration-empty-cart.svg'
import Remove from '../../assets/icon-remove-item.svg'
import ConfirmIcon from '../../assets/icon-order-confirmed.svg' 

const Home = () => {
    // 1. Adding cartitems
    // Setting up state for cart items
    const [cartItems, setCartItems] = useState([]);
    
    // state to manage the visibility of the confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // creating a function to add an item to the cart
    const addToCart = (item) => {
        // check if item is already in the cart
    const itemExists = cartItems.find(cartItem => cartItem.name === item.name); // CHANGED from item.id to item.name

    if (itemExists) {
        // if Yes, increase its quatity
        const updatedCart = cartItems.map(cartItem => 
            cartItem.name === item.name // CHANGED from item.id to item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        setCartItems(updatedCart);
    } else {
        // if no, add it with quantity 1
        setCartItems([...cartItems, { ...item, quantity: 1}]);
    }
    
    };

    // creating a function to remove an item

    const removeFromCart = (name) => { // CHANGED parameter from id to name
        const updatedCart = cartItems.filter(item => item.name !== name); // CHANGED logic to filter by name
        setCartItems(updatedCart);
    };

    // creating function to increase quantity 

    const increaseQuantity = (name) => {
        const updatedCart = cartItems.map(item =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } //find the item by name and increase its quantity
            : item //otherwise, reteurn the item as is 
        );
        setCartItems(updatedCart);
    };
        
    // craeting function to decrease quantity

    const decreaseQuantity = (name) => {
        const itemToDecrease = cartItems.find(item => item.name === name);
        // if the item is 1, remove it completely. else just decrease it

        if (itemToDecrease.quantity === 1) {
            removeFromCart(name);
        } else {
            // FIX: This now correctly uses 'item' instead of 'itemToDecrease'
            const updatedCart = cartItems.map(item => item.name === name 
                ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCartItems(updatedCart);
        }
    };

    //  function to handle starting a new order after confirmation
    const handleNewOrder = () => {
        setCartItems([]); // This clears all items from the cart
        setIsModalOpen(false); // This closes the modal
    };

    //  variable to calculate the total price of all items in the cart
    const orderTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className='p-4 sm:p-6 bg-[#FCF8F6] md:p-10 font-sans'>
        <section className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8">
            <div className='flex-1'>   {/*this holds the menu cards*/}
                <h2 className='text-rose-800 text-3xl md:text-4xl font-bold mb-5'>Desserts</h2>
                <div className='grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
                    
                    {Data.map((item, index) => (

                    <div key={index} className="space-y-4">    {/*this is the card holding img and price*/}
                        
                        <div className='relative'> {/*Image*/}
                            <img src={item.image.desktop} alt={item.name}  className='w-full rounded-xl'/>
                        
                            <button 
                            onClick={() => addToCart(item)}
                            className='flex items-center justify-center w-36 h-10 rounded-full gap-1 bg-white border border-gray-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hover:border-red-600 text-rose-900 font-semibold cursor-pointer'> 
                            {/*cart logo*/}
                                <img src={Cart} alt="" />
                                <span className='text-sm font-medium'>Add to Cart</span>
                            </button>
                        </div>

                        <div className='pt-4'>
                            <p className='text-rose-500 text-sm'>{item.category}</p>
                            <h4 className='text-rose-900 font-semibold'>{item.name}</h4>
                            <h3 className='text-rose-600 font-semibold'>${item.price.toFixed(2)}</h3>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <aside className='p-6 rounded-xl h-fit bg-white w-full lg:w-[26rem]'>
                <h3 className='text-red-600 text-2xl mb-6 font-bold'>Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h3>
                {cartItems.length === 0 ? (
                <div className='flex flex-col items-center justify-center text-center py-12'>
                    <img src={Illustration} alt="Empty Cart Illustartion" className='mb-4 w-32'/>
                    <p className="text-rose-800 text-sm font-semibold">Your added items will appear here</p>
                </div>
                ) : (
                    <div>
                        <ul className='space-y-4'>
                            {cartItems.map((item, index) => (
                                
                                <li key={index} className='border-b border-rose-100 pb-4'>
                                    <p className="text-rose-800 font-semibold text-sm mb-2">{item.name}</p>
                                    <div className='flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                        {/* Left side: Controls and per-item price */}
                                        <div className='flex items-center gap-4 w-full sm:w-auto'>
                                            <div className='flex items-center gap-3'>
                                                <button 
                                                    onClick={() => decreaseQuantity(item.name)} 
                                                    className="w-5 h-5 flex items-center justify-center border-2 border-rose-400 text-rose-400 rounded-full hover:bg-rose-400 hover:text-white font-bold"
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    -
                                                </button>
                                                <p className="text-sm text-rose-900 font-bold w-4 text-center">{item.quantity}</p>
                                                <button 
                                                    onClick={() => increaseQuantity(item.name)} 
                                                    className="w-5 h-5 flex items-center justify-center border-2 border-rose-400 text-rose-400 rounded-full hover:bg-rose-400 hover:text-white font-bold"
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="text-rose-500 font-semibold">@ ${item.price.toFixed(2)}</p>
                                        </div>
                                        {/* Right side: Total price and remove button */}
                                        <div className='flex items-center gap-4'>
                                            <p className='text-rose-600 font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                                            <button 
                                                onClick={() => removeFromCart(item.name)} 
                                                className='w-5 h-5 flex items-center justify-center border-2 border-rose-300 rounded-full text-rose-400 hover:border-rose-800 hover:text-rose-800'
                                                aria-label={`Remove all ${item.name} from cart`}
                                            >
                                                <img src={Remove} alt="" className='w-3 h-3'/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                             
                            ))}
                        </ul>
                        {/* section for displaying the total and the confirmation button */}
                        <div className='flex items-center justify-between mt-6'>
                            <p className='text-rose-500'>Order Total</p>
                            <p className='text-2xl font-bold text-rose-900'>${orderTotal.toFixed(2)}</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className='w-full bg-red-600 text-white font-semibold py-3 cursor-pointer rounded-full mt-6 hover:bg-red-700'
                        >
                            Confirm Order
                        </button>
                    </div>
                )}
            </aside>
       </section> 

        {/* For the Confirmation Modal */}
        {isModalOpen && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
                <div className='bg-white p-6 md:p-8 rounded-lg max-w-md w-full'>
                    <img src={ConfirmIcon} alt="Order confirmed" className='w-10 h-10 mb-4' />
                    <h2 className='text-2xl md:text-3xl font-bold text-rose-900'>Order Confirmed</h2>
                    <p className='text-rose-500 mt-1 mb-6'>We hope you enjoy your food!</p>

                    <div className='bg-rose-50 p-4 rounded-lg mb-6'>
                        <ul className='space-y-4'>
                            {cartItems.map(item => (
                                <li key={item.name} className='flex items-center justify-between border-b border-rose-100 pb-4 last:border-b-0'>
                                    <div className='flex items-center gap-4'>
                                        <img src={item.image.mobile} alt={item.name} className='w-12 h-12 rounded-md' />
                                        <div>
                                            <p className="text-rose-900 font-semibold text-sm">{item.name}</p>
                                            <div className='flex items-center gap-4'>
                                                <p className="text-red-600 font-semibold text-sm">{item.quantity}x</p>
                                                <p className="text-rose-500">@ ${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='text-rose-900 font-bold'>${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                         <div className='flex items-center justify-between mt-4'>
                            <p className='text-rose-500'>Order Total</p>
                            <p className='text-xl md:text-2xl font-bold text-rose-900'>${orderTotal.toFixed(2)}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleNewOrder}
                        className='w-full bg-red-600 text-white font-semibold py-3 rounded-full cursor-pointer hover:bg-red-700'
                    >
                        Start New Order
                    </button>
                </div>
            </div>
        )}
    </main>
  )
}

export default Home