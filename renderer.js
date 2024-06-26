class Marcadores{
    constructor(){
        this.mensajeError = document.querySelector('.mensaje-error');
        this.marcadorUrl = document.querySelector('.creacion-marcador-url');
        this.marcadorBoton = document.querySelector('.creacion-marcador-boton');
        this.formularioCreacionMarcadores = document.querySelector('.creacion-marcador-formulario');
        this.marcadores = document.querySelector('.marcadores');
        this.eliminarMarcadores = document.querySelector('.remover-marcadores');

        this.parser = new DOMParser();

        this.agregarEventListeners();
        this.visualizarMarcadores();
    }

    agregarEventListeners(){
        this.marcadorUrl.addEventListener('keyup', () =>{
            this.marcadorBoton.disabled = !this.marcadorUrl.validity.valid;
        });
        this.eliminarMarcadores.addEventListener('click', ()=>{
            this.accionEliminarMarcadores();
            this.visualizarMarcadores();
        })

        this.formularioCreacionMarcadores.addEventListener('submit', this.crearMarcador.bind(this))
    }

    crearMarcador(evento){
        evento.preventDefault();
        const url = this.marcadorUrl.value;
        fetch(url).then(respuesta => respuesta.text())
        .then(this.extraerContenido.bind(this)).then(this.encontrarTituloPagina)
        .then(titulo => this.almacenarMarcador(url,titulo))
        .then(this.limpiarFormulario.bind(this)).then(this.visualizarMarcadores.bind(this))
        .catch(error => this.reportarError(error, url));

    }

    extraerContenido(contenido){
        return this.parser.parseFromString(contenido, 'text/html');
    }

    encontrarTituloPagina(html){
        return html.querySelector('title').innerText;
    }
    almacenarMarcador(url,titulo){
        localStorage.setItem(url, JSON.stringify({titulo,url}));
    }
    limpiarFormulario(){
        this.marcadorUrl.value = null;
    }
    obtenerMarcadores(){
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)));
    }
    accionEliminarMarcadores(){
        localStorage.clear();
    }

    generarMarcador(marcador){
        return `<div class='enlace'><h3>${marcador.titulo}</h3>
        <p><a href="${marcador.url}">${marcador.url}</a></p>
        </div>`;
    }

    visualizarMarcadores(){
        let marcadores = this.obtenerMarcadores();
        let html = marcadores.map(this.generarMarcador).join('');
        this.marcadores.innerHTML = html 
    }
    reportarError(error,url){
        this.mensajeError.innerHTML = `Ocurrio un error al intentar acceder a ${url}: ${error}`;
        setTimeout(()=>{
            this.mensajeError.innerHTML = null;
        },5000)
    }
}

new Marcadores();
