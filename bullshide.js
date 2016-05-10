var fbAllPosts,
postForm,
timelineContainer,
bulshHead,
timeInterval;

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || false;

//FUNCTION TO OBSERVE DOM
function observeDOM(obj, callback) {
  if(MutationObserver ){
    //DEFINE A NEW OBSERVER
    var obs = new MutationObserver(function(mutations, observer){
      if(mutations[0].addedNodes.length || mutations[0].removedNodes.length)
      callback();
    });
    //HAVE THE OBSERVER OBSERVE FOO FOR CHANGES IN CHILDREN
    obs.observe( obj, { childList:true, subtree:true });
  }
  else {
    obj.addEventListener('DOMNodeInserted', callback, false);
    obj.addEventListener('DOMNodeRemoved', callback, false);
  }
}

function checkingDOM() {
  timelineContainer = document.getElementById('contentCol');
  postForm = document.getElementById('pagelet_composer');
  bulshHead = document.getElementById('bulshHead');

  if (timelineContainer != null && postForm != null) {
    // START THE ADDON AND CALL FUNCTION TO READ THE FB-TIMELINE
    console.log('[BULLSHIDE|CHECKING]');
    // scanFB();
    if (bulshHead === null) {
      var bulshWelcome = document.createElement('div');
      bulshWelcome.innerHTML = '<div id="bulshHead"><div class="mbl _5us6 _4-u8" style="padding: 5px 14px 3px; margin: -13px auto 8px; background-color: rgb(59, 89, 152); color: rgb(255, 255, 255); width: 94%; border-radius: 0px 0px 3px 3px; z-index: 9; position: relative;"><div class="_2iwo _5usc" style="display: inline;"><div class="" style="font-size: 9px;"><div class="" style="text-transform: uppercase; font-weight: bold; font-size: 14px;">O BULLSHIDE ESTÁ LENDO A SUA TIMELINE.</div>FIQUE TRANQUILO, AGORA VOCÊ ESTÁ PROTEGIDO DE TODA BULSHITAGEM DOS SEUS AMIGOS.</div></div></div></div>';
      postForm.appendChild(bulshWelcome);

      //OBSERVE A FB-TIMELINE-FEED PARENT CONTAINER
      observeDOM(timelineContainer, function(){
        console.log('[BULLSHIDE|FEED CHANGED]');
        scanFB();
      });
    }
  }
  else {
    console.log("[BULLSHIDE|ERROR DOM NULL]");
    if (!bulshHead) {
      clearInterval(timeInterval);
      timeInterval = setInterval(function () {
        checkingDOM();
      }, 5000);
    }
  }
}

//READ FB-TIMELINE
function scanFB() {
  console.log('[BULLSHIDE|STARTED]');
  //FIND ALL FB POSTS
  fbAllPosts = document.querySelectorAll('div[data-testid="fbfeed_story"]:not(data-bullshide)');
  console.log('[BULLSHIDE|READING ' + fbAllPosts.length + ' POST(S)]', fbAllPosts);

  //SCAN FB POSTS
  for (var iPost = 0; iPost < fbAllPosts.length; iPost++) {
    var fbPostID = document.getElementById(fbAllPosts[iPost].id);
    var textPost = fbAllPosts[iPost].textContent;
    var regexPost = textPost.match(/\s((pt)|(petista)|(mortadela)|(petistas)|(corrupto)|(lula)|(cpi)|(tucanos)|(tucano)|(eduardo cunha)|(michel temer)|(stf)|(joaquim barbosa)|(impeachment)|(dilma)|(aécio)|(moro)|(sérgio moro)|(psdb)|(bolsonaro)|(governo)|(golpe)|(oposição)|(petralha)|(petralhas)|(alckmin)|(coxinha)|(coxinhas)|(democracia)|(fascistas)|(fascista)|(terroristas)|(lava-javo)|(pf)|(corrupção)|(intervenção)|(militar)|(monarquia)|(esquerdopata)|(esquerdopatas)|(esquerdinha)|(esquerdinhas)|(golpistas)|(golpista))\b/gi);

    //MATCH CONTENT
    if (regexPost != null) {
      console.log('[BULLSHIDE|FIND] ' + regexPost);
      document.getElementById(fbAllPosts[iPost].id).removeAttribute("data-testid");

      //CHANGE CONTENT
      fbAllPosts[iPost].innerHTML = '<div><div class="_4-u2 mbl _5us6 _4-u8" style="padding: 14px 14px 12px 14px; margin-bottom: 8px;"><div class="_2iwo _5usc" style="display: inline;"><div class="fsxl fcg" style="font-size: 14px;">O BULLSHIDE ACABOU DE POUPAR VOCÊ DE SE ESTRESSAR COM:</div><div class="fsxl fcg" style="text-transform: uppercase; font-weight: bold; font-size: 14px;">' + regexPost + '</div></div></div>'
      console.log('[BULLSHIDE|POST CHANGED] :)');
    }
    else {
      //SET POST
      fbPostID.setAttribute("data-bullshide", "read");
      console.log('[BULLSHIDE|ADDED ATTR ON POST NO. ' + iPost +']');
    }
  };

}

checkingDOM();
