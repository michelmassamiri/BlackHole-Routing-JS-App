import '../executeCommand/executeCommand.js';
import '../listCommand/listCommand.js';
import '../listRoutes/listRoutes.js';
import { Session } from 'meteor/session';

import './appContent.html';

Session.set('isExaRunning', false);
Session.set('ExaError', "");