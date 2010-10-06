/* 
 * jQuery relaxed each - iterate onto large collections without
 * stalling your browser
 * 
 * 2010, Michel Beloshitsky (mbeloshitsky@gmail.com)
 *
 * Released under the terms of BSD license. 
 */

jQuery.fn.relaxedEach = function (handler, endProc, dutyCycle, relaxProc) {
   var collection = this;

   /* Handle defaults */
   dutyCycle = dutyCycle || 10;
   relaxProc = relaxProc || function (cb) { setTimeout(function () { cb() }, 0) }
   endProc = endProc || function () {}
   dutyCycle %= 1000 /* Avoid control stack overflow  */
   if (dutyCycle < 1) 
      throw 'Invalud dutyCycle value ('+dutyCycle+').'+
        ' This should be in range [1..1000].'

   /* Asynchronous iterator */
   function next(i) {
      if (i < collection.length) {
         handler.apply(collection[i], [])
         if (i % dutyCycle == 0) {
            relaxProc(function () { next (i + 1) })
         } else {
            next(i + 1)
         }
      } else { 
         endProc(collection) 
      }
   }

   next(0) /* Run it */
}
