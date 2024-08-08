import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import  Product from '../src/models/Product';

const should = chai.should();

chai.use(chaiHttp);

describe('/DELETE/:id product', () => {
  beforeEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  it('it should DELETE a product given the id', (done) => {
    let product = new Product({
      name: "Test Product",
      description: "Description for test product",
      price: 100,
      category: "Test Category",
      tags: ["test"]
    });
    product.save((err, product) => {
      chai.request(server)
        .delete('/api/products/' + product.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Product deleted successfully');
          done();
        });
    });
  });
});
