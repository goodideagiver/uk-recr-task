const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

(function init() {
  const { USERS_COUNT, MOBILE_DEVICES_COUNT, IOT_DEVICES_COUNT } = process.env;

  const usersCount = parseInt(USERS_COUNT) || 1;
  const mobileDevicesCount = parseInt(MOBILE_DEVICES_COUNT) || 1;
  const iotDevicesCount = parseInt(IOT_DEVICES_COUNT) || 1;

  const USER_NAMES = [
    "Alice",
    "Bob",
    "Martin",
    "Henry",
    "Olaf",
  ];

  const users = [];
  const mobileDevices = [];
  const iotDevices = [];

  Array.apply(null, { length: usersCount }).forEach((_, i) => {
    const user = {
      id: uuid.v4(),
      name: `${USER_NAMES[i % USER_NAMES.length]} - ${i + 1}`,
    }
    users.push(user);

    Array.apply(null, { length: mobileDevicesCount }).forEach((_, i) => {
      if (Math.random() > 0.7) {
        return;
      }
      const mobile = {
        id: uuid.v4(),
        name: `Device - ${i + 1}`,
        user: user.id
      }
      mobileDevices.push(mobile);

      Array.apply(null, { length: iotDevicesCount || 1 }).forEach((_, i) => {
        if (Math.random() > 0.7) {
          return;
        }
        const iot = {
          id: uuid.v4(),
          name: `IOT - ${i + 1}`,
          mobile: mobile.id
        };
        iotDevices.push(iot);
      });
    });
  });

  fs.writeFileSync(path.resolve(__dirname, "../data/users.json"), JSON.stringify(users), "utf-8");
  fs.writeFileSync(path.resolve(__dirname, "../data/mobile_devices.json"), JSON.stringify(mobileDevices), "utf-8");
  fs.writeFileSync(path.resolve(__dirname, "../data/iot_devices.json"), JSON.stringify(iotDevices), "utf-8");
})();

