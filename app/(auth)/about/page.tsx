"use client";import"./about.css";import{usePathname,useRouter}from"next/navigation";function about(){const router=useRouter();return(<><div className="main"><h1 className="t3">ЭкоЭл <span>Journal</span></h1><p className="subt">новая эра нашей школы</p><div className="buttons"><button className="btn1"onClick={()=>router.push('/sign-in')}>Войти</button><button className="btn2"onClick={()=>router.push('mailto:ecoelforum@gmail.com')}>Контакт</button></div><div className="second"><h3 className="t4">Инфа о сайте ⬇️</h3><h4 className="t5">Для чего нужен наш сайт?</h4><ul><li>Общение учеников школы в одном месте — Коммуникативно. Интересно. Вайбово.</li><li>Покупка еды в разы дешевле, чем в Mustang'е — Легко. Недорого. Вкусно.</li><li>Анонимное обсуждение, публикации без никнейма автора — Анонимно. Хитро. Навсегда.</li><li>Объявлние школьных конкурсов и событий — Громко. Весело. С призами.</li></ul><h4 className="t5">Идеология</h4><ul><li>Мы не раскрываем данные пользователей. Ни деньги, ни угрозы нас не интересуют. Конфиденциальность превыше всего.</li><li>В случае закрытия проекта, что, конечно, маловероятно, мы вернём все средств с ваших балансов.</li><li>На нашем сайте запрещается обсуждение политических тем, контента 18+ NSFW и шокирующего содержания.</li><li>Мы просим вас не стесняться писать своё настоящее имя или прозвище, по которому вас знают в школе. Это поможет другим участникам понимать, кто есть кто.</li></ul><div className="buttons"><button className="btn1 btn3"onClick={()=>router.push('/sign-in')}>Убедили? Регистрируйся!</button></div></div><div className="footer"><h5>ЭкоЭл <span>Journal</span></h5><a href="mailto:ecoelforum@gmail.com">ecoelforum@gmail.com</a></div></div></>)}export default about;