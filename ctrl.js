
const HID = require('node-hid');

const devices = HID.devices();
const vendorId = 2064; // Remplacez par votre vendorId
const productId = 58625; // Remplacez par votre productId

const deviceInfo = devices.find(device => device.vendorId === vendorId && device.productId === productId);

if (deviceInfo) {
    console.log('Contrôleur NES détecté:', deviceInfo);
} else {
    console.log('Contrôleur NES non trouvé');
}