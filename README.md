# Login

**Serrano Cortes Jonathan**

**Sanchez Jimenez Miguel Leonardo**

Este es un proyecto que se genero usando [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

GithubPages https://jonathanser.github.io/pokedex/

# Pages

## Login (Inicio de sesión / Registro)

El componente de **login** es el encargado de gestionar tanto el inicio de sesión como el registro de usuarios.
Cuenta con una interfaz sencilla y clara que permite alternar entre las dos funciones mediante un enlace interactivo.

### Estructura:

* **Formulario reactivo:** Usa Angular para manejar el evento `ngSubmit` y captura los valores de los campos de correo y contraseña.
* **Componentes reutilizables:**

  * `<app-input>`: Componente personalizado para campos de texto y contraseña, configurable mediante `@Input`.
  * `<app-button>`: Botón reutilizable que admite íconos y texto dinámico.
* **Funcionalidad dinámica:**

  * Cambia entre modo **registro** y **login** dependiendo del estado del componente (`esRegistro()`).
  * Permite enviar las credenciales a través del método `enviar()` para su posterior validación.
* **Interfaz amigable:**

  * El formulario ofrece mensajes claros para guiar al usuario y cambiar entre login y registro de forma intuitiva.


## Dashboard (Vista principal)

El **Dashboard** es la pantalla principal del sistema, diseñada para mostrar y gestionar los datos una vez que el usuario ha iniciado sesión.
Sirve como punto de entrada a las funcionalidades principales.

### Estructura:

* **Barra de navegación (`<app-navbar>`)**

  * Muestra información del usuario mediante `@Input` (`user`).
  * Facilita el acceso a otras vistas o funciones del sistema.

* **Búsqueda y filtrado (`<app-search>`)**

  * Permite buscar datos por nombre.
  * Utiliza `EventEmitter` para emitir el texto de búsqueda hacia el componente padre.

* **Tabla de datos (`<app-table>`)**

  * Muestra un listado filtrable según el texto de búsqueda.
  * Facilita la visualización de la información general del sistema.

* **Enrutamiento (`<router-outlet>`)**

  * Actúa como contenedor para renderizar componentes hijos de acuerdo a la ruta seleccionada, permitiendo mostrar detalles o formularios de edición sin perder la estructura del dashboard.


## Details Page (Vista de Detalle)

La **Details Page** es una vista dedicada a mostrar información detallada de un Pokémon específico. Esta página proporciona una experiencia visual completa y estructurada para consultar todos los datos relevantes del Pokémon seleccionado.

### Estructura y Funcionalidad:

* **Navegación:**

  * Un botón `Volver` permite regresar fácilmente a la vista anterior (lista de Pokémon).

* **Información Principal del Pokémon:**

  * Muestra la **imagen oficial** del Pokémon obtenida de la API.
  * Presenta su **nombre**, **ID**, **altura**, **peso** y **experiencia base**.
  * Lista sus **tipos** visualmente, mejorando la comprensión del usuario.

* **Estadísticas (Stats):**

  * Sección dedicada a las estadísticas base de combate, como ataque, defensa, velocidad, etc.
  * Las estadísticas se representan gráficamente mediante `mat-progress-bar` para una mejor visualización de sus valores.

* **Habilidades (Abilities):**

  * Lista todas las habilidades conocidas por el Pokémon, incluyendo si alguna de ellas es **oculta**.

* **Movimientos (Moves):**

  * Se muestra un listado de los primeros 20 movimientos que puede aprender el Pokémon para no sobrecargar la vista.

### Componentes utilizados:

* **Angular Material:**

  * `mat-card` para organizar la información.
  * `mat-divider` para separar secciones visualmente.
  * `mat-progress-bar` para representar visualmente los valores de las estadísticas.
  * `mat-stroked-button` para el botón de navegación.

## Características de la tabla:
* Paginación
  
<img width="208" height="66" alt="image" src="https://github.com/user-attachments/assets/0d9f08e6-361a-4758-a4d4-ca3625bcfeee" /> <img width="207" height="54" alt="image" src="https://github.com/user-attachments/assets/ad85992c-912c-49b6-b6ef-2f39ab369632" />

* Filtro/búsqueda por texto
<img width="1876" height="926" alt="image" src="https://github.com/user-attachments/assets/051fdb95-3f7f-4dd4-9b71-ac14b9404ab7" />

<img width="1885" height="895" alt="image" src="https://github.com/user-attachments/assets/61950191-fc13-4a17-9780-3a7b598ac480" />


* Botón "Agregar" (solo añade registros localmente, no a la API)

* Cada fila debe incluir:

Imagen pequeña (ejemplo. sprite de Pokémon, poster de película)
<img width="1858" height="216" alt="image" src="https://github.com/user-attachments/assets/33c7cd0f-1ffa-494a-93e1-432d8ae9ef98" />


Columna "Acciones" con:

Ver más: Modal/página aparte dónde se visualizará la imagen en tamaño grande + info detallada

<img width="1156" height="826" alt="image" src="https://github.com/user-attachments/assets/58df6c6e-7bfe-43d6-9a1b-af9dcbadcedb" />

Editar y Eliminar (con confirmación). Los cambios solo aplican en la tabla, no en la API.

<img width="175" height="203" alt="image" src="https://github.com/user-attachments/assets/55fa02b9-9b83-4f23-bdda-77c43506204d" />

Perfil de usuario

Mostrar tarjeta con los datos del usuario que inició sesión (nombre, email, imagen, etc.).

<img width="297" height="97" alt="image" src="https://github.com/user-attachments/assets/6f577756-9126-4c90-8098-ba959d379623" />

## Componentes
### Button
Ocupamos el componete button para poder acceder y en la parte de buscar
<img width="543" height="62" alt="image" src="https://github.com/user-attachments/assets/8e0c856c-3865-40cc-8373-ad10260b29d5" /> <img width="129" height="70" alt="image" src="https://github.com/user-attachments/assets/0c908f9b-7e17-4e49-b473-946f3201c369" />


### Card
<img width="872" height="843" alt="image" src="https://github.com/user-attachments/assets/d73ae700-bb6c-4ed3-a052-b7976f8b0b97" />

### Editar-pokemon
<img width="57" height="58" alt="image" src="https://github.com/user-attachments/assets/87826b59-34f3-4691-9cd6-fcd9ed5d0063" />

### Input
<img width="544" height="213" alt="image" src="https://github.com/user-attachments/assets/f96376c7-009b-4f7d-9e8e-05bf3ba5ed9d" />

### Navbar
<img width="1898" height="88" alt="image" src="https://github.com/user-attachments/assets/21ff60a2-9187-4215-9020-54eb94be3180" />

### Search
<img width="476" height="62" alt="image" src="https://github.com/user-attachments/assets/a0190c5d-f659-44d7-acf4-dc38e9b4110d" />

### Table
<img width="1885" height="905" alt="image" src="https://github.com/user-attachments/assets/37e28ac8-3ca0-43af-bf0a-d1e77495f01f" />

### Crear-pokemon

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
