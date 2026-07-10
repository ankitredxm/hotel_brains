const mongoose = require("mongoose");
const Person = require("./models/person");

mongoose.connect("mongodb://127.0.0.1:27017/your_db");

const works = ["chef", "waiter", "manager"];
const data = [];

for (let i = 1; i <= 200; i++) {
  data.push({
    name: `Ankit ${i}`,
    age: 20 + (i % 10),
    work: works[i % works.length],
    phno: 9000000000 + i,
    email: `ankit${i}@gmail.com`,
    address: `${i} Street`,
    salary: 20000 + i * 100
  });
}

async function insertData() {
  try {
    await Person.insertMany(data);
    console.log("200 records inserted successfully");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

insertData();