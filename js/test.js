import { Dish, Category, Allergen, Menu, Restaurant, Coordinate } from './objetos.js';
import { RestaurantsManager } from './RestaurantManager.js';

function test() {

    let manager = RestaurantsManager.getInstance();

    let dish = manager.createDish('preuba', 'descrip', ['ing1', 'ing2'], 'image');
    console.log(manager);

    let dish2 = manager.createDish('preuba3', 'descrip', ['ing1', 'ing2'], 'image');
    let menu = manager.createMenu('menu', 'descrip');
    manager.createAllergen('alergeno', 'descrip');
    manager.createRestaurant('restaurant', 'descrip', new Coordinate(20, 50));
    let categoria = manager.createCategory('categ', 'descrip');
    let categoria2 = manager.createCategory('categ2', 'descrip');

    manager.assignCategoryToDish(categoria, dish, dish2).assignCategoryToDish(categoria2, dish);
    manager.assignDishToMenu(menu, dish, dish2);

    manager.removeCategory(categoria);
    manager.removeDish(dish);
    console.log(manager);
}

test();