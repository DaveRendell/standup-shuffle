function submitShuffleForm(e) {
    e.preventDefault()
    document.getElementById("list-description").innerHTML = "Showing a random order. Refresh the page to get today's default order."
    shuffleList()
}

function submitAddItemForm(e) {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    const newEntry = formData.item
    if (!newEntry) {
        return
    }
    
    const items = [...getItemsFromQuery(), newEntry]
    populateSearchQuery(items)

}

function getItemsFromQuery() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const items = [...urlSearchParams.getAll('i')]

    return items
}

function shuffleList(seed = Math.random()) {
    const items = getItemsFromQuery()
    const shuffledItems = shuffle(items, seed)
    
    populateList(shuffledItems)
}

function createListItem(item) {
    return `<li><span>${item}</span> <button class="delete-button float-right"><small>❌</small></button></li>`
}

function populateSearchQuery(items) {
    const searchParams = new URLSearchParams()
    items.forEach(item => searchParams.append("i", item))
    window.location.search = searchParams.toString()
}

function populateList(items) {
    const list = document.getElementById("list")
    list.innerHTML = items
        .map(createListItem)
        .join('')
    
    Array.from(list.childNodes).forEach((listItem) => {
        const item = listItem.getElementsByTagName("span")[0].innerHTML
        const button = listItem.getElementsByTagName("button")[0]

        button.onclick = (e) => {
            e.preventDefault
            const items = getItemsFromQuery()
            const index = items.findIndex(i => i === item)
            if (index >= 0) {
                items.splice(index, 1)
                populateSearchQuery(items)
            }
        }
    })
}

// https://stackoverflow.com/a/53758827
function shuffle(array, seed) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(random(seed) * m--)

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed
    }

return array;
}
  
function random(seed) {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
}

function init() {
    document.getElementById("shuffle-form").onsubmit = submitShuffleForm
    document.getElementById("add-item-form").onsubmit = submitAddItemForm

    const now = new Date()
    const today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    shuffleList(today.getTime())
}

window.onload = init
