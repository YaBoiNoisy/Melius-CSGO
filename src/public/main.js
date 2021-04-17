const bunnyhopCheckbox = document.getElementById('bunnyhopCheckbox');

const chamsCheckbox = document.getElementById('chamsCheckbox');
const chamsEnemyCheckbox = document.getElementById('chamsEnemyCheckbox');
const chamsAllayCheckbox = document.getElementById('chamsAllayCheckbox');

const glowCheckbox = document.getElementById('glowCheckbox');
const glowEnemyCheckbox = document.getElementById('glowEnemyCheckbox');
const glowAllayCheckbox = document.getElementById('glowAllayCheckbox');

const noFlashCheckbox = document.getElementById('noFlashCheckbox');
const radarCheckbox = document.getElementById('radarCheckbox');
const rcsCheckbox = document.getElementById('rcsCheckbox');
const triggerbotCheckbox = document.getElementById('triggerbotCheckbox');

const weaponsListSelect = document.getElementById('weapons-list');
const skinsListSelect = document.getElementById('skins-list');
const weaponOptionsDiv = document.getElementById('weapon-options');

const jsonfile = require('jsonfile');
const skinsSettings = require('../../skinsSettings');

const legitSettings = jsonfile.readFileSync('./legitSettings.json');

// Set default value
bunnyhopCheckbox.checked = legitSettings.bunnyhop.enabled;
chamsCheckbox.checked = legitSettings.chams.enabled;
chamsEnemyCheckbox.checked = legitSettings.chams.enemy.enabled;
chamsAllayCheckbox.checked = legitSettings.chams.allay.enabled;
glowCheckbox.checked = legitSettings.glow.enabled;
glowEnemyCheckbox.checked = legitSettings.glow.enemy.enabled;
glowAllayCheckbox.checked = legitSettings.glow.allay.enabled;
noFlashCheckbox.checked = legitSettings.noFlash.enabled;
radarCheckbox.checked = legitSettings.radar.enabled;
rcsCheckbox.checked = legitSettings.rcs.enabled;
triggerbotCheckbox.checked = legitSettings.triggerbot.enabled;

bunnyhopCheckbox.addEventListener('change', (event) => {
    legitSettings.bunnyhop.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

chamsCheckbox.addEventListener('change', (event) => {
    legitSettings.chams.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

chamsEnemyCheckbox.addEventListener('change', (event) => {
    legitSettings.chams.enemy.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

chamsAllayCheckbox.addEventListener('change', (event) => {
    legitSettings.chams.allay.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

glowCheckbox.addEventListener('change', (event) => {
    legitSettings.glow.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

glowEnemyCheckbox.addEventListener('change', (event) => {
    legitSettings.glow.enemy.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

glowAllayCheckbox.addEventListener('change', (event) => {
    legitSettings.glow.allay.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

noFlashCheckbox.addEventListener('change', (event) => {
    legitSettings.noFlash.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

radarCheckbox.addEventListener('change', (event) => {
    legitSettings.radar.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

rcsCheckbox.addEventListener('change', (event) => {
    legitSettings.rcs.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

triggerbotCheckbox.addEventListener('change', (event) => {
    legitSettings.triggerbot.enabled = event.target.checked;
    jsonfile.writeFileSync('./legitSettings.json', legitSettings);
});

// Set options for drop
for (const key in skinsSettings.weapon_ids) {
    if (Object.hasOwnProperty.call(skinsSettings.weapon_ids, key)) {
        const weaponName = skinsSettings.weapon_ids[key];
        const weaponOption = document.createElement('option');
        weaponOption.value = key;
        weaponOption.textContent = weaponName;
        weaponsListSelect.append(weaponOption);
    }
}

let selectedWeaponId = null;

weaponsListSelect.addEventListener('change', ({ target }) => {
    const weaponId = parseInt(target.value);
    if (!Number.isNaN(weaponId)) {
        selectedWeaponId = weaponId;
        const skins = jsonfile.readFileSync('./skins.json');
        const { paintkit_names } = skinsSettings.weapon_skins[weaponId];
        skinsListSelect.innerHTML = '';
        for (const key in paintkit_names) {
            if (Object.hasOwnProperty.call(paintkit_names, key)) {
                const paintkit_name = paintkit_names[key];
                const paintkitOption = document.createElement('option');
                paintkitOption.value = skinsSettings.paintkit_ids[paintkit_name];
                if (skins[weaponId] === skinsSettings.paintkit_ids[paintkit_name]) {
                    paintkitOption.selected = true;
                }
                paintkitOption.textContent = skinsSettings.paintkit_names[paintkit_name];
                skinsListSelect.append(paintkitOption);
                skinsListSelect.style.display = 'unset';
            }
        }
    } else {
        skinsListSelect.style.display = 'none';

    }
});

skinsListSelect.addEventListener('change', ({ target }) => {
    const { value } = target;
    const paintkitId = parseInt(value);
    if (!Number.isNaN(paintkitId)) {
        const skins = jsonfile.readFileSync('./skins.json');
        skins[selectedWeaponId] = paintkitId;
        jsonfile.writeFileSync('./skins.json', skins);
    }
});

// Check if we should display searching for csgo
setInterval(() => {
    const state = jsonfile.readFileSync('./state.json');
    const loading = document.querySelector('.loading');
    if (state.foundGame) {
        loading.style.display = 'none';
    } else {
        loading.style.display = 'flex';
    }
}, 250);
