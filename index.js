window.onload = () => {
    document.querySelector(".arrow-right").addEventListener("click", clickRight);
    document.querySelector(".arrow-left").addEventListener("click", clickLeft);
    document
      .querySelector(".send-button")
      .addEventListener("click", e => validateForm(e));
    document.querySelectorAll(".project").forEach(element => {
      element.addEventListener("click", e => openModal(e));
    });
    document.body.addEventListener("click", e => closeModal(e));
    document.body.addEventListener("keyup", e => listenForEsc(e));
  };
  
  /** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
  function clickRight() {
    const currentLeft = parseInt(
      getComputedStyle(document.querySelector(".project-container")).left,
      10
    );
    if (currentLeft < -270) { //si el valor de izquierda es menor a -270, para de mover el contenido
      return;
    }
    let newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines
    document.querySelector(".project-container").style.left = `${newValue}px`;
    switch (newValue) {
      case -270:
        document.querySelector('.project1').setAttribute("tabindex", "-1");
        document.querySelector('.project1-container').setAttribute("aria-hidden"," true");
        document.querySelector('.project4').removeAttribute("tabindex");
        document.querySelector('.project4-container').removeAttribute("aria-hidden")
        break;
      case -540:
        document.querySelector('.project2').setAttribute("tabindex", "-1");
        document.querySelector('.project2-container').setAttribute("aria-hidden", "true");
        document.querySelector('.project5').removeAttribute("tabindex");
        document.querySelector('.project5-container').removeAttribute("aria-hidden");
        break;
      default:
        break;
    }
  }
  
  /** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
  function clickLeft() {
    const currentLeft = parseInt(
      getComputedStyle(document.querySelector(".project-container")).left,
      10
    );
    if (currentLeft === 0) { //si el valor de izquiera es 0, retornar para no seguir movierno el contenido
      return;
    }
    let newValue = currentLeft + 270;
    document.querySelector(".project-container").style.left = `${newValue}px`;
    switch (newValue) {
      case -270:
        document.querySelector('.project5').setAttribute("tabindex", "-1");
        document.querySelector('.project5-container').setAttribute("aria-hidden", "true");
        document.querySelector('.project2').removeAttribute("tabindex");
        document.querySelector('.project2-container').removeAttribute("aria-hidden");
        break;
      case 0:
        document.querySelector('.project4').setAttribute("tabindex", "-1");
        document.querySelector('.project4-container').setAttribute("aria-hidden", "true");
        document.querySelector('.project1').removeAttribute("tabindex");
        document.querySelector('.project1-container').removeAttribute("aria-hidden");
        break;
      default:
        break;
    }
  }
  
  /** Validar el formulario antes de mostrar la notificacion */
  function validateForm(e) {
    e.preventDefault();
    const nameField = document.getElementById("name");
    if (nameField.value === ""){
      document.getElementById("name-error").innerHTML = "! Para enviar el formulario, se necesita un nombre";
    } else {
      showNotification();
    }
  }
  
  /** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
  function showNotification() {
    document.getElementById("name-error").innerHTML = "";
    document.querySelector('.form-container').reset();
    document.querySelector(".notification").style.display = "flex";
    document.querySelector(".notification").innerHTML = "El formulario fue enviado sin errores";
    setTimeout(function() {
      document.querySelector(".notification").style.display = "none";
    }, 3000);
  }
  
  /**Escucha por la clave esc para cerrar el modal */
  function listenForEsc(e) {
    if (e.keyCode === 27){
      closeModal(e)
    }
  }
  
  /** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
  function openModal(e) {
    document.querySelector(".modal-container").style.display = "flex";
    document.getElementById('modal-header').focus();
  }
  
  
  /** Esta funcion se llama para cerrar el modal */
  function closeModal(e) {
    // si el click occurio dentro del las imagenes del carousel o dentro del modal, no se cierra el modal
    if (
      e.target.className.includes("project") ||
      e.target.className === "modal"
    ) {
      return;
    } else {
      document.querySelector(".modal-container").style.display = "none";
    }
  }

    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'es',  // Cambiar idioma a español
            initialView: 'dayGridMonth',  // Vista mensual
            events: [
                {
                    title: 'Evento de maquillaje',
                    start: '2024-10-20',
                    end: '2024-10-21'
                },
                {
                    title: 'Disponible',
                    start: '2024-10-25'
                },
                {
                    title: 'Agenda llena',
                    start: '2024-10-28',
                    end: '2024-10-29'
                }
            ],
            eventClick: function(info) {
                // Mostrar detalles del evento en el modal
                document.getElementById('eventTitle').innerText = info.event.title;
                document.getElementById('eventDate').innerText = 
                    "Fecha: " + info.event.start.toLocaleDateString() +
                    (info.event.end ? " - " + info.event.end.toLocaleDateString() : "");

                // Mostrar el modal
                var modal = document.getElementById('eventModal');
                modal.style.display = "block";

                // Botón de cerrar el modal
                var closeButton = document.getElementsByClassName('close')[0];
                closeButton.onclick = function() {
                    modal.style.display = "none";
                }

                // Cerrar el modal al hacer clic fuera del contenido
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
        });

        calendar.render();
    });