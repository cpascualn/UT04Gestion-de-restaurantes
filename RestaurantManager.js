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
                                    yield arrayCat.category;
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
                                    yield arrayMenu.category;
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
                                    yield arrayAl.category;
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
                                    yield arrayRes.category;
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
                index = this.#categories.indexOf(category);
                this.#categories.splice(index, 1);
                return this;
            };

            addMenu(Menu) {
                this.#menus.push(Menu);
                return this;
            };

            removeMenu(Menu) {
                index = this.#menus.indexOf(Menu);
                this.#menus.splice(index, 1);
                return this;
            };

            addAllergen(allergen) {
                this.#allergens.push(allergen);
                return this;
            }
            removeAllergen(allergen) {
                index = this.#allergens.indexOf(allergen);
                this.#allergens.splice(index, 1);
                return this;
            };

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