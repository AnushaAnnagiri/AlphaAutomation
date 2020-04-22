
(function () {
    let buttons = document.getElementsByClassName('rte--tool--btn');
    for (let btn of buttons) {
        btn.addEventListener('click', function () {
            let cmd = btn.dataset['command'];
            if (cmd === 'createlink') {
                let url = prompt("Enter the link here: ", "http:\/\/", "password", "");
                document.execCommand(cmd, false, url);
            }
            else if (cmd === 'createtable') {
                document.getElementById('rte--create-table-popup').style.display = "block"
            }
            else {
                document.execCommand(cmd, false, null);
            }
        })
    }

})()

function Rte() {

    this.currentTableContext = null;
    this.rteContainer = null
    this.init = function (id) {
        this.rteContainer = document.getElementById('output');

    }
    this.createTable = function () {
        let r = document.getElementById('rte--num_row').value;
        let c = document.getElementById('rte--num_col').value;
        let tw = document.getElementById('rte--table_width').value;
        //let al = document.getElementById('rte--table_align').value;
        let cs = document.getElementById('rte--table_cs').value;
        let cp = document.getElementById('rte--table_cp').value;
        this.table(r, c, tw, al = '', cs, cp)
        document.getElementById('rte--create-table-popup').style.display = "none"
    }
    this.table = function (r, c, tw = '500px', al = 'left', cs = '1', cp = '1') {
        var table = null;
        table = document.createElement('table');
        table.classList.add("rte-table");
        //table.setAttribute('align',al)
        table.setAttribute('cellspacing', cs)
        table.setAttribute('cellpadding', cp)
        table.style.width = tw
        var i = j = 0;
        var row = [];
        for (i = 0; i < r; i++) {
            row[i] = table.insertRow(i);
            for (j = 0; j < c; j++) {
                row[i].insertCell(j);
            }
        }
        this.rteContainer.appendChild(table);
        this.attachEventToTable(table)
    }
    this.closePopup = function () {
        document.getElementById('rte--create-table-popup').style.display = "none"
    }
    this.deleteTable = function () {
        this.currentTableContext.remove()
        document.getElementById('rte--edit-table-popup').style.display = "none"
    }
    this.cancelDeleteTable = function () {
        document.getElementById('rte--edit-table-popup').style.display = "none"
    }
    this.getContent = function () {
        return this.rteContainer.innerHTML
    }
    this.setContent = function (text) {
        this.rteContainer.innerHTML = text;

        let rteTables = document.getElementsByClassName('rte-table');
        for (let table of rteTables) {
            this.attachEventToTable(table)
        }
    }
    this.attachEventToTable = function (table) {
        let that = this;

        table.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            document.getElementById('rte--edit-table-popup').style.display = "block";
            document.getElementById('rte--edit-table-popup').style.top = table.offsetTop + "px"
            document.getElementById('rte--edit-table-popup').style.left = table.offsetLeft + "px"

            that.currentTableContext = this;
        }, true);
    }

}