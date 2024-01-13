import { Dish, Category, Allergen, Menu, Restaurant, Coordinate } from './objetos.js';
import { RestaurantsManager } from './RestaurantManager.js';

function test() {

    let manager = RestaurantsManager.getInstance();

    let dish = manager.createDish('preuba', 'descrip', ['ing1', 'ing2'], 'image');
    let dish2 = manager.createDish('preuba3', 'descrip', ['ing1', 'ing2'], 'image');
    manager.addCategory(new Category('categ'));
    let cats = manager.categories;
    let categoria;
    for (const cat of cats) {
        console.log(cat);
        if (cat.name === 'categ') {
            categoria = cat;
        }
    }

    // manager.assignCategoryToDish(categoria, dish).assignCategoryToDish(categoria, dish2);
    manager.assignCategoryToDish(categoria, dish, dish2);
    manager.removeCategory(categoria);
    manager.removeDish(dish2);
    //  manager.deassignCategoryToDish(categoria, dish);
    console.log(manager);
}

test();