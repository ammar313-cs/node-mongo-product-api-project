const chai = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index'); 
const Product = require('../src/models/Product');

const { expect } = chai;
const request = supertest(app);



describe('Product API', function () {
// Connect to MongoDB before running any tests

  before(function (done) {
    this.timeout(30000); 
    console.log("Connecting to MongoDB...");
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
        done();
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        done(err); // If connection fails, terminate the test suite
      });
  });

  // Disconnect from MongoDB after all tests are complete

  after(function (done) {
    this.timeout(30000); 
    console.log("Closing MongoDB connection...");
    mongoose.connection.close()
      .then(() => {
        console.log("MongoDB connection closed");
        done(); // Signal that the teardown is complete
      })
      .catch((err) => {
        console.error("Error closing MongoDB connection:", err);
        done(err); // If disconnection fails, terminate the test suite
      });
  });

  beforeEach(function (done) {
    this.timeout(30000); 
    console.log("Starting Product.deleteMany...");
    Product.deleteMany({})
      .then(() => {
        console.log("Product.deleteMany completed");
        done();
      })
      .catch((err) => {
        console.error("Error in Product.deleteMany:", err);
        done(err);
      });
  });



  describe('POST /api/products', function () {
    it('should create a new product', function (done) {
      const product = { name: 'Test Product', price: 100, category: 'Test Category' }; 
      request
        .post('/api/products')
        .send(product) // Send product data to the server
        .expect(201)  code
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name', 'Test Product');
          expect(res.body).to.have.property('price', 100);
          expect(res.body).to.have.property('category', 'Test Category'); 
          done();
        })
        .catch(done);
    });

    it('should not create a product with invalid data', function (done) {
      const product = { name: '', price: 'invalid' };
      request
        .post('/api/products')
        .send(product) // Send invalid product data to the server
        .expect(400) // Expect a 400 Bad Request status code
        .then((res) => {
                    
            // Validate the response contains an error message

          expect(res.body).to.have.property('message');
          done();
        })
        .catch(done);
    });
  });



  describe('GET /api/products', function () {
    it('should get all products with pagination', function (done) {
      Product.insertMany([
        { name: 'Product 1', price: 50, category: 'Category 1' },
        { name: 'Product 2', price: 150, category: 'Category 2' },
        { name: 'Product 3', price: 250, category: 'Category 3' },
      ])
        .then(() => {
          request
            .get('/api/products?page=1&limit=2')
            .expect(200)
            .then((res) => {
                
                // Validate the response contains the expected pagination structure

              expect(res.body).to.be.an('object');
              expect(res.body.products).to.be.an('array');
              expect(res.body.products).to.have.lengthOf(2); // Expect 2 products in the first page
              expect(res.body).to.have.property('totalPages', 2); // Expect 2 pages in total
              expect(res.body).to.have.property('currentPage', '1'); // Current page should be 1
              done();
            })
            .catch(done);
        });
    });
  });



  describe('GET /api/products/:id', function () {
    it('should get a single product by ID', function (done) {
      const product = new Product({ name: 'Test Product', price: 100, category: 'Test Category' }); 
      product.save()
        .then(() => {
        
            // Request the product by its ID

          request
            .get(`/api/products/${product._id}`)
            .expect(200)
            .then((res) => {
            // Validate the response contains the correct product data

              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('name', 'Test Product');
              expect(res.body).to.have.property('price', 100);
              expect(res.body).to.have.property('category', 'Test Category');
              done();
            })
            .catch(done);
        });
    });

    it('should return 404 if product not found', function (done) {
      const fakeId = new mongoose.Types.ObjectId();  
      request
        .get(`/api/products/${fakeId}`)
        .expect(404)  // Expect a 404 Not Found status code
        .then((res) => {
          expect(res.body).to.have.property('message', 'Product not found');
          done();
        })
        .catch(done);
    });
  });



  describe('PUT /api/products/:id', function () {
    it('should update a product by ID', function (done) {

      // Create a product to update later

      const product = new Product({ name: 'Test Product', price: 100, category: 'Test Category' }); 
      product.save()
        .then(() => {
        
        // Update the product's name, price, and category

          request
            .put(`/api/products/${product._id}`)
            .send({ name: 'Updated Product', price: 150, category: 'Updated Category' })
            .expect(200)
            .then((res) => {

              // Validate the response contains the updated product data

              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('name', 'Updated Product');
              expect(res.body).to.have.property('price', 150);
              expect(res.body).to.have.property('category', 'Updated Category'); // Ensure category is checked
              done();
            })
            .catch(done);
        });
    });

    it('should return 404 if product to update is not found', function (done) {
      const fakeId = new mongoose.Types.ObjectId();  
      request
        .put(`/api/products/${fakeId}`)
        .send({ name: 'Updated Product', price: 150, category: 'Updated Category' }) 
        .expect(404)
        .then((res) => {
          expect(res.body).to.have.property('message', 'Product not found');
          done();
        })
        .catch(done);
    });
  });



  describe('DELETE /api/products/:id', function () {
    it('should delete a product by ID', function (done) {
      const product = new Product({ name: 'Test Product', price: 100, category: 'Test Category' }); // Added category
      product.save()
        .then(() => {

        // Request deletion of the product by its ID

          request
            .delete(`/api/products/${product._id}`)
            .expect(200)
            .then((res) => {
                  
            // Validate the response contains a success message

              expect(res.body).to.have.property('message', 'Product deleted successfully');
              done();
            })
            .catch(done);
        });
    });

    it('should return 404 if product to delete is not found', function (done) {
      const fakeId = new mongoose.Types.ObjectId();  
      request
        .delete(`/api/products/${fakeId}`)
        .expect(404)
        .then((res) => {
          expect(res.body).to.have.property('message', 'Product not found');
          done();
        })
        .catch(done);
    });
  });
});
