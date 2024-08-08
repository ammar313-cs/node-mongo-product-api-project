import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import  Product from '../src/models/Product';

const should = chai.should();

chai.use(chaiHttp);

describe('/GET/:id product', () => {
  beforeEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  it('it should GET a product by the given id', (done) => {
    let product = new Product({
      name: "Test Product",
      description: "Description for test product",
      price: 100,
      category: "Test Category",
      tags: ["test"]
    });
    product.save((err, product) => {
      chai.request(server)
        .get('/api/products/' + product.id)
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('price');
          res.body.should.have.property('category');
          res.body.should.have.property('_id').eql(product.id);
          done();
        });
    });
  });
});
