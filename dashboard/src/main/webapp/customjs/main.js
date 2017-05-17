 var addPipeline = function (name, source, sink, properties) {
     var moreOptions = "<div class=\"dropdown\" >" + "<button class=\"btn btn-primary dropdown-toggle\" type=\"button\" " + "data-toggle=\"dropdown\">Options <span class=\"caret\"></span></button>" + "<ul class=\"dropdown-menu\">" + "<li><a href=\"#\">Run</a></li>" + "<li><a href=\"#\">View Logs</a></li>" + "<li><a href=\"#\">Cancel</a></li></ul></div>";
     $("#pipelineList").append(" <tr><td>" + name + "</td><td>" + source + "</td>" + "<td>" + sink + "</td><td>" + properties + "</td><td>" + moreOptions + "</td></tr>");
 };
 var notify = function (title, text) {
     new PNotify({
         title: title
         , text: text
         , type: 'success'
     });
 };