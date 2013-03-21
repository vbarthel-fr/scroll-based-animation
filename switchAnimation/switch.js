/*************************************************************************
**************************************************************************
            CLASS
**************************************************************************
**************************************************************************
*   NAME
*       SwitchModel
***************************************************************************
*   ATTRIBUTES
*   scrollChange
*   valueBefore
*   valueAfter
*
**************************************************************************
*   METHODS
*       getValue
**************************************************************************
**************************************************************************
*/
(function(){

    SwitchModel = function(params){
        this.scrollChange   =   params.scrollChange;
        this.valueBefore    =   params.valueBefore;
        this.valueAfter     =   params.valueAfter;
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


/*************************************************************************
**************************************************************************
            CLASS
**************************************************************************
**************************************************************************
*   NAME
*       SwitchView
***************************************************************************
*   ATTRIBUTES
*   elementId
*
**************************************************************************
*   METHODS
*       update
*       addSwitchProperty
**************************************************************************
**************************************************************************
*/
(function(){

    SwitchView = function(params){
        this.elementId  =   params.elementId;
        this.properties =   [];
        return this;
    };
    
    SwitchView.prototype = {
        
        addSwitchProperty : function(switchProperty){
            var DEFAULT_VALUES = {type : "css"};
            switchProperty = $.extend(DEFAULT_VALUES, switchProperty);
            switchProperty.model = new SwitchModel(switchProperty);
            this.properties.push(switchProperty);
            
        },
        
        update : function(scrollTop){
            var these = this;
            $.each(this.properties, function(index, property){
                
                if(property.type == "css"){
                    $(these.elementId).css(property.name, property.model.getValue(scrollTop));
                }                
                /*
                *   To-Do
                *       property.type = class
                *       property.type = attibute
                */
            });
        }
        
    };

})();




