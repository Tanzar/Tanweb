/* 
 * This code is free to use, just remember to give credit.
 */

/**
 * Create schedule of passed data
 * it requires div with id=timetable
 * places data as cells on timetable
 * you can also setup what will happen if you cick on cell
 */
function Timetable(data, dayStart, dayEnd, groupBy, cellOnClick){
    
    dayStart.setHours(0,0,0,0);
    dayEnd.setHours(23,59,59,0);
    
    this.minutesPerPixel = 5;
    this.separation = 5;
    this.rangeStart = dayStart;
    this.rangeEnd = dayEnd;
    this.data = data;
    this.cellOnClick = cellOnClick;
    
    this.groupData = function(data){
        var rows = {};
        data.forEach(item => {
            if(rows[item[groupBy]] === undefined){
                rows[item[groupBy]] = [item];
            }
            else{
                rows[item[groupBy]].push(item);
            }
        });
        return rows;
    }
    
    this.countDays = function(dayStart, dayEnd){
        var difference = dayEnd.getTime() - dayStart.getTime();
        var totalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return totalDays;
    }
    
    this.countDayWidth = function(){
        return (24 * 60) / this.minutesPerPixel;
    }
    
    this.countTotalWidth = function(){
        var days = this.countDays(this.rangeStart, this.rangeEnd);
        var width = days * this.countDayWidth();
        return width;
    }
    
    this.createHeaders = function(){
        var headers = [];
        var totalDays = this.countDays(this.rangeStart, this.rangeEnd);
        var dayWidth = this.countDayWidth();
        for(var i = 0; i < totalDays; i++){
            var date = new Date(this.rangeStart);
            date.setDate(date.getDate() + i);
            var head = document.createElement('div');
            head.setAttribute('class', 'timetable-head');
            head.textContent = date.getDate() + ' - ' + date.getMonth() + ' - ' + date.getFullYear();
            head.style.width = dayWidth + 'px';
            head.style.left = i * dayWidth + 'px';
            headers.push(head);
        }
        return headers;
    }
    
    this.countDayPush = function(date){
        var dayWidth = this.countDayWidth();
        var daysCount = this.countDays(this.rangeStart, date);
        if(daysCount <= 0){
            return 0;
        }
        else{
            return (daysCount - 1)* dayWidth;
        }
    }
    
    this.countX = function(day){
        var dayPush = this.countDayPush(day);
        var x = day.getMinutes() + (60 * day.getHours());
        if (day.getTime() <= this.rangeStart.getTime()){
            return 0;
        }
        if (day.getTime() >= this.rangeEnd.getTime()){
            return this.countTotalWidth();
        }
        x = x / this.minutesPerPixel;
        return x + dayPush;
    }
    
    this.createEntryCell = function(item, y){
        var timetable = this;
        var startX = this.countX(new Date(item.start));
        var endX = this.countX(new Date(item.end));
        var width = endX - startX;
        
        var cell = document.createElement('div');
        cell.setAttribute('class', 'timetable-data');
        cell.textContent = item.title;
        cell.style.top = y + 'px';
        cell.style.left = startX + 'px';
        cell.style.width = width + 'px';
        if(item.color !== undefined){
            cell.style.backgroundColor = item.color;
        }
        cell.onclick = function(){
            timetable.cellOnClick(item);
        }
        return cell;
    }
    
    this.construct = function(){
        var div = document.getElementById('timetable');
        div.setAttribute('class', 'timetable');

        while(div.firstChild){
            div.removedNode(div.firstChild);
        }

        div.style.maxWidth = this.countTotalWidth() + 'px';
        return div;
    }
    
    this.createLines = function(Y, height){
        var lines = [];
        var totalWidth = this.countTotalWidth();
        var dayWidth = this.countDayWidth();
        for(var i = 0; i < totalWidth; i = i + (60 / this.minutesPerPixel)){
            var line = document.createElement('div');
            if(i % dayWidth === 0 && i !== 0){
                line.setAttribute('class', 'timetable-line-day');
            }
            else{
                line.setAttribute('class', 'timetable-line');
            }
            line.style.top = Y + 'px';
            line.style.left = i + 'px';
            line.style.height = height + 'px';
            lines.push(line);
        }
        return lines;
    }
    
    this.isInRange = function(date){
        var time = date.getTime();
        var start = this.rangeStart.getTime();
        var end = this.rangeEnd.getTime();
        return (time <= end && time >= start);
    }
    
    this.load = function(){
        var div = this.construct();
        
        var headers = this.createHeaders();
        
        headers.forEach(header => {
            div.appendChild(header);
        });
        
        var groupedData = this.groupData(this.data);
        
        var groups = Object.keys(groupedData);
        
        var Y = headers[0].offsetHeight + this.separation;
        
        var timetable = this;
        
        groups.forEach(index => {
            var cells = [];
            var height = 0;
            var group = groupedData[index];
            group.forEach(item => {
                var start = new Date(item.start);
                var end = new Date(item.end);
                if(timetable.isInRange(start) && timetable.isInRange(end)){
                    var cell = timetable.createEntryCell(item, Y);
                    div.appendChild(cell);
                    if(cell.offsetHeight > height){
                        height = cell.offsetHeight;
                    }
                    cells.push(cell);
                }
            });
            Y += height + timetable.separation;
            cells.forEach(cell => {
                cell.style.height = height;
            });
        });
        
        var startY = headers[0].offsetHeight;
        var lines = this.createLines(startY, Y);
        
        lines.forEach(line => {
            div.insertBefore(line, div.firstChild);
        });
        
        div.style.height = startY + Y + 'px';
    }
    
    this.load();
}