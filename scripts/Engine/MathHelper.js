function MathHelper()
{

}

MathHelper.prototype.clamp = function(val,low,high) {
	if (val >= low && val <= high)
		return val;

	if (val < low)
		return low;

	if (val > high)
		return high;

	throw new Error("Something wrong with clamp parameters: '" + val + "', '" + low +"', and '" + high+"'." );
}

/*
 * This supports random(n) which gives a random number between 1 to n exclusive.
 * e.g. random(4) = either 0, 1, 2, 3
 * 
 * Also, it supports random(m, n) which gives a random number between m to n inclusive.
 * e.g. random(1,4) = either 1, 2, 3, 4
 * 
 */
MathHelper.prototype.random = function(min, max)
{
	if (typeof max === undefined)
		return Math.floor( Math.random() * min);

	return min + Math.floor( Math.random() * (max - min + 1) );
}