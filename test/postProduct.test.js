import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import  Product from '../src/models/Product';

const should = chai.should();

chai.use(chaiHttp);

describe('/POST product', () => {
  beforeEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  it('it should POST a product', (done) => {
    let product = {
      name: "Test Product",
      description: "Description for test product",
      price: 100,
      category: "Test Category",
      tags: ["test"]
    };
    chai.request(server)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('price');
        res.body.should.have.property('category');
        done();
      });
  });
});
