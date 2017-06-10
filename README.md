# app-daskboard-skeleton README #

Plantilla base y abierta a todo el mundo para tomar como base y partida de una aplicación JQuery+Bootstrap+AngularJS completamente cross devices and cross browsers de estilo dashboard principal y gatgets o mini aplicaciones corriendo dentro de ella en forma de modulos complementarios.

La característica principal de esta aplicación es que es full cross devices and browsers: lo que quiere decir que implementa todos los mecanismos y herramientas necesarias para publicarla tanto como una aplicación para cualquier dispositivo móvil del mercado: Android, iOS, WinMobile..., como para ser publicada en un servidor web y consumida desde cualquier navegador web del mercado: Chrome, FF, Safari, IE... (Y en un futuro se implementaran los mecanismos necesarios para que también pueda ser publicada como un aplicación de escritorio: Win, Mac y Linux)

Se ha cuidado mucho todo lo referente a la velocidad de funcionamiento de la aplicación para que sea lo más optima y fluida posible, a la par que lo más vistosa posible con una estetica muy cuidada, pulida y con efectos de animación de la aplicación también muy cuidados, pulidos y controlados para que hagan más amena la experiencia del usuario, pero sin que se convierta en una limitación cuando se esta ejecutando en dispositivos muy precarios o desde conexiones muy lentas. Para ello se controla la velocidad de conexión del usuario, y en la medida de lo posible el rendimiento y capacidades del dispositivo que lo esta soportado y se ajusta el funcionamiento de la aplicación, para intentar ofrecer en todo momento la experia más satisfactoria.

Las características principales que tiene esta aplicación son:

* Full Cross devices and browsers
* Control completo y seguro del acceso de usuarios a la aplicación
* Sistema de registro de usuarios con las principales redes sociales
* Registro y traza de uso de la aplicación por parte de los usuarios mediante sistema de logs almacenados en el dispositivo que este corriendo

Librerias utilizadas y versiones: 

* JQuery v.1.12.4
* Bootstrap v.3.3.7
* Font-Awesome v.4.7.0
* AngularJS v.1.6.4
* AngularCSS v.1.0.8

Los modulos AngularJS creados como parte del core de la app son: 

* app-auth: Autenticación y gestión de acceso de usuarios a la aplicación
* app-ui: Gestor de todo lo relacionado con la interfaz gráfica

Los modulos AngularJS de terceros que se han utilizados son: 

* angularCSS: para carga los estilos de forma parcial

Para minimizar el tiempo que tarda la aplicación en mostrarle algo mínimamente al usuario para que este sepa que esta viva y cargando se ha implementa un sistema de autocarga, con un sistema de autocarga nos referimos a un sistema en el que se minimiza al máximo todo el código html de la página index.html para que cargue super rápido, y lo antes posible mostrarle al usuario un mensaje de "Cargando..." y a partir de ahí todo el resto de los js y css tanto de las librerias externas como internas necesarias por la aplicación se van cargando desde un primer JS, que mediante JQuery los inyecta en el document.body, y una vez todo cargado es cuando se invoca mediante la función bootstrap el inicio de AngularJS y empieza toda la magia.

Por tanto la finalidad de este proyecto es tener una base de la que partir cuando se quiera desarrollar una app híbrida y totalmente compatible con todos los dispositivos y soportes. De manera que solo reste desarrollar los módulos necesarios para explotar el negocio que se desee en ese momento. Cabe destacar que en todo momento estamos hablando de la parte que hay del lado del cliente, por tanto este proyecto siempre necesitará de unos web services que lo comuniquen con la parte del lado servidor, para ello ver otro de los proyectos que estoy desarrollando donde se crea una plantilla para crear un servio REST API en PHP [phprestapi-skeleton](https://github.com/manumartor/phprestapi-skeleton)

## Demo ##

Actualmente la app-dashboar esta en una versión muy inicial de desarrollo, pero si en todo caso estas interesado en ver como va el proyecto hasta el momento enviame un mail a [manu.martor@gmail.com](manu.martor@gmail.com) y en cantado te facilitaré acceso a verlo en el servidor de desarrollo que estoy utilizando.

Una vez se tenga casi terminada la primera versión beta se colgará en su servidor público con un acceso de prueba. Vuelve dentro de unas semanas que en cuanto lo tenga actualizaré esta información para publicar los datos de acceso.

## Issues ##

Visit the [gitHub issues tracker](https://github.com/manumartor/app-dashboard-skeleton/wiki).

## Author ##

* Manu Martínez ([http://www.martor.es](http://www.martor.es)): manu.martor@gmail.com

## License ##

Apache 2.0 [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)