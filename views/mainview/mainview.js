//#region anti warning
// const document = {}
// const window = {}
// const acquireVsCodeApi = () => {}
//#endregion

function removeAllChildren(node) {
  if (!node)
    return;

  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

function getDefaultState() {
  return {
    dirs: [],
    terminalCommand: 'echo "Hello World!"',
  }
}


(function () {
  /**
   * @typedef {object} DirSelection
   * @property {string} name
   * @property {string} trimmedName
   * @property {boolean} isSelected
   */
  
  /**
   * @typedef {object} MainViewState
   * @property {DirSelection[]} dirs
   * @property {string} terminalCommand
   */

  const vscode = acquireVsCodeApi();
  try {
    /** @type {MainViewState} */
    const oldState = vscode.getState() || getDefaultState();
    vscode.postMessage({ type: "GET_DIRS" })

    /**
     * @param {"dirs" | "terminalCommand"} field
     * @param {*} value 
     */
    function setState(field, value) {
      oldState[field] = value;
      vscode.setState(oldState);
      vscode.postMessage({
        type: "UPDATE_STATE",
        payload: {
          state: oldState
        }
      })
    }
    
    //#region external event listeners
    window.addEventListener('message', event => {
      const msg = event.data;
      switch (msg.type) {
        case "UPDATE_DIRS": {
          handleUpdateDirsEvent(msg.payload);
          break;
        }
        case "NO_WORKSPACE_FOLDERS": {
          handleNoWorkSpaceFolder();
          break;          
        }
      }
    })

    function handleUpdateDirsEvent(payload) {
      /** @type {string[]} */
      const newDirNames = payload.dirs;
      const newDirs = generateNewDirs(newDirNames);

      setStateDirsAndUpdateView(newDirs)
    }

    function handleNoWorkSpaceFolder(payload) {
      const dirsContainer = document.getElementById("dirs-container");
      removeAllChildren(dirsContainer);
      dirsContainer.textContent = "Please love open a folder."
    }
    //#endregion

    //#region state dirs
    function generateNewDirs(newDirNames) {
      /** @type {DirSelection[]} */
      const newDirs = [];

      newDirNames.forEach(dirName => {
        const existingDir = oldState.dirs.find(dir => dir.name === dirName) 

        if (existingDir)
          newDirs.push(existingDir)
        else
          newDirs.push({ 
            name: dirName,
            isSelected: true,
          })
      })

      newDirs.sort((d1, d2) => d1.name.localeCompare(d2.name));

      return newDirs;
    }

    function setStateDirsAndUpdateView(newDirs) {
      setState("dirs", newDirs);
      updateDirsView();
    }

    function updateDirsView() {
      const dirsContainer = document.getElementById("dirs-container");
      if (!dirsContainer)
        return;

      removeAllChildren(dirsContainer);

      oldState.dirs.forEach((dir, i) => {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "dir-wrapper");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("id", `dir-checkbox-${i}`);
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "checkbox")
        if (dir.isSelected)
          checkbox.setAttribute("checked", '')
          
        checkbox.addEventListener("change", () => {
          dir.isSelected = checkbox.checked;
          setState("dirs", oldState.dirs);
        })

        const label = document.createElement("label");
        label.setAttribute("class", "label")
        label.setAttribute("for", `dir-checkbox-${i}`)
        label.textContent = dir.name;

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        dirsContainer.appendChild(wrapper);
      })
    };

    function handleSelectAllDirsClick() {
      const newDirs = oldState.dirs.map(
        dir => ({ ...dir, isSelected: true })
      )

      setStateDirsAndUpdateView(newDirs);
    }

    function handleUnselectAllDirsClick() {
      const newDirs = oldState.dirs.map(
        dir => ({ ...dir, isSelected: false })
      )

      setStateDirsAndUpdateView(newDirs);
    }

    document.getElementById("btn-select-all-dirs").addEventListener("click", handleSelectAllDirsClick);
    document.getElementById("btn-unselect-all-dirs").addEventListener("click", handleUnselectAllDirsClick);
    //#endregion
  
    //#region state terminalCommand
    const textboxTerminalCommand = document.getElementById("textbox-terminal-command");
    textboxTerminalCommand.textContent = oldState.terminalCommand
    textboxTerminalCommand.addEventListener("change", event => {
      setState("terminalCommand", event.target.value);
    })
    //#endregion
  
    //#region Execution
    document.getElementById("btn-execute").addEventListener("click", () => {
      vscode.postMessage({ type: "EXECUTE" })
    })
    //#endregion
  }
  catch (e) {
    vscode.postMessage({ type: "ERROR", payload: e });
  }
})()