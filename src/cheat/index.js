const fs = require('fs').promises;
const jsonfile = require('jsonfile');

const { setProcessState } = require('./controllers/processState');
const { setOffsets } = require('./controllers/offsets');
const pMemory = require('./controllers/pMemory');

module.exports.cheat = {
    getProcess: async () => {
        try {
            const process = await pMemory.openProcess('csgo.exe');
            setProcessState('process', process);

            const engineModule = await pMemory.findModule('engine.dll', process.th32ProcessID);
            setProcessState('engineDll', engineModule.modBaseAddr);

            const clientModule = await pMemory.findModule('client.dll', process.th32ProcessID);
            setProcessState('clientDll', clientModule.modBaseAddr);

            await setOffsets();

            await this.cheat.createThread();
        } catch (error) {
            console.log('ERROR - CSGO not running', error);
            setTimeout(() => {
                this.cheat.getProcess();
            }, 2000)
        }
    },
    createThread: async () => {
        try {
            const files = await fs.readdir('./src/cheat/features');
            const jsFiles = files.filter(file => file.split('.').pop() === 'js');
            if (jsFiles.length === 0) return null;

            jsFiles.forEach(jsFile => {
                const props = require(`./features/${jsFile}`);
                setInterval(props.execute, props.settings.delay);
            });
            jsonfile.writeFile('./state.json', { foundGame: true });

        } catch (error) {
            console.log('ERROR - Faild to createThread(): ', error);
        }
    },
};
