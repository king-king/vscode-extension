import * as vscode from 'vscode';

import {
    COMMAND_API_KEY,
    COMMAND_CONFIG_FILE,
    COMMAND_DASHBOARD,
    COMMAND_DEBUG,
    COMMAND_DISABLE,
    COMMAND_LOG_FILE,
    COMMAND_PROXY,
    COMMAND_STATUS_BAR_CODING_ACTIVITY,
    COMMAND_STATUS_BAR_ENABLED,
    LogLevel,
} from './constants';
import { Logger } from './logger';
import { Options, Setting } from './options';
import { WakaTime } from './wakatime';

var logger = new Logger(LogLevel.INFO);
var wakatime: WakaTime;

export function activate(ctx: vscode.ExtensionContext) {
    var options = new Options();

    wakatime = new WakaTime(ctx.extensionPath, logger, options);

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_API_KEY, function () {
            wakatime.promptForApiKey();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_PROXY, function () {
            wakatime.promptForProxy();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_DEBUG, function () {
            wakatime.promptForDebug();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_DISABLE, function () {
            wakatime.promptToDisable();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_STATUS_BAR_ENABLED, function () {
            wakatime.promptStatusBarIcon();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_STATUS_BAR_CODING_ACTIVITY, function () {
            wakatime.promptStatusBarCodingActivity();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_DASHBOARD, function () {
            wakatime.openDashboardWebsite();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_CONFIG_FILE, function () {
            wakatime.openConfigFile();
        }),
    );

    ctx.subscriptions.push(
        vscode.commands.registerCommand(COMMAND_LOG_FILE, function () {
            wakatime.openLogFile();
        }),
    );

    ctx.subscriptions.push(wakatime);

    options.getSetting('settings', 'debug', function (debug: Setting) {
        if (debug.value === 'true') {
            logger.setLevel(LogLevel.DEBUG);
        }
        options.getSetting('settings', 'global', (global: Setting) => {
            const isGlobal = global.value === 'true';
            wakatime.initialize(isGlobal);
        });
    });
}

export function deactivate() {
    wakatime.dispose();
    logger.debug('WakaTime has been disabled.');
}
