// Variables globales
const eventos = [
    { id: 1, tipo: "Maquillaje social", costoBase: 60000, costoPorCliente: 45000 },
    { id: 2, tipo: "Maquillaje de novia", costoBase: 170000, costoPorCliente: 45000 },
    { id: 3, tipo: "Maquillaje de noche", costoBase: 60000, costoPorCliente: 45000 },
];

// Función para inicializar el formulario
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Crear un título
    const titulo = document.createElement("h1");
    titulo.textContent = "Calculadora de Presupuesto de Maquillaje";

    // Crear un formulario
    const form = document.createElement("form");
    form.id = "presupuestoForm";

    // Dropdown para seleccionar tipo de evento
    const selectEvento = document.createElement("select");
    selectEvento.id = "tipoEvento";
    eventos.forEach((evento) => {
        const option = document.createElement("option");
        option.value = evento.id;
        option.textContent = evento.tipo;
        selectEvento.appendChild(option);
    });

    // Input para cantidad de clientes
    const inputClientes = document.createElement("input");
    inputClientes.type = "number";
    inputClientes.id = "cantidadClientes";
    inputClientes.placeholder = "Número de clientes";
    inputClientes.min = 1;

    // Botón para calcular
    const botonCalcular = document.createElement("button");
    botonCalcular.type = "submit"; // Cambiar el tipo a "submit"
    botonCalcular.textContent = "Calcular Presupuesto";

    // Div para mostrar resultados
    const divResultado = document.createElement("div");
    divResultado.id = "resultado";
    divResultado.style.marginTop = "20px";

    // Evento para manejar el envío del formulario (Enter o botón)
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const tipoEvento = parseInt(selectEvento.value, 10);
        const cantidadClientes = parseInt(inputClientes.value, 10);

        if (isNaN(tipoEvento) || isNaN(cantidadClientes) || cantidadClientes < 1) {
            divResultado.textContent = "Por favor, ingresa datos válidos.";
            return;
        }

        const datos = { tipoEvento, cliente: cantidadClientes };
        const resultado = calcularPresupuesto(datos);

        if (resultado) {
            mostrarResultado(resultado, divResultado);
        }
    });

    // Agregar elementos al formulario
    form.appendChild(selectEvento);
    form.appendChild(inputClientes);
    form.appendChild(botonCalcular);

    // Agregar todo al contenedor principal
    app.appendChild(titulo);
    app.appendChild(form);
    app.appendChild(divResultado);
});

// Función para calcular presupuesto
function calcularPresupuesto({ tipoEvento, cliente }) {
    const eventoSeleccionado = eventos.find((evento) => evento.id === tipoEvento);

    if (!eventoSeleccionado) {
        return null;
    }

    const costoPrimerCliente = eventoSeleccionado.costoBase;
    const costoClientesAdicionales =
        cliente > 1 ? (cliente - 1) * eventoSeleccionado.costoPorCliente : 0;

    const total = costoPrimerCliente + costoClientesAdicionales;

    return {
        tipo: eventoSeleccionado.tipo,
        costoPrimerCliente,
        clientesAdicionales: cliente > 1 ? cliente - 1 : 0,
        costoPorCliente: eventoSeleccionado.costoPorCliente,
        total,
    };
}

// Función para mostrar resultados
function mostrarResultado(resultado, divResultado) {
    divResultado.innerHTML = `
        <h2>Presupuesto Calculado</h2>
        <p><strong>Tipo:</strong> ${resultado.tipo}</p>
        <p><strong>Costo primer cliente:</strong> $${resultado.costoPrimerCliente}</p>
        <p><strong>Clientes adicionales:</strong> ${resultado.clientesAdicionales}</p>
        <p><strong>Costo por cliente adicional:</strong> $${resultado.costoPorCliente}</p>
        <p><strong>Total:</strong> $${resultado.total}</p>
    `;
}
