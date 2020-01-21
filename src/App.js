import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : []);

	const addItem = item => {
		const updatedCart = [...cart, item];

		localStorage.setItem("CART", JSON.stringify(updatedCart));
		setCart(updatedCart);

	};

	const removeItem = item => {
		const updatedCart = [...cart.filter(i => i.id !== item.id)];

		localStorage.setItem("CART", JSON.stringify(updatedCart));
		setCart(updatedCart);
	}

	return (
		<div className="App">
			<CartContext.Provider value={{ cart }}>
				<Navigation />
			</CartContext.Provider>
			<ProductContext.Provider value={{ products, addItem }}>
				<Route exact path="/">
					<Products	/>
				</Route>
			</ProductContext.Provider>
			<CartContext.Provider value={{ cart, removeItem }}>
				<Route path="/cart">
					<ShoppingCart />
				</Route>
			</CartContext.Provider>
		</div>
	);
}

export default App;
