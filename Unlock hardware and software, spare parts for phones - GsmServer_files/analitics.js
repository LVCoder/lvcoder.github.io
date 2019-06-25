if (typeof mailAnalitics === 'undefined') {
  var mailAnalitics = mailAnalitics || {};
}

//AJAX only
mailAnalitics.Reload = function(){
	
	// remove old img by id 
	var img = document.getElementById('__ECAI__');
	if (img){
		img.parentNode.removeChild(img);
	}	
	
	this.Startup();
}

mailAnalitics.Startup = function () {
    var Params = this.__parseUrl__(window.location.toString());
    var DestinationUrl = 'mail.elbroos.com';
    var HostName = window.location.hostname;
    
    if (/test/i.test(HostName)){
    	DestinationUrl = 'test.elbroos.com';
    }
    
    if (Params.mailhash){
        this.__set_cookie__('mailhash', Params.mailhash, 30, '/');

        //create img element
        this.__createImgElement__('http://' + DestinationUrl + '/analitics/url/'+this.Base64.encode(window.location.toString())+'_'+Params.mailhash+'.gif');
        
    } else {
        //Read cookie for checking point
        Params = Params || {};
        Params.mailhash = this.__get_cookie__('mailhash');
    }
    this.CheckPointType = this.CheckPointType || "";
    
    if ( Params.mailhash ){
    	
    	switch(this.CheckPointType){
	    	case 'Cart':
	        	this.__createImgElement__('http://' + DestinationUrl + '/analitics/check_point/'+this.Base64.encode('Cart')+'_'+Params.mailhash+'.gif');
	    		break;
	    	case 'Order':
	    		
	    		var OrderId = parseInt(mailAnalitics.Data.OrderId);
	    		
	    		if ( OrderId > 0 ) {
		        	this.__createImgElement__('http://' + DestinationUrl + '/analitics/check_point/'+this.Base64.encode('Order')+'_'+this.Base64.encode(''+OrderId)+'_'+Params.mailhash+'.gif');
	    		}
	    		
	    		break;
    	}
    	
    } 
    
}


mailAnalitics.__createImgElement__ = function(Url){
    var newImg = document.createElement('img');
    newImg.id = '__ECAI__';
    newImg.src = Url;
    newImg.style.display = 'none';
    document.body.appendChild(newImg);
}

mailAnalitics.Base64 = {
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = this._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = this._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

}

mailAnalitics.__parseUrl__ = function(_url) {
    var params = new Object();

    var t1 = _url.split('?');
    if (t1.length > 1){
      var t2 = t1[1].split('#');
      if (t2.length > 0){
        var t3 = t2[0].split('&');

        if (t3.length > 0){
          var t4;

          for (var i=0; i<t3.length; i++){
            t4 = t3[i].split('=');

            if (t4.length > 0){
              params[t4[0]] = (t4[1] || 'n/a');
            }
          }
        }
      }
    }
    return params;
}


mailAnalitics.__set_cookie__ = function( name, value, exp_days, path, domain, secure ){
    var cookie_string = name + "=" + escape ( value );
    if ( exp_days ){
        var expires = new Date ();
        expires.setDate(expires.getDate() + exp_days);
        cookie_string += "; expires=" + expires.toGMTString();
    }

    if ( path ){
        cookie_string += "; path=" + escape ( path );
    }

    if ( domain ){
        cookie_string += "; domain=" + escape ( domain );
    }

    if ( secure ){
        cookie_string += "; secure";
    }
    document.cookie = cookie_string;
}


mailAnalitics.__get_cookie__ = function( cookie_name ){
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if ( results ){
        return ( unescape ( results[2] ) );
    } else {
        return null;
    }
}

mailAnalitics.Startup();
