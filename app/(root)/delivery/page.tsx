"use client";
import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import { itemsList } from './data';

function cancelBasket() {
    document.getElementById('delivery')?.classList.remove('bgBlured');
    document.getElementById('basketDiv')?.classList.add('closed');
}

function Delivery() {
    const [items, setItems] = useState(itemsList);
    
    return (
        <>
            <div className="center">
            <div id="basketDiv" className="basketDiv">
                <button className="cancel" onClick={() => cancelBasket()}>×</button>
                <h3>Ваша корзина</h3>
                <div className="container">
                <h2 className='title2 head-text'>Сладости</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <Image src={`/${item.id}.png`} alt={item.id} className="img" width={180} height={135}/>
                            <h6>{item.title} <span>· {item.amount}</span></h6>
                            <p>{item.price} BYN</p>
                            <button onClick={() => {
                                if(item.added >= 1){
                                    const newItems = items.map(i => 
                                        i.id === item.id ? { ...i, added: i.added - 1 } : i
                                    );
                                    setItems(newItems);
                                }
                            }}>
                                Убрать ({item.added})
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container">
                <h2 className='title2 head-text'>Сладости</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <Image src={`/${item.id}.png`} alt={item.id} className="img" width={180} height={135}/>
                            <h6>{item.title} <span>· {item.amount}</span></h6>
                            <p>{item.price} BYN</p>
                            <button onClick={() => {
                                if(item.added >= 1){
                                    const newItems = items.map(i => 
                                        i.id === item.id ? { ...i, added: i.added - 1 } : i
                                    );
                                    setItems(newItems);
                                }
                            }}>
                                Убрать ({item.added})
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="center"><button className='btn'>Итого заказ на 5BYN</button></div>
            </div>
            </div>








            <div id='delivery' className='bgBlured'>
            <h1 className='head-text text-left'>ЭкоЭл Delivery</h1>
            <p className='mt-3 text-base-regular text-light-2'>Доставим вкусную еду в любой уголок нашей школы</p>
                <div className="floatRight">
                <Image className="basket" id="basket" src='/assets/basket.svg' alt="basket" width={48} height={48}
                onClick={() => {
                    document.getElementById('delivery')?.classList.add('bgBlured');
                    document.getElementById('basketDiv')?.classList.remove('closed');
                }}
                />
                </div>
                
            <div className="container">
                <h2 className='title2 head-text'>Сладости</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <Image src={`/${item.id}.png`} alt={item.id} className="img" width={180} height={135}/>
                            <h6>{item.title} <span>· {item.amount}</span></h6>
                            <p>{item.price} BYN</p>
                            <button onClick={() => {
                                const newItems = items.map(i => 
                                    i.id === item.id ? { ...i, added: i.added + 1 } : i
                                );
                                setItems(newItems);
                                document.getElementById('basket')?.classList.add('activeBasket');
                            }}>
                                Добавить
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </>
    );
}

export default Delivery;