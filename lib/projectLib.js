//project lib

var request = require('../node_modules/superagent');
require('../node_modules/superagent-proxy')(request);

var config=require('../config.json');
var account = 'alejandra.neolopan@fundacion-jala.org';
var password = config.password;
var proxy = config.proxy;
var projectById = config.projectById;
var del = function(projectId,callback){
	var projectId = projectById.replace('[id]',projectId);

	request
		.del(projectId)
        .proxy(proxy)
        .auth(account,password)
    .end(function(err,res){
    	console.log(res.body.Content);
    	callback(err, res);

    });

};
var post=function(updateContent,callback){
	var uri = projectById.replace('/[id]','');
	request
		.post(uri)
		.proxy(proxy)
		.auth(account,password)
		.send(updateContent)
		.end(function(err,res){
			console.log(res.body.Content);
			callback(err, res);

		});
};
var get = function(projectId,callback){
	var projectId = projectById.replace('[id]',projectId);

	request
		.get(projectId)
		.proxy(proxy)
		.auth(account,password)
		.end(function(err,res){
			console.log(res.body.Content);
			callback(err, res);

		});

};
var put=function(projectId,updateContent,callback){
	var uri = projectById.replace('[id]',projectId);
	request
		.put(uri)
		.proxy(proxy)
		.auth(account,password)
		.send(updateContent)
		.end(function(err,res){
			console.log(res.body.Content);
			callback(err, res);

		});
};
exports.del = del;
exports.post = post;
exports.get = get;
exports.put = put;



