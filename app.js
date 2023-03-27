let global_todo_list = []

const TODO_FORM = {
    TITLE : document.getElementById('todo-form-title'),
    DESCRIPTION : document.getElementById('todo-form-description'),
    META : document.getElementById('todo-form-meta'),
}

const TODO_LIST = document.getElementById('todo-list')

function get_current_date() {
    return new Date().toJSON().slice(0, 10)
}

function update_todo_list_id(todo_list) {
    let list_buffer = []
    todo_list.forEach((element, index) => {
        list_buffer.push({...element, id : index})
    })
    return list_buffer
}

function delete_todo_from_list(todo, todo_list) {
    return update_todo_list_id(todo_list.filter(element => element.id !== todo.id))
}

function create_todo(id, title, description, meta, timestamp) {
    return {
        id : id,
        title : title,
        description : description,
        meta : meta,
        timestamp : timestamp
    }
}

function todo_to_html_string(todo) {
    let { id, title, description, meta, timestamp } = todo
    return `<article id="todo-${id}" class="todo">
    <div class="todo-top">
        <h2>${title}</h2>
        <span class="todo-meta">${meta}</span>
    </div>
    <div class="todo-body">
        <p>${description}</p>
        <p>Date Created: ${timestamp}</p>
    </div>
    <div class="todo-bottom">
        <button onclick="delete_todo(${id})">Delete</button>
    </div>
    </article>`
}

function todo_string_to_html(todo_string) {
    let temp = document.createElement('div')
    temp.innerHTML = todo_string
    return temp.firstChild
}

function update_todo_list() {
    TODO_LIST.innerHTML = ""
    global_todo_list.forEach(todo => TODO_LIST.append(todo_string_to_html(todo_to_html_string(todo))))
}

function append_todo() {
    global_todo_list.push(create_todo(
        global_todo_list.length,
        TODO_FORM.TITLE.value,
        TODO_FORM.DESCRIPTION.value,
        TODO_FORM.META.value,
        get_current_date()
    ))
    update_todo_list()
}

function delete_todo(index) {
    global_todo_list = delete_todo_from_list(global_todo_list[index], global_todo_list)
    update_todo_list()
}