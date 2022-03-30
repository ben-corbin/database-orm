const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {

    const date = new Date(Date.parse("2022-10-01"))
    // const createdCustomer = await prisma.customer.create({
    //     data: {
    //         name: 'Alice'
    //     }
    // });

    // console.log('Customer created', createdCustomer);

    // // Add your code here

    // const createdContact = await prisma.contact.create({
    //     data: {
    //         phone: '123',
    //         email: '123@example.com'
    //     }
    // })

    const createdCustomerAndContact = await prisma.customer.create({
        data: {
            name: 'Bob',
            contact: {
                create: 
                    {
                        phone: '123',
                        email: '123@example.com',
                    },
            },
        },
    })

    // const createdMovies = await prisma.movie.create({
    //     data: {
    //         title: 'Movie',
    //         runtimeMins: 123
    //     },
    // })

    // const createdScreening = await prisma.screening.create({
    //     data: {
    //         startsAt: date
    //     },
    // })

    // const createdMovieAndScreenings = await prisma.movie.create({
    //     data: {
    //         title: 'Movie Name',
    //         runtimeMins: 123,
    //         screening: {
    //             create: [
    //                 {startsAt: date}
    //             ],    
    //         },
    //     },
    // })

    const createScreenAndScreening = await prisma.screen.create({
        data: {
            number: 123,
            screening: {
                create: [
                    {
                        startsAt: date,
                        movie: {
                            create: {
                                title: 'Movie Name',
                            runtimeMins: 123,
                            },
                        },
                    },
                ], 
            },
        },
    })


    const createTicketCustomerAndScreening = await prisma.customer.create({
        data: {
            name: 'Customer Name',
            ticket: {
                create: 
                    {
                    screening: {
                        create: [
                            {
                                startsAt: date,
                                screeningId: 123,
                                movie: {
                                    create: {
                                        name: 'Movie Name',
                                        runtimeMins: 123,
                                    },
                                    screen: {
                                        create: {
                                            number: 123,
                                        },
                                    },
                                },
                        }], 
                    },
                },
            },
        },
    
    })

    // console.log('Contact created', createdContact)



    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
