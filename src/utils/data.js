import I1 from '../img/i1.png'
import F1 from '../img/f1.png'
import C3 from '../img/c3.png'
import Fi1 from '../img/fi1.png'


export const navItems = [
    {
        id : 'home',
        name : "Home",
        path : '/'
    },
    {
        id : 'menu',
        name : "Menu",
        path : '/menu'
    },
    {
        id : 'aboutus',
        name : "About Us",
        path : '/aboutus'
    },
    {
        id : 'service',
        name : "Service",
        path : '/service'
    },
]

export const heroData = [
    {
        id:1,
        name: "Ice Cream",
        desc : "Chocolate & Vanilla",
        price : String(5.25),
        imgSrc : I1,
    },
    {
        id:2,
        name: "Strawberries",
        desc : "Fresh Strawberries",
        price : String(10.25),
        imgSrc : F1,
    },
    {
        id:3,
        name: "Chicken Kebab",
        desc : "Mixed Kebab Plate",
        price : String(8.25),
        imgSrc : C3,
    },
    {
        id:4,
        name: "Fish Kebab",
        desc : "Mixed Fish Kebab",
        price : String(6.25),
        imgSrc : Fi1,
    },
]

export const categories = [
    {
        id:1,
        name : "Chicken",
        urlParamName : "chicken"
    },
    {
        id:2,
        name : "Curry",
        urlParamName : "curry"
    },
    {
        id:3,
        name : "Rice",
        urlParamName : "rice"
    },
    {
        id:4,
        name : "Fish",
        urlParamName : "fish"
    },
    {
        id:5,
        name : "Fruits",
        urlParamName : "fruits"
    },
    {
        id:6,
        name : "Icecreams",
        urlParamName : "icrcreams"
    },
    {
        id:7,
        name : "Soft Drinks",
        urlParamName : "drinks"
    },

]

