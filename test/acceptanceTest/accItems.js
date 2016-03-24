//accItems
var request = require('superagent');
require('superagent-proxy')(request);
var expect = require('chai').expect;

describe('Items',function(){

	this.timeout(5000);
	this.slow(4000);

	var idItem=-1;

    describe('CRUD Operations',function(){
    	afterEach('Delete the Item created',function(done){

            //making sure that there is a Item to delete
            if(idItem !== -1){
            	request
            		.del('http://todo.ly/api/items/'+idItem+'.json')
                    .proxy('http://172.20.240.5:8080')
                    .auth('gordines007@gmail.com','control123')
                .end(function(err,res){

                	//emptying the recycleBin
                	request
                		.del('http://todo.ly/API/Filters/-4/Items.json')
                		.proxy('http://172.20.240.5:8080')
                    	.auth('gordines007@gmail.com','control123')
                	.end(function(err, res){
                		done();
                	});
                	
                	

                });
            }
            else {done();}

        });

        it('POST /items.json creates an item',function(done){
            
            var itemJson = {
                Content:'Item-superagent',                
            };
            request
                .post('http://todo.ly/API/items.json')
                .proxy('http://172.20.240.5:8080')
                .auth('gordines007@gmail.com','control123')
                .send(itemJson)
            .end(function(err,res){

                idItem = res.body.Id;
                expect(res.status).to.equal(200);
                expect(res.body.Content).to.equal(itemJson.Content);
                expect(res.body.Deleted).to.equal(false);
                done();
            });
        });


        context('Read, Edit and Delete operations',function(){

			var preItemJson = {
                    Content:'Pre Item'

            };

            beforeEach('Creates item for the tests',function(done){
                
                request
                    .post('http://todo.ly/API/items.json')
                    .proxy('http://172.20.240.5:8080')
                    .auth('gordines007@gmail.com','control123')
                    .send(preItemJson)
                .end(function(err,res){
                    idItem = res.body.Id;
                    done();
                });
            });

            
            it('GET /Item by id returns an item',function(done){
                
                request
                    .get('http://todo.ly/api/items/'+idItem+'.json')
                    .proxy('http://172.20.240.5:8080')
                    .auth('gordines007@gmail.com','control123')
                .end(function(err,res){

                    expect(res.status).to.equal(200);
                    expect(res.body.Content).to.equal(preItemJson.Content);
                    done();

                });
            });

            it('PUT /item by id updates an item',function(done){
                
                var updateItemJson = {
                    Content:'Item Updated'
                };
                request
                    .put('http://todo.ly/api/items/'+idItem+'.json')
                    .proxy('http://172.20.240.5:8080')
                    .auth('gordines007@gmail.com','control123')
                    .send(updateItemJson)
                .end(function(err,res){

                    expect(res.status).to.equal(200);
                    expect(res.body.Content).to.equal(updateItemJson.Content);
                    done();
                });
            });

            it('DELETE /item by id deletes an item',function(done){
                
                request
                    .del('http://todo.ly/api/items/'+idItem+'.json')
                    .proxy('http://172.20.240.5:8080')
                    .auth('gordines007@gmail.com','control123')
                .end(function(err,res){

                    expect(res.status).to.equal(200);
                    expect(res.body.Id).to.equal(idItem);
                    expect(res.body.Content).to.equal(preItemJson.Content);
                    expect(res.body.Deleted).to.equal(true);
                    id=-1;//this is to avoid the afterEach is executed again
                    //emptying the recycleBin
                	request
                		.del('http://todo.ly/API/Filters/-4/Items.json')
                		.proxy('http://172.20.240.5:8080')
                    	.auth('gordines007@gmail.com','control123')
                	.end(function(err, res){
                		done();
                	});

                });
            });
        });
    });
});