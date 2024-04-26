# Suarez Brian Alan - TP1 Sala De Juegos
 Laboratorio IV (2024)
WEB: https://tp1-labo4-suarezbrianalan.web.app/home
# Sala de Juegos

**¡Importante!**
- Este proyecto es un Trabajo Práctico (TP) obligatorio para acceder al TP final y para poder promocionar la materia.

## Descripción del Proyecto

El proyecto consiste en la creación de una aplicación web llamada "Sala de Juegos" diseñada para almacenar información sobre el desempeño de los jugadores. La aplicación permitirá a los usuarios medir sus capacidades cognitivas y motrices a través de una serie de juegos. La corrección del proyecto se realizará por sprint de una semana y la aplicación debe cumplir con los siguientes puntos:

1. **Servidor:**
   - La aplicación debe estar desplegada en un servidor Heroku o Firebase.

2. **Almacenamiento de Datos:**
   - Se utilizará la base de datos de Firebase para almacenar la información de los jugadores y los resultados de los juegos.

3. **Login y Registro de Usuarios:**
   - Los usuarios deben poder iniciar sesión y registrarse para acceder a la aplicación.

4. **Lógica de los Juegos:**
   - Implementación de los siguientes juegos:
     - Ahorcado
     - Mayor o Menor
     - Preguntados
   - Los alumnos deben agregar un juego propio, excluyendo Tateti, Memotest y Piedra, Papel o Tijera.

5. **Experiencia de Usuario:**
   - Diseño de pantallas intuitivo.
   - Navegación fluida.
   - Mensajes claros y completos durante la interacción.
   - Experiencia de usuario optimizada en los juegos.

6. **Diseño y Estilos:**
   - Utilización de primeNG, Angular Material o Boostrap para estilos y componentes.
   - Implementación de animaciones con CSS o TypeScript.
   - Inclusión de favicon para identificación visual.

7. **Listados con los Resultados.**

8. **Presentación "Quién Soy":**
   - Inclusión de datos personales del alumno.
   - Agregar una imagen del alumno.
   - Explicación del juego propio desarrollado por el alumno.

## Fechas de Pre-Entrega

### Sprint 1:
- Armado del proyecto.
- Despliegue en Heroku o Firebase.
- Implementación del componente de Login.
- Implementación del componente Home.
- Implementación del componente "Quién Soy".
- Inclusión de favicon.

### Sprint 2:

#### Componente Home
- Este componente debe ser el principal de la aplicación y ofrecer accesos a los diferentes juegos y listados disponibles.
- Si el usuario está logueado, se debe mostrar información sobre el mismo y un botón de Log Out. No se deben mostrar los botones de Registro y Login una vez que el usuario está logueado.

#### Componente Login
- Este componente debe realizar la validación del usuario contra Firebase.
- Debe registrar el log de ese usuario en Firebase.
  - En caso de que la validación sea exitosa, se debe registrar:
    - Usuario
    - Fecha de ingreso
- En caso correcto, se debe redirigir a la página principal (Home).
- Debe incluir botones de acceso rápido que completen automáticamente los campos de email y contraseña con un usuario válido. Al presionar el botón ingresar, el usuario debe acceder a la página principal (Home).

#### Componente Registro
- Este componente debe permitir la creación de un nuevo usuario.
- Al crear exitosamente un usuario, se debe redirigir a la página principal (Home) y loguear al usuario automáticamente.
- Debe emitir un mensaje si el usuario ya se encuentra registrado. (NO USAR ALERT)

### Sprint 3:

#### Incorporar el chat
- Solo los usuarios logueados podrán acceder a la sala de chat.
  - Se debe marcar el usuario y la hora en que se envió el mensaje.

#### Incorporar módulos y loadChildren

#### Incorporar los juegos
- **Ahorcado:**
  - No se debe ingresar datos desde el teclado. Utilizar botones para el ingreso de las letras.
  
- **Mayor o Menor:**
  - Desde un mazo de cartas se va a preguntar si la siguiente es mayor o menor. El jugador sumará un punto por cada carta que adivine.

### Sprint 4 (Clase 05):

- Agregar el juego Preguntados
  - Tiene que obtener las imágenes de una API.
  - Realizar el llamado a la API desde un Service.
  - Dar al jugador opciones de elección. No se puede ingresar datos por teclado.
  
- Juego propio
  - Realizar un juego propio.
    - Juegos que no se pueden utilizar: TATETI, MEMOTEST, PIEDRA PAPEL O TIJERA
  - Agregar descripción de su juego en la sección “Quién soy”. Debe contar con información de qué juego es y cómo se juega.

### Sprint 5 (Clase 06):

- Incorporar listado de resultados
  - Al finalizar cada juego se debe guardar registro del resultado.
    - Guardar datos del usuario, fecha, puntaje, etc.
    
- Incorporar una encuesta
  - Pedir los siguientes datos:
    - Nombre y apellido.
    - Edad, validar que sean mayores de 18 años y menores de 99 años.
    - Número de teléfono, validar que sean solo números y no más de 10 caracteres.
  - Mínimo 3 preguntas.
    - Utilizar distintos controles, textbox, checkbox, radiobutton, etc.
    - No se pueden repetir.
  - Contar con validaciones.
  - Todos los campos son requeridos.
  - Guardar las respuestas en Firebase identificando el usuario.

### Sprint 6 - Post Primer Parcial:

- Incorporar una nueva sección que muestre las respuestas de la encuesta.
  - Solo lo podrá ver un usuario con perfil administrador.
  - Utilizar Can Activate y Guard.
