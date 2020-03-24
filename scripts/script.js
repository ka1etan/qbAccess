function xhr(method, file, code) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, file)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            code(xhr)
        }
    }

    xhr.open(method, file)
    xhr.send()
}

//https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/

function copyStringToClipboard(str) {
    
    var el = document.createElement('textarea');
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function listCore(db){

    let root = document.getElementById("root")

    if (root.firstChild) {
        root.removeChild(document.getElementById("listSelect"))
    }
    let select = document.createElement("select")
    select.setAttribute("id", "listSelect")
    select.className="selects"
    root.appendChild(select)

 
    //console.log(db)

    let keys = [" "]
    let subObjects = []

    for (let i = 0; i < db.length; i++) {
        let obj = db[i]
        for (var props in obj) {
            keys.push(props)
            //console.log(obj[props])
            subObjects.push(obj[props])
        }
    }

    console.log(keys)

    for (let i = 0; i < keys.length; i++) {
        //listKeys = keys[i]
        let x = document.createElement("option")
        x.text = keys[i]
        select.options.add(x, i)
    }

    function list2() {
        if (root.childElementCount == 2) {
            root.removeChild(document.getElementById("listSelect2"))
           
        } else if(root.childElementCount > 2)
        {
            root.removeChild(document.getElementById("listSelect2"))
            root.removeChild(document.getElementById("tableDiv"))
            
            
        }
        let select2 = document.createElement("select")
        select2.setAttribute("id", "listSelect2")
        select2.className="selects"
        root.appendChild(select2)
        let list1Value = document.getElementById("listSelect").value
        let a = null
        let subKeys = [" "]
        let subContent = []

        if (list1Value == "new1") {
            a = 0
        } else if (list1Value == "new2") {
            a = 1
        }

        let obj = subObjects[a]
        for (var props in obj) {
            subKeys.push(props)

            subContent.push(obj[props])
        }


        console.log(subKeys)
        console.log(subContent)

        for (let i = 0; i < subKeys.length; i++) {
            let x = document.createElement("option")
            x.text = subKeys[i]
            select2.options.add(x, i)
        }

        function display() {
            if (root.childElementCount > 2) {
                root.removeChild(document.getElementById("tableDiv"))
            }
            let list2Value = document.getElementById("listSelect2").value
            let subContentIndex = subKeys.indexOf(list2Value) - 1
            // let br = document.createElement('br')
            // let br2 = document.createElement('br')
            let tableDiv = document.createElement("div")
            tableDiv.className = "tableStyle"
            tableDiv.setAttribute("id", "tableDiv")
            root.appendChild(tableDiv)
            let table = document.createElement('table')
            table.setAttribute("id", "tableData")
            
            //let br3 = document.createElement('br')
            //alert(JSON.stringify(subContent[subContentIndex]))
            let row = table.insertRow()
            //row.appendChild(br)

            let hyperDiv = document.createElement("div")
            hyperDiv.setAttribute("id", "hyperlinkDiv")
            hyperDiv.className = "onText"

            let hyperCell = row.insertCell()
            let hyperCellContent = row.insertCell()
            hyperCellContent.appendChild(hyperDiv)
            let hyperlink = document.createTextNode("hyperlink: ")
            

            hyperCell.appendChild(hyperlink)
            //let hyperlinkContent = document.createTextNode(subContent[subContentIndex].hyperlink)
            let hyperlinkContent = document.createElement("a")
            hyperlinkContent.className = "decoration"
            hyperlinkContent.setAttribute("href", subContent[subContentIndex].hyperlink)
            hyperlinkContent.setAttribute("target", "_blank")
            hyperlinkContent.innerText = subContent[subContentIndex].hyperlink
            hyperDiv.appendChild(hyperlinkContent)
            
            let row2 = table.insertRow()
            //row.appendChild(br2)
            let userDiv = document.createElement("div")
            userDiv.setAttribute("id", "userDiv")
            userDiv.className = "onText"

            let userCell = row2.insertCell()
            let userCellContent = row2.insertCell()
            userCellContent.appendChild(userDiv)
            let username = document.createTextNode("username: " )
            let usernameContent = document.createTextNode(subContent[subContentIndex].username)
            userDiv.addEventListener("click", ()=>copyStringToClipboard(subContent[subContentIndex].username))
            userCell.appendChild(username)
            userDiv.appendChild(usernameContent)

            let row3 = table.insertRow()
            let passDiv = document.createElement("div")
            passDiv.className = "onText"
            
            let passCell = row3.insertCell()
            let passCellContect = row3.insertCell()
            passCellContect.appendChild(passDiv)
            let password = document.createTextNode("password: ")
            let passwordContent = document.createTextNode(subContent[subContentIndex].password)
            passDiv.addEventListener("click", ()=>copyStringToClipboard(subContent[subContentIndex].password))
            passCell.appendChild(password)
            passDiv.appendChild(passwordContent)

            tableDiv.appendChild(table)
        }

        select2.addEventListener("change", () => display(), false)
    }

    select.addEventListener("change", () => list2(), false)
    // let eventtargetValue = event.target.value
    // select.addEventListener("change", eventtargetValue => list2(eventtargetValue))

}

function main() {
    //xhr("GET", "json/users45.json", list)
    console.log(data[0].new1.sub1new1.hyperlink)
    listCore(data)

}

window.addEventListener("load", main)