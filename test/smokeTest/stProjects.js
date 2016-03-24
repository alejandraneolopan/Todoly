var expect = require('chai');
var request = require('superagent');
require('superagent-proxy')(request);

describe('Projects',function(){

	it('GET /projects.json return status code 200',function(done){
		request
			.get('http://todo.ly/api/projects.json')
			.proxy('http://172.20.240.5:8080')
			.auth('gordines007@gmail.com','control123')
		.end(function(err,res){
			expect(res.status).to.be.equal(200);
			done();
		});
	});
});