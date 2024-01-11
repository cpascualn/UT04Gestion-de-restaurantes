// import { Dish, Category, Allergen, Menu, Restaurant, Coordinate } from './objectos.js';

let RestaurantsManager = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    let instantiated; //Objeto con la instancia única RestaurantsManager

    function init() { //Inicialización del Singleton

        //Declaración de la clase RestaurantsManager
        class RestaurantsManager {
            #sysName;
            #categories;
            #allergens;
            #dishes;
            #menus;
            #restaurants;

            constructor(sysName, categories = [], allergens = [], dishes = [], menus = [], restaurants = []) {
                this.#sysName = sysName;
                this.#categories = categories;
                this.#allergens = allergens;
                this.#dishes = dishes;
                this.#menus = menus;
                this.#restaurants = restaurants;

                Object.defineProperty(this, 'categories', {
                    enumerable: true,
                    get() {
                        const array = this.#categories;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayCat of array) {
                                    yield arrayCat;
                                }
                            },
                        };
                    },
                });


                Object.defineProperty(this, 'menus', {
                    enumerable: true,
                    get() {
                        const array = this.#menus;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayMenu of array) {
                                    yield arrayMenu;
                                }
                            },
                        };
                    },
                });

                Object.defineProperty(this, 'allergens', {
                    enumerable: true,
                    get() {
                        const array = this.#allergens;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayAl of array) {
                                    yield arrayAl;
                                }
                            },
                        };
                    },
                });


                Object.defineProperty(this, 'restaurants', {
                    enumerable: true,
                    get() {
                        const array = this.#restaurants;
                        return {
                            *[Symbol.iterator]() {
                                for (const arrayRes of array) {
                                    yield arrayRes;
                                }
                            },
                        };
                    },
                });
            }

            addCategory(category) {
                this.#categories.push(category);
                return this;
            };

            removeCategory(category) {
                let index = this.#categories.indexOf(category);
                this.#categories.splice(index, 1);

                return this;
            };

            addMenu(Menu) {
                this.#menus.push({
                    Menu,
                    dishes: []
                });
                return this;
            };

            removeMenu(Menu) {
                let index = this.#menus.indexOf(Menu);
                this.#menus.splice(index, 1);
                return this;
            };

            addAllergen(allergen) {
                this.#allergens.push(allergen);
                return this;
            }

            removeAllergen(allergen) {
                let index = this.#allergens.indexOf(allergen);
                this.#allergens.splice(index, 1);
                return this;
            };

            addDish(dish) {
                this.#dishes.push({
                    dish,
                    categories: [],
                    allergens: []
                });
                return this;
            }

            removeDish(dish) {
                // find index con la funcion que busque por el dish y asi en todo
                let index = this.#dishes.indexOf(dish);
                this.#dishes.splice(index, 1);
                return this;
            }

            addRestaurant(Restaurant) {
                this.#restaurants.push(Restaurant);
                return this;
            }

            removeRestaurant(Restaurant) {
                let index = this.#restaurants.indexOf(Restaurant);
                this.#restaurants.splice(index, 1);
                return this;
            }

            assignCategoryToDish(category, dish) {
                // buscar la posicion del objeto literal del dish y 
                // añadirle la categoria que ya existe en el array categorias
                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {
                    this.addDish(dish);
                    dispos = this.#dishes.findIndex(d => d.dish.name === dish.name);
                }
                let cat = this.#categories.indexOf(category);
                if (cat === -1) {
                    this.addCategory(category);
                    cat = this.#categories.indexOf(category);
                }
                cat = this.#categories[cat];
                this.#dishes[dispos].categories.push(cat);
                return this;
            }

            deassignCategoryToDish(category, dish) {
                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {
                    // excepcion
                }
                let cat = this.#categories.indexOf(category);
                if (cat === -1) {
                    // excepcion
                }
                let index = this.#dishes[dispos].categories.indexOf(category);
                this.#dishes[dispos].categories.splice(index, 1);
                return this;
            }

            assignAllergenToDish(allergen, dish) {
                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {
                    this.addDish(dish);
                    dispos = this.#dishes.findIndex(d => d.dish === dish);
                }
                let al = this.#allergens.indexOf(allergen);
                if (al === -1) {
                    this.addAllergen(allergen);
                    al = this.#allergens.indexOf(allergen);
                    al = this.#allergens[al];
                }
                this.#dishes[dispos].allergens.push(al);
                return this;
            }

            deassignAllergenToDish(allergen, dish) {
                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {
                    // excepcion
                    dispos = this.#dishes.findIndex(d => d.dish === dish);
                }
                let al = this.#allergens.indexOf(allergen);
                if (al === -1) {
                    // excepcion
                }
                let index = this.#dishes[dispos].indexOf(allergen);
                this.#dishes[dispos].allergens.splice(index, 1);
                return this;
            }

            createDish(name, description = '', ingredients = [], image) {
                // comprobar si ya exista
                let dispos = this.#dishes.findIndex(d => d.dish.name === name);
                if (dispos === -1) {
                    // si no existe se crea 
                    let dish = new Dish(name, description, ingredients, image);
                    this.addDish(dish);
                    dispos = this.#dishes.findIndex(d => d.dish === dish);
                }
                return this.#dishes[dispos].dish;
            }
        }
        let instance = new RestaurantsManager();//Devolvemos el objeto RestaurantsManager para que sea una instancia única.
        Object.freeze(instance);
        return instance;
    } //Fin inicialización del Singleton
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();


// export { Dish, Category, Allergen, Menu, Restaurant, Coordinate, RestaurantsManager };
// export default RestaurantsManager;