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

## References

* [Building your first Atom plugin](https://blog.github.com/2016-08-19-building-your-first-atom-plugin/)
* Git merge conflict UI is quite nice
* [atom-language-crontab](https://github.com/aegypius/atom-language-crontab/) for an example of how to highlight columns
