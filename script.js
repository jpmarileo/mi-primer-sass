// script.js - Pizzería La Mafia (versión limpia y funcional)
let carrito = [];

const menu = [
    { id: 1, nombre: "Margarita Mafiosa", precio: 8900, img: "images/margarita.jpg" },
    { id: 2, nombre: "Pepperoni del Capo", precio: 10900, img: "images/pepperoni.jpg" },
    { id: 3, nombre: "Cuatro Quesos Traición", precio: 11900, img: "images/cuatro-quesos.jpg" },
    { id: 4, nombre: "Hawaiana Maldita", precio: 9900, img: "images/hawaiana.jpg" }
];

const grid = document.getElementById('menu-grid');
const carritoBtn = document.querySelector('.carrito');
const modalCarrito = document.getElementById('cart-modal');
const modalPedido = document.getElementById('order-modal');

// Generar tarjetas de pizzas
menu.forEach(pizza => {
    grid.innerHTML += `
        <div class="tarjeta">
            <img src="${pizza.img}" alt="${pizza.nombre}">
            <div class="tarjeta-content">
                <h3>${pizza.nombre}</h3>
                <div class="precio">$${pizza.precio.toLocaleString('es-CL')}</div>
                <button class="boton agregar" data-id="${pizza.id}">Agregar al carrito</button>
            </div>
        </div>
    `;
});

// Agregar al carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const pizza = menu.find(p => p.id === id);
        carrito.push(pizza);
        carritoBtn.textContent = `Carrito (${carrito.length})`;
    }
});

// Abrir modal carrito
carritoBtn.addEventListener('click', () => {
    mostrarCarrito();
    modalCarrito.style.display = 'flex';
});

// Cerrar modales
document.querySelectorAll('.cerrar').forEach(btn => {
    btn.addEventListener('click', () => {
        modalCarrito.style.display = 'none';
        modalPedido.style.display = 'none';
    });
});

function mostrarCarrito() {
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    let total = 0;
    carrito.forEach(pizza => {
        total += pizza.precio;
        itemsContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin:12px 0;">
                <span>${pizza.nombre}</span>
                <span>$${pizza.precio.toLocaleString('es-CL')}</span>
            </div>
        `;
    });
    document.getElementById('cart-total').textContent = `$${total.toLocaleString('es-CL')}`;
}

// Abrir modal de pago
document.getElementById('btn-pagar').addEventListener('click', () => {
    modalCarrito.style.display = 'none';
    modalPedido.style.display = 'flex';
    mostrarResumenPedido();
});

function mostrarResumenPedido() {
    const summary = document.getElementById('cart-summary');
    summary.innerHTML = '<h3>Resumen del pedido</h3>';
    let total = 0;
    carrito.forEach(pizza => {
        total += pizza.precio;
        summary.innerHTML += `<div style="display:flex; justify-content:space-between; margin:8px 0;"><span>${pizza.nombre}</span><span>$${pizza.precio.toLocaleString('es-CL')}</span></div>`;
    });
    summary.innerHTML += `<hr><div style="font-weight:bold; font-size:1.3rem;">Total: $${total.toLocaleString('es-CL')}</div>`;
}

// Confirmar pedido final
document.getElementById('btn-confirmar-pedido').addEventListener('click', () => {
    const tipo = document.querySelector('input[name="tipo-pedido"]:checked').value;
    const direccion = document.getElementById('direccion') ? document.getElementById('direccion').value.trim() : '';

    if (tipo === 'delivery' && !direccion) {
        alert("Falta la dirección de delivery.");
        return;
    }

    const ticket = Math.floor(10000 + Math.random() * 90000);
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);

    alert(`PEDIDO CONFIRMADO #${ticket}\nTotal: $${total.toLocaleString('es-CL')}\n\n¡Gracias por tu compra!`);

    carrito = [];
    carritoBtn.textContent = `Carrito (0)`;
    modalCarrito.style.display = 'none';
    modalPedido.style.display = 'none';
});

// Vaciar carrito
document.getElementById('btn-vaciar').addEventListener('click', () => {
    carrito = [];
    carritoBtn.textContent = `Carrito (0)`;
    modalCarrito.style.display = 'none';
});