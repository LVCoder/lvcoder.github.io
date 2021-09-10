if (window.jQuery) (function (e) { e.extend({ xml2json: function (t, n) { function r(t, s) { if (!t) return null; var u = "", a = null, f = null; var l = t.nodeType, c = i(t.localName || t.nodeName); var h = t.text || t.nodeValue || ""; if (t.childNodes) { if (t.childNodes.length > 0) { e.each(t.childNodes, function (e, t) { var n = t.nodeType, s = i(t.localName || t.nodeName); var f = t.text || t.nodeValue || ""; if (n == 8) { return } else if (n == 3 || n == 4 || !s) { if (f.match(/^\s+$/)) { return } u += f.replace(/^\s+/, "").replace(/\s+$/, "") } else { a = a || {}; if (a[s]) { if (!a[s].length) a[s] = o(a[s]); a[s] = o(a[s]); a[s][a[s].length] = r(t, true); a[s].length = a[s].length } else { a[s] = r(t) } } }) } } if (t.attributes) { if (t.attributes.length > 0) { f = {}; a = a || {}; e.each(t.attributes, function (e, t) { var n = i(t.name), r = t.value; f[n] = r; if (a[n]) { a[cnn] = o(a[cnn]); a[n][a[n].length] = r; a[n].length = a[n].length } else { a[n] = r } }) } } if (a) { a = e.extend(u != "" ? new String(u) : {}, a || {}); u = a.text ? (typeof a.text == "object" ? a.text : [a.text || ""]).concat([u]) : u; if (u) a.text = u; u = "" } var p = a || u; if (n) { if (u) p = {}; u = p.text || u || ""; if (u) p.text = u; if (!s) p = o(p) } return p } function s(e) { var t = /^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/; return typeof e == "number" || t.test(String(e && typeof e == "string" ? jQuery.trim(e) : "")) } if (!t) return {}; var i = function (e) { return String(e || "").replace(/-/g, "_") }; var o = function (t) { if (!e.isArray(t)) t = [t]; t.length = t.length; return t }; if (typeof t == "string") t = e.text2xml(t); if (!t.nodeType) return; if (t.nodeType == 3 || t.nodeType == 4) return t.nodeValue; var u = t.nodeType == 9 ? t.documentElement : t; var a = r(u, true); t = null; u = null; return a }, text2xml: function (t) { var n; try { var r = !e.support.opacity && !e.support.style ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser; r.async = false } catch (i) { throw new Error("XML Parser could not be instantiated") } try { if (!e.support.opacity && !e.support.style) n = r.loadXML(t) ? r : false; else n = r.parseFromString(t, "text/xml") } catch (i) { throw new Error("Error parsing XML string") } return n } }) })(jQuery)
//------------------------------------------------
var maindiv = '<div id="searchSuggestions"><div class="suggestionsContent"><div class="topProducts"><div class="headerItem"></div><ul id="AC_SUG_P_UL"></ul></div><div class="topSearch noDesigner"><div class="headerTopSearch">Top Queries</div><ul id="AC_SUG_Q_UL"></ul></div><div class="topDesigner"><div class="headerTopDesigner">Top Designer</div><a class="AC_topdesigner"  href="javascript:void(0)"><img class="AC_topdesignerimage" src=""></a></div></div></div>'; var prodTmp = '<li class="productItem "><div class="productImage"><a href="{{dynP:u}}" title="{{dynS:dc.split("@@@")[0]}}"><img src="{{dynP:iu}}" alt="{{dynS:dc.split("@@@")[0]}}"/></a></div><div class="productDesc"><span class="productTitle ellipsis"><a href="{{dynP:u}}">{{dynS:dc.split("@@@")[0]}}</a></span><span class="productPrice">{{dynS:dc.split("@@@")[1]}}</span><a class="toProduct button" href="{{dynP:u}}" title="">Go</a></div></li>'; var queryTmp = '<li><a class="ac_li_query" title="{{dynP:dc}}">{{dynP:dc}}</a></li>'
var maindiv_queries = '<div id="searchSuggestions"><div class="suggestionsContent"><div class="topSearch noDesigner"><div class="headerTopSearch">Top Queries</div><ul id="AC_SUG_Q_UL"></ul></div><div class="topProducts"><div class="headerItem"></div><ul id="AC_SUG_P_UL"></ul></div><div class="topDesigner"><div class="headerTopDesigner">Top Designer</div><a class="AC_topdesigner"  href="javascript:void(0)"><img class="AC_topdesignerimage" src=""></a></div></div></div>';
/* Can adjust products and query amounts via options variable */
//------------------------------------------------
var domainLocal = ''; 
var timerid;
function CelebrosAutoCompleteV3(_siteKey, _txtSearch, _resultFunction, _frontEndServer, _scriptServer, options) {
        CelebrosACMaster.Init(_siteKey, _txtSearch, _resultFunction, _frontEndServer, _scriptServer, options);
}
var CelebrosACMaster = function () {
    var urlAC = "//{frontEndServer}/AutoCompleteWebServiceV2/GetSuggestions.aspx?strPrefix={prefix}&strSiteKey={siteKey}";
    var separator = '^';
    var separator2 = '<br>';
    //-----------------------
    var txtSearch = null;
    var btnSearch = null;
    var resultFunction = null;
    var scriptServer = null;
    var frontEndServer = null;
    var siteKey = null;
    //------------------------
    var ulPID = '#AC_SUG_P_UL';
    var ulQID = '#AC_SUG_Q_UL';
    var objectToAppend = 'dvSearchArea';
    var sugData = {};
    var acShowType = 'centered';
    var acWidth = 0;
    var prodWidth = 0;
    var querWidth = 0;
    var cWidth = 0;
    var cHeight = 0;
    var keyUpVal = '';
    var currency = '&euro;';
    var ajaxPressDelayFirst = 50;
    var ajaxPressDelayVis = 0;
    var ajaxPressDelay = 400;
    var cnt_queryDesigner = 5;
    var cnt_query = 8;
    var cnt_product = 3;
    var firstDiv = "products";
    var maxControl = "client";
    var queryDesignerExists = null;
    var aParameters = {
        SelectedQuery: "",
        SelectedURL: "",
        IsAutoComplete: true        
    }
    function clearData() {
        sugData = {};
        queryDesignerExists = null;
    };
    function addSearchSuggestions() {
        if (jQuery('#searchSuggestions').length == 0) 
        {
            if(firstDiv == "queries")
                jQuery(maindiv_queries).insertAfter('#' + objectToAppend);
            else 
                jQuery(maindiv).insertAfter('#' + objectToAppend);
        }
    };
    function correctPositionSearchSuggestions() {
        var leftPos = 0;
        if (acShowType == 'centered')
            leftPos = parseInt((cWidth - acWidth) / 2);

        jQuery('#searchSuggestions')
            .css({ 'left': leftPos + 'px' });

    };
    function showAC() {
        if (!jQuery('#searchSuggestions').is(":visible"))
            jQuery('#searchSuggestions').show('fast');
            
        if(jQuery('.topSearch').is(':visible') && jQuery('.topProducts').is(':visible')) {
            jQuery('#searchSuggestions').addClass('absWidth');
        }
        jQuery(".productImage a img").load(function () {
            jQuery(this).attr('widthX', this.width);
            jQuery(this).attr('heightX', this.height);
        }).hover(
        // Mouse Over
          function () {
              if (NullOrEmpty(jQuery(this).attr('widthX')))
                  jQuery(this).attr('widthX', this.width);
              if (NullOrEmpty(jQuery(this).attr('heightX')))
                  jQuery(this).attr('heightX', this.height);
              jQuery(this).stop().animate({
                  width: (parseInt(jQuery(this).attr('widthX')) + 10),
                  height: (parseInt(jQuery(this).attr('heightX')) + 10)
              });
          },
        // Mouse Out
          function () {
              jQuery(this).stop().animate({
                  width: jQuery(this).attr('widthX'),
                  height: jQuery(this).attr('heightX')
              });
          });
    };
    function hideAC() {
        jQuery('#searchSuggestions').hide('fast');
        ajaxPressDelayVis = 0;
    };
    function hideProd() {
        jQuery('.topProducts').hide('fast').css({ 'display': 'none' });
        jQuery('#searchSuggestions')
        .css({ 'left': prodWidth + 'px'});//, 'width': ((acWidth - prodWidth) + 'px') });
        jQuery('#searchSuggestions').removeClass('absWidth');
    };
    function hideQuery() {
        jQuery('.topSearch').hide('fast').css('display', 'none');
        jQuery('#searchSuggestions')
        .css({  'width': ((prodWidth) + 'px') });
        jQuery('#searchSuggestions').removeClass('absWidth');
    };
    function showProd() {
        jQuery('.topProducts').show();
        //jQuery('#searchSuggestions')
        //.css({ 'left': jQuery('#' + objectToAppend).offset().left });

        var leftPos = 0;
        if (acShowType == 'centered')
            leftPos = parseInt((cWidth - acWidth) / 2);

        jQuery('#searchSuggestions')
        .css({ 'left': leftPos + 'px'});//, 'width': acWidth + 'px' });
        
        if(jQuery('.topSearch').is(':visible')) {
            jQuery('#searchSuggestions').addClass('absWidth');
        }
    };
    function fillProductList() {
        var pTmp;
        var cnt = 0;
        if (NullOrEmpty(sugData) || NullOrEmpty(sugData.Product) || NullOrEmpty(sugData.Product.List) || sugData.Product.List.length == 0) {
            hideProd();
            return;
        }

        showProd();
        jQuery.each(sugData.Product.List, function (key, value) {
            if (NullOrEmpty(value))
                return true;
            
            if (maxControl.toLowerCase() == "client") {
                if (cnt_product <= cnt++)//maximum to show
                    return;
            }
            pTmp = UITemplateParametersMapper.ReplaceIfExists(prodTmp, value);

            jQuery(ulPID).append(pTmp);
        });
    };
    function fillQueryList() {
        var pTmp;
        var cnt = 0;

        if (NullOrEmpty(sugData) || NullOrEmpty(sugData.Query) || NullOrEmpty(sugData.Query.List) || sugData.Query.List.length == 0) {
            hideQuery();
            //jQuery('#searchSuggestions .searchSuggestions').css({ 'width': '627px' });
            return;
        }
        checkForDesigner();
        jQuery('.topSearch').show();
        if(jQuery('.topProducts').is(':visible')) {
            jQuery('#searchSuggestions').addClass('absWidth');
        }
        jQuery.each(sugData.Query.List, function (key, value) {
            if (NullOrEmpty(value))
                return true;

            if (queryDesignerExists && cnt_queryDesigner <= cnt++)
                return;
            
            if(maxControl.toLowerCase() == "client") {
                if (cnt_query <= cnt++)//maximum to show
                    return;
            }
            if(!NullOrEmpty(value.dc)) {
                value.dc = escapeHtml(value.dc);
            }
            pTmp = UITemplateParametersMapper.ReplaceIfExists(queryTmp, value);

            jQuery(ulQID).append(pTmp);
        });
    };
    function checkForDesigner() {
        jQuery.each(sugData.Query.List, function (key, value) {
            if (NullOrEmpty(value))
                return true;

            if (NullOrEmpty(queryDesignerExists) && value.dc.indexOf(separator) != -1) {
                var arr = value.dc.split(separator);
                if (!NullOrEmpty(arr[1])) {
                    queryDesignerExists = arr[1];
                    jQuery('.AC_topdesigner').attr('title', arr[0]);
                    jQuery('.AC_topdesignerimage').attr('src', domainLocal + queryDesignerExists);
                }
                delete sugData.Query.List[key];
            }
            else if (value.dc.indexOf(separator) != -1) {
                var arr = value.dc.split(separator);
                if (!NullOrEmpty(arr[1])) {
                    value.dc = arr[0];
                }
            }

        });
    };
    function renderData(data) {
        if (!setData(data)) {
            hideAC();
            return;
        }
        //check for products (fast style)
        if (NullOrEmpty(sugData) || NullOrEmpty(sugData.Product) || NullOrEmpty(sugData.Product.List) || sugData.Product.List.length == 0) {
            showAC();
            hideProd();
        }
        jQuery(ulPID).hide("slide", { direction: "left" }, 200, function () {
            jQuery(this).empty();
            fillProductList();

            jQuery(ulPID).show("slide", { direction: "right" }, 200, function () {
                showAC();
            });
        });
        jQuery(ulQID).hide("slide", { direction: "down" }, 200, function () {
            jQuery(this).empty();
            fillQueryList();
            checkDesigner();

            jQuery(ulQID).show("slide", { direction: "up" }, 200, function () {
                showAC();
            });

        });
    };
    function checkDesigner(data) {
        if (queryDesignerExists)
            jQuery('#searchSuggestions .topDesigner').show();
        else
            jQuery('#searchSuggestions .topDesigner').hide();
    };
    function setData(data) {
        var j = resultToJson(data);
        if (j.Succeeded != 'true'
            || NullOrEmpty(j.SuggestionGroups)
            || NullOrEmpty(j.SuggestionGroups.ArrayOfSug)) {

            return false;
        }
        var qArr = null;
        var pArr = null;
        var arrLen = j.SuggestionGroups.ArrayOfSug.length;
        if (NullOrEmpty(arrLen) && !NullOrEmpty(j.SuggestionGroups.ArrayOfSug.sug))
            setSugObject(j.SuggestionGroups.ArrayOfSug.sug);
        else
            for (var i = 0; i < arrLen; i++) {
                setSugObject(j.SuggestionGroups.ArrayOfSug[i].sug);
            }

        return true;
    };
    function setSugObject(sug) {
        if (NullOrEmpty(sug)) {
            return;
        }
        switch (sug[0]["xsi:type"]) {
            case "fqs":
                sugData.Query = {};
                sugData.Query.Name = sug[0].dc.replaceAll('#', '');
                sugData.Query.List = jQuery.extend(true, [], sug);
                delete sugData.Query.List[0];
                jQuery('#searchSuggestions .headerTopSearch').html(sugData.Query.Name);
                break;
            case "ps":
                sugData.Product = {};
                sugData.Product.Name = sug[0].dc.replaceAll('#', '');
                sugData.Product.List = jQuery.extend(true, [], sug);
                delete sugData.Product.List[0];
                jQuery('#searchSuggestions .topProducts .headerItem').html(sugData.Product.Name);
                break;
        }
        //if(sug[0]["xsi:type"] == "")
    };
    function resultToJson(data) {
        //data = data.replace('YAHOO.widget.DS_XHR.prototype.responseSuccess("', '');
        //data = data.replace('</AutoCompleteResultSet>")', '</AutoCompleteResultSet>');
        //data = data.replace('<ArrayOfSug />')
        //data = data.replaceAll('\\"', '"');]
        data = data.data;
        data = data.replaceAll('<?xml version="1.0" encoding="utf-16"?>', '');
        var json = null;
        try {
            json = jQuery.xml2json(data);
        }
        catch (err) {
            json = jQuery.xml2json(jQuery.parseXML(data))
        }
        return json;
    };
    function setResolution() {
        var myWidth = 0, myHeight = 0;
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            cWidth = myWidth = document.body.clientWidth;
            cHeight = myHeight = document.body.clientHeight;
        }
        cWidth = myWidth;
        cHeight = myHeight;
    };
    var _public =
{
    param1: 0,
    isExists: false,

    //baseStruct: simplified structure of object
    baseStruct: function BaseStruct(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
    },
    Currency: function (_txtSearch) {
        return currency;
    },
    Init: function (_siteKey, _txtSearch, _resultFunction, _frontEndServer, _scriptServer, options) {//_objectToAppend, _btnSearch
        try {
            if (jQuery('#' + _txtSearch).length == 0)
                return;
            if (NullOrEmpty(options))
                options = { objectToAppend: _txtSearch, btnSearch: '', acShowType: acShowType };
            else if (jQuery('#' + options.objectToAppend).length == 0) {
                options.objectToAppend = _txtSearch;
            }

            txtSearch = _txtSearch;
            btnSearch = options.btnSearch;
            objectToAppend = options.objectToAppend;
            resultFunction = _resultFunction;
            frontEndServer = _frontEndServer;
            scriptServer = _scriptServer;
            siteKey = _siteKey;
            acShowType = options.acShowType;
            
            cnt_query = NullOrEmpty(options.maxQueries) ? cnt_query : options.maxQueries;
            cnt_product = NullOrEmpty(options.maxProducts) ? cnt_product : options.maxProducts;
            firstDiv = NullOrEmpty(options.firstDiv) ? firstDiv : options.firstDiv;
            maxControl = NullOrEmpty(options.maxControl) ? maxControl : options.maxControl;


            addSearchSuggestions();
            prodWidth = jQuery('#searchSuggestions .topProducts').width();
            querWidth = jQuery('#searchSuggestions .topSearch').width();
            acWidth = jQuery('#searchSuggestions').width();
            setResolution();
            correctPositionSearchSuggestions();
            _public.isExists = true;
            _public.RegisterEvents();
            jQuery.support.cors = true;
        }
        catch (err) {
            var e = err;
        }
    },
    GetData: function (text) {
        try {
            clearData();
            /*
            if ( false && 'XDomainRequest' in window && window.XDomainRequest !== null) {
            // Use Microsoft XDR
            var xdr = new XDomainRequest();
            xdr.open("get", urlAC.format({ prefix: text, siteKey: siteKey, frontEndServer: frontEndServer }));
            xdr.onload = function () {
            var dom = new ActiveXObject("Microsoft.XMLDOM")
            dom.async = false;
            renderData(xdr.responseText);
            };

            xdr.onerror = function () {
            _result = false;
            };

            xdr.send();
            }
            else {
            */
            jQuery.ajax({
                url: urlAC.format({ prefix: text, siteKey: siteKey, frontEndServer: frontEndServer }),
                type: "GET",
                dataType: 'jsonp',
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: true,
                success: function (data, status, p1, p2, p3) {
                    if (NullOrEmpty(data))
                        return;
                    renderData(data);
                },
                error: function (request, status, error) {
                    var x = request.responseText;
                }
            });
            //}
        }
        catch (err) {
            //alert('GetData');
            //UITemplateMaster.DoLogError(err.message, 'UITemplateProductFinderWidget.Bind');
        }
    },
    RegisterEvents: function (e) {
        try {
            jQuery('#' + txtSearch).keyup(function (e) {
                if (keyUpVal === jQuery(this).val())
                    return;
                keyUpVal = jQuery(this).val();
                //jQuery('#search_text2').val(keyUpVal);
                var curDeley = ajaxPressDelay;

                if (ajaxPressDelayVis == 0) {
                    curDeley = parseInt(ajaxPressDelayFirst);
                    //ajaxPressDelayFirst = 0;
                    ajaxPressDelayVis = 1;
                }
                /*
                if (!jQuery('#searchSuggestions').is(":visible") && curDeley != 50)
                curDeley = 50;
                */
                clearTimeout(timerid);
                timerid = setTimeout(function () { _public.GetData(keyUpVal); }, curDeley);
            });

            jQuery('#' + txtSearch).blur(function () {
                setTimeout(hideAC, 300);
            });
            jQuery('ul').on('click', 'a.ac_li_query', function (e) {
                jQuery('#' + txtSearch).val(jQuery(this).text());
                //jQuery('#' + btnSearch).click();
                aParameters["SelectedQuery"] = jQuery(this).text();
                resultFunction(aParameters);
                setTimeout(hideAC, 300);
            });
            jQuery('.AC_topdesignerimage').on('click', function (e) {
                jQuery('#' + txtSearch).val(jQuery(this).parent().attr('title'));
                if (jQuery('#' + btnSearch).length > 0)
                    jQuery('#' + btnSearch).click();
                setTimeout(hideAC, 300);
            });
        }
        catch (err) {

            //alert('RegisterEvents');
            //UITemplateMaster.DoLogError(err.message, 'UITemplateProductFinderWidget.RegisterEvents');
        }
    }
};
    return _public;
} ();
var UITemplateParametersMapper = function () {
    var key = 'parametersmapper';
    function capitaliseFirstLetter(str) {
        /*
        str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
        });
        return str;
        */
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }); ;
    };
    var _public =
    {
        ReplaceIfExists: function (html, item, htmlParamList, mapperType) {
            if (NullOrEmpty(htmlParamList))
                htmlParamList = _public.GetListOfParametersFromHtml(html);
            //check without mapper
            jQuery.each(htmlParamList, function (index, param) {//value = baseStruct of html code params
                switch (param.code) {
                    case "dynP": //parameter in current object
                        if (!NullOrEmpty(item[param.name])) {
                            if (param.name == 'u')
                                html = html.replaceAll(param.id, domainLocal +  item[param.name]);
                            else if (param.name == 'iu')
                                html = html.replaceAll(param.id, domainLocal + item[param.name]);
                            else
                                html = html.replaceAll(param.id, capitaliseFirstLetter(item[param.name]));
                        }
                        else if (param.name == 'currency')
                            html = html.replaceAll(param.id, CelebrosACMaster.Currency());
                        //else {
                        /*var mapper = _public.GetMapper(mapperType);
                        if (!NullOrEmpty(mapper) && !NullOrEmpty(mapper[param.name]))
                        html = html.replaceAll(param.id, item[mapper[param.name]]);*/
                        //} 
                        break;
                    case "dynS": //path to parameter to object
                        var val = eval("item." + param.name);
                        html = html.replace(param.id, val);
                        break;
                    case "dynO": //path to parameter to object
                        var val = eval(param.name);
                        html = html.replaceAll(param.id, val);
                        break;
                    case "dynH": //html array parameter + data
                        var val = eval(param.name);
                        //var val = eval("item" + param.name);
                        html = html.replaceAll(param.id, val);
                        break;
                }
            });

            return html;
        },
        GetListOfParametersFromHtml: function (html) {
            var htmlParamsList = [];
            var htmlParam;
            while (html.indexOf('{{') != -1) {
                var mystring = html.substring(html.indexOf('{{'), 2 + html.indexOf('}}'));
                htmlParam = new CelebrosACMaster.baseStruct();
                htmlParam.id = mystring;
                htmlParam.name = mystring.substring(mystring.indexOf(':') + 1, mystring.indexOf('}}'));
                //check for parameter type
                if (htmlParam.name.indexOf('|') != -1) {
                    htmlParam.type = htmlParam.name.split('|')[1]
                    htmlParam.name = htmlParam.name.split('|')[0];
                }
                htmlParam.code = mystring.substring(2, mystring.indexOf(':'));
                htmlParamsList.push(htmlParam);
                html = html.replace(mystring, '');
            }
            return htmlParamsList;

        },
        FillHtmlWithArray: function (html, data, mapperType, systemNote) {
            var list = _public.GetListOfParametersFromHtml(html);
            var htmlList = '';
            jQuery.each(data, function (index, value) {
                htmlList += _public.ReplaceIfExists(html, value, list, mapperType);
            });
            return htmlList;
        }
    };
    return _public;
} ();

//====================================================================================
Array.prototype.remove = function (s) {
    for (i = 0; i < this.length; i++) {
        if (s == this[i]) this.splice(i, 1);
    }
};
Array.prototype.removeJSON = function (name, value) {
    var rest = jQuery.grep(this, function (item) {
        return (item[name] !== value); // <- You may or may not want strict equality
    });
    //debugger;
    this.length = 0;
    this.push.apply(this, rest);
    return this; // <- This seems like a jQuery-ish thing to do but is optional
};
Array.prototype.deleteProperty = function (propertyName) {
    var rest = jQuery.grep(this, function (item) {
        delete item[propertyName];
    });
    return this;
};
Array.prototype.insertAt = function (index, value) {
    this.splice(index, 0, value);
};
Array.prototype.isExistsByBoolProperty = function (name, value, findProperty) {
    var isExists = false;
    var rest = jQuery.grep(this, function (item) {
        if (item[name] === value) {
            //debugger;
            if (item[findProperty] === true)
                isExists = true;
        }
    });
    return isExists;
};
Array.prototype.isExists = function (name, value, findProperty) {
    var isExists = false;
    var rest = jQuery.grep(this, function (item) {
        if (item[name] === value) {
            isExists = true;
        }
    });
    return isExists;
};
Array.prototype.GetIfExistsByProperty = function (name, value, findProperty, findPropertyValue, getProperty) {
    var isExists = false;
    var rest = jQuery.grep(this, function (item) {
        if (item[name] === value) {
            if (item[findProperty] === findPropertyValue)
                isExists = item[getProperty];
        }
    });
    return isExists;
};
Array.prototype.GetItemByProperty = function (name, value) {
    var retIrem = null;
    var rest = jQuery.grep(this, function (item) {
        if (item[name] === value) {
            retIrem = item;
        }
    });
    return retIrem;
};
Array.prototype.GetItemsListByProperty = function (name, value) {
    var retIrem = [];
    var rest = jQuery.grep(this, function (item) {
        if (item[name] === value) {
            retIrem.push(item);
        }
    });
    return retIrem;
};
Array.prototype.addWithCheck = function (name, value, changeName, changeValue, category) {
    var isExists = false;
    var rest = jQuery.grep(this, function (item) {
        //debugger;
        if (item[name] === value) {
            item[changeName] = changeValue;
            isExists = true;
            return true; // <- You may or may not want strict equality
        }
    });
    if (!isExists)
        this.push(category);
    return this; // <- This seems like a jQuery-ish thing to do but is optional
};
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
Array.prototype.containsByParam = function (obj, param) {
    var i = this.length;
    while (i--) {
        if (this[i][param] === obj) {
            return true;
        }
    }
    return false;
};


String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
}

String.prototype.removeSpaces = function () {
    return this.replace(/\s+/g, '');

}
function NullOrEmpty(obj) {
    if (typeof (obj) === 'undefined' || obj == null || obj === '')
        return true;
    else return false;
}
String.prototype.format = function (args) {
    var newStr = this;
    for (var key in args) {
        newStr = newStr.replace('{' + key + '}', args[key]);
    }
    return newStr;
}
function htmlEncode(value) {
    return jQuery('<div/>').text(value).html();
}

function htmlDecode(value) {
    return jQuery('<div/>').html(value).text();
}
var entityMap = {
  '<': '&lt;',
  '>': '&gt;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[<>`=]/g, function (s) {
    return entityMap[s];
  });
}
function sortit(a, b) {
    var aName = a.Name.toLowerCase();
    var bName = b.Name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var str, i = -1, _token;
    if ((str = this.toString()) && typeof token === "string") {
        _token = ignoreCase === true ? token.toLowerCase() : undefined;
        while ((i = (
            _token !== undefined ?
                str.toLowerCase().indexOf(
                            _token,
                            i >= 0 ? i + newToken.length : 0
                ) : str.indexOf(
                            token,
                            i >= 0 ? i + newToken.length : 0
                )
        )) !== -1) {
            str = str.substring(0, i)
                    .concat(newToken)
                    .concat(str.substring(i + token.length));
        }
    }
    return str;
};
function jqSelector(str) {
    return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
}