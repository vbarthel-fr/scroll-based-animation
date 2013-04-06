/*************************************************************************
**************************************************************************
            CLASS
**************************************************************************
**************************************************************************
*   NAME
*       ScrollBasedAnimationView
***************************************************************************
*   ATTRIBUTES
*   elementId
*   modelList;
*
**************************************************************************
*   METHODS
*       update
*       addModel
**************************************************************************
**************************************************************************/
(function(){
    ScrollBasedAnimationView = function(elementId){
        this.elementId = elementId;
        this.modelList = [];
    };
    
    ScrollBasedAnimationView.prototype = {
    
        addModel : function(model){
            this.modelList.push(model);
        },
        
        update : function(scrollTop){
            var these = this;
            $.each(this.modelList, function(index, model){
                
                if(model instanceof SwitchModel || model instanceof SmoothSwitchModel){
                    if(model.getPropertyType() == "css"){
                        var value = model.getValue(scrollTop);
                        if( value != null){
                            $(these.elementId).css(model.getPropertyName(), value);                        
                        }
                    }
                    /*
                        TO-DO
                        other property type !
                    */
                }else if(model instanceof LinearMoveModel){
                    var currentPosition = model.getPosition(scrollTop);
                    $(these.elementId).css('left',    currentPosition.x);
                    $(these.elementId).css('top',     currentPosition.y);
                }
                
            });
        },
    };

})();


/*************************************************************************
**************************************************************************
            CLASS
**************************************************************************
**************************************************************************
*   NAME
*       LinearMoveModel
***************************************************************************
*   ATTRIBUTES
*   scrollStart
*   scrollEnd
*   xStart
*   yStart
*   xMovement
*   yMovement
*   xUnit
*   yUnit
*
**************************************************************************
*   METHODS
*       getValue
**************************************************************************
**************************************************************************
*/
(function(){

    LinearMoveModel = function(params){
        var DEFAULT_VALUES = {
            xStart      :   0,
            yStart      :   0,    
            xMovement   :   0,
            yMovement   :   0,
            xUnit       :   "px",
            yUnit       :   "px",    
        };
        params = $.extend(DEFAULT_VALUES, params);
        this.scrollStart    =   params.scrollStart;
        this.scrollEnd      =   params.scrollEnd;
        this.xStart         =   params.xStart;
        this.yStart         =   params.yStart;
        this.xMovement      =   params.xMovement;
        this.yMovement      =   params.yMovement;
        this.xUnit          =   params.xUnit;
        this.yUnit          =   params.yUnit;
        this.xMoveByScroll  =   this.xMovement / (this.scrollEnd - this.scrollStart);
        this.yMoveByScroll  =   this.yMovement / (this.scrollEnd - this.scrollStart);
        return this;
    };
    
    LinearMoveModel.prototype = {
    
        getPosition : function(scrollTop){
            if(scrollTop < this.scrollStart){
                return this.formatedPosition(this.xStart, this.yStart);
            }else if(this.scrollEnd < scrollTop){
                return this.formatedPosition(this.xStart + this.xMovement, this.yStart + this.yMovement);
            }else{
                var currentX = this.xStart + this.xMoveByScroll * (scrollTop - this.scrollStart);
                var currentY = this.yStart + this.yMoveByScroll * (scrollTop - this.scrollStart);                
                return this.formatedPosition(currentX, currentY);
            }
        },
        
        formatedPosition : function(p_x, p_y){
            return { x : p_x+this.xUnit, y : p_y+this.yUnit };
        }
        
    };
    
})();




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
*   propertyType   
*   propertyName
*
**************************************************************************
*   METHODS
*       getValue
**************************************************************************
**************************************************************************
*/
(function(){

    SwitchModel = function(params){
        var DEFAULT_VALUES = {propertyType : "css"};
        params = $.extend(DEFAULT_VALUES, params);
        this.scrollStart    =   params.scrollStart;
        this.valueBefore    =   params.valueBefore;
        this.valueAfter     =   params.valueAfter;
        this.propertyType   =   params.propertyType;
        this.propertyName   =   params.propertyName;
        return this;
    };
    
    SwitchModel.prototype = {
    
        getPropertyType : function(){
            return this.propertyType;
        },
        
        getPropertyName : function(){
            return this.propertyName;
        },
    
        getValue : function(scrollTop){
            if(scrollTop < this.scrollStart){
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
*       SmoothSwitchModel
*       extends SwitchModel
***************************************************************************
*   ATTRIBUTES
*   scrollEnd
*   valueUnit
*   valueByScroll
*
**************************************************************************
*   METHODS
*       getValue
**************************************************************************
**************************************************************************
*/
(function(){

    SmoothSwitchModel = function(params){
        var DEFAULT_VALUES = {propertyType : "css", valueUnit : ""};
        params = $.extend(DEFAULT_VALUES, params);
        SwitchModel.call(this,params);
        this.scrollEnd      =   params.scrollEnd;
        this.valueUnit      =   params.valueUnit;
        this.valueByScroll  =   (this.valueAfter - this.valueBefore) / (this.scrollEnd - this.scrollStart);
        return this;
    };
    
    SmoothSwitchModel.prototype = new SwitchModel();
        
    SmoothSwitchModel.prototype.getValue = function(scrollTop){
        if(scrollTop < this.scrollStart){
            return this.valueBefore+this.valueUnit;
        }else if(scrollTop > this.scrollEnd){
            return this.valueAfter+this.valueUnit;
        }else{
            var value = this.valueBefore + (scrollTop - this.scrollStart) * this.valueByScroll;
            return value+this.valueUnit;
        }
    };       

    
})();