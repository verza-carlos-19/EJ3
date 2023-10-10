const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];
const contenedor = document.querySelector(".container");
const input = document.getElementById("input");
const form = document.getElementById("form");

const validPizza = (num) => {
  if (num === "") {
    guardarLocalStorage({});
    return showError("Ingrese un numero");
  } else if (num < 1 || num > 5) {
    guardarLocalStorage({});
    return showError("Ingrese un numero entre el rango de 1 y 5");
  }
};

const showError = (msg) => {
  contenedor.innerHTML = `
  <div class="cardError">
  <p class="error">${msg}</p>
  </div>
  `;
};
const guardarLocalStorage = (pizza) => {
  localStorage.setItem("ultimaPizza", JSON.stringify(pizza));
};
const renderPizza = (json) => {
  try {
    const { nombre, precio, ingredientes, imagen } = json;
    const lista = document.createElement("ul");
    ingredientes.forEach((ingrediente) => {
      const ingredienteItem = document.createElement("li");
      ingredienteItem.textContent = ingrediente;
      lista.appendChild(ingredienteItem);
    });
    const listatxt = lista.outerHTML;
    contenedor.innerHTML = `        
  <article class="card">
  <div class="info">
  <h2>${nombre}</h2>
    <p>ingredientes:</p>
    ${listatxt}
    <h3>$${precio}</h3>
  </div>
  <img src="${imagen}" alt="" />
  </article>`;
  } catch (error) {
    console.log("el json esta dañado o no existe!");
  }
};
const findPizza = (num, a) => {
  let pizza = a.find((piza) => piza.id == num);
  return pizza;
};
const addPizza = (e) => {
  e.preventDefault();
  validPizza(input.value);
  renderPizza(findPizza(input.value, pizzas));
  guardarLocalStorage(findPizza(input.value, pizzas));
};

function init() {
  form.addEventListener("submit", addPizza);
  try {
    renderPizza(JSON.parse(localStorage.getItem("ultimaPizza")));
  } catch (error) {
    console.log("no hay ninguna pizza en el localstorage");
  }
}

init();
