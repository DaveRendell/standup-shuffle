function submitShuffleForm(e) {
    e.preventDefault()
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

function shuffleList() {
    const items = getItemsFromQuery()
    const shuffledItems = items
        .map((item) => ( {rank: Math.random(), item }))
        .sort((a, b) => a.rank - b.rank)
        .map(({ item }) => item)
    
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

function init() {
    document.getElementById("shuffle-form").onsubmit = submitShuffleForm
    document.getElementById("add-item-form").onsubmit = submitAddItemForm

    shuffleList()
}

window.onload = init
