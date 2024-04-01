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
    }

    agregarEventListeners(){
        this.marcadorUrl.addEventListener('keyup', () =>{
            this.marcadorBoton.disabled = !this.marcadorUrl.validity.valid;
        });

        this.marcadorBoton.addEventListener('submit', this.crearMarcador.bind(this))
    }

    crearMarcador(evento){
        evento.preventDefault();
        const url = this.marcadorUrl.nodeValue;
        fetch(url).then(respuesta => respuesta.text())
        .then(this.extraerContenido).then(this.encontrarTituloPagina)
        .then(titulo => this.almacenarMarcador(url,titulo))
        .then(this.limpiarFormulario).then(this.visualizarMarcadores)

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
    obtenerEnlaces(){
        
    }

    visualizarMarcadores(){
        
    }
}