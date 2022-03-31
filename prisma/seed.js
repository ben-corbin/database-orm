const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {

    
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: '123456',
                    email: '123456@example.com',
                },
            },
        },
    });

    console.log('Customer created', createdCustomer);

    // Add your code here

    const createdContact = await prisma.contact.create({
        data: {
            phone: '123',
            email: '123@example.com',
            customer: {
                create: {
                    name: 'Bob',
                },
            },
        },
    });


    const createdMovies = await prisma.movie.create({
        data: {
            title: 'Movie',
            runtimeMins: 123
        },
    })

    const createdScreen = await prisma.screen.create({
        data: {
          number: 1,
        },
      });

    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: new Date('2022-03-12T16:00') ,
            movie: {
                create: { 
                    title: 'Rocky',
                    runtimeMins: 123
                },
            },
            screen: {
                create: {
                    number: 2,
                }
            }
        },
    })

    // Ticket has no data of its own, so we need to add customer details here
    // and we need to add screening, which needs to know what screen, so connect 
    // in this case will let us create a new screening and connect it with an 
    // existing movie
    const createTicket = await prisma.ticket.create({
        data: {
            customer: {
                create: {
                    name: 'Customer Name',
                    contact: {
                        create: {
                            phone: '123',
                            email: '123@example.com',
                        },
                    },
                },
            },
            screening: {
                create: {
                    startsAt: new Date('2022-03-11T14:00'),
                    movie: {
                        connect: {
                            id: 1,
                        },
                    },
                    screen: {
                        connect: {
                            id: 1,
                        }
                    }
                }
            }
        }
    })


    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
