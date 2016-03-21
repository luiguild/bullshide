var fbAllPosts,
fbPostID,
bullsHideAttr,
textPost,
regexPost;

//START THE ADDON AND CALL FUNCTION TO READ THE FB-TIMELINE
// console.log('[BULLSHIDE|START]');
scanFB();

//READ FB-TIMELINE
function scanFB() {
  // fbAllPosts = document.querySelectorAll('div[data-testid="fbfeed_story"]:not([data-bullshide])');
  fbAllPosts = document.querySelectorAll('div[data-testid="fbfeed_story"]:not(data-bullshide)');
  // console.log('[BULLSHIDE|READING ' + fbAllPosts.length + ' POST(S)]');

  for (var iPost = 0; iPost < fbAllPosts.length; iPost++) {
    fbPostID = document.getElementById(fbAllPosts[iPost].id);
    textPost = fbAllPosts[iPost].textContent;
    regexPost = textPost.match(/\s((pt)|(petista)|(petistas)|(corrupto)|(lula)|(joaquim barbosa)|(impeachment)|(dilma)|(aécio)|(moro)|(sérgio moro)|(psdb)|(bolsonaro)|(governo)|(golpe)|(oposição)|(petralha)|(petralhas)|(alckmin)|(coxinha)|(coxinhas)|(democracia)|(fascistas)|(fascista)|(terroristas)|(lava-javo)|(pf)|(corrupção)|(intervenção)|(militar)|(monarquia)|(esquerdopata)|(esquerdopatas)|(esquerdinha)|(esquerdinhas)|(golpistas)|(golpista))\b/gi);

    if (regexPost != null) {
      // console.log('[BULLSHIDE|FIND] ' + regexPost);
      document.getElementById(fbAllPosts[iPost].id).removeAttribute("data-testid");

      fbAllPosts[iPost].innerHTML = '<div><div class="_4-u2 mbl _5us6 _4-u8" style="padding: 14px 14px 12px 14px; margin-bottom: 8px;"><div class="_2iwo _5usc" style="display: inline;"><div class="fsxl fcg" style="font-size: 14px;">O BULLSHIDE ACABOU DE POUPAR VOCÊ DE SE ESTRESSAR COM:</div><div class="fsxl fcg" style="text-transform: uppercase; font-weight: bold; font-size: 14px;">' + regexPost + '</div></div></div>'
      // console.log('[BULLSHIDE|POST CHANGED] :)');

      //fbAllPosts[iPost].style.display = "none";
      //console.log('[BULLSHIDE|POST DELETED] :)');

      // fbAllPosts[i].style.border = "5px solid #F00";
      //console.log('[BULLSHIDE|POST DELETED] :)');
    }
    else {
      fbPostID.setAttribute("data-bullshide", "readed");
      // console.log('[BULLSHIDE|ADDED ATTR ON POST NO. ' + iPost +']');
    }
  }
}

//FUNCTION TO OBSERVE DOM
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
  eventListenerSupported = window.addEventListener;

  return function(obj, callback){
    if( MutationObserver ){
      //DEFINE A NEW OBSERVER
      var obs = new MutationObserver(function(mutations, observer){
        if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
        callback();
      });
      //HAVE THE OBSERVER OBSERVE FOO FOR CHANGES IN CHILDREN
      obs.observe( obj, { childList:true, subtree:true });
    }
    else if( eventListenerSupported ){
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
  }
})();

//OBSERVE A FB-TIMELINE-FEED PARENT CONTAINER
observeDOM( document.getElementById('stream_pagelet') ,function(){
  // console.log('[BULLSHIDE|FEED CHANGED]');
  scanFB();
});
