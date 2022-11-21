const dni = document.getElementById("dni"),
  nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  btnLogin = document.getElementById("btnLogin"),
  btnConfirmar = document.getElementById("btnConfirmar"),
  btnReset = document.getElementById("btnReset"),
  btnRegistrarse = document.getElementById("btnRegistrarse");

class Usuario {
  constructor(dni, nombre, apellido, id) {
    this.dni = parseInt(dni);
    this.nombre = nombre;
    this.apellido = apellido;
    this.id = id;
  }

  asignarId(usuarios) {
    this.id = usuarios.length;
  }
}

const usuarios = [new Usuario(28656220, "Elizabeth", "Olmos", 1)];

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("dni", JSON.stringify(dni.value));
  for (let usuario of usuarios) {
    const usuarioEncontrado = usuarios.some(
      (usuario) => usuario.dni == dni.value
    );
    if (usuarioEncontrado) {
      let usuarioDni = usuarios.filter((usuario) => usuario.dni == dni.value);
      document.querySelector("#reserva").style.display = "flex";
      const diaReserva = document.querySelector(".diaConfirmado");
      const horaReserva = document.querySelector(".horaConfirmada");
      btnConfirmar.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#mostrarReserva").style.display ="flex";
        localStorage.setItem("diaReserva", JSON.stringify(diaReserva.value));
        localStorage.setItem("horaReserva", JSON.stringify(horaReserva.value));

        for (usuario of usuarioDni) {
          usuario.reserva = {
            fecha: JSON.parse(localStorage.getItem("diaReserva")),
            hora: JSON.parse(localStorage.getItem("horaReserva")),
          };
        }
        const datosReserva = document.querySelector("#mostrarReserva");
        datosReserva.innerHTML = `<p>Se ha generado la siguiente reserva para el día  ${usuario.reserva.fecha} de  ${usuario.reserva.hora}  hs. Gracias  ${usuario.nombre}  por usar nuestro gestor de reservas.</p> `;
        setInterval("location.reload()", 10000);
      });
    } else {
      document.querySelector(".login").style.display = "none";
      document.querySelector("#loginIncorrecto").style.display = "flex";

      btnRegistrarse.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#datoUsuarioNuevo").style.display ="flex";
        const usuario = new Usuario(dni.value, nombre.value, apellido.value);
        usuarios.push(usuario);
        usuario.asignarId(usuarios);

        localStorage.setItem("usuarioNuevo", JSON.stringify(usuario));
        
        let usuarioRecuperado = JSON.parse(
          localStorage.getItem("usuarioNuevo")
        );
        let usuarioId = usuarios.filter(
          (usuario) => usuario.id == usuarioRecuperado.id
        );
        
        let datosNuevos = document.querySelector("#datoUsuarioNuevo");
        for (const elemento of usuarioId) {
          datosNuevos.innerHTML = `<p>Te registraste con éxito, tus datos son: <br>Nombre: ${elemento.nombre}<br>Apellido: ${elemento.apellido}<br>D.N.I. N°: ${elemento.dni}<br>¡BIENVENIDO!</p> `;
          
        }
        
        setInterval("location.reload()", 20000);
      });

    }
  }
});

btnCancelar.addEventListener("click", () => {
  btnReset.reset();
});

