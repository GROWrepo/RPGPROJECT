function RandomNextInt(min, max){
	return min + 1 + Math.floor( Math.random() * max);
}

function IsCollisionRect(Pl, Pr, Pt, Pb, El, Er, Et, Eb){
	
	if(El < Pr && Eb > Pt
		&& Er > Pl && Et < Pb)
			return true;//crash
	else
		return false;//not
}

function IntersectRect(pRect1, pRect2){
	var bVertical = false;
	var bHorizontal = false;
	
	var collisionRect
		= {left:0,right:0,top:0,bottom:0};
	
	//Horizontal crash
	if(pRect1.left < pRect2.right && pRect1.right > pRect2.left){
		bHorizontal = true;
		collisionRect.left = (pRect1.left > pRect2.left) ? pRect1.left : pRect2.left;
		collisionRect.right = (pRect1.right < pRect2.right) ? pRect1.right : pRect2.right;	
	}
	
	if(pRect1.top < pRect2.bottom && pRect1.bottom >= pRect2.top){
		bVertical = true;
		collisionRect.top = (pRect1.top > pRect2.top) ? pRect1.top : pRect2.top;
		collisionRect.bottom = (pRect1.bottom < pRect2.bottom) ? pRect1.bottom : pRect2.bottom;	
	}
	
	if(bVertical && bHorizontal)
		return collisionRect;
		
	return null;
}