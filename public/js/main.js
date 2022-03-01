const socket = io.connect();
function enviarMensaje(){
    const nombre = document.querySelector('#nombre');
    const mensaje = document.querySelector('#mensaje');

    socket.emit('mensajeNuevo', {autor: nombre.value, texto: mensaje.value});
    return false;
}

socket.on('mensajes', mensajes =>{
    console.log(mensajes);
    let contMensajeHtml = "";
    mensajes.forEach(mensaje => {
        contMensajeHtml += '<span><b>Autor: ' + mensaje.autor+ '  </b>Mensaje: ' + mensaje.texto + '</span><br></br>';

    });
    document.getElementById('contenedorMsjs').innerHTML = contMensajeHtml;
});
