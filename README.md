# jQuery Relaxed Each

This is a jQuery extension that allow you easily execute long-play
actions on relatively large collections without hanging user's
browser.

## Usage

Example

    var highlighted = 0
    var threshold = 100

    /* There is about 1000 items in this select. */
    $('div.entries').relaxedEach(function () {
       if ($(this).is(':contains("text we match")') {
          $(this).addClass('highlighted')
          highlighted++
       }
    }, function () {
       if(!highlighted)
         $('#status').text('Sorry you search match no results.')
    }, threshold)

Interface

    $('selector').relaxedEach(
       iterProc,
       endProc,
       threshold,
       relaxProc
    )

Where

* **iterProc** - the same proc that you use in $().each.  

* **endProc** [optional] - callback that called after iteration end.

* **threshold** [optional, default=10] - defines how often to allow
 browser interrupt iteration process and do it's things. If this value
 lesser iteration interruptions would happend more often. Acceptable
 rande is 1..1000.

* **relaxProc** [optional] - custom proc to use for
  relaxation. E.g. if you are using jQuery in node.js this may be
  process.nextTick

## Possible use cases

Imagine you have 2000-3000 records on page and want to hide some of
them (of course keep 3000 records on page is not good idea but
sometimes this happens). If you iterate on it with 

    $('record.selector').each(...)

construction you'll see, that browser become laggy a bit during this
process. Using

    $('record.selector').relaxedEach(...)

allows you to avoid this.

## How it works?

Relaxed each use asynchronous loop and inserts sometimes 

    setTimeout(nextIteration, 0)

constructions, which allows browser to process it's events _during_
loop without waiting it's end.

## Caveats

Remember, that relaxedEach is asynchronous so you cannot
write 

    $('some.selector').relaxedEach(...).afterAction()

you should write insted

    $('some.selector').relaxedEach(iterAction, afterAction)

## Licensing

This extension is licensed under the terms of BSD license.
