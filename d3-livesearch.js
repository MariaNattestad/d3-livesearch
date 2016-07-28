d3.textBlock = function() {
    // label property: this will get drawn enclosed perfectly by a rect
    var label = "";
    var selection_function = undefined;

    // this function object is returned when textBlock() is invoked.
    // after setting properties (label above), it can be invoked on
    // a whole selection by using call() -- see the rest of the example.
    function my(selection) {
        selection.each(function(d, i) {
            // inside here, d is the current data item, i is its index.
            // "this" is the element that has been appended, in the case of
            // this example, a svg:g

            // the text property could have been specified by the user as a
            // value, or a function of the current data item.
            var labelvar = (typeof(label) === "function" ? label(d) : label);
            var selection_function_var = selection_function(d);

            // convert element (svg:g) into something that D3 can use
            // element is a single-element selection
            var element = d3.select(this);

            // first append text to svg:g
            // var t = element.append("text")
            //     .text(labelvar) // here we set the label property on the text element
            //     .attr("dominant-baseline", "central"); // vertically centered
            // get the bounding box of the just created text element
            // var bb = t[0][0].getBBox();

            // then append svg rect to svg:g
            // doing some adjustments so we fit snugly around the text: we're
            // inside a transform, so only have to move relative to 0
    //         element.append("rect")
				// .attr("x", -5) // 5px margin
    //             .attr("y", - bb.height) // so text is vertically within block
    //             .attr("width", bb.width + 10) // 5px margin on left + right
    //             .attr("height", bb.height * 2)
    //             .attr("fill", "steelblue")
    //             .attr("fill-opacity", 0.3)
    //             .attr("stroke", "black")
    //             .attr("stroke-width", 2)
            
            element.append("button").on("click",selection_function_var).html(labelvar);
            element.append("input").property("type","text");
            
            

        });
    }

    // getter / setter for the label property
    my.label = function(value) {
        if (!arguments.length) return value;
        label = value;
        return my;
    };
    my.selection_function = function(value) {
        if (!arguments.length) return value;
        selection_function = value;
        return my;
    };

    return my;
}