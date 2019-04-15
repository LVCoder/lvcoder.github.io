var geoUS = [
    "AG",
    "AI",
    "AO",
    "AQ",
    "AR",
    "AS",
    "AW",
    "AX",
    "BB",
    "BF",
    "BI",
    "BJ",
    "BL",
    "BM",
    "BO",
    "BQ",
    "BR",
    "BS",
    "BV",
    "BW",
    "BZ",
    "CD",
    "CF",
    "CG",
    "CI",
    "CK",
    "CL",
    "CM",
    "CO",
    "CR",
    "CU",
    "CV",
    "CW",
    "DJ",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EG",
    "EH",
    "ER",
    "ET",
    "FJ",
    "FK",
    "FM",
    "GA",
    "GD",
    "GF",
    "GG",
    "GH",
    "GL",
    "GM",
    "GN",
    "GP",
    "GQ",
    "GS",
    "GT",
    "GU",
    "GW",
    "GY",
    "HM",
    "HN",
    "HT",
    "IM",
    "JE",
    "JM",
    "KE",
    "KI",
    "KM",
    "KN",
    "KY",
    "LC",
    "LR",
    "LS",
    "LY",
    "MA",
    "ME",
    "MF",
    "MG",
    "MH",
    "ML",
    "MP",
    "MQ",
    "MR",
    "MS",
    "MU",
    "MW",
    "MX",
    "MZ",
    "NA",
    "NC",
    "NE",
    "NF",
    "NG",
    "NI",
    "NR",
    "NU",
    "PA",
    "PE",
    "PF",
    "PG",
    "PM",
    "PN",
    "PR",
    "PW",
    "PY",
    "RE",
    "RS",
    "RW",
    "SB",
    "SC",
    "SD",
    "SH",
    "SL",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SX",
    "SZ",
    "TC",
    "TD",
    "TF",
    "TG",
    "TK",
    "TN",
    "TO",
    "TT",
    "TV",
    "TZ",
    "UG",
    "UM",
    "US",
    "UY",
    "VC",
    "VE",
    "VG",
    "VI",
    "VU",
    "WF",
    "WS",
    "YT",
    "ZA",
    "ZM",
    "ZW"
];
var geoDE = [ "DE" ];
var geoCA = [ "CA" ];
var geoJP = [ "JP" ];
var geoINT = [
    "EU",
    "AD",
    "AL",
    "AT",
    "BA",
    "BE",
    "BG",
    "BY",
    "CH",
    "CS",
    "CZ",
    "DK",
    "EE",
    "ES",
    "FI",
    "FO",
    "FR",
    "FX",
    "GB",
    "GI",
    "GR",
    "HR",
    "HU",
    "IE",
    "IS",
    "IT",
    "LI",
    "LT",
    "LU",
    "LV",
    "MC",
    "MD",
    "MK",
    "MT",
    "NL",
    "NO",
    "PL",
    "PT",
    "RO",
    "SE",
    "SI",
    "SJ",
    "SK",
    "SM",
    "UA",
    "VA",
    "AP",
    "AE",
    "AF",
    "AM",
    "AU",
    "AZ",
    "BD",
    "BH",
    "BN",
    "BT",
    "CC",
    "CN",
    "CX",
    "CY",
    "GE",
    "HK",
    "ID",
    "IL",
    "IN",
    "IO",
    "IQ",
    "IR",
    "JO",
    "KG",
    "KH",
    "KP",
    "KR",
    "KW",
    "KZ",
    "LA",
    "LB",
    "LK",
    "MM",
    "MN",
    "MO",
    "MV",
    "MY",
    "NP",
    "NZ",
    "OM",
    "PH",
    "PK",
    "PS",
    "QA",
    "RU",
    "SA",
    "SG",
    "SY",
    "TH",
    "TJ",
    "TL",
    "TM",
    "TR",
    "TW",
    "UZ",
    "VN",
    "YE"
];
var szCountryCode = $('meta[name=country]').attr('content');
$(document).ready(function() {
    var szPath = window.location.pathname;
    var countryCode = $('#max_country').text(); //current country code
  var contInt=false;
  for(var k in geoINT) {
                        if (geoINT[k] == countryCode) {
                          contInt=true;  
                        }
                    }
    if (szPath == '/' || szPath == '/ca/' || szPath == '/intl/' || szPath == '/de/' || szPath == '/jp/') {
     
      var expcookie = getCookie('expcookie');
      var newexpcookie = getCookie('newexpcookie');
        var redirect = getCookie('permanent_url');
        var previousUrl = getCookie('previous_url');
        if (redirect && redirect != '') {
                if (redirect == '/' + szCountryCode + '/' || (redirect == '/' && szCountryCode == 'us')) {
                    //if (redirect == 'us')
                    //    redirect = '/';
                    //else
                    //    redirect = '/' + redirect + '/';
                    //window.location.href = window.location.origin + redirect;
                } else {
                  if(szPath == '/')
                    window.location.href = redirect;
                }}
        if (expcookie != '1') {
            //------------------------------
            //Geolocation Rule
            //------------------------------
            if (redirect && redirect != '') {
                if (redirect == '/' + szCountryCode + '/' || (redirect == '/' && szCountryCode == 'us')) {
                    //if (redirect == 'us')
                    //    redirect = '/';
                    //else
                    //    redirect = '/' + redirect + '/';
                    //window.location.href = window.location.origin + redirect;
                } else {
                  if(szPath == '/')
                    window.location.href = redirect;
                }
            } else if (countryCode == 'JP' && szPath == '/' && !redirect) {
                setCookie('previous_url', '/', 1);
                window.location.href = '/jp/';
          } else if (contInt && szPath == '/' && !redirect) {
           if(document.referrer.indexOf("/intl/") == -1)
             {
                setCookie('previous_url', '/', 1);
                window.location.href = '/intl/';
             }
            }  
          else if (countryCode == 'CA' && szPath == '/' && !redirect) {
           if(document.referrer.indexOf("/ca/") == -1)
             {
                setCookie('previous_url', '/', 1);
                window.location.href = '/ca/';
             }
            } 
         
          else {
                var bContinue = true;
                if (countryCode == 'JP' && szPath == '/jp/' && previousUrl == '/') {
                    if ($('.notification-alert-adv.geo_us').length > 0) {
                        $('.notification-alert-adv.geo_us').show();
                        setCookie('previous_url', '', -1);
                        bContinue = false;
                    }
                }
             if (contInt && szPath == '/intl/' && previousUrl == '/') {
               
                    if ($('.notification-alert-adv.geo_us').length > 0) {
                        $('.notification-alert-adv.geo_us').show();
                       // setCookie('previous_url', '', -1);
                        bContinue = false;
                    }
                }
            if (contInt && szPath == '/ca/' && previousUrl == '/') {
               
                    if ($('.notification-alert-adv.geo_us').length > 0) {
                        $('.notification-alert-adv.geo_us').show();
                       // setCookie('previous_url', '', -1);
                        bContinue = false;
                    }
                }
                //Check JP
                if ($('.notification-alert-adv.geo_jp').length > 0 && bContinue) {
                    for(var i in geoJP) {
                        if (geoJP[i] == countryCode) {
                            if (szPath == '/')
                                window.location.href = '/jp';
                            else{
                           if(expcookie!=2){
                              $('.notification-alert-adv.geo_jp').show();
                           }}
                            bContinue = false;
                            break;
                        }
                    }
                }
                //Check DE
                if ($('.notification-alert-adv.geo_de').length > 0 && bContinue) {
                    for(var i in geoDE) {
                        if (geoDE[i] == countryCode) {
                          if(expcookie!=2){
                            $('.notification-alert-adv.geo_de').show();
                          }
                            bContinue = false;
                            break;
                        }
                    }
                }
                //Check CA
                if ($('.notification-alert-adv.geo_ca').length > 0 && bContinue) {
                    for(var i in geoCA) {
                        if (geoCA[i] == countryCode) {
                        if (szPath == '/')
                                window.location.href = '/ca';
                            else{
                              if(expcookie!=2){
                            $('.notification-alert-adv.geo_ca').show();
                              }
                            }
                            bContinue = false;
                            break;
                        }
                    }
                }
                //Check INT
                if ($('.notification-alert-adv.geo_intl').length > 0 && bContinue) {
                    for(var i in geoINT) {
                        if (geoINT[i] == countryCode) {
                          if (szPath == '/')
                                window.location.href = '/intl';
                            else{
                              if(expcookie!=2){
                            $('.notification-alert-adv.geo_intl').show();
                              }
                            }
                            bContinue = false;
                            break;
                        }
                    }
                }
                //Chceck US
                if ($('.notification-alert-adv.geo_us').length > 0 && bContinue) {
                    if ('US' == countryCode && szPath != '/jp/' && szPath != '/intl/') {
                        $('.notification-alert-adv.geo_us').show();
                        bContinue = false;
                    }
                }
                //Open Default (US)
                if (bContinue && newexpcookie !='1') {
                    $('.notification-alert-box').show();
                }
            }
        }
    }
});
$('a.global_link').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    //var szURL = $this.attr('data-url');
    var szURL = $this.attr('href');
    if (szURL != '') {
        setCookie('permanent_url','', -1);
setCookie('expcookie', '1');
        if ($this.attr('target') == '_blank') {
            window.open(szURL);
        } else {
            window.location.href = szURL;
        }
    }
});
function RedirectSite(e) {
    var $this = $(e);
    var url = $this.attr('data-url');
    if (url != '') {
       if ($this.closest('.notification__wrapper').find('#dontShow_intl').prop('checked') == true || $this.closest('.notification__wrapper').find('#dontShow_us').prop('checked') == true || $this.closest('.notification__wrapper').find('#dontShow_ca').prop('checked') == true || $this.closest('.notification__wrapper').find('#dontShow_jp').prop('checked') == true || $this.closest('.notification__wrapper').find('#dontShow_de').prop('checked') == true) {
            setCookie('permanent_url', url);
         setCookie('expcookie', '1');
         setCookie('newexpcookie', '1');
        }
     
        
        //if (szCountryCode == 'us')
        //    url = '/';
        //else
        //    url = '/' + url + '/';
        window.location.href = url;
    }
}
function setCookie(cname, cvalue, days) {
    var exdays = 365;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}