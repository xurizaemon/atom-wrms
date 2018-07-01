# WRMS for Atom

Primarily a WRMS timesheet plugin for Atom.

## TODO

* Generate a .tks template, like tks -t (date)
* [x] Syntax highlighting for .tks files
 * [x] Day header highlight
 * [x] Column highlight
 * [x] Soften comments
 * [ ] Warning highlight for invalid lines
* Submit .tks files to WRMS via node-wrms
* Calculate total timesheet hours per day (in header?)
* Sort by WR ID, then comment, then hours
* Quick command: Timesheet
 * [ ] Opens input field
 * [ ] Select from (eg BAU tickets)
 * [ ] Record notes
 * [ ] Send to current day in current week's timesheet
* Interface: get this week's timesheet
* Interface: send to today's entries in week's timesheet
* Interface: most common tickets (eg quick phone calls)

## References

* [Building your first Atom plugin](https://blog.github.com/2016-08-19-building-your-first-atom-plugin/)
* [Atom Flight Manual: Theme](http://flight-manual.atom.io/hacking-atom/sections/creating-a-theme/#creating-a-theme)
* [Atom Flight Manual: Grammar](https://flight-manual.atom.io/hacking-atom/sections/creating-a-grammar/)
* [A guide to writing a language grammar in Atom](https://gist.github.com/Aerijo/b8c82d647db783187804e86fa0a604a1)
* [atom-language-crontab](https://github.com/aegypius/atom-language-crontab/) for an example of how to highlight columns

## Notes

* Git merge conflict UI is quite nice - how it inserts coloured blocks
