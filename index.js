let newArr=[];
//    <--- Возможные значения --->

const entities = [
    {
        city:'Rostov-on-Don\n' +
            'LCD admiral',
        area:'81 m2',
        time:'3.5 months',
        img: './img/image1.png'
    },
    {
        city:'Sochi\n' +
            'Thieves',
        area:'105 m2',
        time:'4 months',
        img: './img/example2.png'
    },
    {
        city:'Rostov-on-Don\n' +
            'Patriotic',
        area:'93 m2',
        time:'3 months',
        img: './img/example3.png'
    }
];

//    <--- Присвоение переменным классы с активным нажатием --->
const pop = "third_list_hover";
const pop2 = 'circle_hover';

//    <--- Присвоение переменным HTML блоков для дальнейшего изменения  --->
const city = document.getElementById('City');
const area = document.getElementById('Area');
const time = document.getElementById('time');
const img = document.getElementById('off_third');

//    <--- Замена текста и картинки в HTML блоках --->
const setEntity = (index) => {
    city.innerText = entities[index].city;
    area.innerText = entities[index].area;
    time.innerText = entities[index].time;
    img.src = entities[index].img;
}

//    <--- Поиск переключателей и их инициализация --->
const name = document.querySelectorAll('.name');
const circle = document.querySelectorAll('.circle');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

//    <--- Текущий индекс картинки --->
var currentIndex = 0;

//    <--- Изменение неизменённых далее блоков и деактивация неиспользуемых переключателей --->
const perebor = (name,name2,currentIndex)=>{
    name.forEach((index,i)=>{
        name[currentIndex%3].classList.add(pop); //    Присвоение класса переключателю || Показать, что переключатель активен
        if(i!==currentIndex%3){ // Поиск неиспользуемых переключателей с поледующей деактивацией
            index.classList.remove(pop); // Деактивация
        }
        })
    name2.forEach((index,i)=>{ // Повторение всех процедур для последующих блоков переключателей
        name2[currentIndex%3].classList.add(pop2);
        if(i!==currentIndex%3){
            index.classList.remove(pop2);
        }
    });
}

//    <--- Включение первых переключателей --->
name[currentIndex%3].classList.add(pop);
circle[currentIndex%3].classList.add(pop2);

//    <--- Слушатель для переключателя назад --->
prev.addEventListener('click', () => {
    currentIndex -= 1; // Переход на одно значение назад
    if(currentIndex<0){currentIndex=2;} // Проверка: чтобы не уйти в минус переключение на последний элемент
    setEntity(currentIndex%3); // Замена содержимого блока
    perebor(name,circle,currentIndex); // Отключение неиспользуемых переключателей
});

//    <--- Слушатель для переключения вперёд --->
next.addEventListener('click', () => {
    currentIndex += 1;
    setEntity(currentIndex%3);
    perebor(name,circle,currentIndex);
});

//    <--- Поиск используемого на данный момент переключателя --->
const choose = (str,name)=>{
    newArr= [];
    name.forEach(search=>{ newArr.push((Array.from(search.classList).find(search2=>search2==str)))});
    return newArr.findIndex(search=>search!=undefined);
}
//    <--- Изменение содержимого через верхние переключатели --->
const change = (item)=>{
    name[currentIndex%3].classList.remove(pop);
    circle[currentIndex%3].classList.remove(pop2);
    item.path[0].classList.add(pop);
    currentIndex=choose(pop,name);
    circle[currentIndex%3].classList.add(pop2);
    setEntity(currentIndex);
}

//    <--- Слушатель на верхние переключатели --->
name.forEach(input => input.addEventListener('click', change));

//    <--- Изменение содержимого через нижние переключатели --->
const change2 = (item)=>{
    circle[currentIndex%3].classList.remove(pop2);
    name[currentIndex%3].classList.remove(pop);
    item.path[0].classList.add(pop2);
    currentIndex=choose(pop2,circle);
    name[currentIndex%3].classList.add(pop);
    setEntity(currentIndex);
}
//    <--- Слушатель на нижние переключатели --->
circle.forEach(input => input.addEventListener('click', change2));
