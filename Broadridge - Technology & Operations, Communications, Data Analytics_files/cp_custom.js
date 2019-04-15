/*! jQuery Validation Plugin - v1.15.1 - 7/22/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return!c.settings.submitHandler||(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(null!=j&&null!=j.form){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){!this.form&&this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]);var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(a){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",a),a instanceof TypeError&&(a.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),a}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{boolean:function(a){return a},string:function(b,c){return!!a(b,c.form).length},function:function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
(function(){
   
if(window.location.href.indexOf("what-are-the-applications-for-artificial-intelligence-in-securities-finance-and-collateral-management")>-1){
  $(".talk-to-us-flyout").hide();
  
}
 
 $(".hero_link_header_CTA1").click(function(e){
    if($("#isresourceLPForm").length){
     $('html, body').animate({
                scrollTop: $("#isresourceLPForm").offset().top -70
            }, 2000); 
    }
   else{
     $('html, body').animate({
                scrollTop: $("#gated-content-form").offset().top -70
            }, 2000);
   }
   });
  
 if(window.location.href.indexOf("japan-settlement-revolution")>0 || window.location.href.indexOf("japan-derivatives-transformation")>0 || window.location.href.indexOf("japan-nextgentech")>0 ){
    $(".cta-settlement").hide();
    var jpSettlementCookiePresent =false;
    jpSettlementCookiePresent = checkCookieForJpPage();
      if(jpSettlementCookiePresent){
      $(".contact-broadridge__thanks_LP_LG").hide();
      $(".gated-content-form__container").hide();
      
    }
  }
  if(window.location.href.indexOf("japan-settlement-revolution")>0){
    $(".cta-settlement").hide();
  }
if(window.location.href.indexOf("japan-derivatives-transformation")>0){
    $(".cta-settlement").hide();
  }
  
    $('.segment-solutions .segment-solutions__solution-wrapper').each(function(){
        $this = $(this);
        var $leftContent = $this.find('.segment-solutions__solution__container').first();
        var $itemContent = $this.find('.segment-solutions__solution__content').first();
        if ($itemContent.height() < $leftContent.height()) {
            var difference = ($leftContent.height() - $itemContent.height() + 10 + 135) + 'px';
            $itemContent.find('a.segment-solutions__solution__item').last().css('padding-bottom', difference);
        }
    });
  
    $(".client_login_accord").click(function(){
  
   
        t = $(this).siblings().find(".international-locations__location__content"),
        n = $(this).siblings(".international-locations__location__content"),
        o = $(this).closest("li");
        $(this).find(".hide").toggleClass("show");
  
        if($(this).hasClass("location-open")){
     
            $(this).find(".show").hide();
            $(this).find(".hide").show();
    
        }else{
     
    
            $(this).find(".show").show();
            $(this).find(".show").css('cssText','display:inline !important');
            $(this).find(".hide").hide();
        }
  
        $(this).toggleClass("location-open").siblings().removeClass("location-open"), t.slideUp(), n.slideToggle(400, function() {
            $("html, body").animate({
                scrollTop: $(o).offset().top - $(".header").outerHeight()
            }, 500)
        })
        e.preventdefault();
    });
})();
  
  
var level=0;
var home_talk;
var pagecnt = 1000;  
var pagepassed = false;  
var buttonClicked =false;
var unlockGatedFormSubmitted = false;
script = document.createElement('script');
script.src = "https://s1756.t.eloqua.com/visitor/v200/svrGP?pps=70&siteid=1756&DLKey=83d51bc44b3c4b48a30ac9a80069b932&DLLookup=&ms=812";
document.head.appendChild(script);
var insightsContentFilter =[];// Dependency : This array variable has dependencies with GTM - Do not delete/modify
var industriesContentFilter = [];//Dependency : This array variable has dependencies with GTM - Do not delete/modify
var capabilitiesContentFilter=[]; ////Dependency : This array variable has dependencies with GTM - Do not delete/modify
	var checkBoxCookieArray="";
     
       var cookiesInPage=document.cookie.split(';');
            for(var i=0;i < cookiesInPage.length;i++) {
                var currentCookie=cookiesInPage[i];
              while (currentCookie.charAt(0)==' ')currentCookie = currentCookie.substring(1,currentCookie.length);
              
               if (currentCookie.indexOf("gatedFormCookie") == 0){
                checkBoxCookieArray=checkBoxCookieArray+currentCookie.split("=")[1];
              }
              
           
                             
            }		
// initialize the campaignCookie storage
var setCampaignCookie = "setCampaignCookie";
var setCampaignValues = {};
            
// setup a regular expression to match email input later
var re = /\S+@\S+\.\S+/;
            
// query string parser
var defaultHiddenFieldNameValue = "";
function getQueryStringParamValue(strQStrParam){
            
    var strURL = document.location.href;
                
    var strQStrParamValue = "";
                
                
    if (strURL.indexOf('?') != -1) {
        strQStrParamValue = strURL.substr(strURL.indexOf('?') + 1);
        if (strQStrParamValue.indexOf(strQStrParam) != -1) {
            strQStrParamValue = strQStrParamValue.substr(strQStrParamValue.indexOf(strQStrParam));
            strQStrParamValue = strQStrParamValue.substr(strQStrParamValue.indexOf('=') + 1);
            if (strQStrParamValue.indexOf('&') != -1) 
                strQStrParamValue = strQStrParamValue.substr(0, strQStrParamValue.indexOf('&'));
            return strQStrParamValue;
                        
        } else {
            strQStrParamValue = defaultHiddenFieldNameValue;
            return strQStrParamValue;
        }
    } else {
        strQStrParamValue = defaultHiddenFieldNameValue;
        return strQStrParamValue;
    }
}
            
            
var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', '1756']);
_elqQ.push(['elqTrackPageView']);
(function(){
    function async_load(){
        if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', async_load, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', async_load);
        }
    }
})();
            
       
// this is all out-of-box oracle code that is the logic behind grabbing the customer GUID cookie if it is present.  this kickstarts the rest of the lookup if there's a GUID present through the SetElqContent() method. 
var timerId = null, timeout = 5;
            
function WaitUntilCustomerGUIDIsRetrieved(){
    if (!!(timerId)) {
        if (timeout == 0) {
            return;
        }
        if (typeof this.GetElqCustomerGUID === 'function') {
            $("input[name='elqCustomerGUID']").val(GetElqCustomerGUID());
            return;
        }
        timeout -= 1;
    }
    timerId = setTimeout("WaitUntilCustomerGUIDIsRetrieved()", 500);
    return;
}
            
window.onload = WaitUntilCustomerGUIDIsRetrieved;
           
            
function setFormFieldValue(elqForm, strFormFieldName, strContactFieldName){
    if (elqForm.elements[strFormFieldName]) 
        elqForm.elements[strFormFieldName].value = GetElqContentPersonalizationValue(strContactFieldName);
}
            
function SetElqContent(){
    if (this.GetElqContentPersonalizationValue) {
        if ($("input[name='email_work']").val() === '') {
            $("input[name='email_work']").each(function(){
                $(this).val(GetElqContentPersonalizationValue('V_ElqEmailAddress'));
            })
        } else {
            email = GetElqContentPersonalizationValue('V_ElqEmailAddress');   
            $("input[name='name_first']").val(GetElqContentPersonalizationValue('C_FirstName'));
            $("input[name='name_last']").val(GetElqContentPersonalizationValue('C_LastName'));
            firstName = $("input[name='name_first']").val();
            lastName = $("input[name='name_last']").val();
            fullName = firstName + (lastName !== '' ? " " + lastName : "");
            if (fullName!="") {
                //$("input[name='name_full']").val(fullName);
                $(".contact-broadridge-full-name").html(fullName);
                $(".form_description_known").each(function(){
                    $(this).html($(this).html()
                    .replace('{firstName lastName}', fullName)
                    .replace('{firstName}', firstName)
                    .replace('{lastName}', lastName)
                    );
                    $(this).find("a").click(function(e){
                        ClearFormFields(); 
                        $('.form_description_default').show();
                        $('.form_description_known').hide();
                        return false;
                    });	
                });
                $('.form_description_default').hide();
                $('.form_description_known').show();
            }
            company = GetElqContentPersonalizationValue('C_Company');
            $("input[name='job_title']").val(GetElqContentPersonalizationValue('C_Title'));
            $("input[name='company']").val(company);
            $("input[name='phone_business']").val(GetElqContentPersonalizationValue('C_BusPhone'));
            $("select[name='country'] option[value='" + GetElqContentPersonalizationValue('C_Country') + "']").prop('selected', true);
                        
						
						
            //pipe multiselect values into array, then iterate through for prepopulation, this only works after a submission using this codebase, see the payload comments in the submission event
            var poiArr = GetElqContentPersonalizationValue('C__Topic_of_Interest1').split('::');
            poiCount = 0;
            processedPOI = "";
            for (i = 0; i < poiArr.length; i++) {
                if (processedPOI.indexOf(poiArr[i])<0) { //handle possible duplicates from Eloqua
                    processedPOI = processedPOI + "~"+poiArr[i];
                    poiCount++; 
                    $("input[name='topicOfInterest1'][value='" + poiArr[i] + "']").prop('checked', true);
                    //insight hub subscription form fields
                    $(".insight-subscribe__tag[data-value='" + poiArr[i] + "']").addClass('selected');
                }
            }
            if (poiCount>0) {
                $("#talk-to-us .multi-select__title").text(poiCount + " selected");
            }
						
            //// tap into the data-progressive attribute to hide fields we know already
            //$("div[data-progressive] input").each(function(){
            //    if ($(this).val() !== '') {
            //        $(this).closest('div').hide();
            //    }
            //})
                        
            //$("div[data-progressive] select").each(function(){
            //    if ($(this).find('option:selected').index() > 0) {
            //        $(this).closest('div').hide();
            //    }
            //})
            //show Lead Generation progressive fields
            $leadgenform = $("[data-inquiry-type='Lead Generation']");
            if ($leadgenform.length>0) {
                if (firstName!="" && lastName!="" && company!=""){
                    //hide known fields
                    $leadgenform.find('#contact-broadridge-general__full-name').hide();
                    $leadgenform.find('#contact-broadridge-general__user-name-fields').hide();
                    $leadgenform.find("input[name='email_work']").parent().hide();
                    $leadgenform.find("input[name='company']").parent().hide();
                    //show progressive
                    $leadgenform.find('.progressive').show();
                }
            }
                        
        }
                    
    }
}
            
            
$(function(){
    $(window).load(function(){
        //flush the inputs on load and allow the lookup to occur
        $("form input:text").each(function(){
            if ($.trim($(this).val()) === '') {
            } else {
                if ($(this).attr('name') === 'comments_87' || $(this).attr('name') === 'comments_88') {
                    $(this).val('');
                } 
            }
        })
					
        // push the GUID into the field
        _elqQ.push(['elqGetCustomerGUID']);
        // perform the visitor data lookup
        _elqQ.push(['elqDataLookup', escape('376db2c29d1c4608a5def1888f591c3c'),'']);
        // wrap the contact lookup in a 1 second interval which will attempt 10 times (adjustable)
        var count = 0;
        var setValues = setInterval(function(){
                    
            // if we hit a GUID and have an email to work with then fire the second lookup using the email address we got back that we've since pushed into our email_work field(s)
            if ($("input[name='email_work']").val() !== '') {
                        
                _elqQ.push(['elqDataLookup', escape('a347402c1ba34680a8e4c951114697cb'), '<C_EmailAddress>' + $("input[name='email_work']").val() + '</C_EmailAddress>']);
                clearInterval(setValues);
            } else {
                count++;
                if (count > 10) {
                    // first time visitor, cookies disabled or lookup failed after 10 seconds, kill the second lookup
                    clearInterval(setValues);
                }
            }
        }, 1000)
                    
                    
                    
        //create the set of persistent campaign fields that are read in from query string params if available, this removes overhead for CP when managing their forms
        $("<input class='campaign' name='id' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='so' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='di' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='ct' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='ot' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='mt' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='yr' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='rg' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='on' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' name='ep' type='hidden' value=''>").appendTo('body');
        $("<input class='campaign' id='campaignMost_RecentName' name='campaignMostRecentName' type='hidden' value=''>").appendTo('body');
      	$("<input class='campaign' id='campaignMost_RecentSource' name='campaignMostRecentSource' type='hidden' value=''>").appendTo('body');
      	$("<input class='campaign' id='campaignMost_RecentMedium' name='campaignMostRecentMedium' type='hidden' value=''>").appendTo('body');
      	$("<input class='campaign' id='campaignMost_RecentContent' name='campaignMostRecentContent' type='hidden' value=''>").appendTo('body');
      	$("<input class='campaign' id='campaignMost_RecentTerm' name='campaignMostRecentTerm' type='hidden' value=''>").appendTo('body');
       
      //add default demanbase fields to populate before the form submission
        $("<input id='db_field29' type='hidden' class='demandbase_field' name='db_watch_list_gto_tier'>").appendTo('body');
        $("<input id='db_field30' type='hidden' class='demandbase_field' name='db_watch_list_mfrs_tier'>").appendTo('body');
        $("<input id='db_field31' type='hidden' class='demandbase_field' name='db_watch_list_sell_buy'>").appendTo('body');
        $("<input id='db_field32' type='hidden' class='demandbase_field' name='db_watch_list_level'>").appendTo('body');
        $("<input id='db_field33' type='hidden' class='demandbase_field' name='watch_list_cita'>").appendTo('body');
        $("<input id='db_field34' type='hidden' class='demandbase_field' name='db_company_name'>").appendTo('body');
        $("<input id='db_field35' type='hidden' class='demandbase_field' name='db_marketing_alias'>").appendTo('body');
        $("<input id='db_field36' type='hidden' class='demandbase_field' name='db_industry'>").appendTo('body');
        $("<input id='db_field37' type='hidden' class='demandbase_field' name='db_sub_industry'>").appendTo('body');
        $("<input id='db_field38' type='hidden' class='demandbase_field' name='db_revenue_range'>").appendTo('body');
        $("<input id='db_field39' type='hidden' class='demandbase_field' name='db_employee_range'>").appendTo('body');
        $("<input id='db_field40' type='hidden' class='demandbase_field' name='db_street_address'>").appendTo('body');
        $("<input id='db_field41' type='hidden' class='demandbase_field' name='db_city'>").appendTo('body');
        $("<input id='db_field42' type='hidden' class='demandbase_field' name='db_state'>").appendTo('body');
        $("<input id='db_field43' type='hidden' class='demandbase_field' name='db_zip'>").appendTo('body');
        $("<input id='db_field44' type='hidden' class='demandbase_field' name='db_country'>").appendTo('body');
        $("<input id='db_field45' type='hidden' class='demandbase_field' name='db_demandbase_sid'>").appendTo('body');
        $("<input id='db_field46' type='hidden' class='demandbase_field' name='db_ip'>").appendTo('body');
        $("<input id='db_field47' type='hidden' class='demandbase_field' name='db_data_source'>").appendTo('body');
        $("<input id='db_field48' type='hidden' class='demandbase_field' name='db_phone'>").appendTo('body');
        $("<input id='db_field49' type='hidden' class='demandbase_field' name='db_country_name'>").appendTo('body');
        $("<input id='db_field50' type='hidden' class='demandbase_field' name='db_primary_sic'>").appendTo('body');
        $("<input id='db_field51' type='hidden' class='demandbase_field' name='db_employee_count'>").appendTo('body');
        $("<input id='db_field52' type='hidden' class='demandbase_field' name='db_annual_sales'>").appendTo('body');
        $("<input id='db_field53' type='hidden' class='demandbase_field' name='db_fortune_1000'>").appendTo('body');
        $("<input id='db_field54' type='hidden' class='demandbase_field' name='db_forbes_2000'>").appendTo('body');
        $("<input id='db_field55' type='hidden' class='demandbase_field' name='db_b2b'>").appendTo('body');
        $("<input id='db_field56' type='hidden' class='demandbase_field' name='db_b2c'>").appendTo('body');
        $("<input id='db_field57' type='hidden' class='demandbase_field' name='db_audience'>").appendTo('body');
        $("<input id='db_field58' type='hidden' class='demandbase_field' name='db_audience_segment'>").appendTo('body');
        $("<input id='db_field59' type='hidden' class='demandbase_field' name='db_web_site'>").appendTo('body');
        $("<input id='db_field60' type='hidden' class='demandbase_field' name='db_stock_ticker'>").appendTo('body');
        $("<input id='db_field61' type='hidden' class='demandbase_field' name='db_traffic'>").appendTo('body');
         
        // first check to see if the there's a querystring id
        if (getQueryStringParamValue('id=') === '') {
            if ($.isEmptyObject(Cookies.get(setCampaignCookie))) {
            } else {
                // if no querey string then set from the JSON cookie if there's one there from a previous visit
                $.each(Cookies.getJSON(setCampaignCookie), function(key, value){
                  if(key!='id' && key!='so' && key!='di' && key!='ct' && key!='ot' && key!='mt' && key!='yr' && key!='rg' && key!='on' && key!='ep')
                  {
                    $("input[name='" + key + "']").val(value);
                    setCampaignValues[key] = value;
                  }
                });
            }
        } else {
            // if there is a querystring set in the url, override the cookie and set the corresponding values on the live page
                        
            $("input[name='id']").val(getQueryStringParamValue('id='));
            $("input[name='so']").val(getQueryStringParamValue('so='));
            $("input[name='di']").val(getQueryStringParamValue('di='));
            $("input[name='ct']").val(getQueryStringParamValue('ct='));
            $("input[name='ot']").val(getQueryStringParamValue('ot='));
            $("input[name='mt']").val(getQueryStringParamValue('mt='));
            $("input[name='yr']").val(getQueryStringParamValue('yr='));
            $("input[name='rg']").val(getQueryStringParamValue('rg='));
            $("input[name='on']").val(getQueryStringParamValue('on='));
            $("input[name='ep']").val(getQueryStringParamValue('ep='));
            $("input[name='campaignMostRecentName']").val(getQueryStringParamValue('utm_campaign='));
            $("input[name='campaignMostRecentSource']").val(getQueryStringParamValue('utm_source='));
            $("input[name='campaignMostRecentMedium']").val(getQueryStringParamValue('utm_medium='));
            $("input[name='campaignMostRecentContent']").val(getQueryStringParamValue('utm_content='));
            $("input[name='campaignMostRecentTerm']").val(getQueryStringParamValue('utm_term='));
            $("input.campaign").each(function(){
                var getName = $(this).attr('name');
                var getVal = $(this).val();
                setCampaignValues[getName] = getVal;
            })
                        
            Cookies.remove(setCampaignCookie);
            Cookies.set(setCampaignCookie, setCampaignValues, {
                expires: 365
            });
        }
        var szAnchor = window.location.hash;
        if (szAnchor != '') {
            var $anchor = $(szAnchor);
            if ($anchor.length > 0) {
                $('html, body').animate({
                    scrollTop: $anchor.offset().top
                }, 0);
            }
        }
    });
                
    // ok, let's handle the form submission...
    $("button[type='submit']").click(function(e){
                
        // stop whatever the form wants to do inherently and do our stuff first instead
        e.preventDefault();
          
        //alert("In");
                    
        // if the form is in the process of submitting, check for ajax class presence and abort action if it's already doing a submission
        if ($(this).hasClass('ajax')) {
            return false;
        }
                    
					
                    
        // store whatever form is being submitted in case there is more that one form on the page
        var $$ = $(this).closest('form');
        //var dataLayerErrors = $(this).defaultShowErrors();
        //console.log("value is:" +dataLayerFormType);
        //expand full name
        $$.find('.form__expand-button').click();
        var dataLayerCategory = $$.find($("input[name='datalayerheader']")).val();
        //validate the form
        if (!$$.valid()) {
            
            var dataLayerFormType = $$.attr('data-inquiry-type');
            dataLayerCategory = $$.find($("input[name='datalayerheader']")).val();
            
            var dataLayerFormId = getCurrentFormID($$);
            //var count = $("span .error:visible").length;
        
            var dataLayerMessage = $("span.error").text();
            
            dataLayer.push({
                'event': 'formError',
                'formCategory': dataLayerCategory,
                'formName': dataLayerFormType,
                'formId': dataLayerFormId,
                'formError': dataLayerMessage
            });
            e.preventDefault();
            return false;
        }
                    
        // don't submit on bad email value
        //if (re.test($$.find($("input[name='email_work']")).val()) == false) {
        //    return false;
        //}
					
					
        // trap for the spam bots
        if ($.trim($("input[name='comments_87']").val()) !== '' || $.trim($("input[name='comments_88']").val()) !== '') {
            e.preventDefault();
        } else {
                 buttonClicked=true;   
            // build payload.   The following approach is designed to isolate the eloqua form submission data from the rest of the CP setup as much as possible.  We first inject a temporary form element into the DOM outside the view of the user.
                        
            $('<form id="temp-form" style="position:absolute;left:-9999px;"></form>').appendTo("body");
                        
            // iterate through all active inputs within the current submission's closest form, clone them and add them to our temporary form
            $$.find('input').each(function(){
                var getVal = $(this).val();
                $(this).clone().appendTo("#temp-form").val(getVal);
            })
                        
            // do the same for select boxes
            $$.find('select').each(function(){
                var getVal = $(this).find('option:selected').val();
                $(this).clone().addClass('temp-select').appendTo("#temp-form");
                $(".temp-select").removeClass('temp-select').find('option[value="' + getVal + '"]').prop('selected', true);
            })
                        
            //do the same for textareas
            $$.find('textarea').each(function(){
                var getVal = $(this).val();
                $(this).clone().appendTo("#temp-form").val(getVal);
            })
            
             if($('#contactMe').length>0){
                if(document.getElementById("contactMe").checked || window.location.href.indexOf("jp/campaign/ready-for-next") > 0){
                  
                  document.getElementById("contactMe").value ="on";
                 
                }else{
                  document.getElementById("contactMe").value ="Content Download";
                }
            }
                        
            formInquiryType = $$.attr('data-inquiry-type');
            // check for presence of inquiry checkbox, if not present, create element and set value to closest form's data-inquiry-value attribute.  if present, create the inqury field and append the current checkbox value to it.
            if ($$.find($("input[name='inquiry-checkbox']")).length > 0) {
                chechBoxValue = $$.find($("input[name='inquiry-checkbox']")).val();
                if (chechBoxValue=="on") {
                    formInquiryType = "Lead Generation";
                }
                else{
                    formInquiryType = "Content Download";
                }
            } else {
                if (formInquiryType == "Insights Subscription") {
                    //use “Receive Thought Leadership” for the generic subscribe on the Insights page
                    formInquiryType = "Receive Thought Leadership";
                }
            }
            $firstNameVal = $$.find($("input[name='name_first']"));
            firstNameVal = $firstNameVal.length > 0 ? $firstNameVal.val() : "";
            $lastNameVal = $$.find($("input[name='name_last']"));
            lastNameVal = $lastNameVal.length > 0 ? $lastNameVal.val() : "";
            fullNameVal = $.trim(firstNameVal + " " + lastNameVal);
              $productName = $$.find($("input[name='product_name']"));
               if($productName.length>0){
              productName = $productName.val();
			  }
            $("<input name='name_full' value='" + fullNameVal + "' type='hidden'>").appendTo($("#temp-form"));
            $("<input name='inquiry' value='" + formInquiryType + "' type='hidden'>").appendTo($("#temp-form"));
          if($productName.length>0){
            $("<input name='product_name' value='" + productName + "' type='hidden'>").appendTo($("#temp-form"));
          }
            // create pageURL field and set to window.location
            var fullURL = window.location.href;
            if (fullURL.match(/\?/)) {
                fullURL = fullURL.split('?')[0];
            }
            $("<input name='fullURL' value='" + fullURL + "' type='hidden'>").appendTo("#temp-form");
            pageURL =  window.location.pathname;
            if (pageURL.match(/\?/)) {
                pageURL = pageURL.split('?')[0];
            }
            if(pageURL.substr(-1) === '/') {
                pageURL = pageURL.substr(0, pageURL.length - 1);
            }
            pageURL = ("broadridge.com"+ pageURL).slice(-100)
             if(countryCode == "ca"){
               if(pageURL.length ==100){
                 pageURL = pageURL.slice(3);
                 pageURL = "ca-"+pageURL;
               }else{
                 if(pageURL.length<98){
                   pageURL = "ca-"+pageURL;
                 }else if(pageURL.lenght==99){
                   pageURL = pageURL.slice(2);
                    pageURL = "ca-"+pageURL;
                 }else if (pageURL.length==98){
                   pageURL = pageURL.slice(1);
                    pageURL = "ca-"+pageURL;
                 }
               }
            }
             if(countryCode == "jp"){
               if(pageURL.length ==100){
                 pageURL = pageURL.slice(3);
                 pageURL = "jp-"+pageURL;
               }else{
                 if(pageURL.length<98){
                   pageURL = "jp-"+pageURL;
                 }else if(pageURL.lenght==99){
                   pageURL = pageURL.slice(2);
                    pageURL = "jp-"+pageURL;
                 }else if (pageURL.length==98){
                   pageURL = pageURL.slice(1);
                    pageURL = "jp-"+pageURL;
                 }
               }
            }
            
            $("<input name='pageURL' value='" + pageURL + "' type='hidden'>").appendTo("#temp-form");
                        
            pageID = $('meta[name="page_id"]').attr("content");;
            $("<input name='pageID' value='" + pageID + "' type='hidden'>").appendTo("#temp-form");                               
            
            // clone the campaign inputs that were creted on page load and append them to the tempform.
            $('input.campaign').each(function(){
                $(this).clone().appendTo("#temp-form");
                            
            })
            // clone the demandbase_field inputs that were creted on page load and append them to the tempform.
            $('input.demandbase_field').each(function(){
                $clone = $(this).clone();
                if (Demandbase && Demandbase.IP && Demandbase.IP.CompanyProfile) {
                    dbName = $clone.attr("name").replace("db_", "");
                    dbValue = Demandbase.IP.CompanyProfile[dbName];
                    if (dbValue!="" && dbValue!=undefined) {
                        $clone.val(dbValue);
                    }
                }
                $clone.appendTo("#temp-form");
                            
            })
            
            if($('#contactMe').length>0){
                if(document.getElementById("contactMe").checked){
                  
                  $("<input name='contact' value='on' type='text'>").appendTo("#temp-form");                               
                }
            }
                      
            //build out the correct value for the topic of interest
            $("#temp-form input[name='topicOfInterest1']:checked").each(function() {
                //uncheck the cloned checkboxes to avoid duplicated submissions
                $(this).prop('checked', false);
            })
            $("<input class='temp-topic-field' type='hidden' name='topicOfInterest1' value=''>").appendTo("#temp-form");
						
            if ($$.data('inquiry-type') == "Insights Subscription") {
                //insights hub subscription form
                var selectedInsights = $.map($('.insight-subscribe__tag:not(.select--all).selected'), function(tag, i){
                    return $(tag).data('value');
                }).join('::');
                $("input.temp-topic-field").val(selectedInsights);
                //frequency field
                $("<input class='temp-freq-field' type='hidden' name='topicFreq' value=''>").appendTo("#temp-form");
                $("input.temp-freq-field").val($('.insight-subscribe__select-wrapper .multi-select__title').text());
            }		
            else{
                $$.find($("input[name='topicOfInterest1']:checked")).each(function() {
                    if ($("input.temp-topic-field").val() === '') {
                        $("input.temp-topic-field").val($(this).val());
                    } else {
                        $("input.temp-topic-field").val($("input.temp-topic-field").val()+'::'+$(this).val())
                    }
                })
            }
            
            //subsegment
            subsegmentVal = $('meta[name="product_subsegment"]').attr("content");
            subsegmentVal = subsegmentVal==undefined? "": subsegmentVal;
            $("<input type='hidden' name='subsegment' value='" + subsegmentVal + "'>").appendTo("#temp-form");
           var cookiePresent=false;
            cookiePresent=isCookiePresent();
            var valueIncheckbox;
            var checkboxValue="no";
            var currentDate= new Date();
            
          if(!cookiePresent){
             
            
              if($('#isGatedForm').length >0) {
              
                if(document.getElementById("isGatedForm").value== "yes")
                {
                  
            var value=window.location.pathname;
                 // pageLevelCookieArray=pageLevelCookieArray+","+value;
                  //createCookieWithExpDate("pageLevelCookie",pageLevelCookieArray,99999);
                 }
                
                //Creating cookie based on check box checked if user is at fisrt level 
                if($('#contactMe').length>0){
                if(document.getElementById("contactMe").checked){
                  currentDate=new Date();
                 
                   checkboxValue="yes";
                   valueIncheckbox=pageID+"|firstLevel|"+checkboxValue+"|"+currentDate;
                                  
                }else {
                  checkboxValue="no";
                  valueIncheckbox=pageID+"|firstLevel|"+checkboxValue;
                                 }
               }
                
               
              }
          }else{
           
             if($('#isGatedForm').length >0) {
               
               var cookiearrayUpdate=new Array();
               var delString=$('meta[name="page_id"]').attr("content")+"|secondLevel|yes";
               var delfirstString=$('meta[name="page_id"]').attr("content")+"|firstLevel|yes";
                cookiearrayUpdate=checkBoxCookieArray.split(",");
                      for (var f=cookiearrayUpdate.length-1; f>=0; f--) 
                      {
                          if(cookiearrayUpdate[f].indexOf(delString)!=-1)
                              {
                              cookiearrayUpdate.splice(f, 1);
                              }
                      }
                      for (var g=cookiearrayUpdate.length-1; g>=0; g--) 
                      {
                          if(cookiearrayUpdate[g].indexOf(delfirstString)!=-1)
                              {
                              cookiearrayUpdate.splice(g, 1);
                              }
                      }
                 checkBoxCookieArray=cookiearrayUpdate.toString();
               
               currentDate=new Date();
               checkboxValue="yes";
               valueIncheckbox=pageID+"|secondLevel|"+checkboxValue+"|"+currentDate;
              }
             
          }
          if(($('#isGatedForm').length >0)){
            
            
            
          checkBoxCookieArray=checkBoxCookieArray+ "," +valueIncheckbox;
           createCookieWithExpDate("gatedFormCookie",checkBoxCookieArray,99999);
                 
          }
	
          
            var currentFormID = getCurrentFormID($$);
            $("<input type='hidden' name='formID' value='" + currentFormID + "'>").appendTo("#temp-form");
                      
            //ELQ cookies            
            var getParams = Cookies.getJSON("elqCookieCampaign");
            if (typeof getParams !== 'undefined' && typeof getParams !== null) {
                $("<input name='campaignMostRecentName' type='hidden' value='" + getParams.campaignMostRecentName + "'>").appendTo("#temp-form");
                $("<input name='campaignMostRecentSource' type='hidden' value='" + getParams.campaignMostRecentSource + "'>").appendTo("#temp-form");
                $("<input name='campaignMostRecentMedium' type='hidden' value='" + getParams.campaignMostRecentMedium + "'>").appendTo("#temp-form");
                $("<input name='campaignMostRecentContent' type='hidden' value='" + getParams.campaignMostRecentContent + "'>").appendTo("#temp-form");
                $("<input name='campaignMostRecentTerm' type='hidden' value='" + getParams.campaignMostRecentTerm + "'>").appendTo("#temp-form");
            } 
            //fire the post, this URL can be secure or insecure and always remains the same.
            $.post('https://s1756.t.eloqua.com/e/f2', $("#temp-form").serialize(), function(){
                dataLayerCategory = $$.find($("input[name='datalayerheader']")).val();
               if(($('#isGatedForm').length >0))
                {
                  if(formInquiryType == "Lead Generation")
                    {
                      dataLayerCategory = "Talk to us";
                      formInquiryType = "Contact us about this topic - Lead Generation";
                    }
                  else
                    {
                      dataLayerCategory = "Landing page";
                      formInquiryType = "Contact us about this topic - content download";
                    }
                }
                dataLayer.push({
                    'event': 'formSubmit',
                    'formCategory': dataLayerCategory,
                    'formName': formInquiryType,
                    'formId': currentFormID
							
                });
              
            });
            //submit to WCO snippet to use for targeting
            sendWCOForm($("#temp-form"), 'https://snippet.omm.crownpeak.com/p/98ae2cff-32bb-47c1-af6b-181a390b5136', '452ad5f8-42b2-4b09-8fef-51bb3e49880a');
            //we wait 3 seconds for the post to occur then remove temporary form we've created to handle the eloqua related posting the allow the form to submit into your system as it normally would.  in this way we do not post data to your system that isn't being used.
            setTimeout(function(){
                $("#temp-form").remove();
                //$$.find('button:submit').removeClass('ajax').val('SUBMIT');
                _elqQ.push(['elqDataLookup', escape('a347402c1ba34680a8e4c951114697cb'), '<C_EmailAddress>' + $("input[name='email_work']").val() + '</C_EmailAddress>']);
            }, 3000)
                  
             if(window.location.href.indexOf("intl/campaign/ready-for-next-apac")>0  || window.location.href.indexOf("intl/campaign/ready-for-next-emea")>0 || window.location.href.indexOf("sec-to-provide-optional-internet-availability-of-shareholder-reports")>0){
               if(document.getElementById("contactMe").checked){
                    $(".contact-broadridge__form__info").removeClass("rfn_checkbox_checked");
                   }else{
                     $(".contact-broadridge__form__info").removeClass("rfn_checkbox_unchecked");
                  }
                 $(".contactus-rfn").hide();
            }
            
           if(level==1 ){
                  
                           if($('#isGatedForm').length >0) {
                if(document.getElementById("isGatedForm").value== "yes")
                {
                        $(".gated-content-form__form_LP").hide();
                  if(document.getElementById("contactMe").checked){
                    $(".contact-broadridge__thanks_LP_LG").show();
                  }else{
                 $(".contact-broadridge__thanks_LP_CD").show();
                  }
                  $(".gated-content-form__title").hide();
                  $(".gated-content-form__info").hide();
                    $('#gated-content-form').attr("tabindex",-1).focus();
                    
              }
                           }
            } 
           
          
          
            //show thank you message
            var $form_container = $(this).parents('.form-container');
            thankyou_content_id = $form_container.data("thankyoucontentid");
            thankyou_id = $form_container.data("thankyouid");
            if ($form_container.length>0 && thankyou_content_id!=undefined) {
                $('.talk-to-us-form-content').hide();
                $('#' + thankyou_id).html($('#'+thankyou_content_id).html());
                $(".thank-you-content").show();
            }
            else
            {
              
              
            if(checkboxValue=="no"){
                console.log("showthanks");
                showThankYouContent("");
             }
                
            }
            if ($$.data('inquiry-type') == "Insights Subscription") {
                $(".insight-subscribe__info").slideUp(); 
                $(".insight-subscribe__thanks").slideDown();
            }
            if ($$.data('inquiry-type') == "Content Download" && !$('.gated_download_content').is(':visible')) {
                setTimeout(function(){ 
                    unlockGatedFormSubmitted = true;
                    unlockGatedContent();
                    
                }, 1000);
                
            }
        }
    })
                
                
                
    // add keyup listener on primary form to look for fields pairings on other forms on the page and syncronize their values
    //this avoids a situation where a user fills in one form but the lookup doesn't happen again in time before they engage another form for that page's session
    //thereby forcing them to re-enter their information
    $(".form-container input").focusout(function(){
        var getName = $(this).attr('name');
        if (getName!="topicOfInterest1") {
            $("body").find('input[name="' + getName + '"]').val($(this).val());
        }       
        if (getName=="name_first" || getName=="name_last") {
            firstName = $("input[name='name_first']").val();
            lastName = $("input[name='name_last']").val();
            fullName = firstName + (lastName !== '' ? " " + lastName : "");
            if (fullName!="") {
                //$("input[name='name_full']").val(fullName);
                $(".contact-broadridge-full-name").html(fullName);
            }
            
        }
    })
                
                
    //same logic but for select box changes on main form
    $(".form-container select").on('change', function(){
        var getName = $(this).attr('name');
        var getValue = $(this).find('option:selected').val();
        $("body").find("select[name='" + getName + "'] option[value='" + getValue + "']").prop('selected', true);
    })
            
});
//thank you content
function showThankYouContent(form_type){
     $(".contact-broadridge__form").slideUp();
    $(".contact-broadridge__thanks").slideDown().removeClass("hidden");
  if($('#isGatedForm').length >0) {
    
  $('html, body').animate({
                scrollTop: $("#art-util").offset().top -70
            }, 2000);
  }
  else if($('#isresourceLPForm').length >0){
    
  }
  else{
    $("html, body").animate({
        scrollTop: $(".contact-broadridge").offset().top - $(".header").outerHeight()
    }, 500)
  }
}
function clearContents(element) {
   element.value = '';
}
function DetachHomeTalk() {
    $(".header-form-widget").hide();
    $(".talk-to-us-form-content").show();
    $(".thank-you-content").hide();
    $("#home_talk").hide();
    //home_talk = $('#Top-Flyout .flyout-content .outer-wrapper').detach();
  
    //$(".talk-to-us").css('max-height', 'none');
    //$(".talk-to-us__contact-info").css('max-height', 'none');
}
function checkCookieForJpPage(){
  console.log("Testing jp page");
  var cookiesInPage=document.cookie.split(';');
  var requiredValue=false;
  var jpPageId=$('meta[name="page_id"]').attr("content");
            for(var i=0;i < cookiesInPage.length;i++) {
                var currentCookie=cookiesInPage[i];
                           console.log(currentCookie);
              while (currentCookie.charAt(0)==' ')currentCookie = currentCookie.substring(1,currentCookie.length);
               if (currentCookie.indexOf(jpPageId)> -1){
                requiredValue=true;
                 console.log(requiredValue+"test");
              }
              
         
                             
            }
  
    return requiredValue;
}
function showHomeTalk() {
    $(".header-form-widget").hide();
    $("#home_talk").show();
    //home_talk = $('#Top-Flyout .flyout-content .outer-wrapper').detach();
    //$(".talk-to-us").css('max-height', '60vh');
    //$(".talk-to-us__contact-info").css('max-height', '40vh');
}
//function ShowThankYouTalk() {
//    $('.talk-to-us-form-content').hide();
//    $('#thank-you').html($('#thank_you_placeholder').html());
//    $(".thank-you-content").show();
//}
function addWCOInput(form,type,name,value)
{
    var input = document.createElement("input"); 
    input.type = type;
    input.name = name;
    input.value = value;
    form.appendChild(input);
}
function wcoCallback(wcoID,response){
  if(window.location.href.indexOf("gto-buyside-landing-page")>-1 || window.location.href.indexOf("what-are-the-applications-for-artificial-intelligence-in-securities-finance-and-collateral-management")>-1){
  if(level==1){
  }else{
    $(".article-utility-bar__buttons__download").hide();
  }
  }
    if (wcoID=="41b35ac4-1a1c-48e8-907b-bc09d5bc03ff") {
        //alert("response = " + response);
        //unlock gated content if targeting group it OK
      			   var cookiePresent=false;
              var cnameLevel1=$('meta[name="page_id"]').attr("content")+"|firstLevel|yes";
     var cnameLevel2=$('meta[name="page_id"]').attr("content")+"|secondLevel|yes";
     var firstLevelCheckboxCookie=checkLevelCheckboxChecked(cnameLevel1);
     var secondLevelCheckboxCookie=checkSecondLevelCheckboxChecked(cnameLevel2); 
      console.log(firstLevelCheckboxCookie+"level1");	
console.log(secondLevelCheckboxCookie+"level2");
     cookiePresent=isCookiePresent();
   console.log(response+"and"+cookiePresent);
     if (cookiePresent || buttonClicked ) {
       
           level=1;
          
            if($('#isGatedForm').length >0){
               
                  if(level==1 && document.getElementById("isGatedForm").value == "yes"){
                               $(".hideInLevel1").hide();    
                               $(".article__author").hide();
                    $(".article-utility-bar__buttons__download").show();
                  }
                                
            }
          
        
          if(firstLevelCheckboxCookie || window.location.href.indexOf("japan-settlement-revolution")>0 || window.location.href.indexOf("japan-derivatives-transformation")>0 || window.location.href.indexOf("japan-nextgentech")>0){
            console.log(firstLevelCheckboxCookie+"level1");
            $(".gated-content-form__title").hide();
            $(".gated_knownuser").hide();
            $(".gated-content-form__info").hide();
            $(".gated-content-form__form_LP").hide();
                  $(".gated_knownuser").hide();
              $(".contact-broadridge__thanks_LP_CD").show();
           
          if(window.location.href.indexOf("japan-settlement-revolution")==-1 && window.location.href.indexOf("japan-derivatives-transformation")==-1 && window.location.href.indexOf("japan-nextgentech") ==-1){
             $('html, body').animate({
                scrollTop: $("#art-util").offset().top -70
            }, 2000);
          }
             if(window.location.href.indexOf("japan-settlement-revolution")>0 || window.location.href.indexOf("japan-derivatives-transformation")>0 || window.location.href.indexOf("japan-nextgentech")>0){
                $(".cta-settlement").show();
                                 
                $('html, body').animate({
                scrollTop: $("#gated-content-form").offset().top -70
            }, 2000);
                
              }
             
                // document.getElementsByClassName('gated-content-form__lock')[0].scrollIntoView();
              
          }
          if(secondLevelCheckboxCookie){
            console.log(secondLevelCheckboxCookie+"level2");
            $(".gated-content-form__form_LP").hide();
             $(".gated_knownuser").hide();
            $(".gated-content-form__info").hide();
            $(".gated_knownuser").hide();
            $(".contact-broadridge__thanks_LP_LG").show();
             
            $('html, body').animate({
                scrollTop: $("#art-util").offset().top -70
            }, 2000);
             
            
            //document.getElementsByClassName('gated_download_content')[0].scrollIntoView();
          }
        if($('#isresourceLPForm').length >0){
          $(".gated-content-form__form_LP").hide();
             $(".gated_knownuser").hide();
            $(".gated-content-form__info").hide();
            $(".gated_knownuser").hide();
            $(".contact-broadridge__thanks_LP_LG").show();
          
        }
            $('.ppc_unknown').hide();
            $('.gated-content-form__lock__icon').hide();
            $('.gated_download_content').show();
            $('.gated_unknownuser').hide();
            $('.gated_knownuser').show();
            $(".gated-content-form__form .form__supplemental-fields").removeClass("hidden");
          
            $('.gated-content-form__form #contactMe').prop('checked', true).val('Lead Generation');
              $(".gated-content-form__form .form__field__input--checkbox").hide();
            if(unlockGatedFormSubmitted ){
              
              
            }
        }
      else{
       $('.ppc_known').hide();
        
        if($('#isGatedForm').length >0){
                     
  $(".article-utility-bar__buttons__download").hide();
            
  
}
        
      }
    }
    else{
      //alert("Test");
     // $('.ppc_known').hide();
        //add html received from WCO JSONP request
        $('#'+wcoID).html(response);
    }
    
}
function checkLevelCheckboxChecked(extactString){
  var checkboxChecked=false;
  var getThecehckboxDateValue=new Array();
      var currentTime= new Date();
	  var cookieTime="";
      getThecehckboxValue=checkBoxCookieArray.split(",");
      for(var i=0;i<getThecehckboxValue.length;i++){
       
        if(getThecehckboxValue[i].indexOf(extactString)!=-1){
		getThecehckboxDateValue=getThecehckboxValue[i].split("|");
		for(var j=0;j<getThecehckboxDateValue.length;j++){
		if(getThecehckboxDateValue.length>2 && j==3){
      cookieTime=new Date(getThecehckboxDateValue[j]);
      console.log(cookieTime+"1");
		cookieTime= new Date(cookieTime.getTime()+30*24*60*60*1000);
    }
      
		
    }
          console.log(cookieTime);
      if(cookieTime>currentTime) 
		{
		console.log("less than 30 days level 1");
          checkboxChecked=true;
		  
		  }
        }
                
      }
    return checkboxChecked;
}
function checkSecondLevelCheckboxChecked(extactString){
  var checkboxChecked=false;
  
      var getThecehckboxValue=new Array();
	  var getThecehckboxDateValue=new Array();
	  var currentTime= new Date();
  //currentTime= new Date(currentTime.getTime()+29*24*60*60*1000);
  console.log(currentTime+"2");
	  var cookieTime="";
      getThecehckboxValue=checkBoxCookieArray.split(",");
      for(var i=0;i<getThecehckboxValue.length;i++){
       
        if(getThecehckboxValue[i].indexOf(extactString)!=-1){
		getThecehckboxDateValue=getThecehckboxValue[i].split("|");
		for(var j=0;j<getThecehckboxDateValue.length;j++){
		if(getThecehckboxDateValue.length>2 && j==3){
      cookieTime=new Date(getThecehckboxDateValue[j]);
      console.log(cookieTime+"1");
		cookieTime= new Date(cookieTime.getTime()+30*24*60*60*1000);
    }
      
		
    }
          console.log(cookieTime);
      if(cookieTime>currentTime) 
		{
		console.log("less than 30 days level2");
          checkboxChecked=true;
		  
		  }
        }
                
      }
    return checkboxChecked;
}
function getDateInfo(){
    var currentDate="";
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
  
 currentDate = dd+""+mm+""+yyyy;
  return currentDate;
  
}
function isCookiePresent(){
  
 var cookiePresent=false;
  var checkval= $('meta[name="page_id"]').attr("content");
  
      var getTheCookies=new Array();
      getTheCookies=checkBoxCookieArray.split(",");
      for(var i=0;i<getTheCookies.length;i++){
       
        if(getTheCookies[i].indexOf(checkval)!=-1){
          cookiePresent=true;
        }
                
      }
    return cookiePresent;
  
}
function unlockGatedContent(){
    $.ajax({
        url: '//snippet.omm.crownpeak.com/s/41b35ac4-1a1c-48e8-907b-bc09d5bc03ff/2',
        dataType: 'jsonp',
        jsonp: 'wcoCallback'
    });
}
function createCookieWithExpDate(cookieName,cookieValue, expDate){
  
   var date, expires;
   date = new Date();
   date.setTime(date.getTime()+(expDate*24*60*60*1000));
   expires = "; expires="+date.toGMTString();
   document.cookie = cookieName+"=" +cookieValue+";"+expires;
}
function sendWCOForm($form,action,formID)
{
    $("#temp-form .demandbase_field").remove();//remove DB fields as WCO already has them
    var wcoFrameName = "wcoFrameTemp";
    var wcoFrame = document.createElement("iframe");
    document.body.appendChild(wcoFrame);
    wcoFrame.style.display = "none";
    wcoFrame.contentWindow.name = wcoFrameName;
    //Add the WCO form
    var wcoForm = document.createElement("form");
    wcoForm.style.display = "none";
    wcoForm.target = wcoFrameName;
    wcoForm.action = action;
    wcoForm.method = "POST";
    //Add the Poll Fields
    addWCOInput(wcoForm, "hidden", "RedirectUrl", '');
    addWCOInput(wcoForm, "text", "WcoFormId", formID);
    //Add form fields
    $form.find("input, textarea, select").each(function(){
        addWCOInput(wcoForm, "text", $(this).attr("name"), $(this).val());
    })
    document.body.appendChild(wcoForm);
    wcoForm.submit();
 
}
function ClearFormFields() {
    $('form').each(function( index ) {
        var $form = $(this);
        if ($form.data('inquiry-type')!='') {
            //show Lead Generation progressive fields
            if ($form.data('inquiry-type')=='Lead Generation') {
                $leadgenform.find('#contact-broadridge-general__full-name').show();
                $leadgenform.find('#contact-broadridge-general__user-name-fields').show();
                $leadgenform.find("input[name='email_work']").parent().show();
                $leadgenform.find("input[name='company']").parent().show();
            }
            $form.find('input, select, textarea').each(function () {
                if ($(this).attr('type') != 'hidden') {
                    $(this).val("");
                    $(this).nextAll('.icon--success').remove();
                }
            })
            $form.find(".contact-broadridge-full-name").html("Full Name");
        }
    });
}
function addKnownClearEvent() {
    $(".form_description_known a").click(function(e){
        ClearFormFields(); 
        return false;
    });	
}
//find formID based on the folder/page settings
function getCurrentFormID($currentForm){
    currentFormID= "";
    
    try {
        var formIdConfig = {'21786':{'/broadridge/broadridge.com/us/en/financial services/asset management':'601',
'/broadridge/broadridge.com/us/en/financial services/capital markets':'701',
'/broadridge/broadridge.com/us/en/financial services/wealth management':'801',
'/broadridge/broadridge.com/us/en/financial services/corporate issuer':'901',
'/broadridge/broadridge.com/us/en/customer communications/consumer finance':'1001',
'/broadridge/broadridge.com/us/en/customer communications/healthcare':'1101',
'/broadridge/broadridge.com/us/en/customer communications/insurance':'1201',
'/broadridge/broadridge.com/us/en/customer communications/retail banking':'1301',
'/broadridge/broadridge.com/us/en/customer communications/telecom':'1401',
'/broadridge/broadridge.com/us/en/customer communications/utilities':'1501',
'/broadridge/broadridge.com/us/en/insights':'1601',
'/broadridge/broadridge.com/us/en/about':'1701'
},
'21787':{'/broadridge/broadridge.com/us/en/financial services/asset management':'603',
'/broadridge/broadridge.com/us/en/financial services/capital markets':'703',
'/broadridge/broadridge.com/us/en/financial services/wealth management':'803',
'/broadridge/broadridge.com/us/en/financial services/corporate issuer':'903',
'/broadridge/broadridge.com/us/en/customer communications/consumer finance':'1003',
'/broadridge/broadridge.com/us/en/customer communications/healthcare':'1103',
'/broadridge/broadridge.com/us/en/customer communications/insurance':'1203',
'/broadridge/broadridge.com/us/en/customer communications/retail banking':'1303',
'/broadridge/broadridge.com/us/en/customer communications/telecom':'1403',
'/broadridge/broadridge.com/us/en/customer communications/utilities':'1503',
'/broadridge/broadridge.com/us/en/insights':'1603',
'/broadridge/broadridge.com/us/en/about':'1703'
},
'21694':{'':''
},
'21788':{'/broadridge/broadridge.com/us/en/financial services/asset management':'602',
'/broadridge/broadridge.com/us/en/financial services/capital markets':'702',
'/broadridge/broadridge.com/us/en/financial services/wealth management':'802',
'/broadridge/broadridge.com/us/en/financial services/corporate issuer':'902',
'/broadridge/broadridge.com/us/en/customer communications/consumer finance':'1002',
'/broadridge/broadridge.com/us/en/customer communications/healthcare':'1102',
'/broadridge/broadridge.com/us/en/customer communications/insurance':'1202',
'/broadridge/broadridge.com/us/en/customer communications/retail banking':'1302',
'/broadridge/broadridge.com/us/en/customer communications/telecom':'1402',
'/broadridge/broadridge.com/us/en/customer communications/utilities':'1502',
'/broadridge/broadridge.com/us/en/insights':'1602',
'/broadridge/broadridge.com/us/en/about':'1702'
},
'21689':{'/broadridge/broadridge.com/us/en/financial services/asset management':'600',
'/broadridge/broadridge.com/us/en/financial services/capital markets':'700',
'/broadridge/broadridge.com/ca/en/insights':'1608',
'/broadridge/broadridge.com/us/en/financial services/wealth management':'800',
'/broadridge/broadridge.com/us/en/financial services/corporate issuer':'900',
'/broadridge/broadridge.com/us/en/customer communications/consumer finance':'1000',
'/broadridge/broadridge.com/us/en/customer communications/healthcare':'1100',
'/broadridge/broadridge.com/us/en/customer communications/insurance':'1200',
'/broadridge/broadridge.com/us/en/customer communications/retail banking':'1300',
'/broadridge/broadridge.com/us/en/customer communications/telecom':'1400',
'/broadridge/broadridge.com/us/en/customer communications/utilities':'1500',
'/broadridge/broadridge.com/us/en/insights':'1600',
'/broadridge/broadridge.com/us/en/about':'1700',
'/broadridge/broadridge.com/intl/en/insights':'1604',
'/broadridge/broadridge.com/jp/ja/insights':'1612'
}
};
   
    //folder level settings
    pageCMSFolder = $("meta[name=page_cms_folder]").attr('content');
    $parentformIdElement = $currentForm.parents('[data-formidconfig]');
    if ($parentformIdElement.length>0) {
        $formIdConfig = $parentformIdElement.attr('data-formidconfig');
        
        //page level formid
        $pageMetaFormID = $("meta[name=page_formid_"+ $formIdConfig +"]");
        if ($pageMetaFormID.length>0) {
            currentFormID=  $pageMetaFormID .attr('content');
        }
        
        if (currentFormID=="") {
            //folder level settings
            formIdConfigSettingsObj = formIdConfig[$formIdConfig];
            if (formIdConfigSettingsObj != undefined) {
        
                for (folderSettings in formIdConfigSettingsObj) {
                    if (pageCMSFolder.indexOf(folderSettings) == 0) {
                        currentFormID = formIdConfigSettingsObj[folderSettings];
                    }
                }
            }
        }
    }
} catch (e) {
    
}
    
return currentFormID;
}
//override gated content form labels from the page settings
if($('.gated-content-form').length>0){
    overrideFormHeaderUnknownContent = $('.gated_defaultform_override_content.gated_unknown_header_override').html();
    overrideFormSubHeaderUnknownContent = $('.gated_defaultform_override_content.gated_unknown_subheader_override').html();
    overrideFormThumbnailUnknownContent = $('.gated_defaultform_override_content.gated_unknown_thumnail_override').html();
    overrideFormHeaderKnownContent = $('.gated_defaultform_override_content.gated_known_header_override').html();
    overrideFormSubHeaderKnownContent = $('.gated_defaultform_override_content.gated_known_subheader_override').html();
    overrideFormThumbnailKnownContent = $('.gated_defaultform_override_content.gated_known_thumbnail_override').html();
    if(overrideFormHeaderUnknownContent!=""){$('.gated-content-form .gated-content-form__title .gated_unknownuser').html(overrideFormHeaderUnknownContent );};
    if(overrideFormSubHeaderUnknownContent!=""){$('.gated-content-form .gated-content-form__info .gated_unknownuser').html(overrideFormSubHeaderUnknownContent );};
    if(overrideFormThumbnailUnknownContent!=""){$('.gated-content-form .gated-content-form__image .gated_unknownuser img').attr('src', overrideFormThumbnailUnknownContent );};
    if(overrideFormHeaderKnownContent!=""){$('.gated-content-form .gated-content-form__title .gated_knownuser').html(overrideFormHeaderKnownContent );};
    if(overrideFormSubHeaderKnownContent!=""){$('.gated-content-form .gated-content-form__info .gated_knownuser').html(overrideFormSubHeaderKnownContent );};
    if(overrideFormThumbnailKnownContent!=""){$('.gated-content-form .gated-content-form__image .gated_knownuser img').attr('src', overrideFormThumbnailKnownContent );};
    $('.gated-content-form').show();
}
$(document).ready(function() {
  
 
  
    $(window).scroll(function(){
        if($(window).scrollTop())
        {
            // var pos=  $(window).scrollTop();
            //$(".header").offset({ top: pos });
         
            //$(".hero__content").css("display", "none"); 
            // $(".hero__content").css("color", "black !important"); 
        }
   
        else
        {
     
            $('.hero__content').fadeTo('fast', 1.0);
            //$(".header").offset({ top: 0 });
        }
                  
    });
    unlockGatedContent();
    addKnownClearEvent();
    //update segment fields from meta data
    var segmentMetaArray = [];
    $('meta[name="custom_s_tag_industry"]').each(function() {                    
        segmentMetaArray.push($(this).attr("content"));
    });
    var segmentMetaValue = segmentMetaArray.join();
    $('input[name="segment"]').each(function() {                    
        $(this).val(segmentMetaValue);
    });
    //if the inquiry checkbox is present toggle the checkbox value on the change event, this bypasses the data-inquiry-type on the form element
    $("input[name='inquiry-checkbox']").on('change', function(){
        if (!$(this).is(":checked")) {
            $(this).val('Lead Generation');
        } else {
            $(this).val('Content Download');
        }
    })	
    
    //Contact Us CTA click opens the flyout
    $('.hero__content .cta-open-flyout').click(function(){
        $('.header__nav a[data-flyout-content="#talk-to-us"]').click()
    })
    //Override Contact Us info on 
    if($('#override_contact_content').length > 0 && $('#override_contact_content').html()!=""){
        $("[data-inquiry-type='Speak with a Sales Rep']").parents('.header-form-widget').find('.talk-to-us__contact-info__block.top_contact_info').html($('#override_contact_content').html());
    }
    //Override Phone info 
    if($('#override_contact_phone').length > 0 && $('#override_contact_phone').html()!=""){
        phoneNumberOverride = $('#override_contact_phone').html();
        phoneIndexToChange = 0; // TBD for non US sites - it shold return index of the current region (0 US, 1 EMEA, 2 APAC)
        $phoneElement = $("[data-inquiry-type='Speak with a Sales Rep']").parents('.header-form-widget').find('.talk-to-us__contact-link--phone').eq(phoneIndexToChange);
        $phoneElement.html(phoneNumberOverride);
        $phoneElement.attr('href', "tel:" + phoneNumberOverride.replace(/ /g, "") )
    }
});	
//All Products flyout Nav - search and expandable sections, called from app.js on flyout section open
function bindAllProductsEvents(){
    $(".allproducts_expandablelist .nav_allproducts_expandable").off('click');
    $(".allproducts_expandablelist .nav_allproducts_expandable").click(function(e){
        $content = $(this).parent().find(".allproducts_expanable__content");
        $contentParent = $(this).closest("li");
       // $(this).find(".hide").toggleClass("show");
        if($(this).hasClass("location-open")){
            $(this).find(".show").hide();
            $(this).find(".hide").show();
           $(this).find(".hide").css('cssText','display:inline !important');
          $(this).find(".show").css('cssText','display:none !important');
        }
        else
        {
            $(this).find(".show").show();
            $(this).find(".show").css('cssText','display:inline !important');
          $(this).find(".hide").css('cssText','display:none !important');
            $(this).find(".hide").hide();
        }
        $(this).toggleClass("location-open"); 
        $content.slideToggle(400); 
    });
    //search field logic
    $('input.nav__products_search').change( function () {
        var filter = $(this).val();
        var productsContainer = $(this).parents('.nav-content__content').find('.nav-content__segment__solutions');
        if (productsContainer == undefined || productsContainer.length == 0) {
            //mobile container
            productsContainer = $(this).parents('.solutions-panel__solutions__wrapper').find('.solutions-panel__solutions__solutions-list');
        }
        if(filter) {
            // this finds all links in a list that contain the input,
            // and hide the ones not containing the input while showing the ones that do
            filter = filter.toUpperCase();
            productsContainer.find('li').each(function(){
                $li = $(this);
                $expSection = $li.find('.allproducts_expandablelist');
                isExpandableSection = $expSection.length>0? true: false;
                if (!isExpandableSection) {
                    //regular link
                    $a = $li.find('a');
                    aContent = $a.data('search-keyword').toUpperCase();
                    if (aContent.indexOf(filter) > -1) {
                        $li.slideDown();
                    }
                    else{
                        $li.slideUp();
                    }
                }
                else{
                    //expandable section
                    hideExpSection = true;
                    $expSection.find('a').each(function(){
                        $a = $(this);
                        aContent = $a.data('search-keyword').toUpperCase();
                        if (aContent.indexOf(filter) > -1) {
                            $a.parent().slideDown();
                            hideExpSection = false;
                        }
                        else{
                            $a.parent().slideUp();
                        }
                    });
                    if (hideExpSection) {
                        $li.slideUp();
                        //$expTitle = $li.find('.nav_allproducts_expandable');
                        //if ($expTitle.hasClass("location-open")) {
                        //    $expTitle.click();
                        //}
                    }
                    else{
                        $li.slideDown();
                        //$expTitle = $li.find('.nav_allproducts_expandable');
                        //if (!$expTitle.hasClass("location-open")) {
                        //    $expTitle.click();
                        //}
                        
                    }
                }
            })
        } else {
            productsContainer.find('li').each(function(){
                $li = $(this);
                $li.slideDown();
                $expTitle = $li.find('.nav_allproducts_expandable');
                if ($expTitle.length>0) {
                    if ($expTitle.hasClass("location-open")) {
                        $expTitle.click();
                    }
                }
            });
        }
        return false;
    })
    .keyup( function () {
        $(this).change();
    });
}
//------------------------------------------------------------
// Forms validation rules
//------------------------------------------------------------
$(document).ready(function() {
            $(".form-container .talk-to-us__contact-info__block:not(.top_contact_info)").hide();
           
   
        //validation defaults
        successIconHTML = '<div class="icon icon--success"><!--?xml version="1.0" encoding="UTF-8" standalone="no" ?-->                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8" width="10px" height="8px" version="1.1">                       <title>icon_tinyCheck</title>                       <defs></defs>                       <g id="Page-Templates" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">                       <g id="BR_Home_Form03_Error" fill="#a8b400" transform="translate(-503 -348)">                       <g id="Request-info">                       <g id="Name" transform="translate(121 341)">                       <polygon id="icon_tinyCheck" points="391.4,9 390,7.6 386,11.6 384,9.6 382.6,11 386,14.4"></polygon>                       </g>                       </g>                       </g>                       </g>                       </svg>                       </div>';
  
    failspan = '<span class="new_custom"></span>';
 
    $.validator.setDefaults({
        showErrors: function(errorMap, errorList) { 
            this.defaultShowErrors();
            errorList.forEach(function(item, index){
                $(item.element).parent().removeClass('form__field--success').addClass('form__field--error');
                $(item.element).nextAll('.icon--success').remove();
                $(item.element).parent().find('span.new_custom').remove();
                $(item.element).parent().find('span.error').prepend(failspan);
            })
            
           
        },
        success: function(label, element) {
            $(element).parent().removeClass('form__field--error').addClass('form__field--success');
            $(element).nextAll('.icon--success').remove();
            $(element).after(successIconHTML);
            $(element).parent().find('span.new_custom').remove();
            
        },        
        errorElement: "span",
        highlight: function(element, errorClass) {
          
          
            //do not add error class to the input field
            return false;
        }
    });
var checkurl = window.location.href;
    //Lead Generation
    $("[data-inquiry-type='Lead Generation']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            email_work: {
                required: true,
                email: true
            },
            job_title: "required",
            country: "required",
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            job_title: "Please specify your job title",
            country: "Please specify your country",
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
 $("[data-inquiry-type='Schedule Meeting']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
  
 $("[data-inquiry-type='Client Support']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            product_name: "required",
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            product_name: "Please specify product name",
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
    //Talk to Sales
   /* $("[data-inquiry-type='Speak with a Sales Rep']").validate({
        rules: {
            name_first: {required : true ,
                minlength :2
            },
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    }); **/
  
  if(checkurl.indexOf('/jp/') > 0) {
     $("[data-inquiry-type='Speak with a Sales Rep']").validate({
          rules: {
              name_first: {required : true ,
                  minlength :2
              },
              name_last: "required",
              phone_business: "required",
              job_title: "required",
              country: "required",
              email_work: {
                  required: true,
                  email: true
              },
              comment: "required",
              company: "required"
          },
         messages: {
              name_first: "名前を入力してください",
              name_last: "姓を入力してください",
              phone_business: "電話番号を入力してください",
              job_title: " 職種を入力してください",
              country: "国を入力してください",
              email_work: {
                  required: "メールアドレスを入力してください",
                  email: "メールアドレスが正しくありません"
              },
              comment: "コメントをご記入ください。（25文字以上）",
              company: "会社名を入力してください"
          }
      });
   }
  else {
      $("[data-inquiry-type='Speak with a Sales Rep']").validate({
          rules: {
              name_first: {required : true ,
                  minlength :2
              },
              name_last: "required",
              phone_business: "required",
              job_title: "required",
              country: "required",
              email_work: {
                  required: true,
                  email: true
              },
              comment: "required",
              company: "required"
          },
          messages: {
              name_first: "Please specify your first name",
              name_last: "Please specify your last name",
              phone_business: "Please specify your phone",
              job_title: "Please specify your job title",
              country: "Please specify your country",
              email_work: {
                  required: "Please specify your email",
                  email: "Your email address is not correct"
              },
              comment: "Please add your comment (25 character minimum)",
              company: "Please specify your company"
          }
      });
  }
  
  if(checkurl.indexOf('/de/') > 0)
{
  //Contact Support
    $("[data-inquiry-type='Client Support']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            product_name: "required",
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Erforderlich",
            name_last: "Erforderlich",
            phone_business: "Erforderlich",
            job_title: "Erforderlich",
            country: "Erforderlich",
            email_work: {
                required: "Erforderlich",
                email: "Erforderlich"
            },
            product_name: "Erforderlich",
            comment: "Erforderlich",
            company: "Erforderlich"
        }
    }); 
}
    else
      
    {
      
      //Contact Support
    $("[data-inquiry-type='Client Support']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            product_name: "required",
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            product_name: "Please specify product name",
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
    }
    //Newsletter sign up
    $("[data-inquiry-type='Receive Thought Leadership']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            email_work: {
                required: true,
                email: true
            },
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            company: "Please specify your company"
        }
    });
    //Contact Us
    $("[data-inquiry-type='Contact Us']").validate({
        rules: {
            
            name_first: "required",
            name_last: "required",
            email_work: {
                required: true,
                email: true
            },
            comment: "required",
            company: "required"
        },
        messages: {
         	 
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
    
  //Partner Program
    $("[data-inquiry-type='Partner Program']").validate({
      rules: {
            name_first: "required",
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            product_name: "required",
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            product_name: "Please specify product name",
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
  if(checkurl.indexOf('/ca/') > 0 || checkurl.indexOf('/intl/') > 0)
{
//Schedule a demo
    $("[data-inquiry-type='Schedule a Demo']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
}
  else{
    //Schedule a demo
    $("[data-inquiry-type='Schedule a Demo']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            phone_business: "required",
            job_title: "required",
            country: "required",
            email_work: {
                required: true,
                email: true
            },
            comment: "required",
            company: "required"
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            comment: "Please add your comment (25 character minimum)",
            company: "Please specify your company"
        }
    });
  }
    //Gated Content Download
    $("[data-inquiry-type='Content Download']").validate({
        rules: {
            name_first: "required",
            name_last: "required",
            company: "required",
            email_work: {
                required: true,
                email: true
            },
            phone_business: {
                required: "input[name='inquiry-checkbox']:checked"
            },
            job_title: {
                required: "input[name='inquiry-checkbox']:checked"
            },
            country: {
                required: "input[name='inquiry-checkbox']:checked"
            },
            comment: {
                required: "input[name='inquiry-checkbox']:checked"
            }
        },
        messages: {
            name_first: "Please specify your first name",
            name_last: "Please specify your last name",
            phone_business: "Please specify your phone",
            job_title: "Please specify your job title",
            country: "Please specify your country",
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            },
            company: "Please specify your company",
            comment: "Please add your comment (25 character minimum)"
        }
    });
    //Insights Subscription
    $("[data-inquiry-type='Insights Subscription']").validate({
        rules: {
            email_work: {
                required: true,
                email: true
            }
        },
        messages: {
            email_work: {
                required: "Please specify your email",
                email: "Your email address is not correct"
            }
        }
    });
});
//Demandbase form setup
ActiveDemandBaseForm = '';
function setup_form( formType ) {
    var formSelector = "[data-inquiry-type='" + formType + "']";
    var updateDemandbaseFocus  = function() {
        //only update Demandbase module if Demandbase is not focused on current form
        if ( formType != window.ActiveDemandBaseForm ) {
            window.ActiveDemandBaseForm = formType;
            //creating unique IDs for the email & company fields
            var activeEmailId = "email-" + formType.toLowerCase().replace(/ /g, '-');
            var activeCompanyId = "company-" + formType.toLowerCase().replace(/ /g, '-');
            var activeCountryId = "country-" + formType.toLowerCase().replace(/ /g, '-');
            var emailInput = $(formSelector).find("[name='email_work']")
            var companyInput = $(formSelector).find("[name='company']")
            var countryInput = $(formSelector).find("[name='country']")
            if (emailInput && companyInput) {
                emailInput.attr("id", activeEmailId)
                companyInput.attr("id", activeCompanyId)
            }
            if (countryInput) {
                countryInput.attr("id", activeCountryId)
            }
            // these three lines are exact references to Demandbase forms module API
            window.Demandbase.Config.forms.emailID = activeEmailId; //set the new email id attribute
            window.Demandbase.Config.forms.companyID = activeCompanyId; //set new company id attribute
            // window.Demandbase.utils.loadFormModule(); //reload form module
            if (window.Demandbase.Config.isFormPage) {
                window.Demandbase.Config.isFormPage = null;
            }
            if (window.Demandbase.CompanyAutocomplete) {
                window.Demandbase.CompanyAutocomplete.initialized = false;
            }
            if (window.Demandbase.Connectors.WebForm)
            {   
                Demandbase.Config.forms.fieldMap = {
                    "company_name":activeCompanyId,
                    "country": activeCountryId
                }
                
                window.Demandbase.Connectors.WebForm.connect(window.Demandbase.Config.forms);
            }
            else 
            {
                window.Demandbase.utils.loadFormModule();                 
            }
        }
    }
    $(formSelector + ' input, ' + formSelector + ' select').on('focus', updateDemandbaseFocus );
}
$(function(){
    var allForms = window.document.getElementsByTagName('form');
    for (var i = 0; i < allForms.length; i++){
        var form_type = $(allForms[i]).data('inquiry-type');
        if (form_type!=undefined && form_type!=""){
            // console.log(allForms[i].id);
            setup_form(form_type)
        }
    }
});
/*!
 * JavaScript Cookie v2.0.0-pre
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var _OldCookies = window.Cookies;
        var api = window.Cookies = factory(window.jQuery);
        api.noConflict = function () {
            window.Cookies = _OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }
    function init (converter) {
        function api (key, value, attributes) {
            var result;
            // Write
            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}
                value = encodeURIComponent(String(value));
                value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure  && '; secure'
                ].join(''));
            }
            // Read
            if (!key) {
                result = {};
            }
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = parts[0].replace(rdecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                if (this.json) {
                    try {
                        cookie = JSON.parse(cookie);
                    } catch (e) {}
                }
                if (key === name) {
                    result = cookie;
                    break;
                }
                if (!key) {
                    result[name] = cookie;
                }
            }
            return result;
        }
        api.get = api.set = api;
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};
        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };
        api.withConverter = init;
        return api;
    }
    return init();
}));
/*! * JavaScript Cookie v2.0.0-pre END */
/*! * WebForms Eloqua integration */
//------------------------------------------------------------
// Search G2
//------------------------------------------------------------
var filterArray = new Array();
var q = getQSParameterByName('q');
var cps;
var cpac;
var $searchKey;
var $insights;
var $industries;
var $capabilities;
var $sort;
var nRow;
var selectedIds;
var countryCode = $('meta[name=country]').attr('content');
var fullwidthVertBar  = $('<textarea />').html("｜").text();
$(document).ready(function() {
    if ($('section.insight_hub').length > 0)  {
        //Insight Hub
        q = '';
        cps = new CrownPeakSearch();
        cps.collection(szSearchCollectionName);
        cps.timeout(60000);
        cps.rows(nRow);
        cps.sort('custom_dt_page_date+desc');
      
     
        $insights = $('input[type=checkbox][name=insight]');
        $industries = $('input[type=checkbox][name=industries]');
       $capabilities = $('input[type=checkbox][name=capabilities]');
        $sort = $('input[type=checkbox][name=insight]');
        filterArray.push('custom_s_template:(article OR resource)');
      if ($('section.content_hub').length > 0)  {
      filterArray.push(selectedIds);
      }
       if ($('section.content_hub').length == 0) {
        filterArray.push('!custom_s_tag_article:award');
        filterArray.push('!custom_s_tag_article:event');
        filterArray.push('!custom_s_tag_article:security-capabilities');
        filterArray.push('!custom_s_tag_article:press-release');
        filterArray.push('!custom_s_tag_article:fact-sheet');
        filterArray.push('!custom_s_tag_article:legal');
        filterArray.push('!custom_s_tag_article:about');
       }
        //Filter Industry
        var industryTag = getQSParameterByName('industry');
        szFilter = '';
        if (industryTag != '') {
            filterArray.push('custom_ss_tag_industry:' + industryTag);
        }
if ($('section.insight_hub').attr('data-pagetype') == 'index')
            filterArray.push('-custom_s_exclude_insight:true');
        
        /*
        bAllChecked = true;
        $industries.each(function () {
            if (this.checked) {
                if (szFilter != '')
                    szFilter += ' OR ';
                szFilter += this.value;
            } else {
                bAllChecked = false;
            }
        });
        if (szFilter != '') {
            if (bAllChecked) {
                this.checked = false;
                $industries.closest('.multi-select').first().find('.multi-select__title').first().text('all industries');
            } else {
                filterArray.push('custom_s_tag_industry:(' + szFilter + ')');
            }
        }
        */
        //Regions
        var currentRegion = $('meta[name=current_region]').attr('content');
        //q = '(';
        //if (currentRegion && currentRegion != '') {
        //    //filterArray.push('custom_ss_tag_region:' + currentRegion);
        //    q += 'custom_ss_tag_region:' + currentRegion + ' OR ';
        //}
        //q += 'custom_s_current_region:' + currentRegion + ')';
        filterArray.push('custom_s_current_region:' + currentRegion);
        SearchQuery(q, 1, filterArray);
        
        $('input[type=radio][name=sort]').change(function () {
            if (this.value == 'most recent') {
                cps.sort('custom_dt_page_date+desc');
                SearchQuery(q, 1, filterArray);
            } else if (this.value == 'most popular') {
                cps.sort('');
                SearchQuery(q, 1, filterArray);
            } else if (this.value == 'a-z') {
                cps.sort('custom_s_title+asc');
                SearchQuery(q, 1, filterArray);
            }
        });
        $insights.change(function () {
            SearchQuery(q, 1, GetInsightFilter());
        });
        $industries.change(function () {
            SearchQuery(q, 1, GetInsightFilter());
        });
      $capabilities.change(function () {
            ResetSearchFilter();
            SearchQuery(q, 1, GetInsightFilter());
        });
    } else if ($('section.press_hub').length > 0) {
        //Press Hub
        q = '*';
        cps = new CrownPeakSearch();
        cps.collection(szSearchCollectionName);
        cps.timeout(60000);
        cps.rows(nRow);
        cps.sort('custom_dt_page_date+desc');
        $industries = $('input[type=checkbox][name=industries]');
        $sort = $('input[type=checkbox][name=insight]');
        filterArray.push('custom_s_template:article');
        filterArray.push('custom_s_tag_article:press-release');
        if ($('section.press_hub').attr('data-pagetype') == 'index')
            filterArray.push('-custom_s_exclude_insight:true');
        var currentRegion = $('meta[name=current_region]').attr('content');
        //q = '(';
        //if (currentRegion && currentRegion != '') {
        //    //filterArray.push('custom_ss_tag_region:' + currentRegion);
        //    q += 'custom_ss_tag_region:' + currentRegion + ' OR ';
        //}
        //q += 'custom_s_current_region:' + currentRegion + ')';
        filterArray.push('custom_s_current_region:' + currentRegion);
        SearchQuery(q, 1, filterArray);
        $('input[type=radio][name=sort]').change(function () {
            if (this.value == 'most recent') {
                cps.sort('custom_dt_page_date+desc');
                SearchQuery(q, 1, filterArray);
            } else if (this.value == 'most popular') {
                cps.sort('');
                SearchQuery(q, 1, filterArray);
            } else if (this.value == 'a-z') {
                cps.sort('custom_s_title+asc');
                SearchQuery(q, 1, filterArray);
            }
        });
        $('input[type=radio][name=year]').change(function () {
            SearchQuery(q, 1, GetPressFilter());
        });
        $industries.change(function () {
            SearchQuery(q, 1, GetPressFilter());
        });
    } else if ($('section.search_page').length > 0) {
        //Search Page
        $searchKey = $('#nav__search-box-page');
        $insights = $('input[type=checkbox][name=insight]');
        $industries = $('input[type=checkbox][name=industries]');
        $sort = $('input[type=radio][name=sort]');
        //filterArray.push('-type:application/pdf');
        filterArray.push('-custom_s_noindex:true');
        countryCode = $('meta[name=country]').attr('content');
        //if (countryCode && countryCode != '') {
        //    filterArray.push('custom_s_country:' + countryCode);
        //}
        //var currentRegion = $('meta[name=current_region]').attr('content');
        //filterArray.push('custom_s_current_region:' + currentRegion);
        cps = new CrownPeakSearch();
        cpac = new CrownPeakAutocomplete();
        cpac.collection(szSearchCollectionName);
        cps.collection(szSearchCollectionName);
        cps.timeout(60000);
        cps.rows(nRow);
        cps.highlight(true);
        if (q) {
            $searchKey.val(q);
            SearchQuery(q, 1, filterArray);
        } else {
            SearchQuery('*', 1, filterArray);
            q = '*';
        }
        $sort.change(function () {
            if (this.value == 'most recent') {
                cps.sort('date+desc');
                SearchQuery(q, 1, filterArray);
            } else if (this.value == 'most popular') {
                cps.sort('');
                SearchQuery(q, 1, filterArray);
            } else if (this.value == 'a-z') {
                cps.sort('title+asc');
                SearchQuery(q, 1, filterArray);
            }
        });
        $insights.change(function () {
            ResetSearchFilter();
            SearchQuery(q, 1, GetAllFilter());
        });
        $industries.change(function () {
            ResetSearchFilter();
            SearchQuery(q, 1, GetAllFilter());
        });
        //Autocomplete
        var currentPage = 1;
        var searchInput = document.getElementById("nav__search-box-page");
        var currentFilterQueries = [];
        cpac.init(document.getElementById("nav__search-box-page"), {
            callback: function (t) {
                SearchQuery(t, 1, filterArray);
                //searchInput.value = t;
                if (countryCode && countryCode != 'us')
                    window.location.href = '/' + countryCode + '/search?q=' + t;
                else
                    window.location.href = '/search?q=' + t;
            }
        });
        $searchKey.keypress(function (e) {
            var key = e.which;
            if (key == 13 && $searchKey.val().trim() != '') {
                window.location.href = window.location.pathname + '?q=' + $searchKey.val();
            }
        });
    }
    //Global Autocomplete
    var cpac_global = new CrownPeakAutocomplete();
    var globalSearchInput = document.getElementById("nav__search-box");
    cpac_global.collection('broadridge_us_en_livewww');
    cpac_global.init(document.getElementById("nav__search-box"), {
        callback: function (t) {
            cps = new CrownPeakSearch();
            SearchQuery(t, 1, filterArray);
            //globalSearchInput.value = t;
            if (countryCode && countryCode != 'us')
                window.location.href = '/' + countryCode + '/search?q=' + t;
            else
                window.location.href = '/search?q=' + t;
        }
    });
});
//--------------------------------------------
// Filters Start
//--------------------------------------------
function GetInsightFilter() {
    filterArray = [
        'custom_s_template:(article OR resource)'
    ]
    var currentRegion = $('meta[name=current_region]').attr('content');
    filterArray.push('custom_s_current_region:' + currentRegion);
 if ($('section.content_hub').length == 0) {
    filterArray.push('!custom_s_tag_article:award');
    filterArray.push('!custom_s_tag_article:event');
    filterArray.push('!custom_s_tag_article:security-capabilities');
    filterArray.push('!custom_s_tag_article:press-release');
    filterArray.push('!custom_s_tag_article:fact-sheet');
    filterArray.push('!custom_s_tag_article:legal');
    filterArray.push('!custom_s_tag_article:about');
 }
if ($('section.content_hub').length > 0)  {
        filterArray.push(selectedIds);
        
      }
  if ($('section.insight_hub').attr('data-pagetype') == 'index')
            filterArray.push('-custom_s_exclude_insight:true');
    //Filter Insights
    var szFilter = '';
    var bAllChecked = true;
    $insights.each(function () {
        if (this.checked) {
            if (szFilter != '')
                szFilter += ' OR ';
            szFilter += this.value;
        } else {
            bAllChecked = false;
        }
    });
    if (szFilter != '') {
        if (bAllChecked) {
            $insights.each(function () {
                this.checked = false;
            });
            $insights.closest('.multi-select').first().find('.multi-select__title').first().text('all insights');
        } else {
            filterArray.push('custom_s_tag_article:(' + szFilter + ')');
        }
    }
    //Filter Industries
    szFilter = '';
    bAllChecked = true;
    $industries.each(function () {
        if (this.checked) {
            if (szFilter != '')
                szFilter += ' OR ';
            szFilter += this.value;
        } else {
            bAllChecked = false;
        }
    });
    if (szFilter != '') {
        if (bAllChecked) {
            this.checked = false;
            $industries.closest('.multi-select').first().find('.multi-select__title').first().text('all industries');
        } else {
            filterArray.push('custom_ss_tag_industry:(' + szFilter + ')');
        }
    }
  //Filter Capabilities
    szFilter = '';
    bAllChecked = true;
    $capabilities.each(function () {
        if (this.checked) {
          
            if (szFilter != '')
                szFilter += ' OR ';
            szFilter += this.value;
          
        } else {
          
            bAllChecked = false;
        }
      
      if(szFilter =="communications OR data-analytics OR technology-operations")
            
          {
           bAllChecked = true; 
          }
    });
    if (szFilter != '') {
        if (bAllChecked) {
          $capabilities.each(function () {
            this.checked = false;
          });
            $capabilities.closest('.multi-select').first().find('.multi-select__title').first().text('all solutions');
        } else {
            filterArray.push('custom_ss_tag_capability:(' + szFilter + ')');
          
        }
    }
    return filterArray;
}
function GetPressFilter() {
    filterArray = [
        'custom_s_template:article',
        'custom_s_tag_article:press-release'
    ]
    if ($('section.press_hub').attr('data-pagetype') == 'index')
        filterArray.push('-custom_s_exclude_insight:true');
    var currentRegion = $('meta[name=current_region]').attr('content');
    filterArray.push('custom_s_current_region:' + currentRegion);
    //Filter Insights
    var szFilter = '';
    var bAllChecked = true;
    $industries.each(function () {
        if (this.checked) {
            if (szFilter != '')
                szFilter += ' OR ';
            szFilter += this.value;
        } else {
            bAllChecked = false;
        }
    });
    if (szFilter != '') {
        if (bAllChecked) {
            this.checked = false;
            $industries.closest('.multi-select').first().find('.multi-select__title').first().text('all industries');
        } else {
            filterArray.push('custom_s_tag_industry:(' + szFilter + ')');
        }
    }
    var szYear = $('input[type=radio][name=year]:checked').val();
    if (szYear != 'all years' && szYear != '') {
        filterArray.push('custom_s_year:' + szYear);
    }
    return filterArray;
}
function GetAllFilter() {
    //Filter Insights
    var szFilter = '';
    var szFilterTemplate = '';
    var bAllChecked = true;
    $insights.each(function () {
        if (this.checked) {
            if (this.value == 'Product' || this.value == 'Solutions' || this.value == 'Segment') {
                if (szFilterTemplate != '')
                    szFilterTemplate += ' OR ';
                szFilterTemplate += this.value;
            } else {
                if (szFilter != '')
                    szFilter += ' OR ';
                szFilter += this.value;
            }
        } else {
            bAllChecked = false;
        }
    });
    if (szFilter != '' || szFilterTemplate != '') {
        if (bAllChecked) {
            $insights.each(function () {
                this.checked = false;
            });
            $insights.closest('.multi-select').first().find('.multi-select__title').first().text('all insights');
        } else {
            if (szFilter != '')
                filterArray.push('custom_s_tag_article:(' + szFilter + ')');
            if (szFilterTemplate != '')
                filterArray.push('custom_s_page_type:(' + szFilterTemplate + ')');
        }
    }
    //Filter Industries
    szFilter = '';
    bAllChecked = true;
    $industries.each(function () {
        if (this.checked) {
            if (szFilter != '')
                szFilter += ' OR ';
            szFilter += this.value;
        } else {
            bAllChecked = false;
        }
    });
    if (szFilter != '') {
        if (bAllChecked) {
            this.checked = false;
            $industries.closest('.multi-select').first().find('.multi-select__title').first().text('all industries');
        } else {
            //filterArray.push('custom_ss_tag_industry:(' + szFilter + ')');
           filterArray.push('custom_ss_tag_industry:(' + szFilter + ') OR custom_s_tag_industry:(' + szFilter + ')');
        }
    }
    //var currentRegion = $('meta[name=current_region]').attr('content');
    //filterArray.push('custom_s_current_region:' + currentRegion);
    return filterArray;
}
function ResetSearchFilter() {
    filterArray = new Array();
    filterArray.push('-type:application/pdf');
    filterArray.push('-custom_s_noindex:true');
    var countryCode = $('meta[name=country]').attr('content');
    if (countryCode && countryCode != '')
        filterArray.push('custom_s_country:' + countryCode);
}
//--------------------------------------------
// Filters Ends
//--------------------------------------------
function SearchQuery(str, page, filterArray, appendResult) {
  
  if( pagecnt !=page){
   pagecnt=page;
    pagepassed= true;
  }
  else{
    pagepassed= false;
  }
   if ($('section.insight_hub').length == 0) {
     pagepassed= true;
   }
  if (!appendResult) {
     pagepassed= true;
   }
  if(pagepassed){	
    var httpsQueryRequest = "id:/https:\\/\\/www\\..*/";
    originalQuery = "";
    if (str == undefined || str.trim() == ''){
        str = '*';
    }
    else
    {
        originalQuery = str;
    }
    if ($('section.search_page').length > 0) {
        /*
        str = '(' + str;
        str += ' AND ' + httpsQueryRequest;
        
        if (countryCode && countryCode != '') {
            str += ' AND custom_s_country:' + countryCode;
        }
        str += ')';
        */
        //if (countryCode && countryCode != 'us') {
        //    str += ' OR (' + q + ' AND ' + httpsQueryRequest + ' AND custom_s_country:us AND custom_s_page_type:Article)';
        //}
    }
    //RAW QUERY TEST TO USE BOOST, THE STANDARD does not support boost
    var rawQuery = 'q=' + str + '&';
    rawQuery += 'echoParams=explicit&';
    rawQuery += 'defType=edismax&';
    rawQuery += 'wt=json&';
    rawQuery += 'fl=*,score&';
    nRow = nRow == undefined? 10 : nRow;
    if ($('section.insight_hub').length > 0) {
       if ($('section.content_hub').length > 0)  {
          nRow=100;
       }
      else{
        nRow=18;
      }
    }
    var showAll = getQSParameterByName('showAll');
    if (showAll=="true") {
        nRow=1000;
    }
    cps.rows(nRow);
    startPage = nRow * (page-1);
    rawQuery += 'start=' + startPage + '&';
    rawQuery += 'rows=' + nRow +'&';
    rawQuery += (filterArray && filterArray.length > 0 ? "&fq=" + filterArray.join("&fq=") +"&" : "");
    _sort = cps.sort();
    rawQuery += (_sort && _sort.length > 0 ? "&sort=" + _sort.join(",") +"&": "");
    if ($('section.search_page').length > 0) {
        rawQuery += 'fq=' + httpsQueryRequest + '&';
        if (countryCode && countryCode != '') {
            rawQuery += 'fq=custom_s_country:' + countryCode + '&';
        }
    }
    rawQuery += 'hl=true&';
    rawQuery += 'hl.fl=*&';
    rawQuery += 'hl.snippets=3&';
    rawQuery += 'hl.simple.pre=%3Cb%3E&hl.simple.post=%3C/b%3E&';
    rawQuery += 'f.title.hl.fragsize=50000&f.url.hl.fragsize=50000&';
    //BOOST
    if (originalQuery!="" && originalQuery!="*") {
        originalQuery = originalQuery.replace(/\W+/g, " ").trim();
        originalQueryArray = originalQuery.split(" ");
        var boostTerms = "";
        originalQueryArray.forEach(function(element) {
            if (element!="") {
                boostTerms+="product(20,termfreq(custom_t_boost_keywords,"+ element + ")),";
            }
        });
        if (boostTerms!="") {
            boostTerms = boostTerms + "0";//to properly handle the last comma element
            rawQuery += '&bf=sum('+ boostTerms +')&';
        }
        
    }
    
    //END RAW QUERY USE
    //Crownpeak Search main call
    cps.raw(rawQuery).done(function (data) { // RAW QUERY
        //cps.query(str, page, filterArray).done(function (data) {
        if ($('section.insight_hub').length > 0) {
            //Insight Hub
            if (data.response.numFound > 0) {
               console.log(data.response.docs.length);
                for (var i = 0, len = data.response.docs.length; i < len; i++) {
                    var docs = data.response.docs;
                    //----------------------------------------------
                    //Modify result before displaying on the page
                    //----------------------------------------------
                    var szTopList = '';
                    var szBotList = '';
                    for (var i = 0, len = docs.length; i < len; i++) {
                      
                      
                      if ($('section.content_hub').length > 0)  {
                       
                         szTopList += docs[i].custom_t_content;
                      }
                      else{
                        if (i < 6) {
                            szTopList += docs[i].custom_t_content;
                        } else {
                            szBotList += docs[i].custom_t_content;
                        }
                      }
                    }
                    $('#search_no_result').hide();
                    $('section.contact-broadridge').show();
                    $('#proxy_pulse').show();
                    $('#insight_featured_article').show();
                    $('section.insight-subscribe').show();
                    if (appendResult) {
                        $('#cards_bottom').show().find('.cards__container').append(szTopList + szBotList);
                        showMoreInsight(data.pager);
                    } else {
                        $('#cards_top').show().find('.cards__container').html(szTopList);
                        if (szBotList != '') {
                            $('#cards_bottom').show().find('.cards__container').html(szBotList);
                            showMoreInsight(data.pager);
                        } else {
                            $('#cards_bottom').hide().find('.cards__container').html('');
                        }
                    }
                }
            } else {
                $('#cards_top').hide().find('.cards__container').html('');
                $('#cards_bottom').hide().find('.cards__container').html('');
                $('#proxy_pulse').hide();
                $('#insight_featured_article').hide();
                $('section.insight-subscribe').hide();
                $('section.contact-broadridge').hide();
                $('#search_no_result').show();
            }
        } else if ($('section.press_hub').length > 0) {
            //Press Hub
            if (data.response.numFound > 0) {
                for (var i = 0, len = data.response.docs.length; i < len; i++) {
                    var docs = data.response.docs;
                    //----------------------------------------------
                    //Modify result before displaying on the page
                    //----------------------------------------------
                    var szTopList = '';
                    //var szBotList = '';
                    for (var i = 0, len = docs.length; i < len; i++) {
                        //if (i < 6) {
                        //szTopList += docs[i].custom_t_press_content;
                        //} else {
                        //    szBotList += docs[i].custom_t_content;
                        //}
                        if (docs[i].custom_t_press_content)
                            szTopList += docs[i].custom_t_press_content;
                        else
                            szTopList += docs[i].custom_t_content;
                    }
                    $('#search_no_result').hide();
                    
                    if (appendResult) {
                        $('#cards_top').show().find('.cards__container').append(szTopList);
                        showMorePress(data.pager);
                    } else {
                        $('#cards_top').show().find('.cards__container').html(szTopList);
                        showMorePress(data.pager);
                    }
                }
            } else {
                $('#cards_top').hide().find('.cards__container').html('');
                $('#search_no_result').show();
            }
        } else if ($('section.search_page').length > 0) {
            //Search Page
            for (var i = 0, len = data.response.docs.length; i < len; i++) {
                if (data.response.docs[i].metadata_description) {
                    data.response.docs[i].content_short = data.response.docs[i].metadata_description;
                    if (data.response.docs[i].custom_s_tag_article && data.response.docs[i].custom_s_tag_article == "press-release") {
                        data.response.docs[i].content_short += "&hellip;";
                    }
                } else {
                    original_content = data.response.docs[i].content_en_hl || data.response.docs[i].content_en;
                    if (original_content == undefined) {
                        original_content = data.response.docs[i].content_hl || data.response.docs[i].content;
                    }
                    short_content = original_content.length > 300 ? original_content.substr(0, 299) + "..." : original_content;
                    data.response.docs[i].content_short = fixhtml(short_content);
                }
                var url = data.response.docs[i].url;
                data.response.docs[i].url = url.replace('https://www-live.broadridge.com/', '/').replace('https://www-stage.broadridge.com/', '/');
                if (data.response.docs[i].title == undefined || data.response.docs[i].title == '') {
                    data.response.docs[i].title = url;
                }
                if (data.response.docs[i].custom_s_page_title && data.response.docs[i].title) {
                    data.response.docs[i].title = data.response.docs[i].custom_s_page_title;
                }
                var industry_label = '';
                if (data.response.docs[i].custom_ss_tag_industry) {
                    //industry_label = ucwords(data.response.docs[i].custom_s_tag_industry.replace(/-/g, ' '));
                    industry_label = GetSegmentLabel(data.response.docs[i].custom_ss_tag_industry.replace(/-/g, '_'));
                  
                    industry_label= 
                       data.response.docs[i].industry_label = industry_label;
                }
                var subsegment_label = '';
                if (data.response.docs[i].custom_s_tag_subsegment) {
                    //subsegment_label = (data.response.docs[i].custom_s_tag_subsegment).replace(/-/g, ' ');
                    //data.response.docs[i].subsegment_label = subsegment_label;
                    subsegment_label = GetSubSegmentLabel(data.response.docs[i].custom_s_tag_subsegment.replace(/-/g, '_'));
                    data.response.docs[i].subsegment_label = subsegment_label;
                }
              
                var pageType = '';
                if (data.response.docs[i].custom_s_page_type)
                    pageType = data.response.docs[i].custom_s_page_type.toLowerCase();
              
                var segmentLabel = '';
                if (pageType != 'article'
                    && pageType != 'award' 
                    && pageType != 'case study' 
                    && pageType != 'event' 
                    && pageType != 'fact sheet' 
                    && pageType != 'infographic'
                    && pageType != 'press release'
                    && pageType != 'report'
                    && pageType != 'video'
                    && pageType != 'white paper'
                    && pageType != 'about') {
                    segmentLabel = subsegment_label != '' ? subsegment_label : industry_label;
                    if (pageType == 'segment' || (data.response.docs[i].custom_s_hide_segment_label && data.response.docs[i].custom_s_hide_segment_label == 'true'))
                        segmentLabel = '';
                    data.response.docs[i].segment_label = segmentLabel;
                }
                
                if(url.indexOf('/about/') > 0)
                    data.response.docs[i].custom_s_page_type= 'About';
                updatedTitle = data.response.docs[i].title.replace(' | Broadridge', '');
                if (typeof szBroadridgeSuffix !== 'undefined' && szBroadridgeSuffix!="") {
                    updatedTitle = updatedTitle.replace(" | " + szBroadridgeSuffix, '').replace("| " + szBroadridgeSuffix, '').replace("|" + szBroadridgeSuffix, '');
                    updatedTitle = updatedTitle.replace(" "+ fullwidthVertBar + " " + szBroadridgeSuffix, '').replace(fullwidthVertBar + " " + szBroadridgeSuffix, '').replace(fullwidthVertBar + szBroadridgeSuffix, '');
                }
                data.response.docs[i].title = updatedTitle
                //if (segmentLabel != '') {
                //    data.response.docs[i].title = data.response.docs[i].title + ' for ' + segmentLabel;
                //}
                //Update URL
                if (data.response.docs[i].custom_s_pdf_redirect && data.response.docs[i].custom_s_pdf_redirect != '') {
                    data.response.docs[i].url = data.response.docs[i].custom_s_pdf_redirect;
                }
            }
            if (data.response.numFound > 0) {
                $('section.search-results.search_page').show();
                $('#no_search_result_container').hide();
                $('#search_result_container').show();
                ShowSearchText(data.response.numFound);
                ShowResult(data, appendResult);
            } else {
                $('#no_search_result_container').show();
                //$('#search_result_container').hide();
                $('#search_result').html('');
                $('section.search-results.search_page').hide();
            }
        }
    });
}
}
function GetSubSegmentLabel(text) {
    if (subSegmentLabels[text]) {
        return subSegmentLabels[text];
    } else {
        return '';
    }
}
function GetSegmentLabel(text) {
    if (segmentLabels[text]) {
        return segmentLabels[text];
    } else {
        return '';
    }
}
function showMoreInsight(page) {
    var currentPage = page.page;
    var totalPage = page.pages.length;
    if (currentPage < totalPage) {
        var szShowMore = '<a href="javascript:LoadMorePage(' + (currentPage + 1) + ')" class="link-underline">load more</a>';
        $('#cards_bottom .cards__more-link').html(szShowMore);
    } else {
        $('#cards_bottom .cards__more-link').html('');
    }
}
function showMorePress(page) {
    var currentPage = page.page;
    var totalPage = page.pages.length;
    if (currentPage < totalPage) {
        var szShowMore = '<a href="javascript:LoadMorePage(' + (currentPage + 1) + ')" class="link-underline">load more</a>';
        $('#cards_top .cards__more-link').html(szShowMore);
    } else {
        $('#cards_top .cards__more-link').html('');
    }
}
function getQSParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function scrollToResult() {
    $('html, body').animate({
        scrollTop: $('#cards_top').offset().top
    }, 100);
}
function LoadMorePage(page) {
  console.log("inload more");
    SearchQuery(q, page, filterArray, true);
}
//Map the results to the JS template
function ShowResult(data, appendResult) {
    var searchTemplate = Handlebars.compile($('#search_template').html());
    var result = searchTemplate(data.response);
    window.scrollTo(0, 0);
    if (appendResult) {
        $('#search_result').append(result);
    } else {
        $('#search_result').html(result);
    }
    SetPages(data.pager);
}
//Pagination
function SetPages(page) {
    var paginationHtml = "";
    var currentPage = page.page;
    var pagesCount = page.pages.length;
    var minPage = 1;
    var maxPage = pagesCount;
    var firstElipseExist = false;
    var lastElipseExist = false;
    if (pagesCount != 0 && currentPage <= pagesCount) {
        //paginationHtml = '<a onclick="ChangePage(' + (currentPage + 1) + ');" class="button">View More</a>';
        if (currentPage > minPage)
            paginationHtml += '<a href="javascript:ChangePage(' + (currentPage - 1) + ')" class="pagination__prev"></a>';
        else
            paginationHtml += '<a href="javascript:void(0)" class="pagination__prev disabled"></a>';
        paginationHtml += '<span class="pagination__text">' + currentPage + ' of ' + maxPage + '</span>';
        if (currentPage < maxPage)
            paginationHtml += '<a href="javascript:ChangePage(' + (currentPage + 1) + ')" class="pagination__next"></a>';
        else
            paginationHtml += '<a href="javascript:void(0)" class="pagination__next disabled"></a>';
        /*
        <a href="#" class="pagination__prev disabled"></a>
        <span class="pagination__text">1 of 36</span>
        <a href="#" class="pagination__next"></a>
        */
        $('div.pagination').html(paginationHtml);
    } else {
        $('div.pagination').html('');
    }
}
function ShowSearchText(totalFound) {
    //<h3 class="search-results__count">Showing 10 of 32 Results</h3>
    showNumber = nRow < totalFound ? nRow : totalFound;
    var searchText = 'Showing ' + showNumber + ' of ' + totalFound + ' Results';
    $('.search-results__count').html(searchText);
    //update analytics data layer
    dataLayer = window.dataLayer = dataLayer || [];
    dataLayer.push({
        'event': 'search_results',
        'search_results': totalFound
    });
}
function fixhtml(html) {
    var div = document.createElement('div');
    div.innerHTML = html
    return (div.innerHTML);
}
function ucwords(input) {
    var words = input.split(/(\s|-)+/),
        output = [];
    for (var i = 0, len = words.length; i < len; i += 1) {
        output.push(words[i][0].toUpperCase() +
                    words[i].toLowerCase().substr(1));
    }
    return output.join('');
}
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};
function ChangePage(page) {
    var q = getQSParameterByName('q');
    if (!q) q = '*';
    SearchQuery(q, page, filterArray);
}
function page(n) {
    if (n) currentPage = n;
    return currentPage;
}
//------------------------------------------------------------
// Search G2 Ends
//------------------------------------------------------------
//------------------------------------------------------------
// Cards Block
//------------------------------------------------------------
function LoadMoreCards() {
    var $card = $('.cards__container.cards_hidden');
    if ($card.length > 0) {
        //$card.first().removeClass('cards_hidden').css('display', 'flex');
        $card.first().removeClass('cards_hidden');
        if ($('.cards__container.cards_hidden').length == 0) {
            $('.cards__more-link').hide();
        }
    }
}
//------------------------------------------------------------
// Set Cookie header
//------------------------------------------------------------
$(".notification-box-action-close").on("click", function() {
    $(this).closest(".notification").slideUp("swing", function() {
        setCookie('newexpcookie', '1');
        window.controller && window.controller.update()
    });
});
$(".notification-adv-box-action-close").on("click", function() {
  if ($(this).closest('.notification__wrapper').find('#dontShow_intl').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_us').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_ca').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_jp').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_de').prop('checked') == true) {
        setCookie('expcookie', '1');
     setCookie('permanent_url', window.location.pathname);
        window.controller && window.controller.update()
      }
    $(this).closest(".notification").slideUp("swing", function() {
      
    });
});
$('.stay-here').click(function() {
       if (document.getElementById('dontShow_us').checked) {
         
           setCookie('permanent_url', window.location.pathname);
          setCookie('expcookie', '1');
       }
        
    });
    $(".notification-action-close").on("click", function() {
  if ($(this).closest('.notification__wrapper').find('#dontShow_intl').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_us').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_ca').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_jp').prop('checked') == true || $(this).closest('.notification__wrapper').find('#dontShow_de').prop('checked') == true) {
        setCookie('expcookie', '2');
     setCookie('permanent_url', "");
        window.controller && window.controller.update()
      }
    $(this).closest(".notification").slideUp("swing", function() {
      
    });
});
/*
$('#dontShow_ca').click(function() {
        if ($(this).is(':checked')) {
         
           setCookie('expcookie', '1');
        }
    });
    $('#dontShow_intl').click(function() {
        if ($(this).is(':checked')) {
         
           setCookie('expcookie', '1');
        }
    });
    $('#dontShow_de').click(function() {
        if ($(this).is(':checked')) {
         
           setCookie('expcookie', '1');
        }
    });
    $('#dontShow_jp').click(function() {
        if ($(this).is(':checked')) {
         
           setCookie('expcookie', '1');
        }
    });
    $('#dontShow_us').click(function() {
        if ($(this).is(':checked')) {
         
           setCookie('expcookie', '1');
        }
    });
$(".notification-adv-box-action-close").on("click", function() {
    if (document.getElementById('dontShow_intl').checked) {
        setCookie('expcookie', '1');
    }
  if (document.getElementById('dontShow_ca').checked) {
        setCookie('expcookie', '1');
    }
if (document.getElementById('dontShow_jp').checked) {
        setCookie('expcookie', '1');
    }
  if (document.getElementById('dontShow_de').checked) {
        setCookie('expcookie', '1');
    }
  if(document.getElementById('dontShow_us')){
  if (document.getElementById('dontShow_us').checked) {
        setCookie('expcookie', '1');
    }
  }
    $(this).closest(".notification").slideUp("swing", function() {     
        window.controller && window.controller.update()
    });
});*/
//notification-adv-box-action-close
//-- code for partner one program form showing in navigation
$(function(){
    $(".talk-to-us__form__buttons a:first-child").css("display","none")
    $("a.test").click(function(){
        $(".header__nav__link.header__nav__link--arrow:last-child").click(); 
        $(".talk-to-us__form__buttons a:first-child").click()
    })
    
    $("a.formopen").click(function(){
    
        $(".header__nav__link.header__nav__link--arrow:last-child").click(); 
        $(".talk-to-us__form__buttons a:nth-child(2)").click();
    })
    
    if(document.location.pathname == "/about/our-partner-program"){
        $('.flyout__back--desktop').css("display","none");
    }
})
/*$('#nav-desktop').on('show', function(){
    $($("#nav-industry-1 a")[0]).trigger("click");
    $($("#nav-industry-1 a")[0]).addClass("active");  
    $(".nav-content__segment__title.pinned").removeClass("pinned")
});*/
//Listening to first anchor link click and loading appropriate menu
/*
$($(".header__nav a")[1]).on("click",function(){
 // $($(".nav__industries li")[0]).trigger("click");
 $($("#nav-industry-1 a")[0]).trigger("click");
  $($("#nav-industry-1 a")[0]).addClass("active");
  
  $(".nav-content__segment__title.pinned").removeClass("pinned")
})*/
$(document).ready(function() {
    $('.accordionItem').on('click', '#accordionItemTitle', function() {
        $(this).siblings(".accordinDetails").toggle(100);
        $(this).toggleClass("collapsed, expanded");
    });
});
var canSlide = true;
var flag = true;
var flag1 = true;
var flag2 = true;
var flag3 = true;
function limelightPlayerCallback (playerId, eventName, data)
{
    //var id = "limelight_player_719408";
  
  var id = playerId;
    if (eventName == 'onPlayerLoad' && (LimelightPlayer.getPlayers() == null || LimelightPlayer.getPlayers().length == 0)||eventName == 'onPlayheadUpdate'||eventName == 'onPlayStateChanged'||eventName == 'onMediaComplete'||eventName == 'onMediaLoad') 
    {
        LimelightPlayer.registerPlayer(id);
    }
 
    switch(eventName)
    {
   
      
        case 'onPlayStateChanged':
            //console.log("onPlayStateChanged");
            doOnPlayStateChanged(data);
            break;
      
        case 'onPlayheadUpdate':
            //console.log("onPlayheadUpdate");
             doOnPlayheadUpdate(data,playerId);
            break;
      
        case 'onMediaComplete':
            // console.log("onMediaComplete");
            doOnMediaComplete(data);
            break;
      
    }
}
var VideoJsonObj={};
function doOnPlayheadUpdate(e,k) {
    var total = e.durationInMilliseconds;
    var played = e.positionInMilliseconds;
    var video_played = e.positionInMilliseconds;
    var videoDetails = LimelightPlayer.doGetCurrentMedia();
    //console.log(videoDetails.id);
    //console.log(videoDetails.title);
  
  
  curPosition =Math.round(((played/total)*100));
      //console.log(curPosition + "-----"+k);
  if(curPosition == 0)
    {
VideoJsonObj[k]= curPosition;
    }
   //console.log(VideoJsonObj[k]+"type"+typeof(VideoJsonObj[k])+"---------------"+curPosition+"type"+typeof(curPosition))
  	if(VideoJsonObj[k]!=curPosition)
      {
        VideoJsonObj[k]= curPosition;
        //console.log(VideoJsonObj[k]);
        if(VideoJsonObj[k] == 1)
          {
                dataLayer.push({
            'event': 'video',
            'videoAction': 'Play',
            'videoTitle': videoDetails.title,
            'videoId': videoDetails.id
        			});
          }
        else if(VideoJsonObj[k] == 25)
          {
                dataLayer.push({
            'event': 'video',
            'videoAction': '25%',
            'videoTitle': videoDetails.title,
            'videoId': videoDetails.id
        			});
          }
        else if(VideoJsonObj[k] == 50)
          {
                dataLayer.push({
            'event': 'video',
            'videoAction': '50%',
            'videoTitle': videoDetails.title,
            'videoId': videoDetails.id
        			});
          }
        else if(VideoJsonObj[k] == 75)
          {
                dataLayer.push({
            'event': 'video',
            'videoAction': '75%',
            'videoTitle': videoDetails.title,
            'videoId': videoDetails.id
        			});
          }
      }
  
}
function doOnPlayStateChanged(e) {
    if (e.isPlaying) {
        canSlide = false;
    } else {
        canSlide = true;
    }
}
function doOnMediaComplete(e){
    var videoDetails = LimelightPlayer.doGetCurrentMedia();
    //console.log(videoDetails.id);
    //console.log(videoDetails.title);
  
    dataLayer.push({
        'event': 'video',
        'videoAction': 'Complete',
        'videoTitle': videoDetails.title,
        'videoId': videoDetails.id
    });
  
}
var curflag = true;
var curflag1 = true;
var curflag2 = true;
var curflag3 = true;
var curflag4 = true;
$('a.hero__link').click(function(){
    //console.log("chn");
    $('video').bind('play', function (e) {
      
        var video = document.querySelector('video');
        var duration = video.duration;
        // var duration1 = video.duration;
        //console.log(duration);
        strSrc = $('video').find('Source:first').attr('src'); 
        //console.log(strSrc);
        strSrcLength = strSrc.length;
        strPath = strSrc.substring(0, strSrc.lastIndexOf('/'));
        strPathLength = strPath.length;
        strExtension = strSrc.substring(strSrc.lastIndexOf('.'));
        strExtensionLength = strExtension.length;
        //console.log(strPathLength);
        //console.log(strSrcLength);
        strWithoutExtension = strSrcLength-strExtensionLength;
        title = strSrc.slice(strPathLength+1,strWithoutExtension);
        // console.log(title);
    
        var videoInterval = setInterval(function(){ 
            //console.log(video.currentTime); 
            var curTime = video.currentTime;
            if(video.play)
            {
                if(curflag4){
            
                    dataLayer.push({
                        'event': 'video',
                        'videoAction': 'Play',
                        'videoTitle': title,
                        'videoId': ''
                    });
                    curflag4=false;
                }
          
            }
      
            if(curTime>duration/2)
            {
                if(curflag){
            
                    dataLayer.push({
                        'event': 'video',
                        'videoAction': '50%',
                        'videoTitle': title,
                        'videoId': ''
                    });
                    curflag=false;
                }
            }
            if(curTime>duration/4)
            {
                if(curflag1){
            
                    dataLayer.push({
                        'event': 'video',
                        'videoAction': '25%',
                        'videoTitle': title,
                        'videoId': ''
                    });
                    curflag1=false;
                }
          
            }
            if(curTime>duration*3/4)
            {
                if(curflag2){
            
                    dataLayer.push({
                        'event': 'video',
                        'videoAction': '75%',
                        'videoTitle': title,
                        'videoId': ''
                    });
                    curflag2=false;
                }
          
            }
        
            if(video.ended)
            {
                if(curflag3){
            
                    dataLayer.push({
                        'event': 'video',
                        'videoAction': 'Complete',
                        'videoTitle': title,
                        'videoId': ''
                    });
                    curflag3=false;
                }
          
            }
            if((curflag==false)&&(curflag1==false)&&(curflag2==false)&&(curflag3==false)&&(curflag4==false) )
            {
                clearInterval(videoInterval);
                console.log("cleared"); 
            }
        }, 300);
    
   
    });
});                     