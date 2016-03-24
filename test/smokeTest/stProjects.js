var expect = require('chai').expect;
var request = require('superagent');
require('superagent-proxy')(request);

describe('Projects',function(){

	it('GET /projects.json return status code 200',function(done){
		request
			.get('http://todo.ly/api/projects.json')
			.proxy('http://172.20.240.5:8080')
			.auth('alejandra.neolopan@fundacion-jala.org','Nexo2010')
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});
});