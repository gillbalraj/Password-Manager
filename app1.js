console.log('password manager');

var storage = required('node-persist');
storage.initSync();

storage.setItemSync('account',[{
	name: 'facebook',
	username: 'user1',
	password: 'password1'
}])
function createAccount(account){
	var accounts = storage.getItemSynch('accounts');
	if(typeof accounts === 'undefined'){
		accounts = [];
	}
	accounts.push(account);
	storage.setItemSync('accounts',accounts)
	return account;
	
}
function getAccount(accountName){
	var account = storage.getItemSync('accounts'); 
	var matchedAccount;
	for(int i = 0; i<accounts.length; i++){
		if(account.name === accountName)
			(matchedAccount = account)
	}
	return matchedAccount;
}
