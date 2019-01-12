function type_check_v1(arg1,arg2){

    if(Array.isArray(arg1) === true){
        if( arg2 == "array"){
            return true;
        }
        return false;
    }
    else if(typeof arg1 == "object"){
        if(arg1 == null && arg2 == "null"){
            return true;
        } else if(arg2 == "object" && arg1 != null){
            return true;
        }
        return false;
    }
    else if(typeof arg1 == arg2){
        return true;
    }
  return false;
};

function type_check_v2(arg1,objet){

   if(arg1 == objet.value){
       if(Array.isArray(arg1) === true){
        if( objet.type == "array"){
            return true;
        }
        return false;
    }
    else if(typeof arg1 == "object"){
        if(objet.type == null && objet.type == "null"){
            return true;
        } else if(objet.type == "object" && arg1 != null){
            return true;
        }
        return false;
    }
    else if(typeof arg1 == objet.type){
        return true;
    }
   } 
   return false;
};

function type_check(variable,conf) {
    var key;
    for(key in Object.keys(conf)){
        switch(key){
            case 'type':
                if(!type_check_v1(variable)) return false;
                break;
            case 'value':
                if(JSON.stringify(variable) !== JSON.stringify(conf[key])) return false;
                break;
            case "enum":
                var val;
                for(val in conf[key]){
                    if(!type_check_v2(variable,{value: val})) return false
                }
                break;
            case 'properties':
                for(property in Object.keys(conf[key])) {
                    if(!variable[property]) return false;
                    if(!type_check(variable[property], conf[key][property])) return false;
                }
        }
        return true;
    }
}

