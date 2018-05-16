'use babel';

import AtomWrmsView from './atom-wrms-view';
import { CompositeDisposable } from 'atom';

export default {

  atomWrmsView: null,
  modalPanel: null,
  subscriptions: null,

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
      'WRMS:reverse': () => this.reverse()
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

  // Very simple test WRMS command.
  reverse() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
  }

};
