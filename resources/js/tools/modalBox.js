/* 
 * This code is free to use, just remember to give credit.
 */


function openModalBox(title, fields, buttonText, onAccept, givenItem){
//no cleancode here, at least for now
    var item = {};

    if(givenItem !== undefined){
        item = JSON.parse(JSON.stringify(givenItem));
    }
    
    var blocker = document.createElement('div');
    blocker.setAttribute('class', 'modal-box-blocker');
    
    var modal = document.createElement('div');
    modal.setAttribute('class', 'modal-box');
    
    var close = document.createElement('span');
    close.setAttribute('class', 'modal-box-close');
    close.innerHTML = '&times;';
    
    var header = document.createElement('div');
    header.setAttribute('class', 'modal-box-header');
    
    var headerText = document.createElement('h2');
    headerText.textContent = title;
    
    var modalBody = document.createElement('div');
    for (var i = 0; i < fields.length; i++){
        var field = fields[i];
        var container = document.createElement('div');
        container.setAttribute('class', 'modal-box-field');
        switch(field.type){
            case 'text':
                var input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('class', 'modal-box-input');
                input.setAttribute('placeholder', field.title);
                input.setAttribute('title', field.title);
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(item[field.variable] !== undefined){
                    input.value = item[field.variable];
                }
                else{
                    item[input.variable] = input.value;
                }
                if(field.limit !== undefined){
                    input.setAttribute('maxLength', field.limit);
                }
                if(field.required !== undefined && field.required === true){
                    input.required = true;
                }
                break;
            case 'textarea':
                var maxWidth = 50;
                var defWidth = 50;
                var maxHeight = 10;
                var defHeight = 5;
                var input = document.createElement('textarea');
                input.setAttribute('class', 'modal-box-textarea');
                input.setAttribute('placeholder', field.title);
                input.setAttribute('title', field.title);
                input.setAttribute('resize', 'disable');
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(item[field.variable] !== undefined){
                    input.value = item[field.variable];
                }
                else{
                    item[input.variable] = input.value;
                }
                if(field.limit !== undefined){
                    input.setAttribute('maxLength', field.limit);
                }
                if(field.width !== undefined){
                    if(field.width > maxWidth || field.width < 1){
                        input.setAttribute('cols', defWidth);
                    }
                    else{
                        input.setAttribute('cols', field.width);
                    }
                }
                else{
                    input.setAttribute('cols', defWidth);
                }
                if(field.height !== undefined){
                    if(field.height > maxHeight || field.height < 1){
                        input.setAttribute('rows', defHeight);
                    }
                    else{
                        input.setAttribute('rows', field.height);
                    }
                }
                else{
                    input.setAttribute('rows', defHeight);
                }
                if(field.required !== undefined && field.required === true){
                    input.required = true;
                }
                break;
            case 'number':
                var input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.setAttribute('class', 'modal-box-input');
                input.setAttribute('placeholder', field.title);
                input.setAttribute('title', field.title);
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(field.max !== undefined){
                    input.setAttribute('max', field.max);
                }
                if(field.min !== undefined){
                    input.setAttribute('min', field.min);
                }
                if(field.step !== undefined){
                    input.setAttribute('step', field.step);
                }
                if(field.value !== undefined){
                    input.value = field.value;
                }
                if(item[field.variable] !== undefined){
                    input.value = item[field.variable];
                }
                else{
                    item[input.variable] = input.value;
                }
                if(field.required !== undefined && field.required === true){
                    input.required = true;
                }
                break;
            case 'select':
                var select = document.createElement('select');
                select.setAttribute('class', 'modal-box-input');
                if(field.required !== undefined && field.required === true){
                    select.required = true;
                }
                var placeholder = document.createElement('option');
                placeholder.setAttribute('value', '');
                placeholder.disabled = true;
                if(field.options.length !== 1){
                    placeholder.selected = true;
                }
                placeholder.textContent = field.title;
                select.appendChild(placeholder);
                for(var k = 0; k < field.options.length; k++){
                    var optionItem = field.options[k];
                    var option = document.createElement('option');
                    option.setAttribute('value', optionItem.value);
                    option.textContent = optionItem.title;
                    if(field.options.length === 1){
                        option.selected = true;
                    }
                    select.appendChild(option);
                }
                container.appendChild(select);
                select.variable = field.variable;
                select.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(item[field.variable] !== undefined){
                    select.value = item[field.variable];
                }
                else{
                    item[select.variable] = select.value;
                }
                break;
            case 'checkbox':
                var check = document.createElement('input');
                check.setAttribute('type', 'checkbox');
                check.setAttribute('class', 'modal-box-checkbox');
                var label = document.createElement('label');
                label.setAttribute('class', 'modal-box-label');
                label.textContent = field.title;
                container.appendChild(check);
                container.appendChild(label);
                check.variable = field.variable;
                check.onchange = function(){
                    if(this.checked){
                        item[this.variable] = 1;
                    }
                    else{
                        item[this.variable] = 0;
                    }
                }
                if(item[field.variable] !== undefined){
                    check.checked = item[field.variable];
                }
                else{
                    if(check.checked){
                        item[check.variable] = 1;
                    }
                    else{
                        item[check.variable] = 0;
                    }
                }
                break;
            case 'display':
                var str = field.title.split(/\r?\n/);
                str.forEach(txt => {
                    var text = document.createTextNode(txt);
                    container.appendChild(text);
                    container.appendChild(document.createElement('br'));
                });
                break;
            case 'color':
                var input = document.createElement('input');
                input.setAttribute('type', 'color');
                var label = document.createElement('label');
                label.textContent = field.title + ' ';
                container.appendChild(label);
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(item[field.variable] !== undefined){
                    input.value = item[field.variable];
                }
                else{
                    item[input.variable] = input.value;
                }
                break;
            case 'date':
                var input = document.createElement('input');
                input.setAttribute('type', 'date');
                input.setAttribute('class', 'modal-box-input-date');
                var label = document.createElement('label');
                label.textContent = field.title + ' ';
                container.appendChild(label);
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(field.max !== undefined){
                    input.setAttribute('max', field.max);
                }
                if(field.min !== undefined){
                    input.setAttribute('min', field.min);
                }
                if(item[field.variable] !== undefined){
                    input.value = item[field.variable];
                }
                else{
                    if(field.value === undefined){
                        var date = new Date();
                    }
                    else{
                        var date = new Date(field.value);
                    }
                    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                    input.value = date.toJSON().slice(0,10);
                    item[input.variable] = input.value;
                }
                break;
            case 'dateTime':
                var input = document.createElement('input');
                input.setAttribute('type', 'datetime-local');
                input.setAttribute('class', 'modal-box-input-date');
                var label = document.createElement('label');
                label.textContent = field.title + ' ';
                container.appendChild(label);
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value.replace('T', ' ');
                }
                if(field.max !== undefined){
                    input.setAttribute('max', field.max);
                }
                if(field.min !== undefined){
                    input.setAttribute('min', field.min);
                }
                if(item[field.variable] !== undefined){
                    var datetime = new Date(item[field.variable]);
                    datetime.setMinutes(datetime.getMinutes() - datetime.getTimezoneOffset());
                    input.value = datetime.toISOString().slice(0,16);
                }
                else{
                    item[input.variable] = input.value;
                }
                break;
            case 'time':
                var input = document.createElement('input');
                input.setAttribute('type', 'time');
                input.setAttribute('class', 'modal-box-input-date');
                var label = document.createElement('label');
                label.textContent = field.title + ' ';
                container.appendChild(label);
                container.appendChild(input);
                input.variable = field.variable;
                input.onchange = function(){
                    item[this.variable] = this.value;
                }
                if(field.max !== undefined){
                    input.setAttribute('max', field.max);
                }
                if(field.min !== undefined){
                    input.setAttribute('min', field.min);
                }
                if(item[field.variable] !== undefined){
                    input.value = item[field.variable];
                }
                else{
                    input.value = '08:00';
                    item[input.variable] = input.value;
                }
                break;
        }
        modalBody.appendChild(container);
    }
    
    
    
    var footer = document.createElement('div');
    footer.setAttribute('class', 'modal-box-footer');
    
    header.appendChild(close);
    header.appendChild(headerText);
    modal.appendChild(header);
    modal.appendChild(modalBody);
    
    modal.appendChild(footer);
    blocker.appendChild(modal);
    var body = document.body;
    body.appendChild(blocker);
    
    window.onclick = function(event) {
        if (event.target === blocker) {
            body.removeChild(blocker);
        }
    }
    
    close.onclick = function(){
        body.removeChild(blocker);
    }
    
    
    if(onAccept instanceof Function){
        var button = document.createElement('button');
        button.textContent = buttonText;
        button.setAttribute('class', 'modal-box-button');
        footer.appendChild(button);
        button.onclick = function(){
            var list = modal.querySelectorAll(':invalid');
            if(list.length === 0){
                body.removeChild(blocker);
                onAccept(item);
            }
        }
        
        function handleModal(event){
            if (event.key === "Enter") {
                event.preventDefault();
                button.click();
                body.removeEventListener('keydown', handleModal);
            }
            if (event.key === "Escape") {
                event.preventDefault();
                close.click();
                body.removeEventListener('keydown', handleModal);
            }
        }
        
        body.addEventListener("keydown", handleModal);
    }
}