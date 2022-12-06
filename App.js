


function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    // return div.firstElementChild;
    return div;   //this will also run
}

let customParameters = document.getElementById("customParameters");
let json = document.getElementById("json");
// DISPLAY OR HIDE THE CUSTOM PARAMETERS OR JSON AREA (ACCORDING TO USER)
customParameters.addEventListener('click', () => {
    document.getElementById("jsonArea").style.display = "none";
    document.getElementById("params").style.display = "block";


})
json.addEventListener('click', () => {
    document.getElementById("params").style.display = "none";
    document.getElementById("jsonArea").style.display = "flex";
})
let paramBtn = document.getElementById("paramBtn");
var index = 0;
paramBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let str = `            <div class="form-row  " style="display: flex; margin-top: 3px;">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${index + 2}</label>
    <div class="col-md-4" style="margin-right: 3px;">
        <input type="text" class="form-control" id="parameterKey${index + 2}"  placeholder="Enter Parameter ${index + 2} Key">
    </div>
    <div class="col-md-4"  style="margin-right: 3px;">
        <input type="text" class="form-control" id="parameterValue${index + 2}" placeholder="Enter Parameter ${index + 2} Value">
    </div>
    <button  class="btn btn-primary deleteBtn">-</button>
</div> 
`
    let params = document.getElementById("params")
    let paramElement = getElementFromString(str)    //here's call the function which will create div and append child apne ander str ko daaldega
    params.appendChild(paramElement);
    let deleteBtn = document.getElementsByClassName("deleteBtn");
    for (delbtn of deleteBtn) {
        delbtn.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    index++;
})
let submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener('click', () => {
    // when a user click on submit button this will happen
    document.getElementById("responseTxt").innerHTML = "Please Wait ,Your Fetch api will appear here.....";
    // let getRequest = document.getElementById("getRequest");
    // let postRequest = document.getElementById("postRequest");
    // Grapping all the value which is written by the user
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    if (contentType == 'Params') {   //YOU WRITE (Params) here because you write in html as Params
        data = {};
        for (let i = 0; i < index + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("JsonTextArea").value;
    }


    // BETTER STRATEGY (IF YOU WANT TO CHECK YOU TAKE THE RIGHT THING OR NOT JUST CONSOLE IT.IT WILL CONFIRM YOUR SELECTION OTHERWISE YOU GET MANY PROBLEMS)

    // Fetching the API
    if (requestType == 'GET') {
        fetch(url)
            .then((response) => {
                return response.text()      //if you use the { } you have to must return
            })
            .then((text) => {
                // document.getElementById("responseTxt").innerHTML = fetchData;
                document.getElementById("responseTxt").innerHTML = text;
            })
    }

    else {

        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                return response.text();
            }).then((postData) => {
                document.getElementById("responseTxt").innerHTML = postData;
            })
    }
}
)