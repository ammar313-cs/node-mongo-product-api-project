import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/index';
import  Product from '../src/models/Product';

const should = chai.should();

chai.use(chaiHttp);

describe('/PUT/:id product', () => {
  beforeEach((done) => {
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  it('it should UPDATE a product given the id', (done) => {
    let product = new Product({
      name: "Test Product",
      description: "Description for test product",
      price: 100,
      category: "Test Category",
      tags: ["test"]
    });
    product.save((err, product) => {
      chai.request(server)
        .put('/api/products/' + product.id)
        .send({
          name: "Updated Product",
          description: "Updated description for test product",
          price: 200,
          category: "Updated Category",
          tags: ["updated"]
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Updated Product');
          res.body.should.have.property('price').eql(200);
          res.body.should.have.property('category').eql('Updated Category');
          done();
        });
    });
  });
});
