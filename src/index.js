const fs = require('fs');
const path = require('path');

(function init() {
	const users = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8')
	);
	const mobileDevices = JSON.parse(
		fs.readFileSync(
			path.resolve(__dirname, '../data/mobile_devices.json'),
			'utf-8'
		)
	);
	const iotDevices = JSON.parse(
		fs.readFileSync(
			path.resolve(__dirname, '../data/iot_devices.json'),
			'utf-8'
		)
	);

	console.log(new Date().toISOString());
	console.log(count(users, mobileDevices, iotDevices));
	console.log(new Date().toISOString());
})();

function removeNonLettersFromString(string) {
	return string.match(/([A-Z])\w+/g, '');
}

function count(users, mobileDevices, iotDevices) {
	const alreadyPickedNames = [];

	// need create datasets with ids that have same username
}

count();
