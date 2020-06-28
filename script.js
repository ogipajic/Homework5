var $currentDay = $("#currentDay")
        var $timeBlocks = $(".time-block");
        var $schedule = $(".schedule");

        var toDoItems = [];

        // format for current date and hour using moment.js

        var currentDate = moment().format("dddd, MMM Do");
        var currentHour = moment().format("H");

        function initializeSchedule() {

    
            $timeBlocks.each(function() {
                var $thisBlock = $(this);
                var $thisBlockHr = parseInt($thisBlock.attr("data-hour"));
                var toDoObj = {
                    hour: thisBlockHr,
                    text: "",
                }
                toDoItems.push(toDoObj); 
            });
            localStorage.setItem("todos", JSON.stringify(toDoItems));       
        }


        function setUpTimeBlocks() {
            $timeBlocks.each(function() {
                var $thisBlock = $(this);                                   
                var thisBlockHr = parseInt($thisBlock.attr("data-hour"));    

    
                
                if (thisBlockHr == currentHour) {                          
                    $thisBlock.addClass("present").removeClass("past");
                }
                if (thisBlockHr < currentHour) {                           
                    $thisBlock.addClass("past").removeClass("present");
                }
                if (thisBlockHr > currentHour) {                             
                    $thisBlock.addClass("future").removeClass("past present");
                }
            });
        }

        

        function renderSchedule() {
            toDoItems = localStorage.getItem("todos");                 
            toDoItems = JSON.parse(toDoItems);

        

        for (var i = 0; i < toDoItems.length; i++) {                    
            var itemHour = toDoItems[i].hour;
            var itemText = toDoItems[i].text;

            $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);    
        }

        }

        function saveHandler() {                                    
            var $thisBlock = $(this).parent();
            var hourToUpdate = $(this).parent().attr("data-hour");
            var itemToAdd = (($(this).parent()).children("textarea")).val();

            for (var i = 0; i < toDoItems.length; i++) {                
                if (toDos[i].hour == hourToUpdate) {
                    toDos[i].text = itemToAdd;                       
                }
            }
            localStorage.setItem("todos", JSON.stringify(toDoItems));   
            renderSchedule();
        }

        $(document).ready(function() {                          

            setUpTimeBlocks();                                     
            if(!localStorage.getItem("todos")) {                   
            initializeSchedule();
            }
            
            $currentDay.text(currentDate);                         
            renderSchedule();                                       
            $scheduleArea.on("click", "button", saveHandler);    
            });