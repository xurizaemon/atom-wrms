'use babel'

import AtomWrmsView from './atom-wrms-view'
import { CompositeDisposable } from 'atom'
import packageConfig from './config-schema.json'
import WRMS from 'wrms'

export default {

  atomWrmsView: null,
  modalPanel: null,
  subscriptions: null,
  config: packageConfig,

  activate(state) {
    this.atomWrmsView = new AtomWrmsView(state.atomWrmsViewState)

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWrmsView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'WRMS:calculateHours': () => this.calculateHours(),
      'WRMS:fetchBrief': () => this.fetchBrief()
    }))

    // This applies to the editor which was selected when the function fired.
    // We want to apply to the currently edited pane!
    // let editor
    // if (editor = atom.workspace.getActiveTextEditor()) {
    //   this.subscriptions.add(editor.onDidChange((x) => {
    //     console.log(x, 'modified')
    //   }))
    // }

  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.atomWrmsView.destroy()
  },

  serialize() {
    return {
      atomWrmsViewState: this.atomWrmsView.serialize()
    }
  },

  creds() {
    const creds = {
      endpoint: atom.config.get('atom-wrms.endpoint'),
      username: atom.config.get('atom-wrms.username'),
      password: atom.config.get('atom-wrms.password')
    }

    if (!creds.username.length || !creds.password.length) {
      atom.notifications.addError('Please configure WRMS plugin in package settings.')
    }

    return creds
  },

  // Retrieve a WR brief from WRMS api.
  fetchBrief() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let wrNumericMatch = selection.match(/([0-9]+)/)
      if (typeof wrNumericMatch !== 'object') {
        console.log(`Selected text "${selection}" is not a numeric ID?`)
        // @TODO Bail out nicely?
      }
      let wrNumericId = wrNumericMatch[1]
      if (typeof wrNumericId == "string" && wrNumericId.length) {
        // wrNumericId = "291606"
        const creds = this.creds()
        const wrms = new WRMS(creds)
        wrms.login()
          .then(() => {
            wrms.work_request.get(wrNumericId)
              .then((res) => {
                editor.insertText(JSON.stringify(res))
              })
          })
      }
      else {
        editor.insertText('nope ' + selection + ' nope')
      }
    }
  },

  calculateHours() {
    let lines = document.getElementsByClassName('line')
    let dayHours, dayLineComment, dayLine, hours, date
    let foundDays = {}
    for (line of lines) {
      if (line.getElementsByClassName('syntax--tks-day-date').length) {
        date = line.getElementsByClassName('syntax--tks-day-date')[0]
        dayLine = line
        hours = 0
        foundDays[date.innerText] = {
          dateLine: line,
          hours: 0
        }
        console.log(date.innerText, 'date')
      }
      else if (line.getElementsByClassName('syntax--tks-time').length) {
        dayHours = line.getElementsByClassName('syntax--tks-time')[0].innerText
        hours = parseFloat(hours) + parseFloat(dayHours)
        console.log(dayHours, hours)
      }
      
      // Inline replace to insert hours. Bit crude, doesn't stick.
      // if (typeof dayLine !== 'undefined') {
      //   dayLineComment = dayLine.getElementsByClassName('syntax--tks-day-comment')
      //   if (dayLineComment.length) {
      //     dayLineComment[0].innerText = dayLineComment[0].innerText.replace(/\# [0-9\.]*(.*)$/, `# ${hours}$1`)
      //   }
      // }
    }
  }

}
