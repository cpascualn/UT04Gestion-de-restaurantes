
import { Dish, Category, Allergen, Menu, Restaurant, Coordinate } from './objetos.js';
export { RestaurantsManager };
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

            addCategory(...categorys) {
                for (const category of categorys) {
                    this.#categories.push(category);
                }
                return this;
            };

            removeCategory(...categorys) {
                for (const category of categorys) {
                    // buscar todos los dish que tengan esta categoria y desasignarlos
                    this.#dishes.forEach(dish => {
                        let index = dish.categories.findIndex(cat => cat.name === category.name);
                        if (index != -1) {
                            this.deassignCategoryToDish(dish.categories[index], dish.dish);
                        }
                    });

                    let index = this.#categories.indexOf(category);
                    this.#categories.splice(index, 1);
                }
                return this;
            };

            addMenu(...menus) {
                for (const menu of menus) {
                    this.#menus.push({
                        menu,
                        dishes: []
                    });
                }

                return this;
            };

            removeMenu(...menus) {
                for (const menu of menus) {
                    let index = this.#menus.indexOf(menu);
                    this.#menus.splice(index, 1);
                }
                return this;
            };

            addAllergen(...allergens) {
                for (const allergen of allergens) {
                    this.#allergens.push(allergen);
                }
                return this;
            }

            removeAllergen(...allergens) {
                for (const allergen of allergens) {
                    this.#dishes.forEach(dish => {
                        let index = dish.allergens.findIndex(al => al.name === allergen.name);
                        if (index != -1) {
                            this.deassignAllergenToDish(dish.allergens[index], dish.dish);
                        }
                    });
                    let index = this.#allergens.indexOf(allergen);
                    this.#allergens.splice(index, 1);
                }
                return this;
            };

            addDish(...dishs) {
                for (const dish of dishs) {
                    this.#dishes.push({
                        dish,
                        categories: [],
                        allergens: []
                    });
                }
                return this;
            }

            removeDish(...dishs) {
                for (const dish of dishs) {
                    console.log(dish);
                    let index = this.#dishes.indexOf(dish);
                    this.#dishes.splice(index, 1);
                }
                return this;
            }

            addRestaurant(...restaurants) {
                for (const restaurant of restaurants) {
                    this.#restaurants.push(restaurant);
                }
                return this;
            }

            removeRestaurant(...restaurants) {
                for (const restaurant of restaurants) {
                    let index = this.#restaurants.indexOf(restaurant);
                    this.#restaurants.splice(index, 1);
                }
                return this;
            }

            assignCategoryToDish(category, ...dishs) {
                for (const dish of dishs) {
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
                    // cat = this.#categories[cat];
                    this.#dishes[dispos].categories.push(category);
                }
                return this;
            }

            deassignCategoryToDish(category, dish) {
                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {
                    // excepcion
                }
                let cat = this.#categories.indexOf(category);
                let categorias = this.#dishes[dispos].categories;
                let index = categorias.findIndex((categ) => categ.name === category.name);
                if (cat === -1 || index === -1) {
                    // excepcion
                }
                categorias.splice(index, 1);
                return this;
            }

            assignAllergenToDish(allergen, ...dishs) {
                for (const dish of dishs) {
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
                }
                return this;
            }

            deassignAllergenToDish(allergen, dish) {
                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {
                    // excepcion
                    dispos = this.#dishes.findIndex(d => d.dish === dish);
                }
                let al = this.#allergens.indexOf(allergen);
                let index = this.#dishes[dispos].allergens.indexOf(allergen);
                if (al === -1 || index === -1) {
                    // excepcion
                }

                this.#dishes[dispos].allergens.splice(index, 1);
                return this;
            }

            assignDishToMenu(menu, ...dishs) {

                for (const dish of dishs) {
                    let dispos = this.#dishes.findIndex(d => d.dish === dish);
                    if (dispos === -1) {
                        this.addDish(dish);
                        dispos = this.#dishes.findIndex(d => d.dish === dish);
                    }
                    actDish = this.#dishes[dispos];

                    let menpos = this.#menus.findIndex(m => m.menu === menu);
                    if (menpos === -1) {
                        this.addMenu(menu);
                        menpos = this.#menus.findIndex(m => m.menu === menu);
                    }
                    this.#menus[menpos].dishes.push(actDish);
                }
                return this;
            }

            deassignDishToMenu(menu, dish) {

                let dispos = this.#dishes.findIndex(d => d.dish === dish);
                if (dispos === -1) {

                }
                actDish = this.#dishes[dispos];

                let menpos = this.#menus.findIndex(m => m.menu === menu);

                if (menpos === -1) {

                }
                let men = this.#menus[menpos];
                let index = men.dishes.findIndex(d => d.dish === dish);
                men.dishes.splice(index, 1);

                return this;
            }


            changeDishesPositionsInMenu(menu, dish1, dish2) {
                menu = this.#menus.findIndex(m => m.menu === menu);
                if (menu === -1) {

                }
                let dishes = this.#menus[menu].dishes;
                let pos1 = dishes.findIndex(d => d.dish === dish1);
                let pos2 = dishes.findIndex(d => d.dish === dish2);
                if ((pos1 === -1) || (pos2 === -1)) {

                }
                let auxdish = dishes[pos1];
                dishes[pos1] = dishes[pos2];
                dishes[pos2] = auxdish;

                return this;
            }
            // recibe categoria y la funcion de ordenacion, si no recibe niguna por defecto la ordena ascendente
            getDishesInCategory(category, ordenacion = ((a, b) => a - b)) {
                let platos = [];
                this.#dishes.forEach(dish => {
                    // si el plato tiene la categoria buscada añadir al array de platos con esta categoria
                    if (dish.categories.findIndex(cat => cat.name === category.name) !== -1) {
                        platos.push(dish);
                    }
                });

                return {
                    *[Symbol.iterator]() {
                        for (const dishCat of platos) {
                            yield dishCat;
                        }
                    },
                    ordernar() {
                        // usando la funcion de comparacion ordenara el array
                        platos.sort(ordenacion);
                    },
                };
            }

            getDishesWithAllergen(allergen, ordenacion = ((a, b) => a - b)) {
                let platos = [];
                this.#dishes.forEach(dish => {
                    // si el plato tiene el alergeno buscada añadir al array de platos con esta categoria
                    if (dish.allergens.findIndex(al => al.name === allergen.name) !== -1) {
                        platos.push(dish);
                    }
                });

                return {
                    *[Symbol.iterator]() {
                        for (const dishCat of platos) {
                            yield dishCat;
                        }
                    }, ordernar() {
                        // usando la funcion de comparacion ordenara el array
                        platos.sort(ordenacion);
                    },
                };
            }

            // encontrar platos con el criterio de busqueda, ejemplo: encontrar platos que tengan 2 o mas alergenos
            findDishes(dish, callback, ordenacion = ((a, b) => a - b)) {
                // ejemplo de una callback  ( d => d.allergens.lenght >= 2 )
                //
                let platos = this.#dishes.filter(callback);

                return {
                    *[Symbol.iterator]() {
                        for (const dishCat of platos) {
                            yield dishCat;
                        }
                    }, ordernar() {
                        // usando la funcion de comparacion ordenara el array
                        platos.sort(ordenacion);
                    },
                };
            }

            createDish(name, description = '', ingredients = [], image) {
                // comprobar si ya existe
                let dispos = this.#dishes.findIndex(d => d.dish.name === name);
                if (dispos === -1) {
                    // si no existe se crea 
                    let dish = new Dish(name, description, ingredients, image);
                    this.addDish(dish);
                    dispos = this.#dishes.findIndex(d => d.dish === dish);
                }
                return this.#dishes[dispos].dish;
            }

            createMenu(name = '', description = '') {
                let menpos = this.#menus.findIndex(m => m.menu === name);
                if (menpos === -1) {
                    let menu = new Menu(name, description);
                    this.addMenu(menu);
                    menpos = this.#menus.findIndex(m => m.menu === name);
                }
                return this.#menus[menpos];
            }

            createAllergen(name = '', description = '') {
                let alpos = this.#allergens.findIndex(al => al.name === name);
                if (alpos === -1) {
                    let allergen = new Allergen(name, description);
                    this.addAllergen(allergen);
                    alpos = this.#allergens.findIndex(al => al.name === name);
                }
                return this.#allergens[alpos];
            }

            createCategory(name = '', description = '') {
                let catpos = this.#categories.findIndex(cat => cat.name === name);
                if (catpos === -1) {
                    let category = new Category(name, description);
                    this.addCategory(category);
                    catpos = this.#categories.findIndex(cat => cat.name === name);
                }
                return this.#categories[catpos];
            }

            createRestaurant(name = '', description = '', location) {
                let respos = this.#restaurants.findIndex(res => res.name === name)

                if (respos === -1) {
                    let restaurant = new Restaurant(name, description, location);
                    this.addRestaurant(restaurant);
                    respos = this.#restaurants.findIndex(res => res.name === name)
                }
                return this.#restaurants[respos];
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
