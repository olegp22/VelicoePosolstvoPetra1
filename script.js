// Инициализация карты
const map = L.map('map', {
    crs: L.CRS.EPSG3857, 
    minZoom: 2,
    maxZoom: 7
}).setView([52, 10], 4);

// Добавляем локальную карту как изображение
const imageUrl = 'map/historical-map.jpg';

const imageBounds = [[90, -260], [-90, 260]];/*////////////changed from [[90, -180], [-90, 180]]\\\\\\\\\\\\\\\\*/ 
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Ограничиваем карту этими же границами
map.setMaxBounds(imageBounds);

// Данные точек путешествия
const locations = [
     {
        city: "Москва",
        country: "Россия империя",
        coords: [16.2082, 132.3738],
        purpose: "Начало Великого посольства",
        
    },
     {
        city: "Рига",
        country: "Шведское королевство",
        coords: [13.7, 52.7797],
        purpose: "Перевалочный пункт, подготовка к путешествию",
        contacts: "Рижский комендант"
    },
    {
        city: "Кёнигсберг",
        country: "Пруссия",
        coords: [-14.6872, 39.2797],
        purpose: "Изучение военного дела, Обучение артиллерийскому делу",
        contacts: "Фридрих III, курфюрст Бранденбурга и герцог Пруссии (будущий король Пруссии)"
    },
    {
        city: "Ганновер",
        country: "Курфюршеств Брауншвейг-Люнебург",
        coords: [-50.2297, -17.0122],
        purpose: "Дипломатические и Военные Переговоры, Научные Беседы",
        contacts: "Курфюрст Георг Людвиг (будущий Георг I), Готфрид Вильгельм Лейбниц"
    },
    {
        city: "Саардам",
        country: "Соединённое провинция (Голландская республика)",
        coords: [-35.0390, -43.9310],
        purpose: "Изучение кораблестроения, работа на верфи",
        contacts: "Мастера Ост-Индской компании"
    },
    {
        city: "Амстердам",
        country: "Соединённое провинция (Голландская республика)",
        coords: [-35.4390, -43.310],
        purpose: "Изучение торговли, навигации, науки",
        contacts: "Учёные и дипломаты провинций"
    },
    {
        city: "Лондон",
        country: "Англия",
        coords: [-40.0, -70.0],
        purpose: "Осмотр кораблей, арсеналов, мануфактур",
        contacts: "Король Вильгельм III"
    },
    {
        city: "Вена",
        country: "Священная Римская империя германской нации",
        coords: [-62.5082, 17.9738],
        purpose: "Переговоры о союзе",
        contacts: "Император Леопольд I"
    },
    {
        city: "Москва",
        country: "Россия империя",
        coords: [16.2082, 132.3738],
        purpose: "Начало Великого посольства",
        
    },
];

// Кастомная иконка для маркеров с классом подсветки
const customIcon = L.divIcon({
    className: 'custom-marker-icon', // Используем класс из styles.css
    iconSize: [15, 15] // Размер иконки (для круга)
});


// Панель
const panel = document.getElementById('info-panel');
const closePanel = document.getElementById('close-panel');

closePanel.addEventListener('click', () => {
    panel.classList.add('hidden');
});

// Маркеры
locations.forEach(loc => {
    // Используем кастомную иконку
    const marker = L.marker(loc.coords, {icon: customIcon}).addTo(map);

    marker.on('click', () => {
        document.getElementById('city-name').textContent = loc.city;
        document.getElementById('country').textContent = loc.country;
        document.getElementById('purpose').textContent = loc.purpose;
        document.getElementById('contacts').textContent = loc.contacts;

        panel.classList.remove('hidden');
    });
});

// Маршрут Петра (пунктир)
const route = locations.map(loc => loc.coords);

L.polyline(route, {
    color: 'blue',
    weight: 2.5,
    dashArray: '10, 10'
}).addTo(map);