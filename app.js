const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/bd_hotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const path = require('path'); 
  

  app.set('view engine', 'ejs');
  

  app.use(bodyParser.urlencoded({ extended: true }));
  

  app.use(express.static(__dirname + '/public'));
  
  app.use(express.urlencoded({ extended: true }));


  app.set('views', path.join(__dirname, 'views'));
  

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
            link: 'hoteles',
            submenu: [
                { title: 'Agregar Hotel', link: 'formulario' },
                { title: 'Lista de Hoteles', link: 'hoteles' },
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
  
      const dashboardText = 'En este panel, encontrarás una amplia selección de hoteles para satisfacer tus necesidades de alojamiento en diferentes destinos. Ya sea que estés planeando unas vacaciones familiares, un viaje de negocios o una escapada romántica, tenemos el lugar perfecto para ti.';
  
      const tiles = [
          {
              title: 'Hoteles',
              icon: 'fas fa-hotel',
              count: 5,
              link: 'hoteles'
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
  
//////////////////////////////////// FUNCIONALIDADES CRUD ///////////////////////////////////////////

// Hotel
const hotelSchema = new mongoose.Schema({
    name: String,
    address: String,
    rating: Number,
    price: Number
});

const Hotel = mongoose.model('Hotel', hotelSchema);

app.get('/formulario', (req, res) => {
    res.render('formulario');
});

app.post('/guardar-hotel', (req, res) => {
    const { name, address, rating, price } = req.body;
    const hotel = new Hotel({
        name,
        address,
        rating: parseInt(rating),
        price: parseFloat(price)
    });
    hotel.save()
        .then(() => {
            console.log('Nuevo hotel creado:', hotel);
            res.redirect('/formulario');
        })
        .catch((error) => {
            console.error('Error al crear hotel:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/hoteles', (req, res) => {
    Hotel.find()
        .then((hoteles) => {
            res.render('hoteles', { hoteles: hoteles });
        })
        .catch((error) => {
            console.error('Error al obtener hoteles:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/hoteles/:id/editar', (req, res) => {
    const hotelId = req.params.id;
    Hotel.findById(hotelId)
        .then((hotel) => {
            if (!hotel) {
                return res.status(404).send('Hotel no encontrado');
            }
            res.render('editar-hotel', { hotel: hotel });
        })
        .catch((error) => {
            console.error('Error al obtener el hotel para editar:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/hoteles/:id/editar', (req, res) => {
    const hotelId = req.params.id;
    const { name, address, rating, price } = req.body;
    Hotel.findByIdAndUpdate(hotelId, { name, address, rating, price }, { new: true })
        .then((hotel) => {
            if (!hotel) {
                return res.status(404).send('Hotel no encontrado');
            }
            console.log('Hotel actualizado:', hotel);
            res.redirect('/hoteles');
        })
        .catch((error) => {
            console.error('Error al actualizar el hotel:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/hoteles/:id/eliminar', (req, res) => {
    const hotelId = req.params.id;
    Hotel.findByIdAndDelete(hotelId)
        .then((hotel) => {
            if (!hotel) {
                return res.status(404).send('Hotel no encontrado');
            }
            console.log('Hotel eliminado:', hotel);
            res.redirect('/hoteles');
        })
        .catch((error) => {
            console.error('Error al eliminar el hotel:', error);
            res.status(500).send('Error interno del servidor');
        });
});

// Fly

const flySchema = new mongoose.Schema({
    name: String,
    origin_lat: Number,
    origin_lng: Number,
    destiny_lng: Number,
    destiny_lat: Number,
    price: Number,
    origin_name: String,
    destiny_name: String,
    aereo_line: String
});

const Fly = mongoose.model('Fly', flySchema);

app.get('/formularioFly', (req, res) => {
    res.render('formularioFly');
});

app.post('/guardar-fly', (req, res) => {
    const { name, origin_lat, origin_lng, destiny_lng, destiny_lat, price, origin_name, destiny_name, aereo_line } = req.body;
    const fly = new Fly({
        name,
        origin_lat,
        origin_lng,
        destiny_lng,
        destiny_lat,
        price: parseFloat(price),
        origin_name,
        destiny_name,
        aereo_line
    });
    fly.save()
        .then(() => {
            console.log('Nuevo vuelo creado:', fly);
            res.redirect('/formularioFly');
        })
        .catch((error) => {
            console.error('Error al crear vuelo:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/fly', (req, res) => {
    Fly.find()
        .then((flys) => {
            res.render('fly', { flys: flys });
        })
        .catch((error) => {
            console.error('Error al obtener flys:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/fly/:id/editar', (req, res) => {
    const flyId = req.params.id;
    Fly.findById(flyId)
        .then((fly) => {
            if (!fly) {
                return res.status(404).send('Fly no encontrado');
            }
            res.render('editar_fly', { fly: fly });
        })
        .catch((error) => {
            console.error('Error al obtener el fly para editar:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/fly/:id/editar', (req, res) => {
    const flyId = req.params.id;
    const { name, origin_lat, origin_lng, destiny_lng, destiny_lat, price, origin_name, destiny_name, aereo_line } = req.body;
    Fly.findByIdAndUpdate(flyId, { name, origin_lat, origin_lng, destiny_lng, destiny_lat, price, origin_name, destiny_name, aereo_line }, { new: true })
        .then((fly) => {
            if (!fly) {
                return res.status(404).send('Fly no encontrado');
            }
            console.log('Fly actualizado:', fly);
            res.redirect('/fly');
        })
        .catch((error) => {
            console.error('Error al actualizar el fly:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/fly/:id/eliminar', (req, res) => {
    const flyId = req.params.id;
    Fly.findByIdAndDelete(flyId)
        .then((fly) => {
            if (!fly) {
                return res.status(404).send('Fly no encontrado');
            }
            console.log('Fly eliminado:', fly);
            res.redirect('/fly');
        })
        .catch((error) => {
            console.error('Error al eliminar el fly:', error);
            res.status(500).send('Error interno del servidor');
        });
});

//Customers

const customerSchema = new mongoose.Schema({
    full_name: String,
    credit_card: String,
    total_flights: Number,
    total_lodgings: Number,
    total_tours: Number,
    phone_number: String
});

const Customer = mongoose.model('Customer', customerSchema);

app.get('/formularioCustomer', (req, res) => {
    res.render('formularioCustomer');
});

app.post('/guardar-customer', (req, res) => {
    const { full_name, credit_card, total_flights, total_lodgings, total_tours, phone_number } = req.body;
    const customer = new Customer({
        full_name,
        credit_card,
        total_flights: parseInt(total_flights),
        total_lodgings: parseInt(total_lodgings),
        total_tours: parseInt(total_tours),
        phone_number
    });
    customer.save()
        .then(() => {
            console.log('Nuevo cliente creado:', customer);
            res.redirect('/formularioCustomer');
        })
        .catch((error) => {
            console.error('Error al crear cliente:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/customers', (req, res) => {
    Customer.find()
        .then((customers) => {
            res.render('customers', { customers: customers });
        })
        .catch((error) => {
            console.error('Error al obtener clientes:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/customers/:id/editar', (req, res) => {
    const customerId = req.params.id;
    Customer.findById(customerId)
        .then((customer) => {
            if (!customer) {
                return res.status(404).send('Cliente no encontrado');
            }
            res.render('editar_customer', { customer: customer });
        })
        .catch((error) => {
            console.error('Error al obtener el cliente para editar:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/customers/:id/editar', (req, res) => {
    const customerId = req.params.id;
    const { full_name, credit_card, total_flights, total_lodgings, total_tours, phone_number } = req.body;
    Customer.findByIdAndUpdate(customerId, { full_name, credit_card, total_flights, total_lodgings, total_tours, phone_number }, { new: true })
        .then((customer) => {
            if (!customer) {
                return res.status(404).send('Cliente no encontrado');
            }
            console.log('Cliente actualizado:', customer);
            res.redirect('/customers');
        })
        .catch((error) => {
            console.error('Error al actualizar el cliente:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/customers/:id/eliminar', (req, res) => {
    const customerId = req.params.id;
    Customer.findByIdAndDelete(customerId)
        .then((customer) => {
            if (!customer) {
                return res.status(404).send('Cliente no encontrado');
            }
            console.log('Cliente eliminado:', customer);
            res.redirect('/customers');
        })
        .catch((error) => {
            console.error('Error al eliminar el cliente:', error);
            res.status(500).send('Error interno del servidor');
        });
});

//tour

const tourSchema = new mongoose.Schema({
    name: String,
    id_customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

const Tour = mongoose.model('Tour', tourSchema);

app.get('/formularioTour', (req, res) => {
    Customer.find()
        .then((customers) => {
            res.render('formularioTour', { customers: customers });
        })
        .catch((error) => {
            console.error('Error al obtener clientes:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/guardar-tour', (req, res) => {
    const { name, id_customer } = req.body; 
    const tour = new Tour({
        name, 
        id_customer
    });
    tour.save()
        .then(() => {
            console.log('Nuevo tour creado:', tour);
            res.redirect('/formularioTour');
        })
        .catch((error) => {
            console.error('Error al crear tour:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.get('/tours', async (req, res) => {
    try {
        const tours = await Tour.find().populate('id_customer');
        res.render('tours', { tours: tours });
    } catch (error) {
        console.error('Error al obtener tours:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/tours/:id/editar', (req, res) => {
    const tourId = req.params.id;
    Tour.findById(tourId)
        .then((tour) => {
            if (!tour) {
                return res.status(404).send('Tour no encontrado');
            }
            Customer.find()
                .then((customers) => {
                    res.render('editar_tour', { tour: tour, customers: customers });
                })
                .catch((error) => {
                    console.error('Error al obtener clientes:', error);
                    res.status(500).send('Error interno del servidor');
                });
        })
        .catch((error) => {
            console.error('Error al obtener el tour para editar:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/tours/:id/editar', (req, res) => {
    const tourId = req.params.id;
    const { name, id_customer } = req.body; // Se añade el campo "name"
    Tour.findByIdAndUpdate(tourId, { name, id_customer }, { new: true }) // Se añade el campo "name"
        .then((tour) => {
            if (!tour) {
                return res.status(404).send('Tour no encontrado');
            }
            console.log('Tour actualizado:', tour);
            res.redirect('/tours');
        })
        .catch((error) => {
            console.error('Error al actualizar el tour:', error);
            res.status(500).send('Error interno del servidor');
        });
});

app.post('/tours/:id/eliminar', (req, res) => {
    const tourId = req.params.id;
    Tour.findByIdAndDelete(tourId)
        .then((tour) => {
            if (!tour) {
                return res.status(404).send('Tour no encontrado');
            }
            console.log('Tour eliminado:', tour);
            res.redirect('/tours');
        })
        .catch((error) => {
            console.error('Error al eliminar el tour:', error);
            res.status(500).send('Error interno del servidor');
        });
});

//ticket

const ticketSchema = new mongoose.Schema({
    price: Number,
    tour_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    },
    fly_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fly'
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    departure_date: Date,
    arrival_date: Date,
    date_purchase: Date
});

const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/formularioTicket', async (req, res) => {
    try {
        const tours = await Tour.find();
        const flys = await Fly.find();
        const customers = await Customer.find();
        res.render('formularioTicket', { tours: tours, flys: flys, customers: customers });
    } catch (error) {
        console.error('Error al obtener información para el formulario de tickets:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/guardar-ticket', async (req, res) => {
    try {
        const { price, tour_id, fly_id, customer_id, departure_date, arrival_date, date_purchase } = req.body;
        const ticket = new Ticket({
            price: price,
            tour_id: tour_id,
            fly_id: fly_id,
            customer_id: customer_id,
            departure_date: departure_date,
            arrival_date: arrival_date,
            date_purchase: date_purchase
        });
        await ticket.save();
        console.log('Nuevo ticket creado:', ticket);
        res.redirect('/formularioTicket');
    } catch (error) {
        console.error('Error al crear ticket:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('tour_id fly_id customer_id');
        res.render('tickets', { tickets: tickets });
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/tickets/:id/editar', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);
        const tours = await Tour.find();
        const flys = await Fly.find();
        const customers = await Customer.find();
        res.render('editar_ticket', { ticket: ticket, tours: tours, flys: flys, customers: customers });
    } catch (error) {
        console.error('Error al obtener el ticket para editar:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/tickets/:id/editar', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const { price, tour_id, fly_id, customer_id, departure_date, arrival_date, date_purchase } = req.body;
        await Ticket.findByIdAndUpdate(ticketId, {
            price: price,
            tour_id: tour_id,
            fly_id: fly_id,
            customer_id: customer_id,
            departure_date: departure_date,
            arrival_date: arrival_date,
            date_purchase: date_purchase
        });
        console.log('Ticket actualizado');
        res.redirect('/tickets');
    } catch (error) {
        console.error('Error al actualizar el ticket:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/tickets/:id/eliminar', async (req, res) => {
    try {
        const ticketId = req.params.id;
        await Ticket.findByIdAndDelete(ticketId);
        console.log('Ticket eliminado');
        res.redirect('/tickets');
    } catch (error) {
        console.error('Error al eliminar el ticket:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// reservation

const reservationSchema = new mongoose.Schema({
    date_reservation: Date,
     tour_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Tour'
     },
     hotel_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hotel'
     },
     customer_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Customer'
     },
     date_start: Date, 
     date_end: Date,
     total_days: Number, 
     price: Number
 });
 
const Reservation = mongoose.model('Reservation', reservationSchema);
 
 app.get('/formularioReservation', async (req, res) => {
     try {
         const tours = await Tour.find();
         const hotels = await Hotel.find();
         const customers = await Customer.find();
         res.render('formularioReservation', { tours: tours, hotels: hotels, customers: customers });
     } catch (error) {
         console.error('Error al obtener información para el formulario de reservas:', error);
         res.status(500).send('Error interno del servidor');
     }
 });
 
 app.post('/guardar-reservation', async (req, res) => {
     try {
         const { date_reservation, tour_id, hotel_id, customer_id, date_start, date_end, total_days, price } = req.body;
         const reservation = new Reservation({
             date_reservation: date_reservation,
             tour_id: tour_id,
             hotel_id: hotel_id,
             customer_id: customer_id,
             date_start: date_start,
             date_end: date_end,
             total_days: total_days,
             price: price
         });
         await reservation.save();
         console.log('Nueva reserva creada:', reservation);
         res.redirect('/formularioReservation');
     } catch (error) {
         console.error('Error al crear reserva:', error);
         res.status(500).send('Error interno del servidor');
     }
 });
 
 app.get('/reservations', async (req, res) => {
     try {
         const reservations = await Reservation.find().populate('tour_id hotel_id customer_id');
         res.render('reservations', { reservations: reservations });
     } catch (error) {
         console.error('Error al obtener reservas:', error);
         res.status(500).send('Error interno del servidor');
     }
 });
 
 app.get('/reservations/:id/editar', async (req, res) => {
     try {
         const reservationId = req.params.id;
         const reservation = await Reservation.findById(reservationId);
         const tours = await Tour.find();
         const hotels = await Hotel.find();
         const customers = await Customer.find();
         res.render('editar_reservation', { reservation: reservation, tours: tours, hotels: hotels, customers: customers });
     } catch (error) {
         console.error('Error al obtener la reserva para editar:', error);
         res.status(500).send('Error interno del servidor');
     }
 });
 
 app.post('/reservations/:id/editar', async (req, res) => {
     try {
         const reservationId = req.params.id;
         const { date_reservation, tour_id, hotel_id, customer_id, date_start, date_end, total_days, price } = req.body;
         await Reservation.findByIdAndUpdate(reservationId, {
             date_reservation: date_reservation,
             tour_id: tour_id,
             hotel_id: hotel_id,
             customer_id: customer_id,
             date_start: date_start,
             date_end: date_end,
             total_days: total_days,
             price: price
         });
         console.log('Reserva actualizada');
         res.redirect('/reservations');
     } catch (error) {
         console.error('Error al actualizar la reserva:', error);
         res.status(500).send('Error interno del servidor');
     }
 });
 
 app.post('/reservations/:id/eliminar', async (req, res) => {
     try {
         const reservationId = req.params.id;
         await Reservation.findByIdAndDelete(reservationId);
         console.log('Reserva eliminada');
         res.redirect('/reservations');
     } catch (error) {
         console.error('Error al eliminar la reserva:', error);
         res.status(500).send('Error interno del servidor');
     }
 });

  // Puerto en el que el servidor escucha las solicitudes
  const PORT = 3000;
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  