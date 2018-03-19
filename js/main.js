$(document).ready(function() {

  // ------------------------------
  // Settings
  // ------------------------------
  var dataJson    = "manifest.json";
  var formats     = ["svg", "128", "32", "32@2x"];
  var variants    = ["color", "black", "icon", "white"];
  var iconDefault = "black";
  var iconHover   = "color";


  // ------------------------------
  // Init search
  // ------------------------------
  $("form .search").on("input", function() {
    search($(this));
  });

  $("form").submit(function( event ) {
    event.preventDefault();
    search($("form .search"));
  });


  // ------------------------------
  // Get list of icons in manifest
  // ------------------------------
  $.getJSON(dataJson, function(data) {

    var icons = "";
    var count = 0;
    $.each(data.icons, function(key, val) {

      // Construct icon
      if (icons.indexOf("data-icon=\"" + val + "\"") == -1) {
        icons += "<div class=\"col-6 col-sm-4 col-lg-3 col-xl-2 text-left icon\">";
        icons +=   "<a href=\"#" + val + "\" class=\"bg-light text-muted text-uppercase d-block p-4\" data-toggle=\"modal\" data-target=\"#infoIcon\" data-icon=\"" + val + "\">";
        icons +=     "<img class=\"mr-2\" src=\"svg/" + iconDefault + "/" + val + ".svg\" alt=\"" + val + "\" onerror=\"error(this);\">" + val;
        icons +=   "</a>";
        icons += "</div>";
        count++;
      }

    });

    // Display
    $(".row.icons").html(icons);

    // Hover
    $(".icon").hover(function() {
      changeFolder($(this), iconDefault, iconHover);
    });

    // Mouseleave
    $(".icon").mouseleave(function() {
      changeFolder($(this), iconHover, iconDefault );
    });

    // Count icons
    $(".count-cryptos").text(count);

  });


  // ------------------------------
  // Functions
  // ------------------------------

  // Search and Replace in Image src
  // ------------------------------
  function changeFolder(target, search, replace) {

    var target   = $(target).find("img");
    var srcInit  = $(target).attr("src");
    var srcAfter = srcInit.replace(search, replace);
    $(target).attr("src", srcAfter);

  }

  // Display icon info in Modal
  // ------------------------------
  $("#infoIcon").on("show.bs.modal", function (event) {

    // Modal settings
    var button = $(event.relatedTarget);
    var modal  = $(this);
    var icon   = button.data("icon");

    // Table settings
    var infos = "";
    var i = 0;
    var j = 0;

    // Construct table
    infos += "<table class=\"table info-icon mb-0\">";

    // Construct titles
    infos +=   "<thead>";
    infos +=     "<tr>";
    infos +=       "<th class=\"text-center text-uppercase align-middle\"><h5 class=\"mb-0\">" + icon + "</h5></th>";
    while (variants[j]) {

      var formatCss = formats[i].replace("@", "-");
      infos +=       "<th class=\"variant-" + variants[j] + " text-center font-weight-light text-muted align-middle\">" + variants[j] + "</th>";
      j++;

    }

    j = 0;
    infos +=     "</tr>";
    infos +=   "</thead>";
    infos +=   "<tbody>";

    // Construct Row
    while (formats[i]) {

      var formatCss = formats[i].replace("@", "-");
      infos +=     "<tr>";

      // Construct titles of row
      infos +=       "<th class=\"format-" + formatCss + " text-center font-weight-light text-muted align-middle\" scope=\"row\">" + formats[i] + "</th>";

      // File extension
      if (formats[i] == "svg") {
        var extension = ".svg" ;
      }
      else if (formats[i] == "32@2x") {
        var extension = "@2x.png" ;
      }
      else {
        var extension = ".png" ;
      }

      // Construct icons cells
      while (variants[j]) {

        infos +=       "<td class=\"format-" + formatCss + " variant-" + variants[j] + " text-center\">";
        infos +=         "<img src=\"" + formats[i] + "/" + variants[j] + "/" + icon + extension + "\" alt=\"" + icon + "\">";
        infos +=       "</td>";
        j++;

      }

      j = 0;
      i++;
      infos +=     "</tr>";

    }

    // Close table
    infos +=   "</tbody>";
    infos += "</table>";

    // Display
    modal.find(".modal-title").text(icon);
    modal.find(".modal-body").html(infos);

  });

  // Search
  // ------------------------------
  function search(target) {

    if ($(target).val().length > 0) {

      // Filter icons
      $(".icon").css("display", "none");
      $("a[data-icon*='" + $(target).val().toLowerCase() + "']").parent().css("display", "block");

      // Close
      $("<div class=\"close-search\"></div>").insertAfter(target);
      $(".close-search").click(function() {
        closeSearch(target);
      });

    }
    else {
      closeSearch(target);
    }

  }

  // Close search
  // ------------------------------
  function closeSearch(target) {
    $(".close-search").remove();
    $(".icon").css("display", "block");
    $(target).val("");
  }

});


// Hide icons on error
// ------------------------------
function error(img) {
  $(img).parent().parent().remove();
}
