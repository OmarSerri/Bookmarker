var websiteNameInput = document.getElementById('websiteNameInput')
var websiteUrlInput = document.getElementById('websiteUrlInput')
var websiteContainer

if(localStorage.getItem('theWebsites') !=null)
{
    websiteContainer =JSON.parse(localStorage.getItem('theWebsites'))
    websiteDisplay(websiteContainer)
}
else
{
    websiteContainer = []
}

function submit()
{
    var website =
    {
        name:websiteNameInput.value,
        url:websiteUrlInput.value
    }
    websiteContainer.push(website)
    localStorage.setItem('theWebsites' , JSON.stringify(websiteContainer))
    websiteDisplay(websiteContainer)
    clearForm();
}

function clearForm()
{
    websiteNameInput.value = ""
    websiteUrlInput.value = ""
}

function websiteDisplay(websiteList)
{
    var tableRow = ``
    for(i=0 ; i < websiteList.length ; i++)
    {
        tableRow+=
        `<tr>
            <td>${i}</td>
            <td>${websiteList[i].name}</td>
            <td><button onclick="visitWebsite(${i})" class="btn btn-sm btn-outline-info">Visit</button></td>
            <td><button onclick="deleteWebsite(${i})" class="btn btn-sm btn-outline-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = tableRow;
}

function deleteWebsite(deleteIndex)
{
    websiteContainer.splice(deleteIndex,1)
    localStorage.setItem('theWebsites' , JSON.stringify(websiteContainer))
    websiteDisplay(websiteContainer)
}

function visitWebsite(visitIndex)
{
    var url= websiteContainer[visitIndex].url
    window.open(url)
}

function nameValidation()
{
    var regex = /^[A-Z]{0,1}[a-z]{3,8}$/gm
    if (regex.test(websiteNameInput.value) == true)
    {
        websiteNameInput.classList.replace('is-invalid' , 'is-valid')
        return true;
    }
    else
    {
        websiteNameInput.classList.add('is-invalid')
        return false;
    }
}

function urlValidation()
{
    var regex = /^(http:\/\/|https:\/\/)?(www\.)?[a-zA-Z0-9-_\.]+\.[a-zA-Z]+(:\d+)?(\/[a-zA-Z\d\.\-_]*)*[a-zA-Z.!@#$%&=-_'":,.?\d*)(]*$/gm
    if (regex.test(websiteUrlInput.value) == true)
    {
        websiteUrlInput.classList.replace('is-invalid' , 'is-valid')
        return true;
    }
    else
    {
        websiteUrlInput.classList.add('is-invalid')
        return false;
    }
}
