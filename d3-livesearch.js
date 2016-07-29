d3.livesearch = function() {
    
    var selection_function = undefined;
    var list = [];
    var dictkey = "";
    var max_suggestions_to_show = 10;

    // This happens when we do .call() on a d3 selection
    function my(selection) {
        selection.each(function(d, i) {
                        
            var element = d3.select(this);

            // Can be a value or a function of d
            this.search_list = (typeof(list) === "function" ? list(d) : list);
            this.search_key = (typeof(dictkey) === "function" ? dictkey(d) : dictkey);
            this.highlighted_index = 0;
            this.max_suggestions_to_show = (typeof(max_suggestions_to_show) === "function" ? max_suggestions_to_show(d) : max_suggestions_to_show);
            this.selection_function = selection_function(d);

            // element.append("button").on("click",selection_function_var).html(labelvar);
            element.append("input").property("type","text").attr("class","d3-livesearch-input").on("keyup",my.typing);
            element.append("ul").attr("class","d3-livesearch-suggestions");
        });
    }

    my.typing = function(d){
        var key = d3.event.keyCode;
        var parent = d3.select(this.parentNode);
        
        if (key == 13) { // Enter/Return key
            // selectGene(d3.select("#select_" + highlighted_index).property("value"));
            console.log(this.parentNode.highlighted_index);
            return;
        } else if (key == 40) { // down arrow
            // d3.select("#select_" + highlighted_index).attr("class","unselected")
            this.parentNode.highlighted_index++;
            console.log(this.parentNode.highlighted_index);
            // d3.select("#select_" + highlighted_index).attr("class","selected")
            return;
        } else if (key == 38) { // up arrow
            // d3.select("#select_" + highlighted_index).attr("class","unselected")
            this.parentNode.highlighted_index--;
            console.log(this.parentNode.highlighted_index);
            // d3.select("#select_" + highlighted_index).attr("class","selected")
            return; 
        }
        
        parent.select("ul").append("li").html(key);

        var search_key = this.parentNode.search_key;
        var search_list = this.parentNode.search_list;
        var search_value = this.value;

        if (search_value.length==0) { 
            parent.select("ul").html("");
            parent.select("ul").style("border","0px");
            return;
        }
        
        var max_suggestions_to_show = this.parentNode.max_suggestions_to_show;
        var num_suggestions = 0;
        
        parent.select("ul").selectAll("li").remove();

        var matching_data = [];
        if (search_key != undefined){
            for (var i in search_list) {
                if (search_list[i][search_key] == undefined) {
                    console.log(search_key + " is not in search_list[" + i + "]");
                } else if (search_list[i][search_key].indexOf(search_value) != -1) {
                    matching_data.push(search_list[i]);
                    num_suggestions++;
                    if (num_suggestions >= max_suggestions_to_show) {
                        // suggestions += '<li>...</li>';
                        break;
                    }
                }
            }
        } else {
            for (var i in search_list) {
                if (search_list[i].indexOf(search_value) != -1) {
                    matching_data.push(search_list[i]);
                    num_suggestions++;
                    if (num_suggestions >= max_suggestions_to_show) {
                        // suggestions += '<li>...</li>';
                        break;
                    }
                }
            }
        }

        parent.select("ul").selectAll("li").data(matching_data).enter()
            .append("li")
                .html(function(d) {return (typeof(d) === "string") ? d : d[search_key] })
                .on("click",this.parentNode.selection_function);

        if (num_suggestions == 0) {
            parent.select("ul").append("li").html("No matches");
        }    
    }

    my.list = function(value) {
        if (!arguments.length) return list;
        list = value;
        return my;
    };
    my.dictkey = function(value) {
        if (!arguments.length) return search_key;
        dictkey = value;
        return my;
    };
    my.selection_function = function(value) {
        if (!arguments.length) return selection_function;
        selection_function = value;
        return my;
    };
    my.max_suggestions_to_show = function(value) {
        if (!arguments.length) return max_suggestions_to_show;
        max_suggestions_to_show = value;
        return my;
    };
    


    return my;
}