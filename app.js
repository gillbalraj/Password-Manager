console.log('password manager');
var crypto = require('crypto-js') 
var storage = require('node-persist');
storage.initSync();
var argv = require('yargs')
.command('create','Info goes here',function(yargs){
	yargs.option({
		name:{
		demand: true,
		alias : 'n',
		description: 'Account name goes here',
		type:'string'
		},
		username:{
			demand: true,
			alias: 'u',
			description:'username goes here',
			type: 'string'
		},
		password:{
			demand: true,
			alias: 'p',
			description: 'account password',
			type:'string'
		},
		masterPassword:{
			demand: true,
			alias: 'm',
			description: 'encrytion example',
			type: 'string'
		}
	}).help('help')
})
.command('get','info retrieved here',function(yargs){
	yargs.option({
		name:{
			demand: true,
			alias: 'n',
			description: 'get command is here' ,
			type: 'string'
		},
		masterPassword:{
			demand: true,
			alias: 'm',
			description: 'encrytion example',
			type: 'string'
		}
	}).help('help')
}).argv;

var command = argv._[0];

function getAccounts (masterPassword){
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];
	if(typeof encryptedAccount !== 'undefined'){
		var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
		 accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}
	return accounts;
}
function saveAccounts(accounts, masterPassword){
	//var accounts = storage.getItemSync(accounts);
	var accountsString = JSON.stringify(accounts);
	var encryptedAccounts = crypto.AES.encrypt(accountsString, masterPassword);
	storage.setItemSync('accountName', encryptedAccounts.toString());
	return accounts;
}
function createAccount(account, masterPassword){
	var accounts = getAccounts(masterPassword);

	accounts.push(account);
	//storage.setItemSync('accounts',accounts)
	saveAccounts(accounts, masterPassword);
	return account;
	
}
function getAccount(accountName, masterPassword){
	//var accounts = storage.getItemSync('accounts'); 
	var accounts = getAccounts(masterPassword);
	var matchedAccount;
	accounts.forEach(function(account){
		if (account.name === accountName){
			matchedAccount = account;
		}
	});
	return matchedAccount
}
 // createAccount({
	// name: 'facebook',
	// username: 'user1',
	// password: 'password1'
	// },{
		// name: 'twitter',
		// username: 'balraj',
		// password: 'gill8484'
		
	// }); 
 // var facebook = getAccount('facebook');
 //var twitter = getAccount('twitter');
 //console.log(twitter);
 // function showError(){
	 // throw new Error('unable to do work');
 // }
if(command === 'create'){
	try{var createAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password
	}, argv.masterPassword);
	console.log('account created');
	console.log(createAccount);
}
catch(e){
	console.log('unable to create account');
}}
	else if (command ==='get'){try{
		
	var fetchAccount = getAccount(argv.name, argv.masterPassword);
	if(typeof fetchAccount === 'undefined'){
		
		console.log('account not found!');
	
}else{
		console.log('account found');
		console.log(fetchAccount);
	}}
	catch(e){
		console.log('unable to fetch account');
	}
}
