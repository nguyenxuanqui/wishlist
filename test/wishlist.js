process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();

chai.use(chaiHttp);

let now = Date.now();
let wishlist_Id = 0;
let wish_Id = 0;

describe('Wishlists', () =>{
    beforeEach(done => setTimeout(done, 1000));

    describe('/POST wishlists', ()=>{
       it('it should Create a wishlist', (done) =>{
           let wishlist = {
               name: "SteamGame" + now
           };

           chai.request(server)
               .post('/wishlists')
               .query(wishlist)
               .end((err, res)=>{
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('message').eql('Wishlist Added');
                   res.body.should.have.property('id');
                   wishlist_Id = res.body.id;

                   console.log(`*** Created a wishlist with Id ${wishlist_Id} and Name ${wishlist.name}`);
                   done();
               });
       })
    });

    describe('/POST wishes', ()=>{
        it('it should Create a wish', (done) =>{
            let wish = {
                name: "Dota2"
            };

            chai.request(server)
                .post(`/wishlists/${wishlist_Id}/wishes`)
                .query(wish)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Wish Added');
                    res.body.should.have.property('id');
                    wish_Id = res.body.id;

                    console.log(`*** Created a wish with Id: ${wish_Id}, name: ${wish.name}, state: false`);
                    done();
                });
        })
    });

    describe('/POST wishes', ()=>{
        it('it should Create a wish', (done) =>{
            let wish = {
                name: "CSGO"
            };

            chai.request(server)
                .post(`/wishlists/${wishlist_Id}/wishes`)
                .query(wish)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Wish Added');
                    res.body.should.have.property('id');
                    // wish_Id = res.body.id;

                    console.log(`*** Created a wish with Id: ${res.body.id}, name: ${wish.name}, state: false`);
                    done();
                });
        })
    });

    describe('/PUT wishes', ()=>{
        it('it should Update a wish', (done) =>{
            let wish = {
                name: "Dota2",
                state: true
            };

            chai.request(server)
                .put(`/wishlists/${wishlist_Id}/wishes/${wish_Id}`)
                .query(wish)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Wish Updated');
                    res.body.should.have.property('id');

                    console.log(`*** Updated a wish with Id: ${wish_Id}, name: ${wish.name}, state: ${wish.state}`);
                    done();
                });
        })
    });

    describe('/GET wishlist', ()=>{
        it('it should GET a wishlist with Id', (done) =>{
            chai.request(server)
                .get(`/wishlists/${wishlist_Id}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);

                    console.log(`*** Got a wishlist with Id: ${wishlist_Id} and data: `);
                    console.log(res.body);
                    done();
                });
        })
    });

    describe('/DELETE a wish', ()=>{
        it('it should DELETE a wish in a wishlist', (done) =>{
            chai.request(server)
                .delete(`/wishlists/${wishlist_Id}/wishes/${wish_Id}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Wish Deleted');

                    console.log(`*** Deleted a wish with Id: ${wish_Id}`);
                    wish_Id = 0;
                    done();
                });
        })
    });

    describe('/GET wishlist', ()=>{
        it('it should GET a wishlist with Id', (done) =>{
            chai.request(server)
                .get(`/wishlists/${wishlist_Id}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);

                    console.log(`*** Got a wishlist with Id: ${wishlist_Id} and data: `);
                    console.log(res.body);
                    done();
                });
        })
    });

    describe('/DELETE a wishlist', ()=>{
        it('it should DELETE a wishlist and all wishes inside', (done) =>{
            chai.request(server)
                .delete(`/wishlists/${wishlist_Id}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Wishlist Deleted');

                    console.log(`*** Deleted a wishlist with Id: ${wishlist_Id}`);
                    done();
                });
        })
    });

    describe('/GET wishlists', () =>{
        it('it should GET all wishlists remains', (done) =>{
            chai.request(server)
                .get('/wishlists')
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    for(let i = 0; i < res.body.length; i++){
                        let wishlist = res.body[i];
                        wishlist.should.have.property('id').not.eql(wishlist_Id);
                    }

                    done();
                });
        });
    });
});


