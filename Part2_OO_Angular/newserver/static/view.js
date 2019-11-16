function view(model, actionProvider) {
    const {div, h1, p, button, table, tbody, thead, tr, td} = React.DOM;
    
    function createTable(model) {
        return table(null, 
            thead(null, null, tr(null, null, td(null, "Id"), td(null, "Name"), td(null, "EmployeeId"), td(null, "Salary"), td(null, "Manager"))),
            tbody(null, null, ...model.personData().map(p => {
                    if (p.employeeId) {
                        return tr(null, null, 
                            td(null, null, p.id),
                            td(null, null, p.name),
                            td(null, null, p.employeeId),
                            td(null, null, p.salary || 0),
                            td(null, null, p.manager? "true" : "false")
                        )
                    } else {
                        return tr(null, null, 
                            td(null, null, p.id),
                            td(null, null, p.name),
                            td(null, null, button({onClick: () => actionProvider.onHire(p.id)}, "Hire")),
                            td(null, null, ""),
                            td(null, null, "")
                        )
                    }
                })
            )
        )    
    }    
    
    return div(null, 
        h1(null, 'People'), 
        createTable(model)
    )
}

function update(parent) {
    return view => ReactDOM.render(view, parent)
}
