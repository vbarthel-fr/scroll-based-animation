

(function(){

    SwitchModel = function(params){
        console.log(params);
        this.scrollChange           =   params.scrollChange;
        this.valueBefore            =   params.valueBefore;
        this.valueAfter             =   params.valueAfter;
        return this;
    };
    
    SwitchModel.prototype = {
    
        getValue : function(scrollTop){
            if(scrollTop < this.scrollChange){
                return this.valueBefore;
            }else{
                return this.valueAfter;
            }
        }
        
    };
    
})();




