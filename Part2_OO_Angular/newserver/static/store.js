function reduce(state, { type, ...params }) {
    switch (type) {
        case 'hire':
            const { person, employee } = params
            const updated = state.addEmployee(employee).updatePerson(person)
            return updated
    }
}

function store(init_state, render) {
    let state = init_state

    function onAction(action) {
        state = reduce(state, action)
        render(state)
    }

    return { onAction }
}
