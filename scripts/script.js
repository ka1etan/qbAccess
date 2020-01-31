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



function list(xhr) {
    let root = document.getElementById("root")

    if (root.firstChild) {
        root.removeChild(document.getElementById("listSelect"))
    }
    let select = document.createElement("select")
    select.setAttribute("id", "listSelect")
    root.appendChild(select)

    console.log(xhr.response)

    let db = JSON.parse(xhr.response)
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
        if (root.childElementCount > 1) {
            root.removeChild(document.getElementById("listSelect2"))
            root.removeChild(document.getElementById("tableData"))
        }
        let select2 = document.createElement("select")
        select2.setAttribute("id", "listSelect2")
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
                root.removeChild(document.getElementById("tableData"))
            }
            let list2Value = document.getElementById("listSelect2").value
            let subContentIndex = subKeys.indexOf(list2Value) - 1
            let table = document.createElement('table')
            table.setAttribute("id", "tableData")
            let br = document.createElement('br')
            let br2 = document.createElement('br')
            let br3 = document.createElement('br')
            //alert(JSON.stringify(subContent[subContentIndex]))
            let row = table.insertRow()
            row.appendChild(br)
            let hyperlink = document.createTextNode("hyperlink: " + (subContent[subContentIndex].hyperlink))
            row.appendChild(hyperlink)
            row.appendChild(br2)
            let username = document.createTextNode("username: " + (subContent[subContentIndex].username))
            row.appendChild(username)
            row.appendChild(br3)
            let password = document.createTextNode("password: " + (subContent[subContentIndex].password))
            row.appendChild(password)
            root.appendChild(table)
        }

        select2.addEventListener("change", () => display(), false)
    }

    select.addEventListener("change", () => list2(), false)
    // let eventtargetValue = event.target.value
    // select.addEventListener("change", eventtargetValue => list2(eventtargetValue))

}

function main() {
    xhr("GET", "json/users45.json", list)

}

window.addEventListener("load", main)