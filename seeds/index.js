const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d8cf71f1f5aef12c3e56f9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, optio. Dicta, quasi. Aspernatur suscipit aut, ipsum sapiente minus incidunt ex, mollitia odio commodi deleniti repellendus aperiam autem corrupti quidem velit.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
              {
                url: 'https://res.cloudinary.com/dx7tuhvkv/image/upload/v1658869438/YelpCamp/mountainCamp_ktbj7h.png',
                filename: 'YelpCamp/mountainCamp_ktbj7h',
              },
              {
                url: 'https://res.cloudinary.com/dx7tuhvkv/image/upload/v1658869613/YelpCamp/snowCamp_d2hitu.png',
                filename: 'YelpCamp/snowCamp_d2hitu',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});