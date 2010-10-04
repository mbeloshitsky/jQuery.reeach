/* 
 * jQuery relaxed each - iterate onto large collections without
 * stalling your browser
 * 
 * 2010, Michel Beloshitsky (mbeloshitsky@gmail.com)
 *
 * Released under the terms of BSD license. 
 */

jQuery.fn.relaxedEach = function (handler, endcb, threshold) {
   var collection = this;
   threshold = threshold || 10;
   threshold %= 1000 /* Avoid control stack overflow  */
   function next(i) {
      if (i < collection.length) {
         handler.apply(collection[i], [])
         if (i % threshold == 0) {
            setTimeout(function () { next (i + 1) }, 0)
         } else {
            next(i + 1)
         }
      } else { 
         if (typeof endcb == 'function') 
            endcb(collection) 
      }
   }

   next(0)
}
