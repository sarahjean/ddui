const Config = require('electron-config');
const config = new Config();
const dialog = require('electron').remote.dialog;

function registerApp() {
    let app_path = chooseAppFromFilesystem();
    let apps = getRegisteredApps();

    if (apps.indexOf(app_path) > -1) {
        dialog.showMessageBox({
            message: "That app is already registered.",
            type: "error",
            buttons: ["OK"]
        });
    }
    else {
        console.log('Adding record for app ' + app_path);
        apps.push(app_path);
        config.set('apps', app_path);
        // @todo Cause left menu to be refreshed.
    }
}

function chooseAppFromFilesystem() {
    let fileNames = dialog.showOpenDialog({
        properties: [
            'openFile',
        ],
        filters: [
            {
                name: 'BLT UI Config Files',
                extensions: ['yml']
            },
        ],
        message: "Choose a ddui.info.yml file",
    });

    if (fileNames === undefined) return;

    let fileName = fileNames[0];

    return fileName;
}

function getRegisteredApps() {
    let apps = config.get('apps');
    if (apps === undefined) return [];

    return apps;
}