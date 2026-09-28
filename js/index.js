//MODAL inicio 
class ModalSpidey {
    constructor(configuracion) {
        this.titulo = configuracion.titulo || 'ALERTA DEL SISTEMA';
        this.contenido = configuracion.contenido || '';
        this.textoBoton = configuracion.textoBoton || 'Aceptar';
        
        this.construirDOM();
    }

    construirDOM() {
        this.superposicion = document.createElement('div');
        this.superposicion.className = 'superposicion-modal';
        
        this.caja = document.createElement('div');
        this.caja.className = 'caja-modal';
        
        this.caja.innerHTML = `
            <div class="cabecera-modal">
                <div class="titulo-modal">${this.titulo}</div>
                <button class="btn-cerrar-modal">X</button>
            </div>
            <div class="cuerpo-modal">
                ${this.contenido}
            </div>
            <button class="btn-cian-modal">${this.textoBoton}</button>
        `;

        this.superposicion.appendChild(this.caja);
        document.body.appendChild(this.superposicion);

        const btnCerrar = this.caja.querySelector('.btn-cerrar-modal');
        const btnAccion = this.caja.querySelector('.btn-cian-modal');

        btnCerrar.addEventListener('click', () => this.cerrar());
        btnAccion.addEventListener('click', () => this.cerrar());
        
        this.superposicion.addEventListener('click', (evento) => {
            if (evento.target === this.superposicion) this.cerrar();
        });
    }

    abrir() {
        this.superposicion.classList.add('activo');
    }

    cerrar() {
        this.superposicion.classList.remove('activo');
    }
}

// INICIALIZACIÓN DEL SISTEMA
document.addEventListener("DOMContentLoaded", () => {
    
    // --- REFERENCIAS DEL DOM ---
    const lineasTerminal = document.querySelectorAll(".lineas-terminal li");
    const contenedorTerminal = document.querySelector(".toast-terminal");
    const barraProgreso = document.querySelector(".relleno-barra-progreso");
    const textoProgreso = document.querySelector(".texto-progreso");
    
    const panelBienvenida = document.getElementById("panelBienvenida");
    const btnEntrar = document.getElementById("btnEntrar");
    
    const btnAbrirMenu = document.getElementById('btnAbrirMenu');
    const btnCerrarMenu = document.getElementById('btnCerrarMenu');
    const menuLateral = document.getElementById('menuLateral');
    
    const btnTrailer = document.getElementById('btnTrailer');

    // --- TERMINAL TOAST ---
    lineasTerminal.forEach(linea => linea.style.display = "none");

    let lineaActual = 0;
    const tiempoEntreLineas = 700; 

    function mostrarSiguienteLinea() {
        if (lineaActual < lineasTerminal.length) {
            lineasTerminal[lineaActual].style.display = "block";
            lineaActual++;
            setTimeout(mostrarSiguienteLinea, tiempoEntreLineas);
        } else {
            setTimeout(() => {
                contenedorTerminal.style.transition = "opacity 0.5s ease";
                contenedorTerminal.style.opacity = "0";
                
                setTimeout(() => {
                    contenedorTerminal.style.display = "none";
                    if (panelBienvenida) panelBienvenida.classList.add("activo");
                }, 500);
            }, 2500);
        }
    }

    // --- BARRA DE PROGRESO ---
    let porcentajeProgreso = 0;
    const duracionTotalCarga = (lineasTerminal.length * tiempoEntreLineas) + 1000; 
    const intervaloCarga = duracionTotalCarga / 100; 

    function actualizarProgreso() {
        if (porcentajeProgreso >= 100) {
            clearInterval(intervaloProgreso);
            textoProgreso.innerText = "SISTEMA LISTO";
            barraProgreso.style.backgroundColor = "var(--borde-verde)"; 
        } else {
            porcentajeProgreso++;
            barraProgreso.style.width = porcentajeProgreso + "%";
        }
    }

    const intervaloProgreso = setInterval(actualizarProgreso, intervaloCarga);
    setTimeout(mostrarSiguienteLinea, 500);

    // --- BOTÓN PANEL CENTRAL ---
    if (btnEntrar) {
        btnEntrar.addEventListener("click", () => {
            panelBienvenida.classList.remove("activo");
        });
    }

    // --- MENÚ LATERAL (SLIDER) ---
    if (btnAbrirMenu && btnCerrarMenu && menuLateral) {
        btnAbrirMenu.addEventListener('click', () => {
            menuLateral.classList.add('activo');
        });

        btnCerrarMenu.addEventListener('click', () => {
            menuLateral.classList.remove('activo');
        });

        document.addEventListener('click', (evento) => {
            if (!menuLateral.contains(evento.target) && 
                !btnAbrirMenu.contains(evento.target) && 
                menuLateral.classList.contains('activo')) {
                
                menuLateral.classList.remove('activo');
            }
        });
    }

    // --- MODAL DE COOKIES ---
    const modalTrailer = new ModalSpidey({
        titulo: 'UTILIZAMOS COOKIES',
        contenido: `
            <h4>YOUTUBE.COM &#9632;</h4>
            <p>Name<br>YSC<br>Host<br>youtube.com<br>description</p>
            <p>YouTube es una plataforma propiedad de Google para alojar y compartir vídeos. YouTube recopila datos de usuarios a través de vídeos incrustados en sitios web, que se agregan con datos de perfil de otros servicios de Google con el fin de mostrar publicidad dirigida a los visitantes de la web en una amplia gama de sus propios sitios web y otros.</p>
        `,
        textoBoton: 'Update Preferences'
    });

    if(btnTrailer) {
        btnTrailer.addEventListener('click', () => {
            modalTrailer.abrir();
        });
    } 
});

// Logs 
setTimeout(() => {
    console.log("%c[SPIDEY OS] INICIALIZANDO NÚCLEO DEL SISTEMA v4.2.0", "color: #4cd4eb; font-weight: bold; font-size: 14px;");
    console.log("%c[OK] Clase ModalSpidey registrada y lista para instanciar.", "color: #3ac6af; font-size: 11px;");
    console.log("%c[OK] Secuencia de terminal Toast en ejecución...", "color: #3ac6af; font-size: 11px;");
    console.log("%c[OK] Eventos de interfaz y menú lateral cargados al 100%.", "color: #3ac6af; font-size: 11px;");
    console.warn("%c[ADVERTENCIA] Rastreador detectando actividad inusual en la red...", "color: #f4c055; font-size: 11px; font-weight: bold;");
    console.log("%c[INFO] Esperando comandos del usuario...", "color: #68737c; font-style: italic;");
}, 100);