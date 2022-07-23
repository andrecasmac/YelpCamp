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
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d8cf71f1f5aef12c3e56f9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, optio. Dicta, quasi. Aspernatur suscipit aut, ipsum sapiente minus incidunt ex, mollitia odio commodi deleniti repellendus aperiam autem corrupti quidem velit.',
            price,
            images: [
              {
                url: 'https://res.cloudinary.com/dx7tuhvkv/image/upload/v1658536769/YelpCamp/bqduxr0ysbmolxvhi2wz.jpg',
                filename: 'YelpCamp/bqduxr0ysbmolxvhi2wz',
              },
              {
                url: 'https://res.cloudinary.com/dx7tuhvkv/image/upload/v1658536769/YelpCamp/o95cxk1asutczltksx3m.jpg',
                filename: 'YelpCamp/o95cxk1asutczltksx3m',
              },
              {
                url: 'https://res.cloudinary.com/dx7tuhvkv/image/upload/v1658536769/YelpCamp/kqiouv2ofsogk6sg7gon.jpg',
                filename: 'YelpCamp/kqiouv2ofsogk6sg7gon',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});