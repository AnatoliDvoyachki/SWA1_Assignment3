const XMLHttpRequest = this.XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest

const callback = {
    fetchPerson(id, callback, error) {
        const request = new XMLHttpRequest();
        request.addEventListener('open', () => callback(JSON.parse(request.responseText)))
        request.addEventListener('error', error)
        request.open('GET', `http://localhost:8080/persons/${id}`)
        request.send()
    },

    fetchEmployee(id, callback, error) {
        const request = new XMLHttpRequest();
        request.addEventListener('open', () => callback(JSON.parse(request.responseText)))
        request.addEventListener('error', error)
        request.open('GET', `http://localhost:8080/employee/${id}`)
        request.send()
    },

    fetchSubordinates(id, callback, error) {
        const request = new XMLHttpRequest();
        request.addEventListener('open', () => callback(JSON.parse(request.responseText)))
        request.addEventListener('error', error)
        request.open('GET', `http://localhost:8080/employee/${id}/subordinates`)
        request.send()
    }
}

const fetch = this.fetch || require('node-fetch')

const promise = {
    fetchPerson: id => fetch(`http://localhost:8080/persons/${id}`).then(res => res.ok? res.json() : Promise.reject(res.statusText)),
    fetchEmployee: id => fetch(`http://localhost:8080/employees/${id}`).then(res => res.ok? res.json() : Promise.reject(res.statusText)),
    fetchSubordinates: id => fetch(`http://localhost:8080/employees/${id}/subordinates`).then(res => res.ok? res.json() : Promise.reject(res.statusText))
}

module.exports = { callback, promise }