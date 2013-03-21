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
*       LinearMoveView
***************************************************************************
*   ATTRIBUTES
*   elementId
*
**************************************************************************
*   METHODS
*       getValue
**************************************************************************
**************************************************************************
*/
(function(){

    LinearMoveView = function(params){
        this.elementId  =   params.elementId;
        this.model;
        return this;
    };
    
    LinearMoveView.prototype = {
    
        update : function(scrollTop){
            var currentPosition = this.model.getPosition(scrollTop);
            $(this.elementId).css('left',    currentPosition.x);
            $(this.elementId).css('top',     currentPosition.y);
        },
        
        setModel : function(model){
            this.model = model;
        }
        
    };
    
})();