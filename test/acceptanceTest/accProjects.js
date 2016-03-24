//Acceptance tests for Projects 
// Executing CRUD operations

var request = require('superagent');
require('superagent-proxy')(request);
var expect = require('chai').expect;

var project = require('../../lib/projectLib');

describe('Projects',function(){

	this.timeout(5000);
	this.slow(4000);

	var id=-1;

    describe('CRUD Operations',function(){
    	afterEach('Delete the project created',function(done){
            console.log('before delete'+id);
            //making sure that there is a project to delete
            if(id !== -1){

                project.del(id,function(err, res){
                    done();
                });            	
            }
            else {done();}

        });

        it('POST /project.json creates a project',function(done){
            
            var prjJson = {
                Content:'Project Refactored',
                Icon:4
            };

          project.post(prjJson,function(err,res){

                id = res.body.Id;
                
                expect(res.status).to.equal(200);
                expect(res.body.Content).to.equal(prjJson.Content);
                expect(res.body.Icon).to.equal(prjJson.Icon);
                expect(res.body.Deleted).to.equal(false);
                done();
            });

        });


        context('Read, Edit and Delete operations',function(){

			var preJson = {
                    Content:'Pre Project',
                    Icon:4
            };

            beforeEach('Creates project for the tests',function(done){

                project.post(preJson,function(err,res){
                    id = res.body.Id;
                    done();
                });
            });

            
            it('GET /project by id returns a project',function(done){
                
                project.get(id,function(err,res){

                    expect(res.status).to.equal(200);
                    expect(res.body.Content).to.equal(preJson.Content);
                    expect(res.body.Icon).to.equal(preJson.Icon);
                    done();

                });
            });

            it('PUT /project by id updates a project',function(done){
                
                var updateJson = {
                    Content:'Project Updated',
                    Icon:8
                };
                project.put(id,updateJson,function(err,res){

                    expect(res.status).to.equal(200);
                    expect(res.body.Content).to.equal(updateJson.Content);
                    expect(res.body.Icon).to.equal(updateJson.Icon);
                    done();
                });
            });

            it('DELETE /project by id deletes a project',function(done){
                
                project.del(id,function(err, res){
                    expect(res.status).to.equal(200);
                    expect(res.body.Id).to.equal(id);
                    expect(res.body.Content).to.equal(preJson.Content);
                    expect(res.body.Icon).to.equal(preJson.Icon);
                    expect(res.body.Deleted).to.equal(true);
                    id=-1;//this is to avoid the afterEach is executed again
                    done();

                });
            });
        });
    });
});