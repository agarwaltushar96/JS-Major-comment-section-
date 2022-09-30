document
  .getElementById("commentinput")
  .addEventListener("click", function (ev) {
    addComment(ev);
  });

function hasClass(elem, className) {
  return elem.className.split(" ").indexOf(className) > -1;
}

function typein() {
  document.getElementsByClassName("comment-bar-buttons")[0].style.display =
    "block";
  var area = document.getElementById("commenttype");
  if (area.textContent == "")
    document.getElementById("commentinput").style.backgroundColor = "gray";
  else {
    document.getElementById("commentinput").style.backgroundColor = "skyblue";
    document.getElementById("commentinput").style.color = "black";
  }
}

function remove(ev) {
  ev.target.parentElement.parentElement.parentElement.parentElement.remove();
  if (hasClass(ev.target.parentElement.parentElement, "comment-area-name")) {
    if (document.getElementById("numb").textContent == "1 Comment")
      document.getElementById("numb").textContent = "0 Comments";
    else if (document.getElementById("numb").textContent == "2 Comments")
      document.getElementById("numb").textContent = "1 Comment";
    else {
      var ab = document.getElementById("numb").textContent;
      var abc = ab.split(" ");
      document.getElementById("numb").textContent =
        parseInt(abc[0]) - 1 + " Comments";
    }
  }
}

function check(ev) {
  if (hasClass(ev.target.parentElement.parentElement, "like")) {
    ev.target.className = "fa fa-thumbs-up";
    if (ev.target.parentElement.nextElementSibling.textContent == "")
      ev.target.parentElement.nextElementSibling.textContent = "1";
    else {
      var ab = ev.target.parentElement.nextElementSibling.textContent;
      var abc = ab.split(" ");
      ev.target.parentElement.nextElementSibling.textContent =
        parseInt(abc[0]) + 1;
    }
  } else if (hasClass(ev.target.parentElement.parentElement, "dislike")) {
    ev.target.className = "fa fa-thumbs-down";
    if (ev.target.parentElement.nextElementSibling.textContent == "")
      ev.target.parentElement.nextElementSibling.textContent = "1";
    else {
      var ab = ev.target.parentElement.nextElementSibling.textContent;
      var abc = ab.split(" ");
      ev.target.parentElement.nextElementSibling.textContent =
        parseInt(abc[0]) + 1;
    }
  }
}

function addComment(ev) {
  if (hasClass(ev.target.parentElement, "comment-bar-buttons")) {
    var com = document.getElementById("commenttype").textContent;
    document.getElementsByClassName("comment-bar-buttons")[0].style.display =
      "none";
    if (com != "") {
      if (document.getElementById("numb").textContent == "0 Comments")
        document.getElementById("numb").textContent = "1 Comment";
      else {
        var ab = document.getElementById("numb").textContent;
        var abc = ab.split(" ");
        document.getElementById("numb").textContent =
          parseInt(abc[0]) + 1 + " Comments";
      }
      document.getElementById("comment-sec").insertAdjacentHTML(
        "afterend",
        `
            <div class="comment-area">
                <div class="comment-area-profile">
                    <i class="fa fa-user"></i>
                </div>
                <div class="comment-area-box">
                    <div class="comment-area-name">
                        <h3 id="user-name" style="margin: 0; font-weight: 300; width:99%; float:left;">Your Name</h3>
                        <div class="comment-area-more" style="float:right;display:inline-block;">
                        <button onclick="remove(event)">DELETE</button>
                        </div>
                    </div>
                    <div class="comment-area-text">
                        <h3 id="user-text" style="margin: 0;font-weight: 300 ; ">${com}</h3>
                    </div>
                    <div class=" comment-area-buttons ">
                        <div class="like"><button onclick="check(event)"><i class="fa fa-thumbs-o-up"></i></button><span id="likenumbcom"></span></div>
                        <div class="dislike"><button onclick="check(event)"><i class="fa fa-thumbs-o-down "></i></button><span id="dislikenumbcom"></span></div>
                        <button class="reply" onclick="replynow(event)">REPLY</button>
                    </div>
                    <div class="comment-area-replies" style="padding-top:12.5px;" id="reply-section">
                        <div></div>
                    </div>
                </div>
            </div>
            `
      );
    }
    document.getElementById("commenttype").textContent = "";
  } else {
    ev.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.disabled = false;
    var com =
      ev.target.parentElement.previousElementSibling.firstElementChild
        .textContent;
    if (com != "") {
      ev.target.parentElement.parentElement.parentElement.insertAdjacentHTML(
        "afterend",
        `
            <div class="reply-area">
                <div class="reply-area-profile">
                <i class="fa fa-user"></i>
                </div>
                <div class="reply-area-box">
                    <div class="reply-area-name">
                        <h3 id="user-name" style="margin: 0; font-weight: 300; width:99%; float:left;">Your Name</h3>
                        <div class="reply-area-more " style="float:right;display:inline-block;">
                        <button onclick="remove(event)">DELETE</button>
                        </div>
                    </div>
                    <div class="reply-area-text">
                        <h3 id="user-text" style="margin: 0;font-weight: 300 ;">${com}</h3>
                    </div>
                    <div class=" reply-area-buttons ">
                        <div class="like "><button onclick="check(event)"><i class="fa fa-thumbs-o-up"></i></button><span id="likenumbrep"></span></div>
                        <div class="dislike "><button onclick="check(event)"><i class="fa fa-thumbs-o-down "></i></button><span id="dislikenumbrep"></span></div>
                        <button id="reply-section" class="reply" onclick="replynow(event)">REPLY</button>
                    </div>
                    <div class="reply-area-replies" style="padding-top:12.5px">
                        <div></div>
                    </div>
                </div>
            </div>
                `
      );
      ev.target.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  }
}

function replynow(ev) {
  ev.target.disabled = true;
  ev.target.parentElement.nextElementSibling.firstElementChild.insertAdjacentHTML(
    "afterend",
    `
        <div class="reply-bar">
            <div class="comment-reply-profile">
                <i class="fa fa-user"></i>
            </div>
            <div class="comment-reply-box">
                <div class="comment-reply-type">
                    <div data-placeholder="Add a reply..." onclick="replytype(event)" oninput="replytype(event)" id="commentreply" contenteditable="true"></div>
                </div>
                <div class="comment-reply-buttons">
                    <button onclick="cancelreply(event)">Cancel</button>
                    <input type="submit" value="Reply" onclick="addComment(event)" id="replyinput">
                </div>
            </div>
        </div>
                `
  );
}

function cancel() {
  document.getElementsByClassName("comment-bar-buttons")[0].style.display =
    "none";
  document.getElementById("commenttype").textContent = "";
}

function replytype(ev) {
  ev.target.style.display = "block";
  var area = ev.target;
  if (area.textContent == "")
    ev.target.parentElement.nextElementSibling.lastElementChild.style.backgroundColor =
      "gray";
  else {
    ev.target.parentElement.nextElementSibling.lastElementChild.style.backgroundColor =
      "skyblue";
    ev.target.parentElement.nextElementSibling.lastElementChild.style.color =
      "black";
  }
}

function cancelreply(ev) {
  ev.target.parentElement.parentElement.parentElement.style.display = "none";
}
