"use client";import{items}from'../page';import Link from'next/link';function delivery(){return(<><div className="row"><h1 className='head-text text-left'>Корзина </h1><Link href='/delivery'><p className='link'> вернуться к меню</p></Link></div>{items.length===0?(<p className="basketItem">Товары пока не добавлены :(</p>):(<p className="basketItem">{items}</p>)}<div className="center"><button className='basketBtn'>Оформить заказ</button></div></>)}export default delivery;