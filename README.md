# NES

# Détection des Boutons du Contrôleur NES avec Node.js et Makefile

Ce projet vise à détecter et utiliser les boutons d'un contrôleur NES connecté à un PC via USB. En utilisant Node.js, `node-hid` et un fichier Makefile, nous avons configuré des éléments déclencheurs pour chaque bouton afin d'exécuter des actions spécifiques.

## Fonctionnalités

- **Détection en temps réel des boutons du contrôleur NES** : Utilisation de la bibliothèque `node-hid` pour lire les entrées des boutons.
- **Exécution de commandes personnalisées via Makefile** : Configuration de commandes associées à chaque bouton.
- **Support multiplateforme** : Compatible avec Windows, macOS, et Linux.

## Prérequis

- **Node.js** : Version 14 ou supérieure
- **npm** : Gestionnaire de paquets pour Node.js
- **Git** : Pour les commandes de gestion de version
- **Make** : Pour utiliser le fichier Makefile

## Installation

1. Clonez le dépôt GitHub :
   ```bash
   git clone https://github.com/universmc/NES.git
   cd NES
Installez les dépendances Node.js :
bash
Copier le code
npm install
Configuration
Fichier Makefile
Le fichier Makefile contient les commandes associées à chaque bouton du contrôleur NES :

makefile
Copier le code
.PHONY: bouton_a bouton_b bouton_start bouton_select

# Exemple de règles pour chaque bouton
bouton_a:
	@echo "Compiling project..."
	gcc -o my_program main.c

bouton_b:
	@echo "✨ Mise en état du dossier sur GitHub ✨"
	@git add .
	@git commit -m "test"
	@git push
	@echo "✨ Mise à jour terminée ✨"

bouton_start:
	@echo "Starting the server..."
	./my_program

bouton_select:
	@echo "Pausing process or displaying status..."
	pkill -STOP my_program || echo "Program not running"
Script Node.js
Le script index.js détecte les boutons pressés et exécute les commandes associées via le Makefile :

javascript
Copier le code
const { exec } = require('child_process');
const HID = require('node-hid');

const devices = HID.devices();
const vendorId = 2064; // Remplacez par votre vendorId
const productId = 58625; // Remplacez par votre productId

const deviceInfo = devices.find(device => device.vendorId === vendorId && device.productId === productId);

if (deviceInfo) {
    console.log('Contrôleur NES détecté:', deviceInfo);
    const device = new HID.HID(deviceInfo.path);

    device.on('data', (data) => {
        const buttonData = data[5];
        const buttonDataC = data[6];

        const buttonSelect = (buttonDataC & 0x10) !== 0; 
        const buttonStart = (buttonDataC & 0x20) !== 0;   
        const buttonA = (buttonData & 0x20) !== 0;        
        const buttonB = (buttonData & 0x10) !== 0;        

        if (buttonA) runCommand('make bouton_a');
        if (buttonB) runCommand('make bouton_b');
        if (buttonStart) runCommand('make bouton_start');
        if (buttonSelect) runCommand('make bouton_select');
    });

    device.on('error', (err) => {
        console.error('Erreur de périphérique:', err);
    });

} else {
    console.log('Contrôleur NES non trouvé');
}

function runCommand(command) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`Erreur lors de l'exécution de la commande ${command}:`, err.message);
            return;
        }
        console.log(`Résultat de la commande: ${stdout}`);
    });
}
Utilisation
Lancer le script Node.js :

bash
Copier le code
node index.js
Utiliser le contrôleur NES : Appuyez sur les boutons du contrôleur NES pour déclencher les actions définies dans le Makefile.

Déploiement
Pour déployer cette version, vous pouvez utiliser GitHub pour héberger le code source et la documentation :

Créez un nouveau commit pour inclure les changements dans le README.md :

bash
Copier le code
git add README.md
git commit -m "Ajout de la documentation pour la première version"
git push
Publiez la version sur GitHub.

Auteurs
Mickael - Développeur principal du projet