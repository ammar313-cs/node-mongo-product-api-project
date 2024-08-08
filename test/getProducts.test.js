const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const Product = require('../src/models/Product');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET products', () => {
  beforeEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  it('it should GET all the products', (done) => {
    chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
