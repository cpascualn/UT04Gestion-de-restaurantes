// import { Dish, Category, Allergen, Menu, Restaurant, Coordinate, RestaurantsManager } from './RestaurantManager';

function test() {

    manager = RestaurantsManager.getInstance();

    dish = manager.createDish('preuba', 'descrip', ['ing1', 'ing2'], 'image');
    manager.addCategory(new Category('categ'));
    cats = manager.categories;
    let categoria;
    for (const cat of cats) {
        console.log(cat);
        if (cat.name === 'categ') {
            categoria = cat;
        }
    }

    manager.assignCategoryToDish(categoria, dish);
    manager.deassignCategoryToDish(categoria, dish);
    console.log(manager);
}

test();