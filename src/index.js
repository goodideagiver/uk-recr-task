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
	return string.match(/([A-Z])\w+/g, '')[0];
}

function getCombinedUserIds(users) {
	// need create datasets with ids that have same username
	const userNames = [];

	users.forEach((user) => {
		const { name } = user;

		const onlyName = removeNonLettersFromString(name);

		//find if name already exists in userNames array
		const matchedUser = userNames.find((user) => {
			return user.name === onlyName;
		});

		if (matchedUser) {
			matchedUser.uuidList.push(user.id);
		}

		if (!matchedUser) {
			userNames.push({
				name: onlyName,
				uuidList: [user.id],
			});
		}
	});

	return userNames;
}

function pairMobileDevicesWithUserIds(userArray, mobileDevices) {
	//pair mobile devices with user name
	mobileDevices.forEach((device) => {
		const { user, id } = device;

		const matchedUser = userArray.find((searchedUser) => {
			return searchedUser.uuidList.includes(user);
		});

		if (matchedUser) {
			if (!matchedUser.mobileDevices) {
				matchedUser.mobileDevices = [id];
			} else {
				matchedUser.mobileDevices.push(id);
			}
		}
	});

	return userArray;
}

function pairMobileDevicesWithIotDevices(iotDevices, users) {
	iotDevices.forEach((device) => {
		const { mobile, name } = device;

		const matchedUser = users.find((user) => {
			return user.mobileDevices.includes(mobile);
		});

		if (matchedUser) {
			if (!matchedUser.iotDevices) {
				matchedUser.iotDevices = [name];
			} else {
				matchedUser.iotDevices.push(name);
			}
		}
	});

	return users;
}

function count(users, mobileDevices, iotDevices) {
	const userIdsWithSameUserNames = getCombinedUserIds(users);

	const usersWithMobileDevicesIds = pairMobileDevicesWithUserIds(
		userIdsWithSameUserNames,
		mobileDevices
	);

	const usersWithIotDevices = pairMobileDevicesWithIotDevices(
		iotDevices,
		usersWithMobileDevicesIds
	);

	const iotDevicesCountPerUserName = usersWithIotDevices.map((user) => {
		return {
			name: user.name,
			iotDevicesCount: [...new Set(user.iotDevices)].length,
		};
	});

	return iotDevicesCountPerUserName;
}
