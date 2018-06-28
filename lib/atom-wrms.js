'use babel';

import AtomWrmsView from './atom-wrms-view';
import { CompositeDisposable } from 'atom';
import packageConfig from './config-schema.json';
import WRMS from 'wrms';

const creds = {
  endpoint: atom.config.get('atom-wrms.endpoint'),
  username: atom.config.get('atom-wrms.username'),
  password: atom.config.get('atom-wrms.password')
}

export default {

  atomWrmsView: null,
  modalPanel: null,
  subscriptions: null,
  config: packageConfig,

  activate(state) {
    this.atomWrmsView = new AtomWrmsView(state.atomWrmsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWrmsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'WRMS:fetchBrief': () => this.fetchBrief()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomWrmsView.destroy();
  },

  serialize() {
    return {
      atomWrmsViewState: this.atomWrmsView.serialize()
    };
  },

  // Retrieve a WR brief from WRMS api.
  fetchBrief() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      if (selection.match(/[0-9]+/)) {
        editor.insertText(atom.config.get('atom-wrms.username'))
        // WR#1234
      }
      else {
        editor.insertText('nope ' + selection + ' nope')
      }
    }
  }

};
