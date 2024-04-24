const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


/* const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  const newUser = new User({
    name: 'carmen sandoval',
    email: 'sandoval@tecsup.edu.pe',
    password: '123456'
  });
  
  newUser.save().then(() => {
    console.log('New user created!');
  }).catch((error) => {
    console.error('Error creating user:', error);
  });
  
  User.find().then((users) => {
    console.log('All users:', users);
  }).catch((error) => {
    console.error('Error retrieving users:', error);
  });
 */

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const path = require('path'); // Asegúrate de importar path
  
  // Configuración de EJS como motor de plantillas
  app.set('view engine', 'ejs');
  
  // Middleware para procesar datos del cuerpo de las solicitudes HTTP
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Directorio de archivos estáticos
  app.use(express.static(__dirname + '/public'));
  
  // Establecer directorio de vistas
  app.set('views', path.join(__dirname, 'views'));
  
  // Ruta para renderizar la plantilla
  app.get('/', (req, res) => {
      const user = {
          name: 'ADMIN ESLA',
          role: 'Web Developer'
      };


      const sidebarData = [
        {
            title: 'Dashboard',
            icon: 'fab fa-dashcube fa-fw',
            link: 'home.html'
        },
        {
            title: 'Hoteles',
            icon: 'fas fa-hotel',
            link: '#',
            submenu: [
                { title: 'Agregar Hotel', link: 'client-new.html' },
                { title: 'Lista de Hoteles', link: 'client-list.html' },
                { title: 'Buscar Hotel', link: 'client-search.html' }
            ]
        },
        {
            title: 'Reservaciones',
            icon: 'fas fa-calendar-alt fa-fw',
            link: '#',
            submenu: [
                { title: 'Agregar Reserva', link: 'item-new.html' },
                { title: 'Lista de Reservaciones', link: 'item-list.html' },
                { title: 'Buscar Reservaciones', link: 'item-search.html' }
            ]
        },
        
        {
            title: 'Empleados',
            icon: 'fas fa-user-tie',
            link: '#',
            submenu: [
                { title: 'Nuevo Empleado', link: 'reservation-new.html' },
                { title: 'Lista de Empleados', link: 'reservation-list.html' },
                { title: 'Buscar Empleados', link: 'reservation-search.html' }
            ]
        },
        {
            title: 'Tours',
            icon: 'fas fa-route',
            link: '#',
            submenu: [
                { title: 'Nuevo Tours', link: 'user-new.html' },
                { title: 'Lista de Tours', link: 'user-list.html' },
                { title: 'Buscar Tours', link: 'user-search.html' }
            ]
        },
        {
            title: 'Fly',
            icon: 'fas fa-plane',
            link: '#',
            submenu: [
                { title: 'Nuevo Fly', link: 'user-new.html' },
                { title: 'Lista de Fly', link: 'user-list.html' },
                { title: 'Buscar Fly', link: 'user-search.html' }
            ]
        },
        {
            title: 'Ticket',
            icon: 'fas fa-ticket-alt',
            link: '#',
            submenu: [
                { title: 'Nuevo Ticket', link: 'user-new.html' },
                { title: 'Lista de Ticket', link: 'user-list.html' },
                { title: 'Buscar Ticket', link: 'user-search.html' }
            ]
        }
    ];
  
      const dashboardText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit nostrum rerum animi natus beatae ex. Culpa blanditiis tempore amet alias placeat, obcaecati quaerat ullam, sunt est, odio aut veniam ratione.';
  
      const tiles = [
          {
              title: 'Hoteles',
              icon: 'fas fa-hotel',
              count: 5,
              link: 'client-new.html'
          },
          {
              title: 'Reservaciones',
              icon: 'fas fa-calendar-alt',
              count: 9,
              link: 'item-list.html'
            },
            {
                title: 'Empleados',
                icon: 'fas fa-user-tie',
                count: 10,
                link: 'reservation-list.html'
            },
            {
                title: 'Tours',
                icon: 'fas fa-route',
                count: 50,
                link: 'user-list.html'
            },
            {
                title: 'Fly',
                icon: 'fas fa-plane',
                count: 1,
                link: 'company.html'
            },
            {
                title: 'Ticket',
                icon: 'fas fa-ticket-alt',
                count: 1,
                link: 'company.html'
            }
        ];
      
        res.render('home', { user, dashboardText, tiles, sidebarData });
  });
  
  // Puerto en el que el servidor escucha las solicitudes
  const PORT = 3000;
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  