const HID = require('node-hid');

const devices = HID.devices();
const vendorId = 2064; // Remplacez par votre vendorId
const productId = 58625; // Remplacez par votre productId

const deviceInfo = devices.find(device => device.vendorId === vendorId && device.productId === productId);

if (deviceInfo) {
    console.log('Contrôleur NES détecté:', deviceInfo);
    const device = new HID.HID(deviceInfo.path);

    // Écouter les événements de données
    device.on('data', (data) => {
        // Utiliser l'octet approprié pour chaque bouton
        const buttonData = data[5]; // 6e octet pour les boutons A et B
        const buttonDataC = data[6]; // 7e octet pour les boutons Select et Start

        // Vérifier quel bouton est pressé en utilisant des masques binaires
        const buttonSelect = (buttonDataC & 0x10) !== 0;  // Vérifie le 5e bit (0x10 en binaire : 00010000)
        const buttonStart = (buttonDataC & 0x20) !== 0;   // Vérifie le 6e bit (0x20 en binaire : 00100000)
        const buttonA = (buttonData & 0x20) !== 0;        // Vérifie le 5e bit de l'octet 5 (0x20)
        const buttonB = (buttonData & 0x10) !== 0;        // Vérifie le 4e bit de l'octet 5 (0x10)

        // Afficher les boutons pressés
        if (buttonSelect) console.log('Bouton Select pressé');
        if (buttonStart) console.log('Bouton Start pressé');
        if (buttonA) console.log('Bouton A pressé');
        if (buttonB) console.log('Bouton B pressé');

        // Analyse du joystick
        const joystickX = data[3]; // Valeur du joystick sur l'axe X
        const joystickY = data[4]; // Valeur du joystick sur l'axe Y

        console.log(`Joystick X: ${joystickX}, Joystick Y: ${joystickY}`);
        
        // Vérifier la position du joystick
        if (joystickX === 0x7f && joystickY === 0x7f) {
            console.log('Joystick centré');
        } else if (joystickX < 0x7f) {
            console.log('Joystick déplacé vers la gauche');
        } else if (joystickX > 0x7f) {
            console.log('Joystick déplacé vers la droite');
        }

        if (joystickY < 0x7f) {
            console.log('Joystick déplacé vers le haut');
        } else if (joystickY > 0x7f) {
            console.log('Joystick déplacé vers le bas');
        }
    });

    // Gérer les erreurs
    device.on('error', (err) => {
        console.error('Erreur de périphérique:', err);
    });

} else {
    console.log('Contrôleur NES non trouvé');
}
